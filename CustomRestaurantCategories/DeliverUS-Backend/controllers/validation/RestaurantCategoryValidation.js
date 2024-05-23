const { check } = require('express-validator')
const { RestaurantCategory } = require('../../models')

const checkIsNewName = async (value, { req }) => {
  try {
    const restaurantCategories = await RestaurantCategory.findAll()
    for (const category of restaurantCategories) {
      if (value === category.name) return Promise.reject(new Error('This category already exists'))
    }
    return Promise.resolve()
  } catch (err) {
    return Promise.reject(err)
  }
}
module.exports = {
  create: [
    check('name').exists().custom(checkIsNewName)
  ]
}
