const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const gemini = require('./routes/Gemini/Gemini')
const archive = require('./routes/archive/Archive')


const app = express()

app.use(cors())
app.use(express.json())

app.use('/gemini', gemini)
app.use('/archive', archive)


mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/gemini').then(()=>{console.log('connected')}).catch((err)=>{console.log(err)})
// mongoose.connect('mongodb://0.0.0.0:27017/gemini').catch((err)=>{console.log(err)})
mongoose.connection.on('disconnected', () => {console.log('disconnected')})
mongoose.connection.on('connected', () => console.log('connected'));

app.listen(process.env.PORT || 5000, ()=>{
    console.log('Server is running on http://localhost:5000')
})