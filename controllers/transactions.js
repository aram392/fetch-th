
const transactionRouter = require('express').Router()

//Well use in memory just because its easy
//I will keep track of spends and recalculate every time.
let inMemoryTransactions=[]
let inMemorySpend=0

const calculateSpend = (spend) => {
    inMemorySpend=inMemorySpend+spend.points
    tempSpend=inMemorySpend
    pending = {}
    var arrayLength = inMemoryTransactions.length;
    for (var i = 0; i < arrayLength; i++) {
        if (tempSpend>0){
            if (tempSpend<=inMemoryTransactions[i].points){
                pending[inMemoryTransactions[i].payer]=(pending[inMemoryTransactions[i].payer] || 0) - tempSpend
                tempSpend=0
            }else{
                pending[inMemoryTransactions[i].payer]=(pending[inMemoryTransactions[i].payer] || 0) - inMemoryTransactions[i].points
                tempSpend=tempSpend-inMemoryTransactions[i].points
            }
        }
        else{
            break
        }
    }
    //To save extra calculation time. I will just remove the spend points if there isnt enough points.
    //I could calculate the total and check but for the sake of time ill leave this.
    if (tempSpend>0){
        pending={}
        inMemorySpend=inMemorySpend-spend.points
    }
    return pending
}

const calculateTotals = (pending) => {
    totals={}
    inMemoryTransactions.forEach((transaction)=>{
        totals[transaction.payer]= (totals[transaction.payer] || 0) + transaction.points
    })
    if (!(pending===null)){
        Object.entries(pending).forEach(([payer,points])=>{
            totals[payer]=totals[payer] + points
        })
    }
    Object.entries(totals).forEach(([payer,points])=>{
        if (points<0){
            totals[payer]=0
        }
    })
    return totals

}

transactionRouter.get('/balance', (request, response) => {
    if (inMemoryTransactions.length===0){
        response.json(inMemoryTransactions)
    }
    const spend = {
        points: 0
    }
    pendingTransactions=calculateSpend(spend)
    response.json(calculateTotals(pendingTransactions))
})

transactionRouter.post('/spend', (request, response) => {
    const body = request.body
    const spend = {
        points: body.points
    }

    if (inMemoryTransactions.length===0 || spend.payer === null || spend.points === null || (!Number.isInteger(spend.points))){
        response.status(400)
    }

    temp=calculateSpend(spend)
    if (Object.keys(temp).length === 0){
        response.status(400).end()
    }
    response.json(temp)

})

transactionRouter.get('/db', (request, response) => {
    console.log(inMemoryTransactions)
    response.json(inMemoryTransactions)
})

transactionRouter.post('/',(request,response)=>{
    const body = request.body

    const transaction = {
        payer: body.payer,
        points: body.points,
        timeStamp: body.timeStamp
    }

    if (transaction.payer===null || transaction.points===null || transaction.timeStamp===null){
        response.status(400).end()
    }
    //Add more checks like timeStamp. I can add later
    if ((!Number.isInteger(transaction.points)) || typeof transaction.payer === 'string'){
        response.status(400)
    }

    inMemoryTransactions.push(transaction)
    inMemoryTransactions.sort(function(a,b){
        return a.timeStamp > b.timeStamp
    })
    response.status(200).end()
})

module.exports = transactionRouter