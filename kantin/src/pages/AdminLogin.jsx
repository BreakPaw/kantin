import { useState } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    navigate("/admin/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#f4f2ed] flex flex-col items-center justify-center p-6">
      <h1 className="font-jakarta font-bold text-[24px] leading-12 tracking-[-1.2px] text-[#1D6E4F] mb-4 block md:hidden">
        KANTIN ABI
      </h1>
      <div className="w-full max-w-md md:max-w-5xl mx-auto bg-white rounded-lg overflow-hidden shadow-xl grid md:grid-cols-2">
        {/* LEFT */}
        <div className="hidden md:flex relative bg-[#1D6E4F] p-10 text-white flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold">KANTIN ABI</h1>
          </div>

          <div>
            <h2 className="text-5xl font-bold leading-tight">
              Dashboard
              <br />
              Administrasi
            </h2>

            <p className="mt-6 text-white/80 text-lg max-w-md">
              Kelola pesanan dan operasional kantin secara real-time.
            </p>
          </div>
        </div>

        {/* RIGHT */}
        <div className="px-6 py-10 md:p-12 flex items-center">
          <div className="w-full">
            <div className="mb-10">
              <h2 className="text-3xl font-bold text-[#1D6E4F]">Masuk Admin</h2>
              <p className="text-gray-500 mt-2">
                Login untuk mengakses dashboard admin.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="text-sm text-gray-600 block mb-2">
                  Email
                </label>

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@email.com"
                  className="w-full px-5 py-4 rounded-2xl bg-[#f4f2ed] border border-transparent focus:border-green-500 focus:outline-none text-lg"
                />
              </div>

              <div>
                <label className="text-sm text-gray-600 block mb-2">
                  Password
                </label>

                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-5 py-4 rounded-2xl bg-[#f4f2ed] border border-transparent focus:border-green-500 focus:outline-none text-lg"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-2xl bg-[#1D6E4F] text-white font-bold text-lg hover:bg-[#00442E] disabled:opacity-70 transition"
              >
                {loading ? "Memproses..." : "Login ke Dashboard"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
