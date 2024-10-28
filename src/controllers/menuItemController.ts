// controllers/menuController.ts
import { Request, Response } from "express";
import * as menuItemService from "../services/menuItemService";

export const addMenuItem = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { title, price, description, categories, image } = req.body;

    // Call the service to add the menu item
    const savedItem = await menuItemService.addMenuItem(
      title,
      price,
      description,
      categories,
      image
    );

    res.status(201).json({ success: true, data: savedItem });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error adding menu item", error });
  }
};

export const getAllMenuItems = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // Fetch all menu items using the service function
    const menuItems = await menuItemService.getAllMenuItems();

    res.status(200).json({ success: true, data: menuItems });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error fetching menu items", error });
  }
};

export const updateMenuItem = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Call the service function to update the menu item
    const updatedItem = await menuItemService.updateMenuItem(id, updateData);

    if (updatedItem) {
      res.status(200).json({ success: true, data: updatedItem });
    } else {
      res.status(404).json({ success: false, message: "Menu item not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error updating menu item", error });
  }
};

export const deleteMenuItem = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    // Call the service function to delete the menu item
    const deletedItem = await menuItemService.deleteMenuItem(id);

    if (deletedItem) {
      res
        .status(200)
        .json({ success: true, message: "Menu item deleted successfully" });
    } else {
      res.status(404).json({ success: false, message: "Menu item not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error deleting menu item", error });
  }
};
