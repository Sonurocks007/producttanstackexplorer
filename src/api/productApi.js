import axios from "axios";
export const fetchProducts = async()=>{
       const res = await axios.get("https://api.escuelajs.co/api/v1/products");
       const data= res.data;
       return data
}

export const addProduct = async (newProduct) => {
  const res = await axios.post("https://api.escuelajs.co/api/v1/products", newProduct);
  return res.data;
};