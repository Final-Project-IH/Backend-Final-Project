const router = require("express").Router();
const authController = require("../controllers/auth.controller");
const usersController = require("../controllers/users.controller");
const productController = require("../controllers/product.controller");
const auctionController = require("../controllers/auction.controller");
const bidController = require("../controllers/bid.controller");

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
  productController.create
);
// router.get("/products", productController.list); ESTO YA NO SIRVE PORQUE NOS CONVIENE TRAERNOS LAS AUCTS

router.get(
  "/products/me",
  authMiddleware.isAuthenticated,
  productController.userlist
);
// router.get("/products/:id/:auctionId", productController.detail); ESTO YA NO SIRVE PORQUE NOS CONVIENE TRAERNOS LAS AUCTS
router.post("/products/search", productController.searchBar);

/* Auction */

// router.post(
//   "/products/:id/:auctionId",
//   authMiddleware.isAuthenticated,
//   bidController.create
// );



router.get("/products", auctionController.list);

router.get("/products/:id", auctionController.detail);

/* Bid */

router.post(
  "/products/:id/createBid",
  authMiddleware.isAuthenticated,
  bidController.create
);

router.get("/products/:id/bidList", bidController.list)
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
