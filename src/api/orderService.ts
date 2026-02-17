import api from "./axios";

export const getUserOrders = async () => {
  const response = await api.get("/orders/user");
  return response.data;
};

export const getOrderById = async (orderId: string) => {
  const response = await api.get(`/orders/${orderId}`);
  return response.data;
};
