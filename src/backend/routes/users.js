const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User");

router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({msg: "Please enter all fields"});
    }

    if (password.length < 6) {
        return res.status(400).json({ msg: "Password should be atleast 6 characters long."});
    }


    await User.findOne({email: email}).then((user) => {
        if (user) return res.status(400).json({ msg: "User already exists" });

        const newUser = new User({
            name,
            email,
            password
        });

        bcrypt.genSalt(12, (err, salt) =>
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) throw err;

                newUser.password = hash;

                newUser
                    .save()
                    .then(
                        res.json({
                            msg: "Successfully Registered"
                        })
                    )
                    .catch((err) => console.log(err));
            })
        );
});
});

router.post("/login", (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ msg: "Please enter all fields" });
    }

    User.findOne({email}).then((user) => {
        if (!user) return res.status(400).json({ msg: "User does not exist"});

        bcrypt.compare(password, user.password).then((isMatch) => {
            if (!isMatch) return res.status(400).json({ msg: "Invalid credentials "});

            const sessUser = { id: user.id, name: user.name, email: user.email };
            req.session.user = sessUser;

            res.json({ msg: "Logged In Successfully", sessUser });
        });
    });
});

router.delete("/logout", (req, res) => {
    req.session.destroy((err) => {

        if (err) throw err;
        res.clearCookie("session-id");
        res.send("Logged out successfully");
    })
});

router.get("/authchecker", (req, res) => {
    const sessUser = req.session.user;
    if(sessUser) {
        return res.json({msg: "Authenticated Successfully", sessUser});
    }
    else {
        return res.status(401).json({msg: "Unauthorized"});
    }
});

module.exports = router;