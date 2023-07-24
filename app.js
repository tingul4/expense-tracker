const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const Expense = require('./models/expense')
const expense = require('./models/expense')
require('./config/mongoose')

const app = express()
const PORT = 3000

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs' }))
app.set('view engine', 'hbs')
app.use(bodyParser.urlencoded({ extended : true }))
app.use(methodOverride('_method'))

app.get('/', (req, res) => {
  let totalAmount = 0
  const CATEGORY = {
    1: `<i class="fa-solid fa-house fa-xl"></i>`,
    2: `<i class="fa-solid fa-van-shuttle fa-xl"></i>`,
    3: `<i class="fa-solid fa-face-grin-beam fa-xl"></i>`,
    4: `<i class="fa-solid fa-utensils fa-xl"></i>`,
    5: `<i class="fa-solid fa-pen fa-xl"></i>`
  }

  Expense
    .find()
    .lean()
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

app.get('/new', (req, res) => {
  res.render('new')
})

app.post('/new', (req, res) => {
  const expenseInfo = req.body
  Expense
    .create(expenseInfo)
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

app.get('/:id/edit', (req, res) => {
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

app.put('/:id/edit', (req, res) => {
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

app.delete('/:id', (req, res) => {
  const _id = req.params.id
  Expense
    .findOneAndDelete({ _id })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

app.listen(PORT, () => {
  console.log(`Express is listening on http://localhost:${PORT}`)
})