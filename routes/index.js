const express = require("express");
const userRoutes = require("./user");
const mealRoutes = require("./meal");
const dishRoutes = require("./dish")
const authenticateToken = require("./authMiddleware");

const router = express.Router();
router.use("/api", (req, res, next) => {
    if (!req.originalUrl.includes("/api/users")) {
        authenticateToken(req, res, next);
    } else {
        next();
    }
});
  

router.use("/api", userRoutes);
router.use("/api", mealRoutes);
router.use("/api", dishRoutes)
module.exports = router;