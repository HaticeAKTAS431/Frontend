import axios from "axios";

const deleteProduct = async (productId) => {
  try {
    await axios.delete(`http://192.168.1.11:3000/api/${productId}`);
  } catch (error) {
    console.error("Delete Product Error:", error);
    throw error;
  }
};

export { deleteProduct };
