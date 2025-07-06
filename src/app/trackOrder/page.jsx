import OrderWithOutAuth from "../components/order/OrderWithOutAuth";

const Page = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mt-3 text-pink-600 mb-4 text-center">
        Track Order
      </h1>
      <OrderWithOutAuth />
    </div>
  );
};

export default Page;
