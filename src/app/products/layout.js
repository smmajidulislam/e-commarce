// src/app/products/layout.js
import ProductWrapper from "./ProductWrapper";

export const metadata = {
  title: "Products | Your Store Name",
  description: "Browse all available products in our store",
};

export default function ProductsLayout({ children }) {
  return <ProductWrapper>{children}</ProductWrapper>;
}
