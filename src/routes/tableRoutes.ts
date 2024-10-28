// routes/tableRoutes.ts
import express from "express";
import {
  getTables,
  createTable,
  updateTableController,
} from "../controllers/tableControllers";

const router = express.Router();

// Routes for managing tables
router.get("/all", getTables); // View all tables
router.post("/add", createTable); // Add a new table
router.put("/update/:tableNumber", updateTableController); // Update an existing table

export default router;
