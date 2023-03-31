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

router.post('/users/new-product', productController.create); //Falta meterle el isAuth(creado para probar) y cambiar la ruta por me seguramente
router.post("/users/:id/update-product", productController.update) //lo mismo (esto no funka)
router.post("/users/:id/delete", productController.delete)

module.exports = router;