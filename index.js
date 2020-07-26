const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const routes = require('./routes/routes')
const cors = require("cors");

const app = express()

app.use(cors())
app.use(bodyParser.json())
let port = process.env.PORT || 3000
app.use('/' ,routes)
mongoose.connect('mongodb+srv://KamalNanda:KamalNanda@cluster0-jpk3x.mongodb.net/test?retryWrites=true&w=majority' , {useNewUrlParser : true , useUnifiedTopology: true })
.then(()=> {
app.listen(port, ()=>{console.log(`A Node.Js API is linstening on port 3000`)})   
})
.catch(err => console.log(err))

