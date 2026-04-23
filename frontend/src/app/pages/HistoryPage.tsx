import { useState } from 'react';
import { DashboardNavbar } from '../components/DashboardNavbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { Search, Filter, Download, Calendar, Package } from 'lucide-react';

const transactions = [
  {
    id: 'TRX-001',
    date: '2026-04-15',
    type: 'Plastik PET',
    weight: 2.5,
    points: 2500,
    pointsPerKg: 1000,
    status: 'completed',
    method: 'Drop-off',
  },
  {
    id: 'TRX-002',
    date: '2026-04-12',
    type: 'Kardus',
    weight: 5.0,
    points: 3000,
    pointsPerKg: 600,
    status: 'completed',
    method: 'Pickup',
  },
  {
    id: 'TRX-003',
    date: '2026-04-10',
    type: 'Botol Plastik',
    weight: 3.2,
    points: 1600,
    pointsPerKg: 500,
    status: 'completed',
    method: 'Drop-off',
  },
  {
    id: 'TRX-004',
    date: '2026-04-08',
    type: 'Kertas',
    weight: 4.5,
    points: 1350,
    pointsPerKg: 300,
    status: 'completed',
    method: 'Pickup',
  },
  {
    id: 'TRX-005',
    date: '2026-04-05',
    type: 'Plastik HDPE',
    weight: 1.8,
    points: 1440,
    pointsPerKg: 800,
    status: 'completed',
    method: 'Drop-off',
  },
  {
    id: 'TRX-006',
    date: '2026-04-03',
    type: 'Logam/Kaleng',
    weight: 2.0,
    points: 3000,
    pointsPerKg: 1500,
    status: 'completed',
    method: 'Drop-off',
  },
  {
    id: 'TRX-007',
    date: '2026-04-01',
    type: 'Kaca/Botol Kaca',
    weight: 3.5,
    points: 1400,
    pointsPerKg: 400,
    status: 'completed',
    method: 'Pickup',
  },
];

export default function HistoryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterMethod, setFilterMethod] = useState('all');

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'all' || transaction.type === filterType;
    const matchesMethod = filterMethod === 'all' || transaction.method === filterMethod;

    return matchesSearch && matchesType && matchesMethod;
  });

  const totalWeight = filteredTransactions.reduce((sum, t) => sum + t.weight, 0);
  const totalPoints = filteredTransactions.reduce((sum, t) => sum + t.points, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNavbar />

      <div className="pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Riwayat Transaksi</h1>
            <p className="text-gray-600 mt-2">
              Lihat semua riwayat penyerahan sampah dan perolehan poin Anda
            </p>
          </div>

          {/* Summary Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Total Transaksi</CardDescription>
                <CardTitle className="text-3xl">{filteredTransactions.length}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Dari semua jenis sampah
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Total Berat</CardDescription>
                <CardTitle className="text-3xl">{totalWeight.toFixed(1)} kg</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Sampah yang telah diserahkan
                </p>
              </CardContent>
            </Card>

            <Card className="bg-green-50 border-green-200">
              <CardHeader className="pb-3">
                <CardDescription className="text-green-700">Total Poin Diperoleh</CardDescription>
                <CardTitle className="text-3xl text-green-600">
                  {totalPoints.toLocaleString()}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-green-700">
                  Dari transaksi yang ditampilkan
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card className="mb-6">
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle>Semua Transaksi</CardTitle>
                  <CardDescription>Filter dan cari transaksi Anda</CardDescription>
                </div>
                <Button variant="outline" className="md:w-auto">
                  <Download className="w-4 h-4 mr-2" />
                  Ekspor Data
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Cari berdasarkan ID atau jenis sampah..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="md:w-[200px]">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Jenis Sampah" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Jenis</SelectItem>
                    <SelectItem value="Plastik PET">Plastik PET</SelectItem>
                    <SelectItem value="Plastik HDPE">Plastik HDPE</SelectItem>
                    <SelectItem value="Kardus">Kardus</SelectItem>
                    <SelectItem value="Botol Plastik">Botol Plastik</SelectItem>
                    <SelectItem value="Kertas">Kertas</SelectItem>
                    <SelectItem value="Logam/Kaleng">Logam/Kaleng</SelectItem>
                    <SelectItem value="Kaca/Botol Kaca">Kaca/Botol Kaca</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filterMethod} onValueChange={setFilterMethod}>
                  <SelectTrigger className="md:w-[180px]">
                    <Package className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Metode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Metode</SelectItem>
                    <SelectItem value="Drop-off">Drop-off</SelectItem>
                    <SelectItem value="Pickup">Pickup</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Transactions Table */}
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID Transaksi</TableHead>
                      <TableHead>Tanggal</TableHead>
                      <TableHead>Jenis Sampah</TableHead>
                      <TableHead>Berat (kg)</TableHead>
                      <TableHead>Harga/kg</TableHead>
                      <TableHead>Poin</TableHead>
                      <TableHead>Metode</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTransactions.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                          Tidak ada transaksi yang ditemukan
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredTransactions.map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell className="font-medium">{transaction.id}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-gray-400" />
                              {new Date(transaction.date).toLocaleDateString('id-ID', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                              })}
                            </div>
                          </TableCell>
                          <TableCell>{transaction.type}</TableCell>
                          <TableCell>{transaction.weight.toFixed(1)} kg</TableCell>
                          <TableCell>{transaction.pointsPerKg.toLocaleString()} poin</TableCell>
                          <TableCell className="font-semibold text-green-600">
                            +{transaction.points.toLocaleString()}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={
                                transaction.method === 'Pickup'
                                  ? 'bg-blue-50 text-blue-700 border-blue-200'
                                  : 'bg-purple-50 text-purple-700 border-purple-200'
                              }
                            >
                              {transaction.method}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge className="bg-green-100 text-green-700 border-green-200">
                              Selesai
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
