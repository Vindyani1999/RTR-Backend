// services/tableService.ts
import TableModel, { Table, Table as TableType } from "../models/Table";

// Fetch all tables
export const getAllTables = async () => {
  return await TableModel.find();
};

// Create or add a new table
export const addTable = async (tableData: Partial<TableType>) => {
  const table = new TableModel(tableData);
  return await table.save();
};

// Update table data
const updateTable = async (
  tableNumber: number,
  updatedDetails: Partial<Table>
): Promise<Table | null> => {
  try {
    const updatedTable = await TableModel.findOneAndUpdate(
      { tableNumber },
      updatedDetails,
      { new: true, useFindAndModify: false }
    );
    return updatedTable;
  } catch (error) {
    console.error("Error updating table:", error);
    throw new Error("Error updating table");
  }
};

export { updateTable };
