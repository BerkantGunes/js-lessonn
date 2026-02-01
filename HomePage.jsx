import Header from "../components/Header/Header";
import Categories from "../components/categories/categories";
import Products from "../components/products/Products";
import CartTotal from "../components/cart/CartTotal";
import { useEffect, useState } from "react";


const HomePage = () => {
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])
  const [filtered, setFiltered] = useState([])

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/products/get-all");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    }

    getProducts();
  }, []);


  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/categories/get-all");
        const data = await res.json();
        data && setCategories(data.map((item) => {
          return { ...item, value: item.title };
        }));
      } catch (error) {
        console.log(error);
      }
    }

    getCategories();
  }, [])

  return (
    <>
      <Header />

      <div className="home px-6 flex md:flex-row flex-col justify-between gap-10 md:pb-0 pb-20 h-screen">
        <div className="categories overflow-auto max-h-[calc(85vh_-_10px)] md:pb-6">
          <Categories categories={categories} setCategories={setCategories} setFiltered={setFiltered} products={products} />
        </div>
        <div className="products flex-[8] pl-9 pr-8 max-h-[calc(85vh_-_10px)] overflow-y-auto pb-10 min-h-[500px]">
          <Products categories={categories} filtered={filtered} products={products} setProducts={setProducts} />
        </div>
        <div className="card-wrapper min-w-[300px] md:-mr-[24px] md:-mt-[24px] border">
          <CartTotal />
        </div>
      </div>
    </>
  )
}

export default HomePage