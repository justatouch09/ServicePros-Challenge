const express = require('express')
const books = require('../lib/books')
const router = express.Router()

router.use('/', async (req, res) => {
  try {
    const list = await books.get()
    res.status(200).json(list)
  } catch (err) {
    res.status(500).json({ error: err })
  }
})

module.exports = router
