import CheckoutForm from "../components/sections/CheckoutForm";
import OrderSummary from "../components/sections/OrderSummary";
import { useState } from "react";
import { useCart } from "../store/CartContext";

const Checkout = () => {
  const [form, setForm] = useState({});
  const isValid =
    form.name &&
    form.phone &&
    form.time &&
    form.date;
  
  const {
    cart,
    addToCart,
    decreaseQty,
    removeFromCart,
    getTotalPrice
  } = useCart();


  return (
    <div className="px-10 py-6">
      
      {/* Title */}
      <div className="mb-8">
        <h1 className="font-jakarta font-normal text-[36px] leading-[40px] tracking-[-0.9px] text-[#00553A]">
          Penyelesaian Pesanan
        </h1>
        <p className="mt-1 font-vietnam font-normal text-[16px] leading-[24px] text-[#3F4943]">
          Satu langkah lagi untuk menikmati hidangan warisan Nusantara.
        </p>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left */}
        <div className="lg:col-span-2">
          <CheckoutForm onChange={setForm} />
        </div>

        {/* Right */}
        <div>
          <OrderSummary form={form} isValid={isValid}/>
        </div>

      </div>

    </div>
  );
};

export default Checkout;