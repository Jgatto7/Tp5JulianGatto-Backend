const express = require('express')
const http = require('http')
const path = require('path')
const handlebars = require('express-handlebars')
const {Server} = require("socket.io");

const Routes = require('./routes/index')

const app = express() // express
const server = http.createServer(app) // server http montado con express
const io = new Server(server) // web socket montado con http

app.engine('handlebars', handlebars.engine()) // registramos handlebars como motor de...
app.set('vierws', path.join(__dirname, 'views'))
app.set('vierws engine', 'handlebars') //  setear handlebars como motor de plantillas

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('/static', express.static(path.join(__dirname + '/public')))

/// middleware global
app.use((req, res, next) => {

    // simulando un usuario autenticado
    req.user = {
        name: "Julian",
        role: "admin"
    }

    next()
})
// cookie
// passport
// template engines
// entre otros

// app.get('/api/usuarios'), (req, res) => {
//     res.send('usuarios')
// })


// router
app.use('/', Routes.home)
app.use('/api', Routes.api)

// middlewares
// static files 
// subir archivos estaticos

// web socket

io.on('connection', (socket) => {
    console.log(`user has connected: ${socket.id}`)

    socket.on('disconnect', () => {
        console.log('user disconnected')
    })

    setTimeout(() => {
        socket.emit('promo', { title: 'GTA VI', sale: 10 })
    }, 700)
    
})
const port = 3000




server.listen(port, () => {
    console.log(`Express Server listening at http://localhost:${port}`)
})

