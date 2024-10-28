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
