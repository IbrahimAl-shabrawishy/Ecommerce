import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Loading from "../../components/Loading/Loading";
import { Helmet } from "react-helmet";

export default function Brands() {
  const [isLoading, setIsLoading] = useState(true);
  const [brands, setBrands] = useState([]);

  async function getBrands() {
    try {
      const response = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/brands`
      );
      if (response.data && response.data.data) {
        setBrands(response.data.data);
      } else {
        toast.error("No data available for brands");
      }
      setIsLoading(false);
    } catch (error) {
      toast.error("Error fetching brands", error);
      setBrands([]);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getBrands();
  }, []);

  return (
    <div>
      <Helmet>
        <title>Brands</title>
      </Helmet>
      <h1 className="text-black text-center p-11 font-extrabold shadow bg-white">
        All Brands
      </h1>

      {!isLoading ? (
        <div className="flex flex-wrap justify-center">
          {brands.map((brand) => (
            <div key={brand._id} className="m-5 max-w-xs transition-all">
              <div className="relative flex flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md hover:border-black">
                <div className="relative mx-3 mt-3 h-60 overflow-hidden rounded-xl">
                  <img
                    className="h-full w-full object-cover"
                    src={brand.image}
                    alt={brand.name}
                  />
                  <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-sm font-medium text-white">
                    39% OFF
                  </span>
                </div>
                <div className="m-11">
                  <h5 className="text-xl font-semibold tracking-tight text-slate-900">
                    {brand.name}
                  </h5>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
}
