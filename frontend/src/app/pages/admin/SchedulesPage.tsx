import { useState } from 'react';
import { DashboardNavbar } from '../../components/DashboardNavbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { ScheduleCalendar } from '../../components/ScheduleCalendar';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import { Calendar, Clock, MapPin, Plus, Edit, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

interface Schedule {
  id: string;
  area: string;
  days: string[];
  timeStart: string;
  timeEnd: string;
  status: 'active' | 'inactive';
}

const initialSchedules: Schedule[] = [
  {
    id: '1',
    area: 'Kelurahan Kebon Jeruk',
    days: ['Senin', 'Kamis'],
    timeStart: '07:00',
    timeEnd: '10:00',
    status: 'active',
  },
  {
    id: '2',
    area: 'Kelurahan Palmerah',
    days: ['Selasa', 'Jumat'],
    timeStart: '07:00',
    timeEnd: '10:00',
    status: 'active',
  },
  {
    id: '3',
    area: 'Kelurahan Tomang',
    days: ['Rabu', 'Sabtu'],
    timeStart: '08:00',
    timeEnd: '11:00',
    status: 'active',
  },
  {
    id: '4',
    area: 'Kelurahan Grogol',
    days: ['Senin', 'Kamis'],
    timeStart: '13:00',
    timeEnd: '16:00',
    status: 'active',
  },
];

const daysOfWeek = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];

export default function SchedulesPage() {
  const [schedules, setSchedules] = useState<Schedule[]>(initialSchedules);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState<Schedule | null>(null);
  const [formData, setFormData] = useState({
    area: '',
    days: [] as string[],
    timeStart: '',
    timeEnd: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingSchedule) {
      // Update existing schedule
      setSchedules(
        schedules.map((s) =>
          s.id === editingSchedule.id
            ? { ...s, ...formData, status: 'active' }
            : s
        )
      );
      toast.success('Jadwal berhasil diperbarui');
    } else {
      // Add new schedule
      const newSchedule: Schedule = {
        id: String(schedules.length + 1),
        ...formData,
        status: 'active',
      };
      setSchedules([...schedules, newSchedule]);
      toast.success('Jadwal berhasil ditambahkan');
    }

    setIsDialogOpen(false);
    resetForm();
  };

  const handleEdit = (schedule: Schedule) => {
    setEditingSchedule(schedule);
    setFormData({
      area: schedule.area,
      days: schedule.days,
      timeStart: schedule.timeStart,
      timeEnd: schedule.timeEnd,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus jadwal ini?')) {
      setSchedules(schedules.filter((s) => s.id !== id));
      toast.success('Jadwal berhasil dihapus');
    }
  };

  const toggleStatus = (id: string) => {
    setSchedules(
      schedules.map((s) =>
        s.id === id
          ? { ...s, status: s.status === 'active' ? 'inactive' : 'active' }
          : s
      )
    );
    toast.success('Status jadwal berhasil diubah');
  };

  const resetForm = () => {
    setFormData({
      area: '',
      days: [],
      timeStart: '',
      timeEnd: '',
    });
    setEditingSchedule(null);
  };

  const handleDayToggle = (day: string) => {
    setFormData({
      ...formData,
      days: formData.days.includes(day)
        ? formData.days.filter((d) => d !== day)
        : [...formData.days, day],
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNavbar />

      <div className="pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Kelola Jadwal Pengambilan</h1>
            <p className="text-gray-600 mt-2">
              Atur jadwal pengambilan sampah untuk setiap wilayah
            </p>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Total Jadwal</CardDescription>
                <CardTitle className="text-3xl">{schedules.length}</CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Jadwal Aktif</CardDescription>
                <CardTitle className="text-3xl text-green-600">
                  {schedules.filter((s) => s.status === 'active').length}
                </CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Area Terlayani</CardDescription>
                <CardTitle className="text-3xl">{schedules.length}</CardTitle>
              </CardHeader>
            </Card>
            <Card className="bg-green-50 border-green-200">
              <CardHeader className="pb-3">
                <CardDescription className="text-green-700">Hari Kerja</CardDescription>
                <CardTitle className="text-3xl text-green-600">6</CardTitle>
              </CardHeader>
            </Card>
          </div>

          {/* Schedules Table */}
          <div className="mb-8">
            <ScheduleCalendar />
          </div>

          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>Jadwal Pengambilan</CardTitle>
                  <CardDescription>Daftar semua jadwal pengambilan sampah</CardDescription>
                </div>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-green-600 hover:bg-green-700" onClick={resetForm}>
                      <Plus className="w-4 h-4 mr-2" />
                      Tambah Jadwal
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <form onSubmit={handleSubmit}>
                      <DialogHeader>
                        <DialogTitle>
                          {editingSchedule ? 'Edit Jadwal' : 'Tambah Jadwal Baru'}
                        </DialogTitle>
                        <DialogDescription>
                          Isi informasi jadwal pengambilan sampah
                        </DialogDescription>
                      </DialogHeader>

                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="area">Wilayah *</Label>
                          <Input
                            id="area"
                            placeholder="Contoh: Kelurahan Kebon Jeruk"
                            value={formData.area}
                            onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Hari *</Label>
                          <div className="grid grid-cols-2 gap-2">
                            {daysOfWeek.map((day) => (
                              <Button
                                key={day}
                                type="button"
                                variant={formData.days.includes(day) ? 'default' : 'outline'}
                                size="sm"
                                className={
                                  formData.days.includes(day)
                                    ? 'bg-green-600 hover:bg-green-700'
                                    : ''
                                }
                                onClick={() => handleDayToggle(day)}
                              >
                                {day}
                              </Button>
                            ))}
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="timeStart">Waktu Mulai *</Label>
                            <Input
                              id="timeStart"
                              type="time"
                              value={formData.timeStart}
                              onChange={(e) =>
                                setFormData({ ...formData, timeStart: e.target.value })
                              }
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="timeEnd">Waktu Selesai *</Label>
                            <Input
                              id="timeEnd"
                              type="time"
                              value={formData.timeEnd}
                              onChange={(e) =>
                                setFormData({ ...formData, timeEnd: e.target.value })
                              }
                              required
                            />
                          </div>
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
                          {editingSchedule ? 'Simpan Perubahan' : 'Tambah Jadwal'}
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
                      <TableHead>Wilayah</TableHead>
                      <TableHead>Hari</TableHead>
                      <TableHead>Waktu</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {schedules.map((schedule) => (
                      <TableRow key={schedule.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-gray-400" />
                            <span className="font-medium">{schedule.area}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            <span>{schedule.days.join(', ')}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-gray-400" />
                            <span>
                              {schedule.timeStart} - {schedule.timeEnd} WIB
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={
                              schedule.status === 'active'
                                ? 'bg-green-100 text-green-700 border-green-200 cursor-pointer'
                                : 'bg-gray-100 text-gray-700 border-gray-200 cursor-pointer'
                            }
                            onClick={() => toggleStatus(schedule.id)}
                          >
                            {schedule.status === 'active' ? 'Aktif' : 'Nonaktif'}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEdit(schedule)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDelete(schedule.id)}
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