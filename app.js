const express = require('express')
const config = require('config')
const mongoose = require('mongoose')

const app = express()
const PORT = config.get('port') || 5000

app.use(express.json({extended: true}))

app.use('/api/auth', require('./routes/auth.routes'))

async function start() {
  try {
    await mongoose.connect(config.get('mongoUri'), {
      autoIndex: false
    })
    app.listen(PORT, () => {
      console.log(`App has been started on port ${PORT}`)
    })
  } catch (e) {
    console.log('Server er#@r', e.message)  //1.46.05 далее готовим логинку
    process.exit(1)
  }
}

start()