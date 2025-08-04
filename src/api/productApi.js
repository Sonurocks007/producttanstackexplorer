import axios from "axios";
export const fetchProducts = async()=>{
       const res = await axios.get("https://fakestoreapi.com/products");
       const data= res.data;
       return data
}
export const addProduct = async (newProduct) => {
  const res = await axios.post("https://fakestoreapi.com/products", newProduct);
  return res.data;
};

export const deleteProduct = async (productId) => {
  const res = await axios.delete(`https://fakestoreapi.com/products/${productId}`);
  return res.data;
};

export const searchProductById = async(productId)=>{
  const res = await axios.get(`https://fakestoreapi.com/products/${productId}`);
  return res.data;
}

export const updateProductById = async(productId,updatedProduct)=>{
  const res = await axios.put(`https://fakestoreapi.com/products/${productId}`,updatedProduct);
  return res.data
}
