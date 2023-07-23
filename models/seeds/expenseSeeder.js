const Expense = require('../expense')
const Category = require('../category')
const db = require('../../config/mongoose')

const SEED_EXPENSE = [
  { 
    name: 'lunch',
    date: Date.now(),
    amount: 100,
    categoryId: 4
  },
  {
    name: 'MRT',
    date: Date.now(),
    amount: 20,
    categoryId: 2
  },
  {
    name: 'Netflix',
    date: Date.now(),
    amount: 800,
    categoryId: 3
  }
]

const SEED_CATEGORY = [
  {
    id: 1,
    name: '家居物業'
  },
  {
    id: 2,
    name: '交通出行'
  },
  {
    id: 3,
    name: '休閒娛樂'
  },
  {
    id: 4,
    name: '餐飲食品'
  },
  {
    id: 5,
    name: '其他'
  },
]

db.once('open', () => {
  Promise.all(Array.from(SEED_CATEGORY, seedCategory => {
    return Category.create(seedCategory)
  }))
  .then(() => {
    return Promise.all(Array.from(SEED_EXPENSE, seedExpense => {
      return Expense.create(seedExpense)
    }))
  })
  .then(() => {
    console.log('done.')
    process.exit()
  })
  .catch(err => console.log(err))
})