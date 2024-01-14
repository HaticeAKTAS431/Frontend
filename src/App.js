// ProductList.js
import React, { useState, useEffect } from "react";
import "./App.css";
import useFetch from "./hooks/useFetch";
import { addProduct } from "./hooks/addProduct";
import { getByIdProduct } from "./hooks/getByIdProduct";
import { deleteProduct } from "./hooks/deleteProduct";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const { data, isLoading, error, refetch } = useFetch();
  const [newProductName, setNewProductName] = useState("");
  const [nextProductId, setNextProductId] = useState(4);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productDetails, setProductDetails] = useState(null);

  useEffect(() => {
    setProducts(data);
  }, [data]);

  const addProductHandler = async () => {
    if (newProductName.trim() !== "") {
      try {
        const addedProduct = await addProduct(newProductName);
        setProducts([...products, addedProduct]);
        setNewProductName("");
        setNextProductId(nextProductId + 1);
        refetch();
      } catch (error) {
        console.error("Add Product Error:", error);
      }
    }
  };

  const showProductDetails = async (product) => {
    setSelectedProduct(product);

    try {
      const details = await getByIdProduct(product._id);
      setProductDetails(details);
    } catch (error) {
      console.error("Fetch Product Details Error:", error);
    }
  };

  const deleteProductHandler = async (productId) => {
    try {
      await deleteProduct(productId);
      setProducts(products.filter((product) => product._id !== productId));
    } catch (error) {
      console.error("Delete Product Error:", error);
    }
  };

  const closeDetails = () => {
    setSelectedProduct(null);
    setProductDetails(null);
  };

  return (
    <div className="App">
      <div className="toolbar">
        <button onClick={addProductHandler}>Yeni Ürün Ekle</button>
      </div>

      <div className="product-list">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} onClick={() => showProductDetails(product)}>
                <td>{product._id}</td>
                <td>{product.productName}</td>
                <td>
                  <button onClick={() => deleteProductHandler(product._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="add-product-form">
        <input
          type="text"
          placeholder="Ürün Adı"
          value={newProductName}
          onChange={(e) => setNewProductName(e.target.value)}
        />
        <button onClick={addProductHandler}>Ekle</button>
      </div>

      {selectedProduct && (
        <div className="product-details">
          <h2>Product Details</h2>
          <p>ID: {selectedProduct._id}</p>
          <p>Name: {selectedProduct.productName}</p>
          {productDetails && (
            <div>
              <p>Additional Details: {productDetails.additionalInfo}</p>
            </div>
          )}
          <button onClick={closeDetails}>Close Details</button>
        </div>
      )}
    </div>
  );
};

export default ProductList;
