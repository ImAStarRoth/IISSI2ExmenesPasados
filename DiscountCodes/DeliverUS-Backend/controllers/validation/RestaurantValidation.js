const { check } = require('express-validator')
const { checkFileIsImage, checkFileMaxSize } = require('./FileValidationHelper')
const models = require('../../models')
const Restaurant = models.Restaurant
const maxFileSize = 2000000 // around 2Mb

const checkDiscountCodeIsNotRepeated = async (value, { req }) => {
  try {
    const restaurants = await Restaurant.findAll({ where: { userId: req.user.id } })
    for (const restaurant of restaurants) {
      if (value === restaurant.discountCode) return Promise.reject(new Error('Discount code already exists'))
    }
    return Promise.resolve()
  } catch (err) {
    return Promise.reject(new Error(err))
  }
}

module.exports = {
  create: [
    check('name').exists().isString().isLength({ min: 1, max: 255 }).trim(),
    check('description').optional({ nullable: true, checkFalsy: true }).isString().trim(),
    check('address').exists().isString().isLength({ min: 1, max: 255 }).trim(),
    check('postalCode').exists().isString().isLength({ min: 1, max: 255 }),
    check('url').optional({ nullable: true, checkFalsy: true }).isString().isURL().trim(),
    check('shippingCosts').exists().isFloat({ min: 0 }).toFloat(),
    check('email').optional({ nullable: true, checkFalsy: true }).isString().isEmail().trim(),
    check('phone').optional({ nullable: true, checkFalsy: true }).isString().isLength({ min: 1, max: 255 }).trim(),
    check('restaurantCategoryId').exists({ checkNull: true }).isInt({ min: 1 }).toInt(),
    check('userId').not().exists(),
    check('discountCode').exists().isString().isLength({ min: 1, max: 10 }),
    check('discount').exists().isFloat({ min: 1, max: 99 }),
    check('discountCode').custom(checkDiscountCodeIsNotRepeated),
    check('heroImage').custom((value, { req }) => {
      return checkFileIsImage(req, 'heroImage')
    }).withMessage('Please upload an image with format (jpeg, png).'),
    check('heroImage').custom((value, { req }) => {
      return checkFileMaxSize(req, 'heroImage', maxFileSize)
    }).withMessage('Maximum file size of ' + maxFileSize / 1000000 + 'MB'),
    check('logo').custom((value, { req }) => {
      return checkFileIsImage(req, 'logo')
    }).withMessage('Please upload an image with format (jpeg, png).'),
    check('logo').custom((value, { req }) => {
      return checkFileMaxSize(req, 'logo', maxFileSize)
    }).withMessage('Maximum file size of ' + maxFileSize / 1000000 + 'MB')
  ],
  update: [
    check('name').exists().isString().isLength({ min: 1, max: 255 }).trim(),
    check('description').optional({ nullable: true, checkFalsy: true }).isString().trim(),
    check('address').exists().isString().isLength({ min: 1, max: 255 }).trim(),
    check('postalCode').exists().isString().isLength({ min: 1, max: 255 }),
    check('url').optional({ nullable: true, checkFalsy: true }).isString().isURL().trim(),
    check('shippingCosts').exists().isFloat({ min: 0 }).toFloat(),
    check('email').optional({ nullable: true, checkFalsy: true }).isString().isEmail().trim(),
    check('phone').optional({ nullable: true, checkFalsy: true }).isString().isLength({ min: 1, max: 255 }).trim(),
    check('restaurantCategoryId').exists({ checkNull: true }).isInt({ min: 1 }).toInt(),
    check('userId').not().exists(),
    check('discountCode').exists().isString().isLength({ min: 1, max: 10 }),
    check('discount').exists().isFloat({ min: 1, max: 99 }),
    check('discountCode').custom(checkDiscountCodeIsNotRepeated),
    check('heroImage').custom((value, { req }) => {
      return checkFileIsImage(req, 'heroImage')
    }).withMessage('Please upload an image with format (jpeg, png).'),
    check('heroImage').custom((value, { req }) => {
      return checkFileMaxSize(req, 'heroImage', maxFileSize)
    }).withMessage('Maximum file size of ' + maxFileSize / 1000000 + 'MB'),
    check('logo').custom((value, { req }) => {
      return checkFileIsImage(req, 'logo')
    }).withMessage('Please upload an image with format (jpeg, png).'),
    check('logo').custom((value, { req }) => {
      return checkFileMaxSize(req, 'logo', maxFileSize)
    }).withMessage('Maximum file size of ' + maxFileSize / 1000000 + 'MB')
  ]
}
