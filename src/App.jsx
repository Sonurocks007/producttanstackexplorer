import { QueryClientProvider } from "@tanstack/react-query";
import ProductCard from "./components/ProductCard";
import { queryClient } from "./services/queryClient";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <QueryClientProvider client={queryClient} className=" flex items-center justify-center w-full h-screen  bg-amber-50">
      <ProductCard/>
      <ToastContainer/>
    </QueryClientProvider>
  );
}

export default App;