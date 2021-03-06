const { Router } = require('express')
const { addProduct, allProduct, findById, updateProduct, deleteProduct } = require('../controllers/product')

const { Authorization } = require('../middleware/authorization')

const router = Router()

router.post('/', Authorization, addProduct)
router.get('/', allProduct)
router.get('/:id', findById)
router.patch('/', Authorization, updateProduct)
router.delete('/:id', Authorization, deleteProduct)

module.exports = router