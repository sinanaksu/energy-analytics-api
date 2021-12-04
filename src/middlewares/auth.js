const jwt = require("jsonwebtoken");
const config = require("../utils/config");
const User = require("../models/user.model");

module.exports.verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send({ error: "INVALID_TOKEN" });
    }

    jwt.verify(token, config.SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send({ error: "INVALID_TOKEN" });
        }
        req.body.userId = decoded.id;
        next();
    });
};

module.exports.isAdmin = (req, res, next) => {
    User.findById(req.body.userId).exec((err, user) => {
        if (err) {
            res.status(500).send({ error: "NOT_ADMIN" });
            return;
        } else if (user.role == 0) {
            res.status(402).send({ error: "NOT_ADMIN" });
        } else {
            next();
        }
    });
};

