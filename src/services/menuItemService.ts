// services/menuItemService.ts
import MenuItem, { IMenuItem } from "../models/MenuItem";

export const getAllMenuItems = async (): Promise<IMenuItem[]> => {
  return await MenuItem.find();
};

export const updateMenuItem = async (
  id: string,
  updateData: Partial<IMenuItem>
): Promise<IMenuItem | null> => {
  return await MenuItem.findByIdAndUpdate(id, updateData, { new: true });
};

export const addMenuItem = async (
  title: string,
  price: number,
  description?: string,
  categories: string[] = [],
  image?: string
): Promise<IMenuItem> => {
  const newMenuItem = new MenuItem({
    title,
    price,
    description,
    categories,
    image,
  });

  return await newMenuItem.save();
};
