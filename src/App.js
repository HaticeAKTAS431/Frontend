import React, { useState } from "react";
import "./App.css";

const ProductList = () => {
  const [products, setProducts] = useState([
    { id: 1, name: "Ürün 1" },
    { id: 2, name: "Ürün 2" },
    { id: 3, name: "Ürün 3" },
  ]);

  const [newProductName, setNewProductName] = useState("");
  const [nextProductId, setNextProductId] = useState(4);

  const addProduct = () => {
    if (newProductName.trim() !== "") {
      setProducts([...products, { id: nextProductId, name: newProductName }]);
      setNewProductName("");
      setNextProductId(nextProductId + 1);
    }
  };

  return (
    <div className="App">
      <div className="toolbar">
        <button onClick={addProduct}>Yeni Ürün Ekle</button>
      </div>

      <div className="product-list">
        <ul>
          {products.map((product) => (
            <li key={product.id}>{product.name}</li>
          ))}
        </ul>
      </div>

      <div className="add-product-form">
        <input
          type="text"
          placeholder="Ürün Adı"
          value={newProductName}
          onChange={(e) => setNewProductName(e.target.value)}
        />
        <button onClick={addProduct}>Ekle</button>
      </div>
    </div>
  );
};

export default ProductList;
