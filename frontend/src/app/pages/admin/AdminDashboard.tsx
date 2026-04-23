import { DashboardNavbar } from '../../components/DashboardNavbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import {
  Users,
  Package,
  TrendingUp,
  Clock,
  CheckCircle2,
  Calendar,
  Recycle,
  ArrowRight,
  MapPin,
  Phone,
} from 'lucide-react';
import { DualBarChart } from '../../components/DualBarChart';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '../../components/ui/dialog';
import { toast } from 'sonner';

const monthlyStats = [
  { id: 'stat-1', month: 'Jan', transactions: 145, weight: 420 },
  { id: 'stat-2', month: 'Feb', transactions: 189, weight: 580 },
  { id: 'stat-3', month: 'Mar', transactions: 234, weight: 650 },
  { id: 'stat-4', month: 'Apr', transactions: 298, weight: 820 },
  { id: 'stat-5', month: 'Mei', transactions: 312, weight: 890 },
  { id: 'stat-6', month: 'Jun', transactions: 356, weight: 1020 },
];

const initialPickups = [
  {
    id: 'PKP-001',
    customer: 'Budi Santoso',
    address: 'Jl. Mangga No. 15, Kebon Jeruk',
    phone: '0812-3456-7890',
    date: '2026-04-18',
    time: '09:00 - 11:00',
    wasteType: 'Plastik PET',
    estimatedWeight: 3.5,
    status: 'pending',
    notes: 'Harap datang tepat waktu',
  },
  {
    id: 'PKP-002',
    customer: 'Siti Rahayu',
    address: 'Jl. Jeruk No. 22, Palmerah',
    phone: '0813-4567-8901',
    date: '2026-04-18',
    time: '13:00 - 15:00',
    wasteType: 'Kardus',
    estimatedWeight: 5.0,
    status: 'pending',
    notes: 'Ada banyak kardus bekas pindahan',
  },
  {
    id: 'PKP-003',
    customer: 'Ahmad Hidayat',
    address: 'Jl. Apel No. 8, Tomang',
    phone: '0814-5678-9012',
    date: '2026-04-19',
    time: '07:00 - 09:00',
    wasteType: 'Botol Plastik',
    estimatedWeight: 2.8,
    status: 'pending',
    notes: 'Lokasi di lantai 2',
  },
];

const recentTransactions = [
  {
    id: 'TRX-089',
    customer: 'Maria Ulfah',
    wasteType: 'Plastik PET',
    weight: 2.5,
    points: 2500,
    date: '2026-04-16',
    status: 'completed',
  },
  {
    id: 'TRX-088',
    customer: 'Andi Wijaya',
    wasteType: 'Kardus',
    weight: 4.2,
    points: 2520,
    date: '2026-04-16',
    status: 'completed',
  },
  {
    id: 'TRX-087',
    customer: 'Dewi Sartika',
    wasteType: 'Logam/Kaleng',
    weight: 1.8,
    points: 2700,
    date: '2026-04-15',
    status: 'pending',
  },
];

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [pickups, setPickups] = useState(initialPickups);
  const [selectedPickup, setSelectedPickup] = useState<typeof initialPickups[0] | null>(null);
  const [showDetailDialog, setShowDetailDialog] = useState(false);

  const handleAcceptPickup = (pickupId: string) => {
    setPickups(pickups.filter(p => p.id !== pickupId));
    toast.success('Permintaan pickup berhasil diterima dan dijadwalkan!');
  };

  const handleShowDetail = (pickup: typeof initialPickups[0]) => {
    setSelectedPickup(pickup);
    setShowDetailDialog(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNavbar />

      <div className="pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard Admin</h1>
            <p className="text-gray-600 mt-2">
              Ringkasan dan statistik Bank Sampah MILOS
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardDescription>Total Nasabah</CardDescription>
                    <CardTitle className="text-3xl mt-2">2,547</CardTitle>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-green-600">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-sm">+124 bulan ini</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardDescription>Total Transaksi</CardDescription>
                    <CardTitle className="text-3xl mt-2">356</CardTitle>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Package className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-gray-600">
                  Bulan ini
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardDescription>Sampah Terkumpul</CardDescription>
                    <CardTitle className="text-3xl mt-2">1,020 kg</CardTitle>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Recycle className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-gray-600">
                  Bulan ini
                </div>
              </CardContent>
            </Card>

            <Card className="border-orange-200 bg-orange-50">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardDescription className="text-orange-700">Pickup Pending</CardDescription>
                    <CardTitle className="text-3xl mt-2 text-orange-600">8</CardTitle>
                  </div>
                  <div className="w-12 h-12 bg-orange-200 rounded-lg flex items-center justify-center">
                    <Clock className="w-6 h-6 text-orange-700" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Button
                  size="sm"
                  className="bg-orange-600 hover:bg-orange-700 w-full"
                  onClick={() => navigate('/admin/transactions')}
                >
                  Lihat Semua
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            {/* Charts */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Statistik Bulanan</CardTitle>
                <CardDescription>Transaksi dan berat sampah 6 bulan terakhir</CardDescription>
              </CardHeader>
              <CardContent>
                <DualBarChart data={monthlyStats} />
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Aksi Cepat</CardTitle>
                <CardDescription>Shortcut untuk fitur admin</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  className="w-full bg-green-600 hover:bg-green-700 justify-start"
                  onClick={() => navigate('/admin/transactions')}
                >
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Verifikasi Transaksi
                </Button>
                <Button
                  className="w-full bg-blue-600 hover:bg-blue-700 justify-start"
                  onClick={() => navigate('/admin/schedules')}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Kelola Jadwal
                </Button>
                <Button
                  className="w-full bg-purple-600 hover:bg-purple-700 justify-start"
                  onClick={() => navigate('/admin/waste-types')}
                >
                  <Recycle className="w-4 h-4 mr-2" />
                  Kelola Jenis Sampah
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => navigate('/admin/transactions')}
                >
                  <Users className="w-4 h-4 mr-2" />
                  Kelola Nasabah
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Pending Pickups */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>Permintaan Pickup Terbaru</CardTitle>
                    <CardDescription>Perlu dijadwalkan dan diproses</CardDescription>
                  </div>
                  <Badge className="bg-orange-100 text-orange-700 border-orange-200">
                    {pickups.length} Pending
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pickups.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      Tidak ada permintaan pickup pending
                    </div>
                  ) : (
                    pickups.map((pickup) => (
                      <div
                        key={pickup.id}
                        className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <div className="font-semibold text-gray-900">{pickup.id}</div>
                            <div className="text-sm text-gray-600">{pickup.customer}</div>
                          </div>
                          <Badge className="bg-orange-100 text-orange-700 border-orange-200">
                            Pending
                          </Badge>
                        </div>
                        <div className="space-y-1 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            {new Date(pickup.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long' })} • {pickup.time}
                          </div>
                          <div className="flex items-center gap-2">
                            <Package className="w-4 h-4" />
                            {pickup.wasteType} • ~{pickup.estimatedWeight} kg
                          </div>
                        </div>
                        <div className="flex gap-2 mt-3">
                          <Button
                            size="sm"
                            className="flex-1 bg-green-600 hover:bg-green-700"
                            onClick={() => handleAcceptPickup(pickup.id)}
                          >
                            Terima
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1"
                            onClick={() => handleShowDetail(pickup)}
                          >
                            Detail
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Recent Transactions */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>Transaksi Terbaru</CardTitle>
                    <CardDescription>Aktivitas transaksi terakhir</CardDescription>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate('/admin/transactions')}
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
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                          <Recycle className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">{transaction.id}</div>
                          <div className="text-sm text-gray-600">
                            {transaction.customer} • {transaction.wasteType}
                          </div>
                          <div className="text-xs text-gray-500">
                            {transaction.weight} kg • {transaction.points.toLocaleString()} poin
                          </div>
                        </div>
                      </div>
                      <Badge
                        className={
                          transaction.status === 'completed'
                            ? 'bg-green-100 text-green-700 border-green-200'
                            : 'bg-yellow-100 text-yellow-700 border-yellow-200'
                        }
                      >
                        {transaction.status === 'completed' ? 'Selesai' : 'Pending'}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Detail Dialog */}
      <Dialog open={showDetailDialog} onOpenChange={setShowDetailDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Detail Permintaan Pickup</DialogTitle>
            <DialogDescription>
              Informasi lengkap permintaan pickup dari nasabah
            </DialogDescription>
          </DialogHeader>
          {selectedPickup && (
            <div className="space-y-4">
              <div>
                <div className="text-sm text-gray-600">ID Pickup</div>
                <div className="font-semibold">{selectedPickup.id}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Nasabah</div>
                <div className="font-semibold">{selectedPickup.customer}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  Alamat
                </div>
                <div>{selectedPickup.address}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 flex items-center gap-1">
                  <Phone className="w-4 h-4" />
                  Telepon
                </div>
                <div>{selectedPickup.phone}</div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-600 flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    Tanggal
                  </div>
                  <div>{new Date(selectedPickup.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    Waktu
                  </div>
                  <div>{selectedPickup.time}</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-600">Jenis Sampah</div>
                  <div className="font-semibold">{selectedPickup.wasteType}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Estimasi Berat</div>
                  <div className="font-semibold">~{selectedPickup.estimatedWeight} kg</div>
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Catatan</div>
                <div className="text-sm bg-gray-50 p-3 rounded-lg">{selectedPickup.notes}</div>
              </div>
            </div>
          )}
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setShowDetailDialog(false)}>
              Tutup
            </Button>
            <Button
              className="bg-green-600 hover:bg-green-700"
              onClick={() => {
                if (selectedPickup) {
                  handleAcceptPickup(selectedPickup.id);
                  setShowDetailDialog(false);
                }
              }}
            >
              Terima Pickup
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}