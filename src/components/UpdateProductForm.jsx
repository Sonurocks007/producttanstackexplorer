import React, { useState } from "react";
import {Input} from "./index"
import { useUpdateProduct } from "../hooks/useUpdateProduct";

const UpdateProductForm = () => {
  const [productId, setProductId] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    category: "",
    image: "",
  });

  const mutation = useUpdateProduct();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "productId") {
      setProductId(value);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!productId) {
      alert("Please enter Product ID to update.");
      return;
    }

    mutation.mutate({
      productId,
      updatedProduct: {
        title: formData.title,
        price: parseFloat(formData.price),
        category: formData.category,
        image: formData.image,
        description: "Updated manually",
      },
    });


    setProductId("");
    setFormData({ title: "", price: "", category: "", image: "" });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 bg-white rounded-2xl shadow-md space-y-4"
    >
      <Input
        name="productId"
        value={productId}
        onChange={handleChange}
        placeholder="Product ID"
      />
      <Input
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="New Title"
      />
      <Input
        name="price"
        value={formData.price}
        onChange={handleChange}
        placeholder="New Price"
        type="number"
      />
      <Input
        name="category"
        value={formData.category}
        onChange={handleChange}
        placeholder="New Category"
      />
      <Input
        name="image"
        value={formData.image}
        onChange={handleChange}
        placeholder="New Image URL"
      />
      <button
        type="submit"
        className="w-full bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition"
      >
        {mutation.isPending ? "Updating..." : "Update Product"}
      </button>
    </form>
  );
};

export default UpdateProductForm;
