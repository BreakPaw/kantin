const steps = [
  {
    title: "Buka Aplikasi E-Wallet",
    desc: "Buka aplikasi mobile banking atau e-wallet (Gopay, OVO, Dana, dll) favorit Anda."
  },
  {
    title: "Pindai Kode QR",
    desc: "Pilih menu scan/bayar dan arahkan kamera ke QRIS."
  },
  {
    title: "Konfirmasi Nominal",
    desc: "Pastikan jumlah sesuai dengan total pesanan."
  },
  {
    title: "Selesaikan Pembayaran",
    desc: "Setelah pembayaran berhasil, sistem akan otomatis mendeteksi."
  }
];

const PaymentSteps = () => {
  return (
    <div className="bg-[#f4f2ed] rounded-xl p-6">

      <h3 className="font-semibold text-green-700 mb-6">
        Langkah Pembayaran
      </h3>

      <div className="space-y-5">
        {steps.map((step, i) => (
          <div key={i} className="flex gap-4">
            
            {/* Number */}
            <div className="w-7 h-7 flex items-center justify-center bg-green-200 text-green-700 rounded-full text-sm font-semibold">
              {i + 1}
            </div>

            {/* Text */}
            <div>
              <p className="font-medium">{step.title}</p>
              <p className="text-sm text-gray-500">{step.desc}</p>
            </div>

          </div>
        ))}
      </div>

      {/* Button */}
      <button className="mt-8 w-full bg-green-700 text-white py-3 rounded-full">
        Saya Sudah Bayar →
      </button>

      <p className="text-xs text-gray-400 text-center mt-3">
        Pembayaran aman & terenkripsi
      </p>

    </div>
  );
};

export default PaymentSteps;