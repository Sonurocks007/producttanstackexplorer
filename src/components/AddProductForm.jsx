import React, { useState } from "react";
import Input from "./index"; // Assuming Input is a custom reusable input component
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const AddProductForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    category: "",
    image: "",
  });

  const mutation = useMutation({
    mutationFn: async () => {
      const res = await axios.post("https://api.escuelajs.co/api/v1/products", {
        title: formData.title,
        price: parseFloat(formData.price),
        description: "Custom product",
        categoryId: 1, 
        images: [formData.image],
      });
      return res.data;
    },
    onSuccess: () => {
      alert("Product added successfully!");
    },
    onError: (err) => {
      console.error("Error adding product:", err);
      alert("Failed to add product");
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate();
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto">
      <Input
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Title"
        required
      />
      <Input
        name="price"
        value={formData.price}
        onChange={handleChange}
        placeholder="Price"
        type="number"
        required
      />
      <Input
        name="category"
        value={formData.category}
        onChange={handleChange}
        placeholder="Category"
        required
      />
      <Input
        name="image"
        value={formData.image}
        onChange={handleChange}
        placeholder="Image URL"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
      >
        Submit
      </button>
    </form>
  );
};

export default AddProductForm;
