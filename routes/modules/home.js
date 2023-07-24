const express = require('express')
const router = express.Router()
const Expense = require('../../models/expense')

router.get('/', (req, res) => {
  let totalAmount = 0
  const categoryId = req.query.categoryId
  const CATEGORY = [
    ``,
    `<i class="fa-solid fa-house fa-xl"></i>`,
    `<i class="fa-solid fa-van-shuttle fa-xl"></i>`,
    `<i class="fa-solid fa-face-grin-beam fa-xl"></i>`,
    `<i class="fa-solid fa-utensils fa-xl"></i>`,
    `<i class="fa-solid fa-pen fa-xl"></i>`
  ]
  const userId = req.user._id

  Expense
    .find({ userId })
    .lean()
    .then(expenses => {
      if (!categoryId) return expenses
      expenses = expenses.filter(expense => expense.categoryId === Number(categoryId))
      return expenses
    })
    .then(expenses => {
      expenses.forEach(expense => {
        expense.date = expense.date.toJSON().slice(0, 10)
        totalAmount += expense.amount
        expense.categoryId = CATEGORY[expense.categoryId]
      })
      return expenses
    })
    .then(expenses => {
      res.render('index', { expenses, totalAmount })
    })
    .catch(err => console.log(err))
})

module.exports = router