const router = require("express").Router();
const authController = require("../controllers/auth.controller");
const usersController = require("../controllers/users.controller");
const productController = require("../controllers/product.controller");
const auctionController = require("../controllers/auction.controller");
const bidController = require("../controllers/bid.controller");
const categoryController = require("../controllers/category.controller");

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

router.get(
  "/products/me",
  authMiddleware.isAuthenticated,
  productController.userlist
);

router.post("/products/search", productController.searchBar); //ES POSIBLE QUE ESTO TENGA QUE CAMBIAR EN UN FUTURO POR AUCTION

/* Categories */

router.get("/products/category", categoryController.categoryList);
router.get("/products/category/:id", auctionController.filterCategory); //para traer los productos de determinada categoría
router.get("/products/category/:id/clothes", auctionController.filterClothes)
router.get("/products/category/:id/accesories", auctionController.filterAccesories)
router.get("/products/category/:id/shoes", auctionController.filterShoes)
router.get("/products/category/:id/decoration", auctionController.filterDecoration)
router.get("/products/category/:id/furniture", auctionController.filterFurniture)
router.get("/products/category/:id/kitchenware", auctionController.filterKitchenware)
router.get("/products/category/:id/prints", auctionController.filterPrints)
router.get("/products/category/:id/photography", auctionController.filterPhotography)
router.get("/products/category/:id/frames", auctionController.filterFrames)
router.get("/products/category/:id/books", auctionController.filterBooks)
router.get("/products/category/:id/music", auctionController.filterMusic)
router.get("/products/category/:id/antique-home-decoration", auctionController.filterAntiqueHome)
router.get("/products/category/:id/antique-art-frames", auctionController.filterAntiqueArt)
router.get("/products/category/:id/antique-fashion-accesories", auctionController.filterAntiqueFashion)

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
