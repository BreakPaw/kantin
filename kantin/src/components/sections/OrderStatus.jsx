import { IoWallet, IoFastFood } from "react-icons/io5";
import { FaBoxesPacking } from "react-icons/fa6";

const steps = [
  { key: "paid", label: "Dibayar", icon: <IoWallet /> },
  { key: "preparing", label: "Diproses", icon: <FaBoxesPacking /> },
  { key: "ready", label: "Siap Diambil", icon: <IoFastFood /> },
];

const statusIndex = {
  paid: 0,
  preparing: 1,
  ready: 2,
};

const OrderStatus = ({ status }) => {
  const currentStep = statusIndex[status] ?? 1;
  const progressWidth = (currentStep / (steps.length - 1)) * 100;

  return (
    <div className="bg-[#f4f2ed] p-6 lg:p-10 rounded-2xl w-full">
      <h3 className="text-center text-lg font-semibold mb-8 lg:mb-10">
        Status Pesanan
      </h3>

      {/* --- TAMPILAN DESKTOP (Stepper) --- */}
      <div className="relative hidden lg:block px-5">
        {/* Container Utama */}
        <div className="relative w-full top-6 h-1 bg-gray-200 rounded-full overflow-hidden">
          {/* Progress Bar */}
          <div
            className="absolute left-0 h-full bg-green-700 transition-all duration-700 ease-in-out"
            style={{ width: `${progressWidth}%` }}
          />
        </div>
        <div className="flex justify-between relative z-20">
          {steps.map((step, i) => {
            const isActive = i <= currentStep;
            const isCurrent = i === currentStep;

            return (
              <div key={i} className="flex flex-col items-center flex-1">
                <div
                  className={`
                    w-12 h-12 rounded-full flex items-center justify-center text-xl
                    transition-all duration-500
                    ${isActive ? "bg-[#1D6E4F] text-white shadow-lg scale-110" : "bg-gray-300 text-gray-500"}
                    ${isCurrent ? "ring-4 ring-green-200" : ""}
                  `}
                >
                  {step.icon}
                </div>
                <p
                  className={`text-sm mt-4 font-medium ${isActive ? "text-[#1D6E4F]" : "text-gray-400"}`}
                >
                  {step.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* --- TAMPILAN MOBILE (Dynamic Single Icon) --- */}
      <div className="lg:hidden flex flex-col items-center">
        <div className="relative">
          <div className="w-24 h-24 bg-[#1D6E4F] rounded-full flex items-center justify-center text-4xl shadow-xl border-4 border-white text-zinc-200">
            {steps[currentStep]?.icon}
          </div>
        </div>

        <div className="text-center mt-6">
          <p className="text-xl font-bold text-green-800">
            {steps[currentStep]?.label}
          </p>
          <p className="text-gray-500 text-sm mt-1">
            {currentStep === 0 && "Menunggu konfirmasi dapur"}
            {currentStep === 1 && "Koki sedang menyiapkan makananmu"}
            {currentStep === 2 && "Pesanan siap dinikmati!"}
          </p>
        </div>

        {/* Mini progress bar for mobile */}
        <div className="w-full bg-gray-200 h-1.5 mt-8 rounded-full overflow-hidden">
          <div
            className="bg-green-700 h-full transition-all duration-500"
            style={{ width: `${progressWidth}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default OrderStatus;
