const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const routes = require('./routes/routes')

const app = express()

app.use(bodyParser.json())

app.use('/' ,routes)
mongoose.connect('mongodb+srv://KamalNanda:KamalNanda@cluster0-jpk3x.mongodb.net/test?retryWrites=true&w=majority' , {useNewUrlParser : true , useUnifiedTopology: true })
.then(()=> {
app.listen(2000, ()=>{console.log(`A Node.Js API is linstening on port 2000`)})   
})
.catch(err => console.log(err))

