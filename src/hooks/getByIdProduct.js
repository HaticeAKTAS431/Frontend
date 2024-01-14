import axios from "axios";

const getByIdProduct = async (productId) => {
  try {
    await axios.get(`http://192.168.1.11:3000/api/${productId}`);
  } catch (error) {
    console.error("Product not found:", error);
    throw error;
  }
};

export { getByIdProduct };
