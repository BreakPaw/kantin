import { useState, useEffect } from "react";
import { api, BASE_URL } from "../../services/api";

const AddProductModal = ({ open, onClose, onCreated }) => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
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
      price: Number(form.price),
    });

    setForm({ name: "", description: "", price: "", image: "" });
    onCreated();
    onClose();
  };

  const handleCancel = () => {
    setPreview(null);
    setForm((prev) => ({ ...prev, image: "" }));
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-lg px-6 py-8 space-y-4 mx-4 md:mx-0">
        <h2 className="text-xl font-semibold">Tambah Produk</h2>

        {/* PREVIEW IMAGE */}
        <div className="flex justify-center">
          {preview || form.image ? (
            <img
              src={preview ? preview : form.image}
              onError={(e) => {
                e.target.src = "/assets/fallback.webp";
              }}
              className="w-32 h-32 object-cover rounded-lg border"
            />
          ) : (
            <div className="w-32 h-32 rounded-lg border border-dashed border-emerald-200 bg-emerald-50/40 flex items-center justify-center text-xs text-emerald-700">
              Image preview
            </div>
          )}
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
                const res = await api.post("/upload", formData);

                const imageUrl =
                  res.data?.url ||
                  (res.data?.image ? `${BASE_URL}${res.data.image}` : "");

                setForm((prev) => ({
                  ...prev,
                  image: imageUrl,
                }));
              } catch (err) {
                console.error(err);
                alert("Upload gagal");
              }
            }}
            className="w-full rounded-lg border border-dashed border-emerald-200 bg-emerald-50/40 px-3 py-3 text-sm text-emerald-900 file:mr-3 file:rounded-full file:border-0 file:bg-emerald-700 file:px-4 file:py-2 file:text-xs file:font-semibold file:text-white hover:border-emerald-300"
          />

          {/* BUTTON */}
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-200 rounded"
            >
              Batal
            </button>

            <button className="px-4 py-2 bg-[#1D6E4F] text-white rounded">
              Tambah
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;
