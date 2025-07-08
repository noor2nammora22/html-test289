
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Package, Bell, TrendingUp, Plus, Settings, History } from 'lucide-react';
import AppHeader from '@/components/AppHeader';
import BottomNavigation from '@/components/BottomNavigation';

const AdminDashboard = () => {
  const [userType, setUserType] = useState<string>('');
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

  const stats = {
    totalMaterials: 25,
    totalEmployees: 12,
    pendingReservations: 5,
    totalValue: 125000
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 pb-20">
      <AppHeader 
        title="لوحة التحكم" 
        subtitle="إدارة النظام"
        showNotifications={true}
        notificationCount={3}
      />

      <div className="p-4">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card className="bg-white/80 backdrop-blur border-0 shadow-lg animate-scale-in">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Package className="h-5 w-5 text-blue-600" />
                <div className="text-2xl font-bold text-blue-600">{stats.totalMaterials}</div>
              </div>
              <div className="text-sm text-gray-600">إجمالي المواد</div>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur border-0 shadow-lg animate-scale-in">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Users className="h-5 w-5 text-green-600" />
                <div className="text-2xl font-bold text-green-600">{stats.totalEmployees}</div>
              </div>
              <div className="text-sm text-gray-600">الموظفين النشطين</div>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur border-0 shadow-lg animate-scale-in">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Bell className="h-5 w-5 text-orange-600" />
                <div className="text-2xl font-bold text-orange-600">{stats.pendingReservations}</div>
              </div>
              <div className="text-sm text-gray-600">حجوزات معلقة</div>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur border-0 shadow-lg animate-scale-in">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <TrendingUp className="h-5 w-5 text-teal-600" />
                <div className="text-2xl font-bold text-teal-600">{stats.totalValue.toLocaleString()}</div>
              </div>
              <div className="text-sm text-gray-600">القيمة الإجمالية</div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card 
            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg border-0 cursor-pointer hover:shadow-xl transition-all duration-300 animate-scale-in"
            onClick={() => navigate('/admin/materials')}
          >
            <CardContent className="p-4 text-center">
              <Package className="h-8 w-8 mx-auto mb-2" />
              <h3 className="font-semibold">إدارة المواد</h3>
              <p className="text-sm text-blue-100">إضافة وتعديل المواد</p>
            </CardContent>
          </Card>

          <Card 
            className="bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg border-0 cursor-pointer hover:shadow-xl transition-all duration-300 animate-scale-in"
            onClick={() => navigate('/admin/users')}
          >
            <CardContent className="p-4 text-center">
              <Users className="h-8 w-8 mx-auto mb-2" />
              <h3 className="font-semibold">إدارة المستخدمين</h3>
              <p className="text-sm text-green-100">عرض وإضافة مستخدمين</p>
            </CardContent>
          </Card>

          <Card 
            className="bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-lg border-0 cursor-pointer hover:shadow-xl transition-all duration-300 animate-scale-in"
            onClick={() => navigate('/history')}
          >
            <CardContent className="p-4 text-center">
              <History className="h-8 w-8 mx-auto mb-2" />
              <h3 className="font-semibold">سجل العمليات</h3>
              <p className="text-sm text-teal-100">عرض جميع العمليات</p>
            </CardContent>
          </Card>

          <Card 
            className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white shadow-lg border-0 cursor-pointer hover:shadow-xl transition-all duration-300 animate-scale-in"
            onClick={() => navigate('/reservations')}
          >
            <CardContent className="p-4 text-center">
              <Bell className="h-8 w-8 mx-auto mb-2" />
              <h3 className="font-semibold">الحجوزات</h3>
              <p className="text-sm text-indigo-100">إدارة طلبات الحجز</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="bg-white shadow-lg border-0 animate-slide-up">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              النشاط الأخير
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div>
                  <p className="font-medium">تم إضافة مادة جديدة</p>
                  <p className="text-sm text-gray-600">بطارية ليثيوم 200 أمبير</p>
                </div>
                <Badge className="bg-blue-100 text-blue-800">اليوم</Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div>
                  <p className="font-medium">تم تسليم حجز</p>
                  <p className="text-sm text-gray-600">5 ألواح شمسية - أحمد محمد</p>
                </div>
                <Badge className="bg-green-100 text-green-800">أمس</Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                <div>
                  <p className="font-medium">إضافة مستخدم جديد</p>
                  <p className="text-sm text-gray-600">سارة أحمد - موظف</p>
                </div>
                <Badge className="bg-orange-100 text-orange-800">أمس</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <BottomNavigation userType="admin" />
    </div>
  );
};

export default AdminDashboard;
