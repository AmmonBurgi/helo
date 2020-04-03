require('dotenv').config()
const express = require('express'),
    massive = require('massive'),
    session = require('express-session'),
    {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env,
    ctrl = require('./controller'),
    app = express(),
    port = SERVER_PORT

app.use(express.json())

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: {maxAge: 1000 * 60 * 60 * 24}
}))

massive({
    connectionString: CONNECTION_STRING,
    ssl: {rejectUnauthorized: false}}
).then(db => {
    app.set('db', db)
    console.log('db connected')
})

app.get('/api/posts/:id', ctrl.getPosts)
app.get('/api/post/:id', ctrl.getPost)
app.post('/api/createPost/:id', ctrl.createPost)
app.delete('/api/delete/:id', ctrl.deletePost)

//Authentication endpoints
app.post('/api/register', ctrl.register)
app.post('/api/login', ctrl.login)


app.listen(port, () => console.log(`Listening on port ${port}`))

