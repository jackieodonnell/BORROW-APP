const router = require("express").Router();
const { updateUserControl } = require("../controllers/update_user");

const updateUserRoute = router.put("/api/v1/:user/update", updateUserControl);

module.exports = updateUserRoute;