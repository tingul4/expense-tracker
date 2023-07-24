const express = require('express')
const router = express.Router()
const Expense = require('../../models/expense')

router.get('/new', (req, res) => {
  res.render('new')
})

router.post('/new', (req, res) => {
  const expenseInfo = req.body
  Expense
    .create(expenseInfo)
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

router.get('/:id/edit', (req, res) => {
  const _id = req.params.id
  Expense
    .findOne({ _id })
    .lean()
    .then(expense => {
      expense.date = expense.date.toJSON().slice(0, 10)
      if (expense.categoryId === 1) {
        const isHouse = true
        res.render('edit', { expense, isHouse })
      }
      if (expense.categoryId === 2) {
        const isTraffic = true
        res.render('edit', { expense, isTraffic })
      }
      if (expense.categoryId === 3) {
        const isEntertainment = true
        res.render('edit', { expense, isEntertainment })
      }
      if (expense.categoryId === 4) {
        const isFood = true
        res.render('edit', { expense, isFood })
      }
      if (expense.categoryId === 5) {
        const isOther = true
        res.render('edit', { expense, isOther })
      }
    })
    .catch(err => console.log(err))
})

router.put('/:id/edit', (req, res) => {
  const _id = req.params.id
  const expenseInfo = req.body
  Expense
    .findOne({ _id })
    .then(expense => {
      Object.keys(expenseInfo).forEach(key => {
        expense[key] = expenseInfo[key]
      })
      expense.save()
    })
    .then(res.redirect('/'))
    .catch(err => console.log(err))
})

router.delete('/:id', (req, res) => {
  const _id = req.params.id
  Expense
    .findOneAndDelete({ _id })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

module.exports = router