# Take Home Test

I created my solution using JavaScript and Express

# How to setup and run

- Node is used to run the server
- Clone the repo
- Go into the directory
- Run `npm install` for dependencies
- To start server with node type `node index.js`
- The server will run on `localhost:8080/api`
- Use your own method to send requests or Visit Postman workspace to test endpoints. https://app.getpostman.com/join-team?invite_code=671d9df1e143daf063c3a23c8f8e8922&ws=bfcfcf02-29fd-4bff-a64e-560afc74ae59

Endpoints:

- `/api/` Methods: POST Record a transaction by sending a POST. Request
  format JSON:

  `{ "payer": "aram", "points": 300, "timeStamp": 1604325604 }`

- `/api/balance` Methods GET Get current balance of points

- `/api/spend` Methods POST Record a spend by sending a POST. Request
  format JSON: `{ "points":400 }`
