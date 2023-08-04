import {sample_foods, sample_tags} from "../data";
import {Router} from "express";
import asyncHandler from "express-async-handler";
import {FoodModel} from "../models/food.model";

const router = Router();

router.get("/seed", asyncHandler(
    async (req, res) => {
        const foodCount = await FoodModel.countDocuments();
        if (foodCount > 0) {
            res.send("Seed is already done");
            return;
        }
        await FoodModel.create(sample_foods);
        res.send("Seed is done");
    }
));

router.get("/", asyncHandler(
    async (req, res) => {
        const foods = await FoodModel.find();
        res.send(foods);
    }
));

router.get("/search/:searchTerm", asyncHandler(
    async (req, res) => {
        const searchRegex = new RegExp(req.params.searchTerm, 'i');
        const foods = await FoodModel.find({
            name: {$regex: searchRegex}
        })
        res.send(foods);
    }
))

// sample test method
router.get("/search-item/:searchTerm", (req, res) => {
    const searchTerm = req.params.searchTerm;

    const foods = sample_foods.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    res.send(foods);
});


router.get("/tag/:tagName", (req, res) => {
    const tagName = req.params.tagName;
    const foods = sample_foods.filter((food) => food.tags?.includes(tagName));
    res.send(foods);
});

router.get("/:foodId", (req, res) => {
    const foodId = req.params.foodId;
    const foods = sample_foods.filter((food) => food.id == foodId);
    res.send(foods);
});

export default router;