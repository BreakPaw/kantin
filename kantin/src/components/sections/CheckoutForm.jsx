import { useState } from "react";

const CheckoutForm = ({onChange}) => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    time: "",
    date: "",
    note: ""
  });

  const handleChange = (e) => {
    const newForm = {
      ...form,
      [e.target.name]: e.target.value
    };

    setForm(newForm);
    onChange(newForm); // kirim ke parent
  };

  return (
    <div>
      
      {/* Step */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 bg-green-700 text-white flex items-center justify-center rounded-full">
          1
        </div>
        <h2 className="font-jakarta font-bold text-[20px] leading-[28px] tracking-[-0.5px] text-[#1C1C17]">Detail Pengambilan</h2>
      </div>

      {/* Form */}
      <div className="space-y-5">
        
        {/* Nama */}
        <div>
          <label className="font-vietnam font-semibold text-[12px] leading-[16px] tracking-[1.2px] uppercase text-[#6F7A73]">NAMA PENERIMA</label>
          <input
            type="text"
            className="w-full mt-1 p-3 rounded-lg bg-[#E6E2DA] outline-none"
            placeholder="Masukkan nama"
            name="name"
            onChange={handleChange}
          />
        </div>

        {/* Telepon */}
        <div>
          <label className="font-vietnam font-semibold text-[12px] leading-[16px] tracking-[1.2px] uppercase text-[#6F7A73]">NOMOR TELEPON</label>
          <input
            type="text"
            className="w-full mt-1 p-3 rounded-lg bg-[#E6E2DA] outline-none"
            placeholder="+62..."
            name="phone"
            onChange={handleChange}
          />
        </div>

        {/* Waktu & Tanggal */}
        <div className="grid grid-cols-2 gap-4">
          
          <div>
            <label className="font-vietnam font-semibold text-[12px] leading-[16px] tracking-[1.2px] uppercase text-[#6F7A73]">WAKTU PENJEMPUTAN</label>
            <input
              type="time"
              name="time"
              className="w-full mt-1 p-3 rounded-lg bg-[#E6E2DA] outline-none"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="font-vietnam font-semibold text-[12px] leading-[16px] tracking-[1.2px] uppercase text-[#6F7A73]">TANGGAL</label>
            <input
              type="date"
              name="date"
              className="w-full mt-1 p-3 rounded-lg bg-[#E6E2DA] outline-none"
              onChange={handleChange}
            />
          </div>

        </div>

        {/* Catatan */}
        <div>
          <label className="font-vietnam font-semibold text-[12px] leading-[16px] tracking-[1.2px] uppercase text-[#6F7A73]">
            CATATAN KHUSUS (OPSIONAL)
          </label>
          <textarea
            rows="3"
            name="note"
            className="w-full mt-1 p-3 rounded-lg bg-[#E6E2DA] outline-none"
            placeholder="Contoh: tanpa sambal..."
            onChange={handleChange}
          />
        </div>

      </div>
    </div>
  );
};

export default CheckoutForm;