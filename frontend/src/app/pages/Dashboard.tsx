import { DashboardNavbar } from '../components/DashboardNavbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { SimpleBarChart } from '../components/SimpleBarChart';
import {
  TrendingUp,
  Package,
  Clock,
  Award,
  ArrowRight,
  Recycle,
  Calendar,
  MapPin,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router';
import { useMemo } from 'react';

const pointsData = [
  { month: 'Jan', points: 2400 },
  { month: 'Feb', points: 3800 },
  { month: 'Mar', points: 5200 },
  { month: 'Apr', points: 7100 },
  { month: 'Mei', points: 9500 },
  { month: 'Jun', points: 12500 },
];

const recentTransactions = [
  {
    id: '1',
    date: '2026-04-15',
    type: 'Plastik PET',
    weight: 2.5,
    points: 2500,
    status: 'completed',
  },
  {
    id: '2',
    date: '2026-04-12',
    type: 'Kardus',
    weight: 5.0,
    points: 3000,
    status: 'completed',
  },
  {
    id: '3',
    date: '2026-04-10',
    type: 'Botol Plastik',
    weight: 3.2,
    points: 1600,
    status: 'completed',
  },
];

const upcomingPickup = {
  id: '1',
  date: '2026-04-18',
  time: '09:00 - 11:00',
  address: 'Jl. Mangga No. 15, Kelurahan Kebon Jeruk',
  status: 'scheduled',
};

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const formattedAddress = useMemo(() => {
    return user?.address || 'Kos Melati';
  }, [user?.address]);

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNavbar />

      <div className="pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Selamat Datang, {user?.name}! 👋
            </h1>
            <p className="text-gray-600 mt-2">
              Lihat ringkasan aktivitas dan poin Anda di Bank Sampah MILOS Desa Sukamakmur
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-gradient-to-br from-green-500 to-emerald-600 text-white">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardDescription className="text-green-50">Total Poin</CardDescription>
                    <CardTitle className="text-3xl mt-2">{user?.points?.toLocaleString()}</CardTitle>
                  </div>
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                    <Award className="w-6 h-6" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-green-50">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-sm">+2,100 bulan ini</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardDescription>Total Transaksi</CardDescription>
                    <CardTitle className="text-3xl mt-2">24</CardTitle>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Package className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-gray-600">
                  3 transaksi bulan ini
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardDescription>Total Sampah</CardDescription>
                    <CardTitle className="text-3xl mt-2">48.5 kg</CardTitle>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Recycle className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-gray-600">
                  Kontribusi Anda 🌱
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardDescription>Transaksi Pending</CardDescription>
                    <CardTitle className="text-3xl mt-2">1</CardTitle>
                  </div>
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Clock className="w-6 h-6 text-orange-600" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-gray-600">
                  Menunggu verifikasi
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Points Chart */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>Perkembangan Poin</CardTitle>
                    <CardDescription>Grafik perolehan poin 6 bulan terakhir</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => navigate('/points')}>
                    Detail
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <SimpleBarChart data={pointsData} />
              </CardContent>
            </Card>

            {/* Upcoming Pickup */}
            <Card>
              <CardHeader>
                <CardTitle>Aksi Cepat</CardTitle>
                <CardDescription>Transaksi dan informasi</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Jadwal Hari Ini</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-600" />
                      <span className="text-gray-600">{formattedAddress}</span>
                    </div>
                    <p className="text-green-700 font-medium">
                      Pengambilan sampah tersedia
                    </p>
                  </div>
                </div>

                <Button
                  className="w-full bg-green-600 hover:bg-green-700"
                  onClick={() => navigate('/sell')}
                >
                  <Package className="w-4 h-4 mr-2" />
                  Jual Sampah Sekarang
                </Button>
                
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => navigate('/points')}
                >
                  <Award className="w-4 h-4 mr-2" />
                  Lihat Katalog Reward
                </Button>
              </CardContent>
            </Card>

            {/* Recent Transactions */}
            <Card className="lg:col-span-3">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>Transaksi Terakhir</CardTitle>
                    <CardDescription>Riwayat penyerahan sampah terbaru</CardDescription>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate('/history')}
                  >
                    Lihat Semua
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentTransactions.map((transaction) => (
                    <div
                      key={transaction.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                          <Recycle className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">
                            {transaction.type}
                          </div>
                          <div className="text-sm text-gray-600">
                            {transaction.weight} kg • {new Date(transaction.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-green-600">
                          +{transaction.points.toLocaleString()} poin
                        </div>
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          Selesai
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}