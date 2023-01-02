const express = require('express')
const hbs = require('hbs')
const { title } = require('process')
const path = require('path')
const mongodb = require('mongodb')
const session = require('express-session')
const bodyParser = require('body-parser')
const http = require('http')
const socketio = require('socket.io')
const { setServers } = require('dns')

const MongoClient = mongodb.MongoClient
const app = express()
const server = http.createServer(app)
const io = socketio(server)

//Define Express Confige
const publicDirectoryPath = path.join(__dirname,'/public')
const viewsPath = path.join(__dirname,'/templates/views')
const partialsPath = path.join(__dirname,'/templates/partials')

//setup handlebars and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

io.on('connection',() => {
    console.log('new connection')
})

app.use(bodyParser.json())

//Session Setup
app.use(session({ 

    secret: 'ChatBot Key', 
    resave: true,  
    saveUninitialized: true
}))

var sess


app.get('',(req,res)=>{
    res.render('index',{
        title: 'ChatBoard',   
    })
    req.session.name='username'
     
})

app.get('/dashboard',(req,res)=>{
    res.render('dashboard')
})


app.get('/api/chatbot',(req,res)=>{
    try{
        const msg = req.query.message.toLocaleLowerCase()
        sess = req.session
        const connectionURL = 'mongodb://127.0.0.1:27017'
        const databaseName = 'chatbot'

        username = sess.username

        MongoClient.connect(connectionURL,{useNewUrlParser: true, useUnifiedTopology: true },(error,client)=>{
        
            if(error){
                console.log(error)
             return console.log('Unable to connect to database')
            }
        
            const db = client.db(databaseName)
            console.log('connected to database')
            db.collection('botresponse').findOne({ userMsg: msg }, (error,result) => {
            
                if(result!=null){
                    console.log(result)
                    res.send(result)
                    db.collection('chatHistory').insertOne({userMsg:result.userMsg,botMsg:result.botMsg})
                }else{
                    res.send({
                        error: "undefined"
                    })
                    console.log(error)
                }
            
            })

        })
    }
    catch(e){
        console.log(e)
    }

    
})

server.listen(3000,(req,res)=>{
    console.log('Server is up!')
})