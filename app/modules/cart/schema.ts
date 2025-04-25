import { z } from "zod";
import { ProductSchema } from "../product/schema";

export const CartItemSchema = z.object({
  id: z.string(),

  quantity: z.number(),

  productId: z.string(),
  product: ProductSchema,

  cartId: z.string(),

  createdAt: z.date(),
  updatedAt: z.date(),
});

export const CartSchema = z.object({
  id: z.string(),

  items: z.array(CartItemSchema),

  userId: z.string(),

  createdAt: z.date(),
  updatedAt: z.date(),
});

export const AddCartItemSchema = z.object({
  productId: z.string(),
  quantity: z.number().default(1),
});

export type Cart = z.infer<typeof CartSchema>;
export type CartItem = z.infer<typeof CartItemSchema>;
export type AddCartItem = z.infer<typeof AddCartItemSchema>;
