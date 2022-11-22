const router = require("express").Router();
const { adminControl } = require("../controllers/admin");

const adminRoute = router.get("/api/v1/data/admin", adminControl);

module.exports = adminRoute;