const express = require('express')
const exphbs = require('express-handlebars')
const Expense = require('./models/expense')
require('./config/mongoose')

const app = express()
const PORT = 3000
let totalAmount = 0

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs' }))
app.set('view engine', 'hbs')

app.get('/', (req, res) => {
  Expense
    .find()
    .lean()
    .then(expenses => {
      expenses.forEach(expense => {
        expense.date = `${expense.date.getFullYear()}/${expense.date.getMonth() + 1}/${expense.date.getDate()}`
        totalAmount += expense.amount
      })
      return expenses
    })
    .then(expenses => {
      res.render('index', { expenses, totalAmount })
    })
})

app.get('/new', (req, res) => {
  res.render('new')
})

app.get('/edit', (req, res) => {
  res.render('edit')

})
app.listen(PORT, () => {
  console.log(`Express is listening on http://localhost:${PORT}`)
})