const express = require("express");
const { createUser, loginUserCtrl, getAllUser, getAUser, deleteAUser, updatedUser, blockUser, unblockUser, handlerRefreshToken, logout, updatePassword, forgotPasswordToken, resetPassword, loginAdminCtrl, getWishlist, updateAddress, userCart, getUserCart, emptyCart, applyCoupon, creatOrder, getOrder, updateStatusOrder, getAllOrders } = require("../controller/userCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware")
const router = express.Router();

router.post("/register", createUser);
router.post("/forgot-password", forgotPasswordToken);
router.put("/reset-password/:token", resetPassword);
router.put("/password", authMiddleware, updatePassword)
router.post("/login", loginUserCtrl);
router.post("/login-admin", loginAdminCtrl);
router.post("/cart", authMiddleware, userCart);
router.post("/cart/applycoupon", authMiddleware, applyCoupon);
router.post("/cart/cash-order", authMiddleware, creatOrder);
router.get("/all-users", getAllUser);
router.get("/get-orders", authMiddleware, getOrder);
router.get("/getAllOrders", authMiddleware, isAdmin, getAllOrders);
router.get("/refresh", handlerRefreshToken);
router.get("/wishlist", authMiddleware, getWishlist);
router.get("/cart", authMiddleware, getUserCart);
router.get("/logout", logout);
router.get("/:id", authMiddleware, isAdmin, getAUser);
router.delete("/empty-cart", authMiddleware, emptyCart);
router.delete("/:id", deleteAUser);
router.put("/order/update-status/:id", authMiddleware, isAdmin, updateStatusOrder);
router.put("/edit-user", authMiddleware, updatedUser);
router.put("/update-address", authMiddleware, updateAddress);
router.put("/block-user/:id", authMiddleware, isAdmin, blockUser);
router.put("/unblock-user/:id", authMiddleware, isAdmin, unblockUser);

module.exports = router;