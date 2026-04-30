import { useState, useEffect } from "react";
import { api } from "../../services/api";
import { BASE_URL } from "../../services/api";

const AddProductModal = ({ open, onClose, onCreated }) => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    image: ""
  });

  const [preview, setPreview] = useState(null);
  
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);
  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    await api.post("/products", {
      ...form,
      price: Number(form.price)
    });

    setForm({ name: "", description: "", price: "", image: "" });
    onCreated();
    onClose();
  };

  

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">

      <div className="bg-white w-full max-w-md rounded-xl p-6 space-y-4">

        <h2 className="text-xl font-semibold">
          Tambah Produk
        </h2>

        {/* PREVIEW IMAGE */}
        <div className="flex justify-center">
          <img
            src={
              preview
                ? preview
                : form.image
                ? `${BASE_URL}${form.image}`
                : "/assets/fallback.webp"
            }
            className="w-32 h-32 object-cover rounded-lg border"
          />
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-3">

          <input
            placeholder="Nama"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full border p-2 rounded"
          />

          <input
            placeholder="Deskripsi"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full border p-2 rounded"
          />

          <input
            placeholder="Harga"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            className="w-full border p-2 rounded"
          />

          <input
            type="file"
            onChange={async (e) => {
              const file = e.target.files[0];
              if (!file) return;
              
              setPreview(URL.createObjectURL(file));

              const formData = new FormData();
              formData.append("image", file);

              try {
                const res = await api.post("/upload", formData, {
                  headers: {
                    "Content-Type": "multipart/form-data"
                  }
                });

                setForm(prev => ({
                  ...prev,
                  image: res.data.image
                }));

              } catch (err) {
                console.error(err);
                alert("Upload gagal");
              }
            }}
            className="w-full border p-2 rounded"
          />

          {/* BUTTON */}
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded"
            >
              Batal
            </button>

            <button className="px-4 py-2 bg-green-700 text-white rounded">
              Tambah
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AddProductModal;