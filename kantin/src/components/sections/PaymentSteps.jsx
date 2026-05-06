import { useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../services/api";


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
  const [file, setFile] = useState(null);
  const [proof, setProof] = useState(null);
  
  const {orderId} = useParams();

  const handleUpload = async () => {
    if (!file) {
      alert("Pilih file dulu");
      return;
    }

    if(!orderId) {
      alert("Id order tidak ada");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await api.post("/upload-proof", formData);

      const proofUrl = res.data.url;
      setProof(proofUrl);

      await api.patch(`/orders/${orderId}/proof`, {
          proof: proofUrl
      });

      console.log("URL bukti:", res.data.url);

    } catch (err) {
      console.error(err);
      alert("Upload gagal");
    }
  };

  
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
      <div className="mt-8 border-2 border-dashed p-4 rounded-lg text-center">
        <p className="mb-2 text-gray-500">Upload Bukti Pembayaran</p>

        <input 
          type="file" 
          onChange={(e) => setFile(e.target.files[0])}
        />

        <button 
          onClick={handleUpload} 
          className="mt-3 w-full bg-green-700 text-white py-2 rounded-full">
          Kirim Bukti Pembayaran
        </button>

        {proof && (
          <div className="mt-4">
            <p className="text-sm text-gray-500 mb-2">Preview Bukti:</p>
            <img 
              src={proof} 
              alt="bukti" 
              className="w-40 mx-auto rounded-lg"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentSteps;