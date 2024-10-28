// controllers/tableController.ts
import { Request, Response } from "express";
import * as tableService from "../services/tableService";
import { updateTable } from "../services/tableService";

// Get all tables
export const getTables = async (req: Request, res: Response) => {
  try {
    const tables = await tableService.getAllTables();
    res.status(200).json({ success: true, data: tables });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error fetching tables", error });
  }
};

// Add a new table
export const createTable = async (req: Request, res: Response) => {
  try {
    const table = await tableService.addTable(req.body);
    res.status(201).json({ success: true, data: table });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error adding table", error });
  }
};

// Update a table
// controllers/tableController.ts

const updateTableController = async (
  req: Request,
  res: Response
): Promise<void> => {
  // Parse tableNumber from URL parameters
  const tableNumber = parseInt(req.params.tableNumber, 10);

  // Validate tableNumber
  if (isNaN(tableNumber)) {
    res.status(400).json({ message: "Invalid table number" });
    return;
  }

  const updatedDetails = req.body;

  try {
    const updatedTable = await updateTable(tableNumber, updatedDetails);

    if (updatedTable) {
      res.status(200).json({
        message: "Table updated successfully",
        table: updatedTable,
      });
    } else {
      res.status(404).json({ message: "Table not found" });
    }
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export { updateTableController };
