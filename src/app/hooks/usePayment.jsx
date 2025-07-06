"use client";
import { createContext, useContext, useState, useEffect } from "react";

const paymentContext = createContext();

const PaymentProvider = ({ children }) => {
  const [paymentData, setPaymentData] = useState(null);

  useEffect(() => {
    const storePaymentData = localStorage.getItem("paymentData");
    if (storePaymentData) setPaymentData(JSON.parse(storePaymentData));
  }, []);

  const savePaymentData = (newToken) => {
    localStorage.setItem("paymentData", JSON.stringify(newToken));
    setPaymentData(newToken);
  };

  const clearPaymentData = () => {
    localStorage.removeItem("paymentData");
    setPaymentData(null);
  };

  return (
    <paymentContext.Provider
      value={{ paymentData, savePaymentData, clearPaymentData }}
    >
      {children}
    </paymentContext.Provider>
  );
};

export const usePayment = () => useContext(paymentContext);

export default PaymentProvider;
