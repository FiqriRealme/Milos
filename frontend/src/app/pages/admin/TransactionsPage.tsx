import { useState } from 'react';
import { DashboardNavbar } from '../../components/DashboardNavbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Badge } from '../../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import {
  CheckCircle2,
  XCircle,
  Clock,
  Search,
  Calendar,
  Package,
  User,
  Award,
  Eye,
} from 'lucide-react';
import { toast } from 'sonner';

interface Transaction {
  id: string;
  customerId: string;
  customerName: string;
  wasteType: string;
  weight: number;
  pointsPerKg: number;
  totalPoints: number;
  date: string;
  method: 'Drop-off' | 'Pickup';
  status: 'pending' | 'verified' | 'rejected';
  notes?: string;
}

const initialTransactions: Transaction[] = [
  {
    id: 'TRX-089',
    customerId: 'CST-045',
    customerName: 'Maria Ulfah',
    wasteType: 'Plastik PET',
    weight: 2.5,
    pointsPerKg: 1000,
    totalPoints: 2500,
    date: '2026-04-16',
    method: 'Drop-off',
    status: 'verified',
  },
  {
    id: 'TRX-088',
    customerId: 'CST-023',
    customerName: 'Andi Wijaya',
    wasteType: 'Kardus',
    weight: 4.2,
    pointsPerKg: 600,
    totalPoints: 2520,
    date: '2026-04-16',
    method: 'Pickup',
    status: 'verified',
  },
  {
    id: 'TRX-087',
    customerId: 'CST-067',
    customerName: 'Dewi Sartika',
    wasteType: 'Logam/Kaleng',
    weight: 1.8,
    pointsPerKg: 1500,
    totalPoints: 2700,
    date: '2026-04-15',
    method: 'Drop-off',
    status: 'pending',
    notes: 'Menunggu verifikasi berat',
  },
  {
    id: 'TRX-086',
    customerId: 'CST-012',
    customerName: 'Rudi Hermawan',
    wasteType: 'Plastik HDPE',
    weight: 3.5,
    pointsPerKg: 800,
    totalPoints: 2800,
    date: '2026-04-15',
    method: 'Pickup',
    status: 'pending',
  },
  {
    id: 'TRX-085',
    customerId: 'CST-089',
    customerName: 'Fitri Handayani',
    wasteType: 'Kertas',
    weight: 6.0,
    pointsPerKg: 300,
    totalPoints: 1800,
    date: '2026-04-14',
    method: 'Drop-off',
    status: 'verified',
  },
];

const wasteTypes = [
  { value: 'Plastik PET', pointsPerKg: 1000 },
  { value: 'Plastik HDPE', pointsPerKg: 800 },
  { value: 'Kardus', pointsPerKg: 600 },
  { value: 'Botol Plastik', pointsPerKg: 500 },
  { value: 'Kertas', pointsPerKg: 300 },
  { value: 'Logam/Kaleng', pointsPerKg: 1500 },
  { value: 'Kaca/Botol Kaca', pointsPerKg: 400 },
];

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [isVerifyDialogOpen, setIsVerifyDialogOpen] = useState(false);
  const [verifyData, setVerifyData] = useState({
    weight: '',
    wasteType: '',
    notes: '',
  });

  const handleVerify = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setVerifyData({
      weight: String(transaction.weight),
      wasteType: transaction.wasteType,
      notes: transaction.notes || '',
    });
    setIsVerifyDialogOpen(true);
  };

  const handleApprove = () => {
    if (!selectedTransaction) return;

    const wasteTypeData = wasteTypes.find((w) => w.value === verifyData.wasteType);
    const weight = Number(verifyData.weight);
    const totalPoints = weight * (wasteTypeData?.pointsPerKg || 0);

    setTransactions(
      transactions.map((t) =>
        t.id === selectedTransaction.id
          ? {
              ...t,
              weight,
              wasteType: verifyData.wasteType,
              pointsPerKg: wasteTypeData?.pointsPerKg || 0,
              totalPoints,
              status: 'verified',
              notes: verifyData.notes,
            }
          : t
      )
    );

    toast.success('Transaksi berhasil diverifikasi');
    setIsVerifyDialogOpen(false);
    setSelectedTransaction(null);
  };

  const handleReject = (id: string) => {
    if (confirm('Apakah Anda yakin ingin menolak transaksi ini?')) {
      setTransactions(
        transactions.map((t) => (t.id === id ? { ...t, status: 'rejected' } : t))
      );
      toast.success('Transaksi ditolak');
    }
  };

  const filteredTransactions = (status?: string) => {
    return transactions.filter((t) => {
      const matchesSearch =
        t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.wasteType.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = !status || t.status === status;
      return matchesSearch && matchesStatus;
    });
  };

  const stats = {
    pending: transactions.filter((t) => t.status === 'pending').length,
    verified: transactions.filter((t) => t.status === 'verified').length,
    rejected: transactions.filter((t) => t.status === 'rejected').length,
    total: transactions.length,
  };

  const getStatusBadge = (status: string) => {
    const badges = {
      pending: <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200">Pending</Badge>,
      verified: <Badge className="bg-green-100 text-green-700 border-green-200">Terverifikasi</Badge>,
      rejected: <Badge className="bg-red-100 text-red-700 border-red-200">Ditolak</Badge>,
    };
    return badges[status as keyof typeof badges];
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNavbar />

      <div className="pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Kelola Transaksi</h1>
            <p className="text-gray-600 mt-2">
              Verifikasi dan kelola semua transaksi penyerahan sampah
            </p>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Total Transaksi</CardDescription>
                <CardTitle className="text-3xl">{stats.total}</CardTitle>
              </CardHeader>
            </Card>
            <Card className="border-yellow-200 bg-yellow-50">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardDescription className="text-yellow-700">Pending</CardDescription>
                    <CardTitle className="text-3xl text-yellow-600">{stats.pending}</CardTitle>
                  </div>
                  <div className="w-10 h-10 bg-yellow-200 rounded-lg flex items-center justify-center">
                    <Clock className="w-5 h-5 text-yellow-700" />
                  </div>
                </div>
              </CardHeader>
            </Card>
            <Card className="border-green-200 bg-green-50">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardDescription className="text-green-700">Terverifikasi</CardDescription>
                    <CardTitle className="text-3xl text-green-600">{stats.verified}</CardTitle>
                  </div>
                  <div className="w-10 h-10 bg-green-200 rounded-lg flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-green-700" />
                  </div>
                </div>
              </CardHeader>
            </Card>
            <Card className="border-red-200 bg-red-50">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardDescription className="text-red-700">Ditolak</CardDescription>
                    <CardTitle className="text-3xl text-red-600">{stats.rejected}</CardTitle>
                  </div>
                  <div className="w-10 h-10 bg-red-200 rounded-lg flex items-center justify-center">
                    <XCircle className="w-5 h-5 text-red-700" />
                  </div>
                </div>
              </CardHeader>
            </Card>
          </div>

          {/* Transactions */}
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle>Semua Transaksi</CardTitle>
                  <CardDescription>Verifikasi dan kelola transaksi nasabah</CardDescription>
                </div>
                <div className="relative md:w-96">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Cari berdasarkan ID, nasabah, atau jenis sampah..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all">
                <TabsList>
                  <TabsTrigger value="all">
                    Semua ({stats.total})
                  </TabsTrigger>
                  <TabsTrigger value="pending">
                    Pending ({stats.pending})
                  </TabsTrigger>
                  <TabsTrigger value="verified">
                    Terverifikasi ({stats.verified})
                  </TabsTrigger>
                  <TabsTrigger value="rejected">
                    Ditolak ({stats.rejected})
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="mt-6">
                  <TransactionTable
                    transactions={filteredTransactions()}
                    onVerify={handleVerify}
                    onReject={handleReject}
                    getStatusBadge={getStatusBadge}
                  />
                </TabsContent>

                <TabsContent value="pending" className="mt-6">
                  <TransactionTable
                    transactions={filteredTransactions('pending')}
                    onVerify={handleVerify}
                    onReject={handleReject}
                    getStatusBadge={getStatusBadge}
                  />
                </TabsContent>

                <TabsContent value="verified" className="mt-6">
                  <TransactionTable
                    transactions={filteredTransactions('verified')}
                    onVerify={handleVerify}
                    onReject={handleReject}
                    getStatusBadge={getStatusBadge}
                  />
                </TabsContent>

                <TabsContent value="rejected" className="mt-6">
                  <TransactionTable
                    transactions={filteredTransactions('rejected')}
                    onVerify={handleVerify}
                    onReject={handleReject}
                    getStatusBadge={getStatusBadge}
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Verify Dialog */}
      <Dialog open={isVerifyDialogOpen} onOpenChange={setIsVerifyDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Verifikasi Transaksi</DialogTitle>
            <DialogDescription>
              Periksa dan verifikasi detail transaksi sebelum menyetujui
            </DialogDescription>
          </DialogHeader>

          {selectedTransaction && (
            <div className="space-y-4 py-4">
              <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">ID Transaksi:</span>
                  <span className="font-semibold">{selectedTransaction.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Nasabah:</span>
                  <span className="font-semibold">{selectedTransaction.customerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tanggal:</span>
                  <span>
                    {new Date(selectedTransaction.date).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Metode:</span>
                  <span>{selectedTransaction.method}</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="wasteType">Jenis Sampah *</Label>
                <select
                  id="wasteType"
                  className="w-full h-10 px-3 rounded-md border border-gray-200 bg-white"
                  value={verifyData.wasteType}
                  onChange={(e) => setVerifyData({ ...verifyData, wasteType: e.target.value })}
                  required
                >
                  {wasteTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.value} ({type.pointsPerKg.toLocaleString()} poin/kg)
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="weight">Berat Aktual (kg) *</Label>
                <Input
                  id="weight"
                  type="number"
                  step="0.1"
                  min="0.1"
                  value={verifyData.weight}
                  onChange={(e) => setVerifyData({ ...verifyData, weight: e.target.value })}
                  required
                />
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <div className="text-sm text-gray-600 mb-1">Total Poin</div>
                <div className="text-2xl font-bold text-green-600">
                  {(
                    Number(verifyData.weight) *
                    (wasteTypes.find((w) => w.value === verifyData.wasteType)?.pointsPerKg || 0)
                  ).toLocaleString()}{' '}
                  poin
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Catatan (Opsional)</Label>
                <Input
                  id="notes"
                  placeholder="Catatan tambahan..."
                  value={verifyData.notes}
                  onChange={(e) => setVerifyData({ ...verifyData, notes: e.target.value })}
                />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsVerifyDialogOpen(false)}>
              Batal
            </Button>
            <Button className="bg-green-600 hover:bg-green-700" onClick={handleApprove}>
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Verifikasi
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function TransactionTable({
  transactions,
  onVerify,
  onReject,
  getStatusBadge,
}: {
  transactions: Transaction[];
  onVerify: (transaction: Transaction) => void;
  onReject: (id: string) => void;
  getStatusBadge: (status: string) => React.ReactNode;
}) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Nasabah</TableHead>
            <TableHead>Tanggal</TableHead>
            <TableHead>Jenis Sampah</TableHead>
            <TableHead>Berat</TableHead>
            <TableHead>Poin</TableHead>
            <TableHead>Metode</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.length === 0 ? (
            <TableRow>
              <TableCell colSpan={9} className="text-center py-8 text-gray-500">
                Tidak ada transaksi yang ditemukan
              </TableCell>
            </TableRow>
          ) : (
            transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell className="font-medium">{transaction.id}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-gray-400" />
                    <div>
                      <div className="font-medium">{transaction.customerName}</div>
                      <div className="text-xs text-gray-500">{transaction.customerId}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    {new Date(transaction.date).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'short',
                    })}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4 text-gray-400" />
                    {transaction.wasteType}
                  </div>
                </TableCell>
                <TableCell>{transaction.weight.toFixed(1)} kg</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1 text-green-600 font-semibold">
                    <Award className="w-4 h-4" />
                    {transaction.totalPoints.toLocaleString()}
                  </div>
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
                <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    {transaction.status === 'pending' && (
                      <>
                        <Button
                          size="sm"
                          className="bg-green-600 hover:bg-green-700"
                          onClick={() => onVerify(transaction)}
                        >
                          <CheckCircle2 className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => onReject(transaction.id)}
                        >
                          <XCircle className="w-4 h-4 text-red-600" />
                        </Button>
                      </>
                    )}
                    {transaction.status !== 'pending' && (
                      <Button size="sm" variant="ghost">
                        <Eye className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
