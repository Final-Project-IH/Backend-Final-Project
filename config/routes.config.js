const router = require("express").Router();
const authController = require("../controllers/auth.controller");
const usersController = require("../controllers/users.controller");
const productController = require("../controllers/product.controller");
const auctionController = require("../controllers/auction.controller");
const bidController = require("../controllers/bid.controller");
const categoryController = require("../controllers/category.controller");
const notificationController = require("../controllers/notification.controller");
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
  "/users/me/editprofile",
  authMiddleware.isAuthenticated,
  upload.any(),
  usersController.editProfile
);

router.get(
  "/users/me/products",
  authMiddleware.isAuthenticated,
  auctionController.userlist
);

router.get("/users/me/bids",
authMiddleware.isAuthenticated,
bidController.userBidList
),

router.get("/users/me/winned", authMiddleware.isAuthenticated,
auctionController.winnedAuct )


/* Product */

router.post(
  "/new-product",
  authMiddleware.isAuthenticated,
  upload.any(),
  productController.create
);

router.get("/products/search", productController.searchBar); //ES POSIBLE QUE ESTO TENGA QUE CAMBIAR EN UN FUTURO POR AUCTION

/* Categories */

router.get("/products/category", categoryController.categoryList);
router.get("/products/category/:id/fashion", auctionController.filterCategory); //para traer los productos de determinada categoría
router.get(
  "/products/category/:id/fashion/clothes",
  auctionController.filterClothes
);
router.get(
  "/products/category/:id/fashion/accesories",
  auctionController.filterAccesories
);
router.get(
  "/products/category/:id/fashion/shoes",
  auctionController.filterShoes
);
router.get("/products/category/:id/home", auctionController.filterCategory);
router.get(
  "/products/category/:id/home/decoration",
  auctionController.filterDecoration
);
router.get(
  "/products/category/:id/home/furniture",
  auctionController.filterFurniture
);
router.get(
  "/products/category/:id/home/kitchenware",
  auctionController.filterKitchenware
);
router.get("/products/category/:id/art", auctionController.filterCategory);
router.get("/products/category/:id/art/prints", auctionController.filterPrints);
router.get(
  "/products/category/:id/art/photography",
  auctionController.filterPhotography
);
router.get("/products/category/:id/art/frames", auctionController.filterFrames);
router.get("/products/category/:id/art/books", auctionController.filterBooks);
router.get("/products/category/:id/art/music", auctionController.filterMusic);
router.get("/products/category/:id/antiques", auctionController.filterCategory);
router.get(
  "/products/category/:id/antiques/home-decoration",
  auctionController.filterAntiqueHome
);
router.get(
  "/products/category/:id/antiques/art-frames",
  auctionController.filterAntiqueArt
);
router.get(
  "/products/category/:id/antiques/fashion-accesories",
  auctionController.filterAntiqueFashion
);

/* Auction */

router.get("/products", auctionController.list);

router.get("/products/:id", auctionController.detail);

router.get("/products/:id/winned", auctionController.detail);

router.post("/products/:id/changeStatus", auctionController.changeStatus);

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
  usersController.getMyFavs
);

/* Notifications */

router.get(
  "/users/me/notifications",
  authMiddleware.isAuthenticated,
  notificationController.listNotifications
);

router.patch(
  "/users/me/notifications",
  authMiddleware.isAuthenticated,
  notificationController.markManyAsRead
);

module.exports = router;
