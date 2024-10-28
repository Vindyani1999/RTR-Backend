import express from "express";
import {
  addMenuItem,
  getAllMenuItems,
} from "../controllers/menuItemController";

const router = express.Router();

router.post("/add", addMenuItem);
router.get("/all", getAllMenuItems);

export default router;
