const Expense = require('../expense')
const db = require('../../config/mongoose')

const SEED_EXPENSE = [
  { 
    name: 'lunch',
    date: Date.now(),
    amount: 100
  },
  {
    name: 'dinner',
    date: Date.now(),
    amount: 150
  }
]

db.once('open', () => {
  return Promise.all(Array.from(SEED_EXPENSE, seedExpense => {
    return Expense.create(seedExpense)
  }))
  .then(() => {
    console.log('done.')
    process.exit()
  })
})