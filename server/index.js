const express = require('express')
const cors = require('cors')
const app = express()
const router = require('./routes')

const PORT = 5555 || process.env.PORT

app.use(cors())

app.use('/books', router)

app.listen(5555, () => console.log(`Listening on ${PORT}`))
