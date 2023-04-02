const router = require("express").Router();
const authController = require("../controllers/auth.controller");
const usersController = require("../controllers/users.controller");
const productController = require("../controllers/product.controller");
const auctionController = require("../controllers/auction.controller");

const authMiddleware = require("../middlewares/auth.middleware");

/* Auth */

router.post("/login", authController.login);

/* Users */

router.post("/users", usersController.create);
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
  productController.create
);
router.get("/products", productController.list);
router.get(
  "/products/me",
  authMiddleware.isAuthenticated,
  productController.userlist
);
router.get("/products/:id", productController.detail);
router.post("/products/search", productController.searchBar);

/* Auction */

router.post(
  "/products/:id/create-auction",
  authMiddleware.isAuthenticated,
  auctionController.create
);

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
