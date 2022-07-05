const express = require('express')
const { createCategory, getCategory, updateCategory, deleteCategory } = require('../Controlllers/Category')
const router = express.Router()

router.post('/create',createCategory)

router.get('/get',getCategory)

router.put('/update',updateCategory)

router.delete('/delete/:category',deleteCategory)

module.exports = router