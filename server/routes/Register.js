const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator')
const bcrypt = require('bcrypt')
const User = require("../models/User")


const save = (name, email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            const salt = bcrypt.genSaltSync(5);
            const hash = bcrypt.hashSync(password.toString(), salt);
            let result = await User.create({
                name,
                email,
                password: hash
            })
            console.log(result);
            resolve(true)
        } catch (err) {
            console.log(err);
            reject(false)
        }
    });
}

router.get("/", (req, res) => {
    res.sendStatus(404)
})

router.post("/",
    body("name").isString().trim(),
    body("email").normalizeEmail().isEmail(),
    body("password").isLength({ min: 5 }),
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.json({ ok: false, error: errors.array() })
            } else {
                const { name, email, password } = req.body
                const create = await save(name, email, password)
                res.json({ ok: create })
            }
        } catch (err) {
            console.log(err);
            res.json({ ok: false, error: err })
        }
    }
)

module.exports = router