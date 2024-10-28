import express from "express";
import {
  addMenuItem,
  getAllMenuItems,
  updateMenuItem,
  deleteMenuItem,
} from "../controllers/menuItemController";

const router = express.Router();

router.post("/add", addMenuItem);
router.get("/all", getAllMenuItems);
router.put("/update/:id", updateMenuItem);
router.delete("/delete/:id", deleteMenuItem);

export default router;
