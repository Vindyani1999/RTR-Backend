import express from "express";
import {
  addMenuItem,
  getAllMenuItems,
  updateMenuItem,
} from "../controllers/menuItemController";

const router = express.Router();

router.post("/add", addMenuItem);
router.get("/all", getAllMenuItems);
router.put("/update/:id", updateMenuItem);

export default router;
