import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Leaf, Mail, Lock, AlertCircle, UserCog, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Alert, AlertDescription } from '../components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'nasabah' | 'admin'>('nasabah');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const success = await login(email, password, role);
      if (success) {
        // Redirect based on role
        if (role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/dashboard');
        }
      } else {
        setError('Email, password, atau role tidak sesuai');
      }
    } catch (err) {
      setError('Terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center p-4">
      {/* Back to Home Button */}
      <Link
        to="/"
        className="fixed top-6 left-6 flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow text-gray-700 hover:text-green-600"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="font-medium">Beranda</span>
      </Link>

      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
            <Leaf className="w-7 h-7 text-white" />
          </div>
          <div>
            <div className="font-bold text-2xl text-green-700">MILOS</div>
            <div className="text-xs text-gray-600">Waste Management System</div>
          </div>
        </div>

        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl">Masuk ke Akun Anda</CardTitle>
            <CardDescription>
              Pilih role Anda dan masukkan kredensial untuk melanjutkan
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="role">Masuk Sebagai</Label>
                <Select
                  value={role}
                  onValueChange={(value) => setRole(value as 'nasabah' | 'admin')}
                >
                  <SelectTrigger className="w-full">
                    <div className="flex items-center gap-2">
                      <UserCog className="h-4 w-4" />
                      <SelectValue placeholder="Pilih role">
                        {role === 'admin' ? 'Pengurus/Admin' : 'Nasabah'}
                      </SelectValue>
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="nasabah">Nasabah</SelectItem>
                    <SelectItem value="admin">Pengurus/Admin</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-gray-500">
                  {role === 'nasabah' ? 'Untuk warga yang ingin menjual sampah' : 'Untuk pengelola Bank Sampah'}
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="nama@email.com"
                    className="pl-10"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700"
                disabled={loading}
              >
                {loading ? 'Memproses...' : 'Masuk'}
              </Button>

              {/* Demo accounts */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm">
                <div className="font-semibold text-blue-900 mb-2">Akun Demo:</div>
                <div className="space-y-1 text-blue-800">
                  <div>Admin: admin@milos.id (Pilih role: Admin)</div>
                  <div>Nasabah: budi@gmail.com (Pilih role: Nasabah)</div>
                  <div className="text-xs text-blue-600 mt-2">Password: bebas (ketik apa saja)</div>
                  <div className="text-xs text-red-600 mt-2 font-semibold">⚠️ Pastikan role yang dipilih sesuai dengan email!</div>
                </div>
              </div>
            </form>

            <div className="mt-6 text-center text-sm text-gray-600">
              Belum punya akun?{' '}
              <Link to="/register" className="text-green-600 hover:text-green-700 font-semibold">
                Daftar sekarang
              </Link>
            </div>

            <div className="mt-4 text-center">
              <Link to="/" className="text-sm text-gray-500 hover:text-gray-700">
                ← Kembali ke beranda
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}