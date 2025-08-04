import React, { useState } from "react";
import Input from "./index";
import { useAddProduct } from "../hooks/useAddProuduct";

const AddProductForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    category: "",
    image: "",
  });

  const mutation = useAddProduct();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({
      title: formData.title,
      price: parseFloat(formData.price),
      description: "Manually added",
      category: formData.category,
      image: formData.image,
    });
    setFormData({ title: "", price: "", category: "", image: "" });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 bg-white rounded-2xl shadow-md space-y-4"
    >
      <Input
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Title"
      />
      <Input
        name="price"
        value={formData.price}
        onChange={handleChange}
        placeholder="Price"
      />
      <Input
        name="category"
        value={formData.category}
        onChange={handleChange}
        placeholder="Category"
      />
      <Input
        name="image"
        value={formData.image}
        onChange={handleChange}
        placeholder="Image URL"
      />
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
      >
        {mutation.isLoading ? "Adding..." : "Submit"}
      </button>
    </form>
  );
};

export default AddProductForm;
