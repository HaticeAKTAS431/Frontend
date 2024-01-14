import axios from "axios";

const addProduct = async (productName) => {
  try {
    const response = await axios.post("http://192.168.1.11:3000/api/", {
      productName: productName,
    });

    return response.data;
  } catch (error) {
    console.error("Add Product Error:", error);
    throw error;
  }
};

export { addProduct };
