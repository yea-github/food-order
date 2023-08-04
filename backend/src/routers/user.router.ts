import {sample_users} from "../data";
import jwt from "jsonwebtoken";
import {Router} from "express";
import asyncHandler from "express-async-handler";
import {UserModel} from "../models/user.model";

const router = Router();

router.get("/seed", asyncHandler(
    async (req, res) => {
        const userCount = await UserModel.countDocuments();
        if (userCount > 0) {
            res.send("Seed is already done");
            return;
        }
        await UserModel.create(sample_users);
        res.send("Seed is done");
    }
));
router.post("/login", (req, res) => {
    // Destructuring assignment
    const {email, password} = req.body;
    const user = sample_users.find(
        (retUser) => retUser.email === email && retUser.password === password
    );

    if (user) {
        res.send(generateTokenResponse(user));
    } else {
        res.status(400).send("User name or password is incorrect");
    }
});

const generateTokenResponse = (user: any) => {
    const tokenStr = jwt.sign(
        {user: user.email, isAdmin: user.isAdmin},
        "SomeRandomText",
        {expiresIn: "30d"}
    );

    user.token = tokenStr;
    return user;
};

export default router;