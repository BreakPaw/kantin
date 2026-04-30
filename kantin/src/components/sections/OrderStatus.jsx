const steps = [
  { key: "pending", label: "Menunggu Verifikasi", icon: "⏱" },
  { key: "paid", label: "Dibayar", icon: "💳" },
  { key: "preparing", label: "Diproses", icon: "🍳" },
  { key: "ready", label: "Siap Diambil", icon: "🛍" },
  { key: "done", label: "Selesai", icon: "✔" }
];


const statusIndex = {
  pending: 0,
  paid: 1,
  preparing: 2,
  ready: 3,
  done: 4
};

const OrderStatus = ({ status,order }) => {
  const currentStep = statusIndex[status] ?? 0;

  const progressWidth =
    (currentStep / (steps.length - 1)) * 100;

  return (
    <div className="bg-[#f4f2ed] p-10 rounded-2xl w-full">
      
      <h3 className="text-center text-lg font-semibold mb-10">
        Status Pengiriman
      </h3>

      <div className="relative">

        {/* 🔹 Base line (BELAKANG) */}
        <div className="absolute top-6 left-0 w-full h-[3px] bg-gray-300 rounded-full z-0" />

        {/* 🔹 Progress line */}
        <div
          className="absolute top-6 left-0 h-[3px] bg-yellow-400 rounded-full transition-all duration-500 z-10"
          style={{ width: `${progressWidth}%` }}
        />

        {/* 🔹 Steps (PALING DEPAN) */}
        <div className="flex justify-between relative z-20">
          {steps.map((step, i) => {
            const isActive = i <= currentStep;

            return (
              <div key={i} className="flex flex-col items-center w-full">

                <div
                  className={`
                    w-12 h-12 rounded-full flex items-center justify-center text-lg
                    transition-all duration-300
                    ${
                      isActive
                        ? "bg-yellow-400 text-black shadow-md"
                        : "bg-gray-300 text-gray-500"
                    }
                  `}
                >
                  {step.icon}
                </div>

                <p className="text-sm mt-3 text-center max-w-[90px]">
                  {step.label}
                </p>

                {i === 0 && (
                  <p className="text-xs text-gray-400 mt-1">
                    {order?.pickup?.time || "-"}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default OrderStatus;