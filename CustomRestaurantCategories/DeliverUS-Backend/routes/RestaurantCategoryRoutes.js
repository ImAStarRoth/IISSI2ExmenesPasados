'use strict'
const RestaurantCategoryController = require('../controllers/RestaurantCategoryController')
const RestaurantCategoryValidation = require('../controllers/validation/RestaurantCategoryValidation')

module.exports = (options) => {
  const app = options.app
  const middlewares = options.middlewares

  app.route('/restaurantCategories')
    .get(RestaurantCategoryController.indexRestaurantCategory)
    .post(
      RestaurantCategoryValidation.create,
      middlewares.handleValidation
    )
}
