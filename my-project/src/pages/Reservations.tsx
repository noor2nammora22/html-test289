
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Package, User, CheckCircle, XCircle, AlertCircle, Truck } from 'lucide-react';
import AppHeader from '@/components/AppHeader';
import BottomNavigation from '@/components/BottomNavigation';

interface Reservation {
  id: number;
  itemName: string;
  category: string;
  quantity: number;
  employeeName: string;
  date: string;
  status: 'pending' | 'delivered' | 'cancelled';
  notes?: string;
}

const Reservations = () => {
  const [userType, setUserType] = useState<string>('');
  const [reservations, setReservations] = useState<Reservation[]>([
    {
      id: 1,
      itemName: 'بطارية ليثيوم 100 أمبير',
      category: 'البطاريات',
      quantity: 2,
      employeeName: 'أحمد محمد',
      date: '2024-12-28',
      status: 'pending',
      notes: 'مطلوب للمشروع الجديد'
    },
    {
      id: 2,
      itemName: 'لوح شمسي 300 وات',
      category: 'الألواح الشمسية',
      quantity: 5,
      employeeName: 'فاطمة علي',
      date: '2024-12-27',
      status: 'delivered'
    },
    {
      id: 3,
      itemName: 'كابل DC 4mm',
      category: 'الكابلات',
      quantity: 50,
      employeeName: 'خالد سعيد',
      date: '2024-12-26',
      status: 'cancelled',
      notes: 'تم إلغاء الطلب'
    }
  ]);

  useEffect(() => {
    const storedUserType = localStorage.getItem('userType');
    setUserType(storedUserType || '');
  }, []);

  const isAdmin = userType === 'admin';

  const handleDelivery = (id: number) => {
    setReservations(prev => 
      prev.map(reservation => 
        reservation.id === id 
          ? { ...reservation, status: 'delivered' as const }
          : reservation
      )
    );
  };

  const handleCancel = (id: number) => {
    setReservations(prev => 
      prev.map(reservation => 
        reservation.id === id 
          ? { ...reservation, status: 'cancelled' as const }
          : reservation
      )
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'pending':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="h-4 w-4" />;
      case 'cancelled':
        return <XCircle className="h-4 w-4" />;
      case 'pending':
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'تم التسليم';
      case 'cancelled':
        return 'ملغي';
      case 'pending':
        return isAdmin ? 'في الانتظار' : 'قيد التسليم';
      default:
        return 'غير محدد';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 pb-20">
      <AppHeader 
        title="الحجوزات" 
        subtitle="إدارة طلبات الحجز"
        showNotifications={true}
        notificationCount={3}
      />

      <div className="p-4">
        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <Card className="bg-white/80 backdrop-blur border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">
                {reservations.filter(r => r.status === 'pending').length}
              </div>
              <div className="text-sm text-gray-600">
                {isAdmin ? 'في الانتظار' : 'قيد التسليم'}
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">
                {reservations.filter(r => r.status === 'delivered').length}
              </div>
              <div className="text-sm text-gray-600">تم التسليم</div>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-red-600">
                {reservations.filter(r => r.status === 'cancelled').length}
              </div>
              <div className="text-sm text-gray-600">ملغي</div>
            </CardContent>
          </Card>
        </div>

        {/* Reservations List */}
        <div className="space-y-4">
          {reservations.map((reservation, index) => (
            <Card key={reservation.id} className="bg-white shadow-lg border-0 overflow-hidden hover:shadow-xl transition-all duration-300 animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-1">{reservation.itemName}</CardTitle>
                    <div className="flex items-center gap-2 mb-2">
                      <Package className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">{reservation.category}</span>
                    </div>
                  </div>
                  <Badge className={getStatusColor(reservation.status)}>
                    <div className="flex items-center gap-1">
                      {getStatusIcon(reservation.status)}
                      {getStatusText(reservation.status)}
                    </div>
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">طلب من:</span>
                      <span className="text-sm font-medium">{reservation.employeeName}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-blue-600">{reservation.quantity}</div>
                      <div className="text-xs text-gray-500">قطعة</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">{reservation.date}</span>
                  </div>

                  {reservation.notes && (
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-700">{reservation.notes}</p>
                    </div>
                  )}

                  {/* Action Buttons - Different for Admin vs User */}
                  {reservation.status === 'pending' && (
                    <div className="flex gap-2 pt-2">
                      {isAdmin ? (
                        <>
                          <Button 
                            size="sm" 
                            className="flex-1 bg-green-600 hover:bg-green-700"
                            onClick={() => handleDelivery(reservation.id)}
                          >
                            <Truck className="h-4 w-4 mr-2" />
                            تسليم
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="flex-1 text-red-600 border-red-300 hover:bg-red-50"
                            onClick={() => handleCancel(reservation.id)}
                          >
                            إلغاء
                          </Button>
                        </>
                      ) : (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1 text-red-600 border-red-300 hover:bg-red-50"
                          onClick={() => handleCancel(reservation.id)}
                        >
                          إلغاء الحجز
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {reservations.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
              <Package className="h-8 w-8 text-white" />
            </div>
            <p className="text-gray-500">لا توجد حجوزات حالياً</p>
          </div>
        )}
      </div>

      <BottomNavigation userType={userType as 'shared' | 'admin' | 'employee'} />
    </div>
  );
};

export default Reservations;
