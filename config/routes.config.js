const router = require('express').Router();
const authController = require('../controllers/auth.controller');
const usersController = require('../controllers/users.controller');
const productController = require("../controllers/product.controller")

const authMiddleware = require('../middlewares/auth.middleware');

/* Auth */

router.post('/login', authController.login);

/* Users */

router.post('/users', usersController.create);
router.get('/users', usersController.list);
router.get('/users/me', authMiddleware.isAuthenticated, usersController.getCurrentUser);
router.get('/users/:id', usersController.getUser);


/* Product */

router.post('/new-product', authMiddleware.isAuthenticated, productController.create); 

router.get("/products", productController.list)

module.exports = router;