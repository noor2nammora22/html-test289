
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Calendar, Search, Package, User, CheckCircle, XCircle, Plus, Minus, ArrowLeft } from 'lucide-react';
import AppHeader from '@/components/AppHeader';
import BottomNavigation from '@/components/BottomNavigation';

interface HistoryRecord {
  id: number;
  type: 'reservation' | 'delivery' | 'cancellation' | 'material_add' | 'material_remove' | 'user_add';
  description: string;
  userName: string;
  itemName?: string;
  quantity?: number;
  date: string;
  time: string;
  status: 'completed' | 'cancelled';
}

const History = () => {
  const [userType, setUserType] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const storedUserType = localStorage.getItem('userType');
    
    if (!isLoggedIn || storedUserType !== 'admin') {
      navigate('/');
      return;
    }
    
    setUserType(storedUserType);
  }, [navigate]);

  const [history] = useState<HistoryRecord[]>([
    {
      id: 1,
      type: 'delivery',
      description: 'تم تسليم 5 ألواح شمسية 300 وات',
      userName: 'فاطمة علي',
      itemName: 'لوح شمسي 300 وات',
      quantity: 5,
      date: '2024-12-28',
      time: '14:30',
      status: 'completed'
    },
    {
      id: 2,
      type: 'reservation',
      description: 'تم إنشاء حجز جديد لبطاريات ليثيوم',
      userName: 'أحمد محمد',
      itemName: 'بطارية ليثيوم 100 أمبير',
      quantity: 2,
      date: '2024-12-28',
      time: '10:15',
      status: 'completed'
    },
    {
      id: 3,
      type: 'material_add',
      description: 'تم إضافة مواد جديدة للمخزن',
      userName: 'مسؤول النظام',
      itemName: 'كابل DC 6mm',
      quantity: 100,
      date: '2024-12-27',
      time: '16:45',
      status: 'completed'
    },
    {
      id: 4,
      type: 'cancellation',
      description: 'تم إلغاء حجز الكابلات',
      userName: 'خالد سعيد',
      itemName: 'كابل DC 4mm',
      quantity: 50,
      date: '2024-12-26',
      time: '09:20',
      status: 'cancelled'
    },
    {
      id: 5,
      type: 'user_add',
      description: 'تم إضافة مستخدم جديد للنظام',
      userName: 'مسؤول النظام',
      date: '2024-12-25',
      time: '11:30',
      status: 'completed'
    },
    {
      id: 6,
      type: 'delivery',
      description: 'تم تسليم 3 بطاريات ليثيوم 200 أمبير',
      userName: 'سارة أحمد',
      itemName: 'بطارية ليثيوم 200 أمبير',
      quantity: 3,
      date: '2024-12-24',
      time: '13:15',
      status: 'completed'
    }
  ]);

  const typeOptions = [
    { value: 'all', label: 'جميع العمليات' },
    { value: 'reservation', label: 'الحجوزات' },
    { value: 'delivery', label: 'التسليم' },
    { value: 'cancellation', label: 'الإلغاءات' },
    { value: 'material_add', label: 'إضافة مواد' },
    { value: 'material_remove', label: 'إزالة مواد' },
    { value: 'user_add', label: 'إضافة مستخدمين' }
  ];

  const filteredHistory = history.filter(record => {
    const matchesSearch = record.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (record.itemName && record.itemName.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesDate = !selectedDate || record.date === selectedDate;
    const matchesType = selectedType === 'all' || record.type === selectedType;
    
    return matchesSearch && matchesDate && matchesType;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'reservation':
        return <Package className="h-4 w-4" />;
      case 'delivery':
        return <CheckCircle className="h-4 w-4" />;
      case 'cancellation':
        return <XCircle className="h-4 w-4" />;
      case 'material_add':
        return <Plus className="h-4 w-4" />;
      case 'material_remove':
        return <Minus className="h-4 w-4" />;
      case 'user_add':
        return <User className="h-4 w-4" />;
      default:
        return <Package className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'reservation':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'delivery':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'cancellation':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'material_add':
        return 'bg-teal-100 text-teal-800 border-teal-300';
      case 'material_remove':
        return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'user_add':
        return 'bg-purple-100 text-purple-800 border-purple-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getTypeLabel = (type: string) => {
    const option = typeOptions.find(opt => opt.value === type);
    return option ? option.label : type;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 pb-20">
      <AppHeader 
        title="سجل العمليات" 
        subtitle="تتبع جميع العمليات والأنشطة"
        showNotifications={true}
        notificationCount={3}
      />

      <div className="p-4">
        {/* Header with Back Button */}
        <div className="flex items-center justify-between mb-6">
          <Button 
            variant="outline" 
            onClick={() => navigate('/admin')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            العودة للوحة التحكم
          </Button>
        </div>

        {/* Filters */}
        <Card className="mb-6 bg-white shadow-lg border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              البحث والتصفية
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">البحث</label>
                <div className="relative">
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="البحث في العمليات..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pr-10"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">التاريخ</label>
                <div className="relative">
                  <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="pr-10"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">نوع العملية</label>
                <select 
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full p-2 border rounded-md"
                >
                  {typeOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <Card className="bg-white/80 backdrop-blur border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="text-xl font-bold text-blue-600">
                {history.filter(h => h.type === 'reservation').length}
              </div>
              <div className="text-xs text-gray-600">الحجوزات</div>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="text-xl font-bold text-green-600">
                {history.filter(h => h.type === 'delivery').length}
              </div>
              <div className="text-xs text-gray-600">التسليم</div>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="text-xl font-bold text-teal-600">
                {history.filter(h => h.type === 'material_add').length}
              </div>
              <div className="text-xs text-gray-600">إضافة مواد</div>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="text-xl font-bold text-red-600">
                {history.filter(h => h.type === 'cancellation').length}
              </div>
              <div className="text-xs text-gray-600">الإلغاءات</div>
            </CardContent>
          </Card>
        </div>

        {/* History List */}
        <div className="space-y-4">
          {filteredHistory.map((record, index) => (
            <Card key={record.id} className="bg-white shadow-lg border-0 hover:shadow-xl transition-all duration-300 animate-slide-up" style={{ animationDelay: `${index * 50}ms` }}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    <div className={`p-2 rounded-full ${getTypeColor(record.type).replace('text-', 'bg-').replace('800', '100')}`}>
                      {getTypeIcon(record.type)}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge className={getTypeColor(record.type)}>
                          {getTypeLabel(record.type)}
                        </Badge>
                        <span className="text-xs text-gray-500">{record.date} - {record.time}</span>
                      </div>
                      
                      <p className="font-medium text-gray-800 mb-1">{record.description}</p>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          <span>{record.userName}</span>
                        </div>
                        
                        {record.itemName && (
                          <div className="flex items-center gap-1">
                            <Package className="h-3 w-3" />
                            <span>{record.itemName}</span>
                          </div>
                        )}
                        
                        {record.quantity && (
                          <div>
                            <span className="font-medium">الكمية: {record.quantity}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <Badge 
                    className={
                      record.status === 'completed' 
                        ? 'bg-green-100 text-green-800 border-green-300' 
                        : 'bg-red-100 text-red-800 border-red-300'
                    }
                  >
                    {record.status === 'completed' ? 'مكتمل' : 'ملغي'}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredHistory.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
              <Search className="h-8 w-8 text-white" />
            </div>
            <p className="text-gray-500">لا توجد عمليات تطابق البحث</p>
          </div>
        )}
      </div>

      <BottomNavigation userType="admin" />
    </div>
  );
};

export default History;
