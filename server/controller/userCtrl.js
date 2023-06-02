const User = require("../models/userModel");
const Cart = require("../models/cartModel");
const Product = require("../models/productModel")
const Coupon = require("../models/couponModel")
const Order = require("../models/orderModel");
const uniqid = require("uniqid")
const asyncHandler = require("express-async-handler");
const { generateToken } = require("../config/jwtToken");
const validateMongodbId = require("../utils/validateMongodbId");
const { generateRefreshToken } = require("../config/refreshToken");
const jwt = require("jsonwebtoken");
const sendEmail = require("./emailCtrl");
const crypto = require("crypto");
const productModel = require("../models/productModel");


const createUser = asyncHandler(async (req, res) => {
    const email = req.body.email;
    const findUser = await User.findOne({ email: email });
    if (!findUser) {
        // tạo mới người dùng

        const newUser = await User.create(req.body);
        res.json(newUser);
    } else {
        throw new Error("User Already Exist");
    };
});

const loginUserCtrl = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const findUser = await User.findOne({ email });

    if (findUser && (await findUser.isPasswordMatched(password))) {
        const refreshToken = await generateRefreshToken(findUser?._id);
        const updateToken = await User.findByIdAndUpdate(
            findUser.id,
            {
                refreshToken: refreshToken,
            },
            {
                new: true,
            }
        );
        res.cookie("refreshToken", refreshToken,
            {
                httpOnly: true,
                maxAge: 72 * 60 * 60 * 1000,
            })
        res.json({
            _id: findUser?._id,
            firstname: findUser?.firstname,
            lastname: findUser?.lastname,
            email: findUser?.email,
            mobile: findUser?.mobile,
            token: generateToken(findUser?._id),
        });
    } else {
        throw new Error("Invalid Credentials");
    }
});


// login admin

const loginAdminCtrl = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const findAdmin = await User.findOne({ email });
    if (findAdmin.role !== 'admin') throw new Error("Not Authorised")
    if (findAdmin && (await findAdmin.isPasswordMatched(password))) {
        const refreshToken = await generateRefreshToken(findAdmin?._id);
        const updateToken = await User.findByIdAndUpdate(
            findAdmin.id,
            {
                refreshToken: refreshToken,
            },
            {
                new: true,
            }
        );
        res.cookie("refreshToken", refreshToken,
            {
                httpOnly: true,
                maxAge: 72 * 60 * 60 * 1000,
            })
        res.json({
            _id: findAdmin?._id,
            firstname: findAdmin?.firstname,
            lastname: findAdmin?.lastname,
            email: findAdmin?.email,
            mobile: findAdmin?.mobile,
            token: generateToken(findAdmin?._id),
        });
    } else {
        throw new Error("Invalid Credentials");
    }
});

// làm mới token | handler refresh token

const handlerRefreshToken = asyncHandler(async (req, res) => {
    const cookie = req.cookies;

    if (!cookie?.refreshToken) throw new Error("No refresh token");

    const refreshToken = cookie.refreshToken;
    const user = await User.findOne({ refreshToken });

    if (!user) throw new Error("No refresh token parser in database or Not!!")
    jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
        if (err || user.id !== decoded.id) throw new Error("There is something Wrong refresh token");

        const accessToken = generateRefreshToken(user?.id);
        res.json({ accessToken })
    })

})


// user logout

const logout = asyncHandler(async (req, res) => {

    const cookie = req.cookies;

    if (!cookie?.refreshToken) throw new Error("No refresh token");

    const refreshToken = cookie.refreshToken;
    const user = await User.findOne({ refreshToken });
    if (!user) {
        res.clearCookie("refreshToken",
            {
                httpOnly: true,
                secure: true,
            });
        res.sendStatus(204);
    };
    await User.findOneAndUpdate(refreshToken,
        {
            refreshToken: "",
        });
    res.clearCookie("refreshToken",
        {
            httpOnly: true,
            secure: true,
        });
    res.sendStatus(204);
})

// update user 

const updatedUser = asyncHandler(async (req, res) => {
    // console.log(req.user);/
    const { _id } = req.user;
    validateMongodbId(_id);

    try {
        const updateUser = await User.findByIdAndUpdate(
            _id,
            {
                firstname: req?.body?.firstname,
                lastname: req?.body?.lastname,
                email: req?.body?.email,
                mobile: req?.body?.mobile,
            },
            {
                new: true,
            });
        res.json(updateUser);
    } catch (error) {
        throw new Error(error)
    }
});

// update address
const updateAddress = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    validateMongodbId(_id);

    try {
        const updateUser = await User.findByIdAndUpdate(
            _id,
            {
                address: req?.body?.address,

            },
            {
                new: true,
            });
        res.json(updateUser);
    } catch (error) {
        throw new Error(error)
    }
})

// lấy tất cả người dùng

const getAllUser = asyncHandler(async (req, res) => {
    try {
        const getUsers = await User.find();
        res.json(getUsers);
    } catch (error) {
        throw new Error(error)
    }
});


// lấy user bằng id 

const getAUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongodbId(id);
    try {
        const getAUser = await User.findById(id);
        res.json({
            getAUser,
        });
    } catch (error) {
        throw new Error(error);
    }
})

// delete user by id 

const deleteAUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongodbId(id);
    try {
        const deleteAUser = await User.findByIdAndDelete(id);
        res.json({
            deleteAUser,
        });
    } catch (error) {
        throw new Error(error);
    }
});

const blockUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongodbId(id);
    try {
        const block = await User.findByIdAndUpdate(
            id,
            {
                isBlocked: true,
            },
            {
                new: true,
            }
        );
        res.json(block)
    } catch (error) {
        throw new Error(error)
    }
});
const unblockUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongodbId(id);
    try {
        const unblock = await User.findByIdAndUpdate(
            id,
            {
                isBlocked: false,
            },
            {
                new: false,
            }
        );
        res.json(unblock)
    } catch (error) {
        throw new Error(error)
    }
});


const updatePassword = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { password } = req.body;
    validateMongodbId(_id);
    const user = await User.findById(_id);
    if (password) {
        user.password = password;
        const updatePassword = await user.save();
        res.json(updatePassword)
    } else {
        res.json(user);
    }
});

const forgotPasswordToken = asyncHandler(async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) throw new Error("User not found with this email");
    try {
        const token = await user.createPasswordResetToken();
        await user.save();
        const resetURL = `Book Shop send your reset password.<a style="color:red;" href='https://localhost:8686/api/user/reset-password/${token}'>Click Reset Password</a>`;
        const data = {
            to: email,
            text: "Hello!!",
            subject: "Forgot password",
            htm: resetURL,
        };
        sendEmail(data);
        res.json(token)

    } catch (error) {
        throw new Error(error)
    }
});

const resetPassword = asyncHandler(async (req, res) => {
    const { password } = req.body;
    const { token } = req.params;
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    const user = await User.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: { $gt: Date.now() },
    });
    if (!user) throw new Error("Token expired, please try again.");
    user.password = password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();
    res.json(user)
});


const getWishlist = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    validateMongodbId(_id);
    try {
        const findUser = await User.findById(_id).populate("wishlist")
        res.json(findUser)
    } catch (error) {
        throw new Error(error)
    }
});

const userCart = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { cart } = req.body;
    validateMongodbId(_id);



    try {

        const products = [];
        const user = await User.findById(_id)
        //check neu user co product trong cart
        const alreadyExistCart = await Cart.findOne({ orderby: user._id });
        if (alreadyExistCart) {
            alreadyExistCart.remove();
        }
        for (let i = 0; i < cart.length; i++) {
            let object = {};
            object.product = cart[i]._id;
            object.count = cart[i].count;
            object.color = cart[i].color;
            let getPrice = await Product.findById(cart[i]._id).select("price").exec();
            object.price = getPrice.price;
            products.push(object);
        }
        let cartTotal = 0;
        for (let i = 0; i < products.length; i++) {
            cartTotal = cartTotal + products[i].price * products[i].count;

        }
        console.log(products, cartTotal);
        const newCart = await new Cart({
            products,
            cartTotal,
            orderby: user?._id
        }).save();
        res.json(newCart)
    } catch (error) {
        throw new Error(error);
    }
});

const getUserCart = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    validateMongodbId(_id);

    try {
        const cart = await Cart.findOne({ orderby: _id }).populate("products.product");
        res.json(cart)
    } catch (error) {
        throw new Error(error);
    }
});
const emptyCart = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    validateMongodbId(_id);

    try {
        const user = await User.findOne({ _id })
        const cart = await Cart.findOneAndRemove({ orderby: user._id })
        res.json(cart);
    } catch (error) {
        throw new Error(error);
    }
});

const applyCoupon = asyncHandler(async (req, res) => {
    const { coupon } = req.body;
    const { _id } = req.user;
    try {
        const validCoupon = await Coupon.findOne({ name: coupon });
        if (validCoupon === null) {
            throw new Error("Invalid Coupon");

        }
        const user = await User.findOne({ _id });
        let { cartTotal } = await Cart.findOne({ orderby: user._id }).populate("products.product");
        let totalAfterDiscount = (cartTotal - (cartTotal * validCoupon.discount) / 100).toFixed(2);
        await Cart.findOneAndUpdate(
            {
                orderby: user._id,
            },
            {
                totalAfterDiscount
            },
            { new: true }
        );
        res.json(totalAfterDiscount)
    } catch (error) {
        throw new Error(error)
    }
});

const creatOrder = asyncHandler(async (req, res) => {
    const { COD, couponApplied } = req.body;
    const { _id } = req.user;
    validateMongodbId(_id);
    try {
        if (!COD) throw new Error("Create order failed");
        const user = await User.findById(_id);
        let userCart = await Cart.findOne({ orderby: user._id });
        let finalAmout = 0;
        if (couponApplied && userCart.totalAfterDiscount) {
            finalAmout = userCart.totalAfterDiscount;
        } else {
            finalAmout = userCart.cartTotal;
        };
        let newOrder = await new Order({
            products: userCart.products,
            paymentIntent: {
                id: uniqid(),
                method: "COD",
                amount: finalAmout,
                status: "Cash on delivery",
                created: Date.now(),
                currency: "usd",
            },
            orderby: user._id,
            orderStatus: "Cash on delivery",
        }).save();
        let update = userCart.products.map((item) => {
            return {
                updateOne: {
                    filter: { _id: item.product._id },
                    update: { $inc: { quantity: -item.count, sold: +item.count } }
                },
            };
        });
        const updated = await Product.bulkWrite(update, {});
        res.json({ message: "successs" })
    } catch (error) {
        throw new Error(error)
    }
});

const getOrder = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    validateMongodbId(_id);
    try {
        const userorder = await Order.findOne({ orderby: _id }).populate("products.product").populate("orderby");
        res.json(userorder)
    } catch (error) {
        throw new Error(error);
    }
});
const getAllOrders = asyncHandler(async (req, res) => {
    try {
        const userAllorder = await Order.find().populate("products.product").populate("orderby");
        res.json(userAllorder)
    } catch (error) {
        throw new Error(error);
    }
});

const updateStatusOrder = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongodbId(id)
    const { status } = req.body;
    try {
        const updateOrderStatus = await Order.findByIdAndUpdate(id,
            {
                orderStatus: status,
                paymentIntent: {
                    status: status,
                }
            }, { new: true });
        res.json(updateOrderStatus)
    } catch (error) {
        throw new Error(error);
    }
});



module.exports = { createUser, loginUserCtrl, getAllUser, getAUser, deleteAUser, updatedUser, blockUser, unblockUser, handlerRefreshToken, logout, updatePassword, forgotPasswordToken, resetPassword, loginAdminCtrl, getWishlist, updateAddress, userCart, getUserCart, emptyCart, applyCoupon, creatOrder, getOrder, updateStatusOrder, getAllOrders };