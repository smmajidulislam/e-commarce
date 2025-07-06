import LeftSideProfile from "../components/profile/LeftSideProfile";

export const metadata = {
  title: "Products | Your Store Name",
  description: "Browse all available products in our store",
};

export default function ProductsLayout({ children }) {
  return (
    <section className=" min-h-screen text-black">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Breadcrumb / Page Title */}
        <div className="sm:flex sm:items-center sm:justify-between sm:w-full sm:gap-2 md:flex md:items-center md:justify-between md:w-full md:gap-2 lg:flex lg:items-center lg:justify-between lg:w-full lg:gap-2">
          <div className="w-full h-screen border bg-gray-50 rounded-2xl border-amber-400 sm:w-2/10 md:w-2/10 lg:w-2/10">
            <div>
              <LeftSideProfile />
            </div>
          </div>
          {/* Page Content (Injected by children) */}
          <div className="w-full mt-2 border bg-gray-300 h-screen rounded-2xl overflow-x-hidden border-amber-400 sm:w-8/10 md:w-8/10 lg:w-8/10">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
