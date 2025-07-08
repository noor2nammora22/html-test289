
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, Book, Bell, Calendar } from 'lucide-react';

interface UserInfo {
  name: string;
  email: string;
  phone: string;
  role: 'المتجر' | 'المسؤول';
  joinDate: string;
  storeType: string;
  isActive: boolean;
}

const Account = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: 'أحمد محمد علي',
    email: 'ahmed@example.com',
    phone: '+966501234567',
    role: 'المتجر',
    joinDate: '2023-06-15',
    storeType: 'متجر الطاقة الشمسية',
    isActive: true
  });

  const [editForm, setEditForm] = useState(userInfo);

  const handleSave = () => {
    setUserInfo(editForm);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditForm(userInfo);
    setIsEditing(false);
  };

  const accountStats = {
    totalReservations: 25,
    deliveredOrders: 20,
    pendingReservations: 3,
    cancelledOrders: 2,
    totalValue: 125000,
    monthlyReservations: 8
  };

  const recentActivity = [
    {
      id: 1,
      action: 'حجز جديد',
      description: 'تم حجز 10 ألواح شمسية 300 وات',
      date: '2024-01-15',
      time: '10:30 ص'
    },
    {
      id: 2,
      action: 'تسليم مكتمل',
      description: 'تم استلام 5 انفرتر 5 كيلو وات',
      date: '2024-01-14',
      time: '02:15 م'
    },
    {
      id: 3,
      action: 'إلغاء حجز',
      description: 'تم إلغاء حجز 3 بطاريات ليثيوم',
      date: '2024-01-13',
      time: '11:45 ص'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 arabic-text pb-20">
      {/* Header */}
      <div className="gradient-primary text-white p-6 rounded-b-3xl shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Link to="/">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                <div className="w-4 h-4 border-r-2 border-t-2 border-white transform rotate-45"></div>
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold">الحساب</h1>
              <p className="text-sm text-white/80">إدارة معلومات الحساب</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsEditing(!isEditing)}
            className="text-white/80 hover:bg-white/20"
          >
            {isEditing ? 'إلغاء' : 'تعديل'}
          </Button>
        </div>

        {/* User Info Card */}
        <div className="glass-effect rounded-xl p-4 animate-scale-in">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 gradient-secondary rounded-full flex items-center justify-center text-white text-2xl font-bold animate-pulse-slow">
              {userInfo.name.charAt(0)}
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold">{userInfo.name}</h3>
              <p className="text-white/80 text-sm">{userInfo.storeType}</p>
              <div className="flex items-center gap-2 mt-1">
                <Badge className={userInfo.isActive ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}>
                  {userInfo.isActive ? 'نشط' : 'غير نشط'}
                </Badge>
                <Badge variant="outline" className="text-white border-white/30">
                  {userInfo.role}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Account Statistics */}
        <Card className="animate-slide-up">
          <CardHeader>
            <CardTitle>إحصائيات الحساب</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <p className="text-2xl font-bold text-blue-600">{accountStats.totalReservations}</p>
                <p className="text-sm text-gray-600">إجمالي الحجوزات</p>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <p className="text-2xl font-bold text-green-600">{accountStats.deliveredOrders}</p>
                <p className="text-sm text-gray-600">الطلبات المسلمة</p>
              </div>
              <div className="text-center p-3 bg-yellow-50 rounded-lg">
                <p className="text-2xl font-bold text-yellow-600">{accountStats.pendingReservations}</p>
                <p className="text-sm text-gray-600">قيد الانتظار</p>
              </div>
              <div className="text-center p-3 bg-purple-50 rounded-lg">
                <p className="text-2xl font-bold text-purple-600">{accountStats.totalValue.toLocaleString()}</p>
                <p className="text-sm text-gray-600">القيمة الإجمالية</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Personal Information */}
        <Card className="animate-slide-up">
          <CardHeader>
            <CardTitle>المعلومات الشخصية</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {isEditing ? (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">الاسم الكامل</label>
                  <Input
                    value={editForm.name}
                    onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">البريد الإلكتروني</label>
                  <Input
                    value={editForm.email}
                    onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">رقم الهاتف</label>
                  <Input
                    value={editForm.phone}
                    onChange={(e) => setEditForm({...editForm, phone: e.target.value})}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">نوع المتجر</label>
                  <Input
                    value={editForm.storeType}
                    onChange={(e) => setEditForm({...editForm, storeType: e.target.value})}
                    className="w-full"
                  />
                </div>
                <div className="flex gap-2 pt-2">
                  <Button onClick={handleSave} className="flex-1 gradient-primary text-white">
                    حفظ التعديلات
                  </Button>
                  <Button variant="outline" onClick={handleCancel} className="flex-1">
                    إلغاء
                  </Button>
                </div>
              </>
            ) : (
              <>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">الاسم الكامل:</span>
                  <span className="font-medium">{userInfo.name}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">البريد الإلكتروني:</span>
                  <span className="font-medium">{userInfo.email}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">رقم الهاتف:</span>
                  <span className="font-medium">{userInfo.phone}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">نوع المتجر:</span>
                  <span className="font-medium">{userInfo.storeType}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">تاريخ الانضمام:</span>
                  <span className="font-medium">{userInfo.joinDate}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">نوع الحساب:</span>
                  <Badge variant="outline">{userInfo.role}</Badge>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="animate-slide-up">
          <CardHeader>
            <CardTitle>النشاط الأخير</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div
                key={activity.id}
                className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 animate-pulse"></div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-medium text-gray-800">{activity.action}</span>
                    <span className="text-xs text-gray-500">{activity.time}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{activity.description}</p>
                  <p className="text-xs text-gray-500">{activity.date}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="animate-slide-up">
          <CardHeader>
            <CardTitle>إجراءات سريعة</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link to="/reservations">
              <Button variant="outline" className="w-full justify-start">
                <Calendar className="h-4 w-4 ml-2" />
                عرض جميع الحجوزات
              </Button>
            </Link>
            <Link to="/history">
              <Button variant="outline" className="w-full justify-start">
                <Book className="h-4 w-4 ml-2" />
                عرض السجل الكامل
              </Button>
            </Link>
            <Link to="/notifications">
              <Button variant="outline" className="w-full justify-start">
                <Bell className="h-4 w-4 ml-2" />
                إدارة الإشعارات
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Logout */}
        <Card className="animate-slide-up">
          <CardContent className="pt-6">
            <Button variant="destructive" className="w-full">
              تسجيل الخروج
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-3">
        <div className="flex justify-around">
          <Link to="/" className="flex flex-col items-center gap-1 text-gray-500">
            <div className="w-6 h-6 bg-gray-400 rounded-full"></div>
            <span className="text-xs">الرئيسية</span>
          </Link>
          <Link to="/search" className="flex flex-col items-center gap-1 text-gray-500">
            <Search className="w-6 h-6" />
            <span className="text-xs">البحث</span>
          </Link>
          <Link to="/history" className="flex flex-col items-center gap-1 text-gray-500">
            <Book className="w-6 h-6" />
            <span className="text-xs">السجل</span>
          </Link>
          <Link to="/account" className="flex flex-col items-center gap-1 text-primary">
            <div className="w-6 h-6 bg-primary rounded-full"></div>
            <span className="text-xs font-medium">الحساب</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Account;
