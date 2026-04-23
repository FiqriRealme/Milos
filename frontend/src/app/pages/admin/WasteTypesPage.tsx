import { useState } from 'react';
import { DashboardNavbar } from '../../components/DashboardNavbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Badge } from '../../components/ui/badge';
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
  DialogTrigger,
} from '../../components/ui/dialog';
import { Recycle, Plus, Edit, Trash2, Award } from 'lucide-react';
import { toast } from 'sonner';

interface WasteType {
  id: string;
  name: string;
  category: string;
  pointsPerKg: number;
  description: string;
  status: 'active' | 'inactive';
}

const initialWasteTypes: WasteType[] = [
  {
    id: '1',
    name: 'Plastik PET',
    category: 'Plastik',
    pointsPerKg: 1000,
    description: 'Botol minuman plastik, wadah makanan transparan',
    status: 'active',
  },
  {
    id: '2',
    name: 'Plastik HDPE',
    category: 'Plastik',
    pointsPerKg: 800,
    description: 'Botol susu, botol detergen, botol shampoo',
    status: 'active',
  },
  {
    id: '3',
    name: 'Kardus',
    category: 'Kertas',
    pointsPerKg: 600,
    description: 'Kardus bekas kemasan dalam kondisi bersih',
    status: 'active',
  },
  {
    id: '4',
    name: 'Botol Plastik',
    category: 'Plastik',
    pointsPerKg: 500,
    description: 'Botol plastik warna (bukan transparan)',
    status: 'active',
  },
  {
    id: '5',
    name: 'Kertas',
    category: 'Kertas',
    pointsPerKg: 300,
    description: 'Kertas HVS, koran, majalah dalam kondisi bersih',
    status: 'active',
  },
  {
    id: '6',
    name: 'Logam/Kaleng',
    category: 'Logam',
    pointsPerKg: 1500,
    description: 'Kaleng minuman, kaleng makanan aluminium',
    status: 'active',
  },
  {
    id: '7',
    name: 'Kaca/Botol Kaca',
    category: 'Kaca',
    pointsPerKg: 400,
    description: 'Botol kaca beling, toples kaca',
    status: 'active',
  },
];

const categories = ['Plastik', 'Kertas', 'Logam', 'Kaca', 'Lainnya'];

export default function WasteTypesPage() {
  const [wasteTypes, setWasteTypes] = useState<WasteType[]>(initialWasteTypes);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingWasteType, setEditingWasteType] = useState<WasteType | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    pointsPerKg: '',
    description: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingWasteType) {
      // Update existing waste type
      setWasteTypes(
        wasteTypes.map((w) =>
          w.id === editingWasteType.id
            ? { ...w, ...formData, pointsPerKg: Number(formData.pointsPerKg), status: 'active' }
            : w
        )
      );
      toast.success('Jenis sampah berhasil diperbarui');
    } else {
      // Add new waste type
      const newWasteType: WasteType = {
        id: String(wasteTypes.length + 1),
        ...formData,
        pointsPerKg: Number(formData.pointsPerKg),
        status: 'active',
      };
      setWasteTypes([...wasteTypes, newWasteType]);
      toast.success('Jenis sampah berhasil ditambahkan');
    }

    setIsDialogOpen(false);
    resetForm();
  };

  const handleEdit = (wasteType: WasteType) => {
    setEditingWasteType(wasteType);
    setFormData({
      name: wasteType.name,
      category: wasteType.category,
      pointsPerKg: String(wasteType.pointsPerKg),
      description: wasteType.description,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus jenis sampah ini?')) {
      setWasteTypes(wasteTypes.filter((w) => w.id !== id));
      toast.success('Jenis sampah berhasil dihapus');
    }
  };

  const toggleStatus = (id: string) => {
    setWasteTypes(
      wasteTypes.map((w) =>
        w.id === id
          ? { ...w, status: w.status === 'active' ? 'inactive' : 'active' }
          : w
      )
    );
    toast.success('Status jenis sampah berhasil diubah');
  };

  const resetForm = () => {
    setFormData({
      name: '',
      category: '',
      pointsPerKg: '',
      description: '',
    });
    setEditingWasteType(null);
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      Plastik: 'bg-blue-100 text-blue-700 border-blue-200',
      Kertas: 'bg-yellow-100 text-yellow-700 border-yellow-200',
      Logam: 'bg-gray-100 text-gray-700 border-gray-200',
      Kaca: 'bg-purple-100 text-purple-700 border-purple-200',
      Lainnya: 'bg-green-100 text-green-700 border-green-200',
    };
    return colors[category] || colors.Lainnya;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNavbar />

      <div className="pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Kelola Jenis Sampah</h1>
            <p className="text-gray-600 mt-2">
              Atur jenis sampah dan nilai poin per kilogram
            </p>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Total Jenis</CardDescription>
                <CardTitle className="text-3xl">{wasteTypes.length}</CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Jenis Aktif</CardDescription>
                <CardTitle className="text-3xl text-green-600">
                  {wasteTypes.filter((w) => w.status === 'active').length}
                </CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Kategori</CardDescription>
                <CardTitle className="text-3xl">
                  {new Set(wasteTypes.map((w) => w.category)).size}
                </CardTitle>
              </CardHeader>
            </Card>
            <Card className="bg-green-50 border-green-200">
              <CardHeader className="pb-3">
                <CardDescription className="text-green-700">Rata-rata Poin/kg</CardDescription>
                <CardTitle className="text-3xl text-green-600">
                  {Math.round(
                    wasteTypes.reduce((sum, w) => sum + w.pointsPerKg, 0) / wasteTypes.length
                  ).toLocaleString()}
                </CardTitle>
              </CardHeader>
            </Card>
          </div>

          {/* Waste Types Table */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>Jenis Sampah</CardTitle>
                  <CardDescription>Daftar semua jenis sampah dan nilai poinnya</CardDescription>
                </div>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-green-600 hover:bg-green-700" onClick={resetForm}>
                      <Plus className="w-4 h-4 mr-2" />
                      Tambah Jenis Sampah
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <form onSubmit={handleSubmit}>
                      <DialogHeader>
                        <DialogTitle>
                          {editingWasteType ? 'Edit Jenis Sampah' : 'Tambah Jenis Sampah Baru'}
                        </DialogTitle>
                        <DialogDescription>
                          Isi informasi jenis sampah dan nilai poinnya
                        </DialogDescription>
                      </DialogHeader>

                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Nama Jenis Sampah *</Label>
                          <Input
                            id="name"
                            placeholder="Contoh: Plastik PET"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="category">Kategori *</Label>
                          <select
                            id="category"
                            className="w-full h-10 px-3 rounded-md border border-gray-200 bg-white"
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            required
                          >
                            <option value="">Pilih kategori</option>
                            {categories.map((cat) => (
                              <option key={cat} value={cat}>
                                {cat}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="pointsPerKg">Poin per Kilogram *</Label>
                          <Input
                            id="pointsPerKg"
                            type="number"
                            min="0"
                            step="100"
                            placeholder="Contoh: 1000"
                            value={formData.pointsPerKg}
                            onChange={(e) =>
                              setFormData({ ...formData, pointsPerKg: e.target.value })
                            }
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="description">Deskripsi</Label>
                          <Textarea
                            id="description"
                            placeholder="Deskripsi dan contoh sampah..."
                            className="min-h-20"
                            value={formData.description}
                            onChange={(e) =>
                              setFormData({ ...formData, description: e.target.value })
                            }
                          />
                        </div>
                      </div>

                      <DialogFooter>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => {
                            setIsDialogOpen(false);
                            resetForm();
                          }}
                        >
                          Batal
                        </Button>
                        <Button type="submit" className="bg-green-600 hover:bg-green-700">
                          {editingWasteType ? 'Simpan Perubahan' : 'Tambah Jenis Sampah'}
                        </Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nama</TableHead>
                      <TableHead>Kategori</TableHead>
                      <TableHead>Poin/kg</TableHead>
                      <TableHead>Deskripsi</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {wasteTypes.map((wasteType) => (
                      <TableRow key={wasteType.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Recycle className="w-4 h-4 text-green-600" />
                            <span className="font-medium">{wasteType.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={getCategoryColor(wasteType.category)}>
                            {wasteType.category}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Award className="w-4 h-4 text-green-600" />
                            <span className="font-semibold text-green-600">
                              {wasteType.pointsPerKg.toLocaleString()}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="max-w-xs">
                          <span className="text-sm text-gray-600 line-clamp-2">
                            {wasteType.description}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={
                              wasteType.status === 'active'
                                ? 'bg-green-100 text-green-700 border-green-200 cursor-pointer'
                                : 'bg-gray-100 text-gray-700 border-gray-200 cursor-pointer'
                            }
                            onClick={() => toggleStatus(wasteType.id)}
                          >
                            {wasteType.status === 'active' ? 'Aktif' : 'Nonaktif'}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEdit(wasteType)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDelete(wasteType.id)}
                            >
                              <Trash2 className="w-4 h-4 text-red-600" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
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
