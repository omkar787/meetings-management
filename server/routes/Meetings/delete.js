const router = require("express").Router();

router.post("/", (req, res) => { });


router.delete("/", (req, res) => {
    console.log(req.user);
})
module.exports = router;
