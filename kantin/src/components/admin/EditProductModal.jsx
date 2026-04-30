import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { BASE_URL } from "../../services/api";

const EditProductModal = ({ open, onClose, product, onUpdated }) => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    image: ""
  });

  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name || "",
        description: product.description || "",
        price: product.price || "",
        image: product.image || ""
      });
      setPreview(null);
    }
  }, [product]);

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    await api.put(`/products/${product.id}`, {
      ...form,
      price: Number(form.price)
    });

    onUpdated();   // refresh state di parent
    onClose();     // tutup modal
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-xl p-6">

        <h2 className="text-xl font-semibold mb-4">
          Edit Produk
        </h2>

        <div className="flex justify-center mb-4">
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

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Nama"
            className="w-full border p-2 rounded"
          />

          <input
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Deskripsi"
            className="w-full border p-2 rounded"
          />

          <input
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            placeholder="Harga"
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

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded"
            >
              Batal
            </button>

            <button className="px-4 py-2 bg-green-700 text-white rounded">
              Simpan
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default EditProductModal;