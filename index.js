const express = require('express');
const app = express();
const SERVER_PORT = process.env.port || 3000;

// http://localhost:3000/
app.get('/', (req, res) => {
    res.send('Hello World');
})

app.get('/hello', (req, res) => {
    res.send('Hello Express JS');
})

app.get('/user', (req, res) => {
    const fname = req.query.firstname || "Pritish";
    const lname = req.query.lastname || "Patel";
    res.json({"firstname":fname, "lastname": lname}); 
})

// http://localhost:3000/
app.post('/user/:firstname/:lastname', (req, res) => {
    const fname = req.params.firstname;
    const lname = req.params.lastname;
    res.json({"firstname":fname, "lastname": lname}); 
})

// Listen to the server
app.listen(SERVER_PORT, () => {
    console.log(`Server is running on http://localhost:${SERVER_PORT}`);
})