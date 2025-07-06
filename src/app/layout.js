import { Geist, Geist_Mono } from "next/font/google";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "./components/global/Nav";
import ReduxProvider from "./components/global/ReduxProvider";
import AuthProvider from "./hooks/UseAuth";
import Footer from "./components/global/Footer";
import PaymentProvider from "./hooks/usePayment";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata = {
  title: "E-commerce",
  description: "E-commerce",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${geistMono.variable} ${geistSans.variable} antialiased`}
      >
        <ReduxProvider>
          <AuthProvider>
            <PaymentProvider>
              <Nav />
              {children}
              <Footer />
            </PaymentProvider>
          </AuthProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
