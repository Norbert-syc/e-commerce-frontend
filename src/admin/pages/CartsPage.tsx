import { useState, useEffect } from "react";
import api from "../../api/axios";

interface Cart {
  _id: string;
  userId: string;
  items: Array<{
    productId: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  createdAt: string;
}

const CartsPage = () => {
  const [carts, setCarts] = useState<Cart[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCarts();
  }, []);

  const fetchCarts = async () => {
    setLoading(true);
    try {
      const response = await api.get("/carts");
      // Handle if response is a single cart object or array
      if (Array.isArray(response.data)) {
        setCarts(response.data);
      } else if (response.data && typeof response.data === 'object') {
        // If it's a single cart object, wrap it in an array
        setCarts([response.data]);
      } else {
        setCarts([]);
      }
    } catch (error) {
      console.error("Failed to fetch carts:", error);
      setCarts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this cart?')) return;
    
    try {
      await api.delete(`/carts/${id}`);
      fetchCarts();
      alert('Cart deleted!');
    } catch (error: any) {
      alert('Failed to delete cart: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div style={{ padding: "20px", background: "white", minHeight: "100vh" }}>
      <h1 style={{ color: "black" }}>Carts Management</h1>

      <h2 style={{ color: "black", marginTop: "30px" }}>All Carts</h2>
      {loading ? <p style={{ color: "black" }}>Loading...</p> : (
        <table style={{ width: "100%", borderCollapse: "collapse", background: "white" }}>
          <thead>
            <tr style={{ background: "white" }}>
              <th style={{ padding: "10px", border: "1px solid #ddd", color: "black" }}>User ID</th>
              <th style={{ padding: "10px", border: "1px solid #ddd", color: "black" }}>Items Count</th>
              <th style={{ padding: "10px", border: "1px solid #ddd", color: "black" }}>Total</th>
              <th style={{ padding: "10px", border: "1px solid #ddd", color: "black" }}>Created At</th>
              <th style={{ padding: "10px", border: "1px solid #ddd", color: "black" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {carts.map((cart) => {
              const calculatedTotal = cart.total || cart.items?.reduce((sum: number, item: any) => {
                return sum + (item.price * item.quantity);
              }, 0) || 0;
              
              return (
              <tr key={cart._id}>
                <td style={{ padding: "10px", border: "1px solid #ddd", color: "black" }}>{cart.userId}</td>
                <td style={{ padding: "10px", border: "1px solid #ddd", color: "black" }}>{cart.items?.length || 0}</td>
                <td style={{ padding: "10px", border: "1px solid #ddd", color: "black" }}>${calculatedTotal.toFixed(2)}</td>
                <td style={{ padding: "10px", border: "1px solid #ddd", color: "black" }}>
                  {new Date(cart.createdAt).toLocaleDateString()}
                </td>
                <td style={{ padding: "10px", border: "1px solid #ddd", color: "black" }}>
                  <button 
                    onClick={() => handleDelete(cart._id)}
                    style={{ padding: "5px 10px", background: "#ef4444", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CartsPage;
