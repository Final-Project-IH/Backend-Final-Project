const router = require("express").Router();
const authController = require("../controllers/auth.controller");
const usersController = require("../controllers/users.controller");
const productController = require("../controllers/product.controller");
const auctionController = require("../controllers/auction.controller");
const bidController = require("../controllers/bid.controller");
const categoryController = require("../controllers/category.controller");
const upload = require("../config/storage.config");

const authMiddleware = require("../middlewares/auth.middleware");

/* Auth */

router.post("/login", authController.login);

/* Users */

router.post("/register", usersController.create);
router.get("/users", usersController.list);
router.get(
  "/users/me",
  authMiddleware.isAuthenticated,
  usersController.getCurrentUser
);
router.get("/users/:id", usersController.getUser);
router.post(
  "/users/me",
  authMiddleware.isAuthenticated,
  usersController.editProfile
);

/* Product */

router.post(
  "/new-product",
  authMiddleware.isAuthenticated,
  upload.any(),
  productController.create
);

router.get(
  "/products/me",
  authMiddleware.isAuthenticated,
  productController.userlist
);

router.post("/products/search", productController.searchBar); //ES POSIBLE QUE ESTO TENGA QUE CAMBIAR EN UN FUTURO POR AUCTION

/* Categories */

router.get("/products/category", categoryController.categoryList);
router.get("/products/category/:id", auctionController.filterCategory); //para traer los productos de determinada categoría

/* Auction */

router.get("/products", auctionController.list);

router.get("/products/:id", auctionController.detail);

/* Bid */

router.post(
  "/products/:id/createBid",
  authMiddleware.isAuthenticated,
  bidController.create
);

router.get("/products/:id/bidList", bidController.list);

/* Favorites */

router.post(
  "/products/:id/favorites",
  authMiddleware.isAuthenticated,
  productController.favorites
);
router.get(
  "/users/me/favorites",
  authMiddleware.isAuthenticated,
  productController.listFavorites
);

module.exports = router;
