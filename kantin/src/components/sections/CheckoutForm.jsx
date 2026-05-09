import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CheckoutForm = ({ onChange }) => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    time: "",
    date: "",
    note: "",
  });
  const [timeValue, setTimeValue] = useState(null);
  const [dateValue, setDateValue] = useState(null);

  useEffect(() => {
    onChange(form);
  }, [form, onChange]);

  const updateForm = (updater) => {
    setForm((prev) =>
      typeof updater === "function" ? updater(prev) : updater,
    );
  };

  const handleChange = (e) => {
    updateForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const formatDateValue = (value) => {
    if (!value) return "";
    const year = value.getFullYear();
    const month = String(value.getMonth() + 1).padStart(2, "0");
    const day = String(value.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const formatTimeValue = (value) => {
    if (!value) return "";
    const hours = String(value.getHours()).padStart(2, "0");
    const minutes = String(value.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  return (
    <div>
      {/* Step */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 bg-[#1D6E4F] text-white flex items-center justify-center rounded-full">
          1
        </div>
        <h2 className="font-jakarta font-bold text-[20px] leading-7 tracking-[-0.5px] text-[#1C1C17]">
          Detail Pengambilan
        </h2>
      </div>

      {/* Form */}
      <div className="space-y-5">
        {/* Nama */}
        <div>
          <label className="font-vietnam font-semibold text-[12px] leading-4 tracking-[1.2px] uppercase text-[#6F7A73]">
            NAMA PENERIMA
          </label>
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
          <label className="font-vietnam font-semibold text-[12px] leading-4 tracking-[1.2px] uppercase text-[#6F7A73]">
            NOMOR TELEPON
          </label>
          <input
            type="text"
            className="w-full mt-1 p-3 rounded-lg bg-[#E6E2DA] outline-none"
            placeholder="+62..."
            name="phone"
            onChange={handleChange}
          />
        </div>

        {/* Waktu & Tanggal */}
        <div className="flex flex-col md:grid md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="font-vietnam font-semibold text-[12px] leading-4 tracking-[1.2px] uppercase text-[#6F7A73]">
              WAKTU PENJEMPUTAN
            </label>
            <DatePicker
              selected={timeValue}
              onChange={(value) => {
                setTimeValue(value);
                updateForm((prev) => ({
                  ...prev,
                  time: formatTimeValue(value),
                }));
              }}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={30}
              timeCaption="Waktu"
              timeFormat="HH:mm"
              dateFormat="HH:mm"
              placeholderText="Pilih jam"
              className="w-full mt-1 p-3 rounded-xl bg-[#E6E2DA] outline-none focus:border-[#1D6E4F] focus:ring-2 focus:ring-[#1D6E4F]/20 cursor-pointer"
              popperClassName="kantin-picker-popper"
              calendarClassName="kantin-picker"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-vietnam font-semibold text-[12px] leading-4 tracking-[1.2px] uppercase text-[#6F7A73]">
              TANGGAL
            </label>
            <DatePicker
              selected={dateValue}
              onChange={(value) => {
                setDateValue(value);
                updateForm((prev) => ({
                  ...prev,
                  date: formatDateValue(value),
                }));
              }}
              minDate={new Date()}
              dateFormat="yyyy-MM-dd"
              placeholderText="Pilih tanggal"
              className="w-full mt-1 p-3 rounded-xl bg-[#E6E2DA] outline-none focus:border-[#1D6E4F] focus:ring-2 focus:ring-[#1D6E4F]/20 cursor-pointer"
              popperClassName="kantin-picker-popper"
              calendarClassName="kantin-picker"
            />
          </div>
        </div>

        {/* Catatan */}
        <div>
          <label className="font-vietnam font-semibold text-[12px] leading-4 tracking-[1.2px] uppercase text-[#6F7A73]">
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
