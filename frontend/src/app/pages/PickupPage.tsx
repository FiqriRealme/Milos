import { useState } from 'react';
import { DashboardNavbar } from '../components/DashboardNavbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { Calendar, Clock, MapPin, Package, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

const wasteTypes = [
  { value: 'plastik-pet', label: 'Plastik PET' },
  { value: 'plastik-hdpe', label: 'Plastik HDPE' },
  { value: 'kardus', label: 'Kardus' },
  { value: 'botol-plastik', label: 'Botol Plastik' },
  { value: 'kertas', label: 'Kertas' },
  { value: 'logam', label: 'Logam/Kaleng' },
  { value: 'kaca', label: 'Kaca/Botol Kaca' },
];

const timeSlots = [
  '07:00 - 09:00',
  '09:00 - 11:00',
  '11:00 - 13:00',
  '13:00 - 15:00',
  '15:00 - 17:00',
];

export default function PickupPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    wasteType: '',
    estimatedWeight: '',
    pickupDate: '',
    timeSlot: '',
    address: user?.address || '',
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate submission
    setSubmitted(true);
    toast.success('Permintaan pickup berhasil diajukan!');
    
    // Reset form after 3 seconds and redirect
    setTimeout(() => {
      navigate('/dashboard');
    }, 3000);
  };

  const handleChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <DashboardNavbar />
        <div className="pt-20 pb-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <Card className="text-center">
              <CardContent className="pt-12 pb-12">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-10 h-10 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Permintaan Pickup Berhasil!
                </h2>
                <p className="text-gray-600 mb-6">
                  Permintaan pickup Anda telah kami terima. Tim kami akan segera menghubungi Anda
                  untuk konfirmasi jadwal.
                </p>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 text-left">
                  <h3 className="font-semibold text-gray-900 mb-3">Detail Pickup:</h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex gap-2">
                      <Package className="w-4 h-4 mt-0.5" />
                      <span>Jenis: {wasteTypes.find(w => w.value === formData.wasteType)?.label}</span>
                    </div>
                    <div className="flex gap-2">
                      <Calendar className="w-4 h-4 mt-0.5" />
                      <span>Tanggal: {new Date(formData.pickupDate).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</span>
                    </div>
                    <div className="flex gap-2">
                      <Clock className="w-4 h-4 mt-0.5" />
                      <span>Waktu: {formData.timeSlot} WIB</span>
                    </div>
                  </div>
                </div>
                <Button
                  className="bg-green-600 hover:bg-green-700"
                  onClick={() => navigate('/dashboard')}
                >
                  Kembali ke Dashboard
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNavbar />

      <div className="pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Ajukan Pickup</h1>
            <p className="text-gray-600 mt-2">
              Isi formulir di bawah untuk mengajukan penjemputan sampah ke lokasi Anda
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Form */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Formulir Pickup</CardTitle>
                <CardDescription>
                  Pastikan semua informasi yang Anda masukkan sudah benar
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="wasteType">Jenis Sampah *</Label>
                    <Select
                      value={formData.wasteType}
                      onValueChange={(value) => handleChange('wasteType', value)}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih jenis sampah" />
                      </SelectTrigger>
                      <SelectContent>
                        {wasteTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="estimatedWeight">Estimasi Berat (kg) *</Label>
                    <Input
                      id="estimatedWeight"
                      type="number"
                      step="0.1"
                      min="0.1"
                      placeholder="Contoh: 5.5"
                      value={formData.estimatedWeight}
                      onChange={(e) => handleChange('estimatedWeight', e.target.value)}
                      required
                    />
                    <p className="text-xs text-gray-500">
                      Perkiraan berat sampah yang akan diserahkan
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="pickupDate">Tanggal Pickup *</Label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="pickupDate"
                          type="date"
                          className="pl-10"
                          min={new Date().toISOString().split('T')[0]}
                          value={formData.pickupDate}
                          onChange={(e) => handleChange('pickupDate', e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="timeSlot">Waktu Pickup *</Label>
                      <Select
                        value={formData.timeSlot}
                        onValueChange={(value) => handleChange('timeSlot', value)}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih waktu" />
                        </SelectTrigger>
                        <SelectContent>
                          {timeSlots.map((slot) => (
                            <SelectItem key={slot} value={slot}>
                              {slot} WIB
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Alamat Pickup *</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Textarea
                        id="address"
                        className="pl-10 min-h-24"
                        placeholder="Alamat lengkap untuk pickup"
                        value={formData.address}
                        onChange={(e) => handleChange('address', e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Catatan Tambahan (Opsional)</Label>
                    <Textarea
                      id="notes"
                      className="min-h-20"
                      placeholder="Informasi tambahan seperti patokan lokasi, kondisi sampah, dll"
                      value={formData.notes}
                      onChange={(e) => handleChange('notes', e.target.value)}
                    />
                  </div>

                  <div className="flex gap-3">
                    <Button
                      type="submit"
                      className="flex-1 bg-green-600 hover:bg-green-700"
                    >
                      Ajukan Pickup
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => navigate('/dashboard')}
                    >
                      Batal
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Info Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Informasi Penting</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">⏰ Waktu Layanan</h4>
                    <p className="text-gray-600">
                      Senin - Sabtu: 07:00 - 17:00 WIB
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">📦 Minimum Berat</h4>
                    <p className="text-gray-600">
                      Minimum 2 kg untuk layanan pickup gratis
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">✅ Persiapan Sampah</h4>
                    <p className="text-gray-600">
                      Pastikan sampah sudah dipisahkan dan dalam kondisi bersih
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">📞 Konfirmasi</h4>
                    <p className="text-gray-600">
                      Tim kami akan menghubungi 1 hari sebelum jadwal pickup
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-green-50 border-green-200">
                <CardHeader>
                  <CardTitle className="text-lg text-green-900">💡 Tips</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-green-800">
                  <ul className="space-y-2 list-disc list-inside">
                    <li>Pisahkan sampah berdasarkan jenisnya</li>
                    <li>Bersihkan sampah dari sisa makanan</li>
                    <li>Lipat kardus agar tidak memakan tempat</li>
                    <li>Kumpulkan dalam wadah yang rapi</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
