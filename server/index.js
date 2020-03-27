require('dotenv').config()
const express = require('express'),
    massive = require('massive'),
    // session = require('express-session'),
    {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env,
    ctrl = require('./controller'),
    app = express(),
    port = 4001

app.use(express.json())

massive({
    connectionString: CONNECTION_STRING,
    ssl: {rejectUnauthorized: false}}
).then(db => {
    app.set('db', db)
    console.log('db connected')
})

app.post('/api/register', ctrl.register)
app.post('/api/login', ctrl.login)

app.listen(port, () => console.log(`Listening on port ${port}`))

