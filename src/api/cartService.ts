import api from "./axios";

export interface CartItem {
  productId: string;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export const addToCart = async (item: CartItem) => {
  const response = await api.post("/carts/items", item);
  return response.data;
};

export const getCart = async () => {
  const response = await api.get("/carts");
  return response.data;
};

export const updateCartItem = async (productId: string, quantity: number) => {
  const response = await api.put(`/carts/update`, { productId, quantity });
  return response.data;
};

export const removeFromCart = async (productId: string) => {
  const response = await api.delete(`/carts/remove`, { data: { productId } });
  return response.data;
};