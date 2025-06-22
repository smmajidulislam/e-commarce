import Carosel from "./components/home/Carosel";
import Feature from "./components/home/Feature";
import NewArrivals from "./components/home/NewArrivals";
import Products from "./components/home/Products";
import TopAd from "./components/home/TopAd";
import NewArrivalProducts from "./components/home/NewArrivalProducts";

const Page = () => {
  return (
    <div className="font inter">
      <Carosel />
      <TopAd />
      <Feature />
      <Products />
      <NewArrivals />
      <NewArrivalProducts />
    </div>
  );
};

export default Page;
