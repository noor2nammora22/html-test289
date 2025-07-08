
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import AppHeader from '@/components/AppHeader';
import BottomNavigation from '@/components/BottomNavigation';

interface Notification {
  id: number;
  message: string;
  time: string;
  date: string;
  type: 'حجز' | 'إلغاء' | 'تسليم' | 'إضافة' | 'تنبيه';
  isRead: boolean;
  details?: string;
}

const Notifications = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('الكل');
  const types = ['الكل', 'حجز', 'تسليم', 'إلغاء', 'إضافة', 'تنبيه'];

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      message: 'تم حجز 200 لوح طاقة من الـ 170 من الـ HST',
      time: '10:30 ص',
      date: '2024-01-15',
      type: 'حجز',
      isRead: false,
      details: 'تم حجز 200 وحدة من ألواح شمسية 300 وات'
    },
    {
      id: 2,
      message: 'تم الغاء الحجز 200 لوح طاقة من الـ 170 من الـ HST',
      time: '09:15 ص',
      date: '2024-01-15',
      type: 'إلغاء',
      isRead: true,
      details: 'تم إلغاء حجز 200 وحدة من ألواح شمسية'
    },
    {
      id: 3,
      message: 'تم حجز 10 بطاريات من النوع X',
      time: '08:45 ص',
      date: '2024-01-15',
      type: 'حجز',
      isRead: true,
      details: 'تم حجز 10 بطاريات ليثيوم من النوع X'
    },
    {
      id: 4,
      message: 'تم تسليم 300 لوح من النوع Y لتصل للعدد 715',
      time: '07:30 ص',
      date: '2024-01-15',
      type: 'تسليم',
      isRead: false,
      details: 'تم تسليم 300 لوح شمسي من النوع Y بنجاح'
    },
    {
      id: 5,
      message: 'تم اضافة 10 قطعات من النوع Y',
      time: '06:20 م',
      date: '2024-01-14',
      type: 'إضافة',
      isRead: true,
      details: 'تمت إضافة 10 قطع جديدة من النوع Y للمخزون'
    },
    {
      id: 6,
      message: 'تم الغاء الحجز 100 قطعة من النوع Y',
      time: '05:10 م',
      date: '2024-01-14',
      type: 'إلغاء',
      isRead: true,
      details: 'تم إلغاء حجز 100 قطعة من النوع Y'
    }
  ]);

  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = notification.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'الكل' || notification.type === selectedType;
    return matchesSearch && matchesType;
  });

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'حجز':
        return 'bg-blue-100 text-blue-800';
      case 'تسليم':
        return 'bg-green-100 text-green-800';
      case 'إلغاء':
        return 'bg-red-100 text-red-800';
      case 'إضافة':
        return 'bg-purple-100 text-purple-800';
      case 'تنبيه':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'حجز':
        return '📝';
      case 'تسليم':
        return '✅';
      case 'إلغاء':
        return '❌';
      case 'إضافة':
        return '➕';
      case 'تنبيه':
        return '⚠️';
      default:
        return '📢';
    }
  };

  const markAsRead = (id: number) => {
    setNotifications(prev => prev.map(notification => 
      notification.id === id ? { ...notification, isRead: true } : notification
    ));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notification => ({ ...notification, isRead: true })));
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <AppHeader 
        title="الإشعارات" 
        subtitle={unreadCount > 0 ? `${unreadCount} إشعار غير مقروء` : undefined}
        showBackButton={true}
      />

      {/* Filter and Search */}
      <div className="bg-white p-4 border-b">
        <div className="flex items-center justify-between mb-4">
          <div className="flex gap-2 overflow-x-auto">
            {types.slice(0, 4).map((type) => (
              <Button
                key={type}
                variant={selectedType === type ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedType(type)}
                className={`whitespace-nowrap ${
                  selectedType === type 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-600 border-gray-300'
                }`}
              >
                {type}
              </Button>
            ))}
          </div>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={markAllAsRead}
              className="text-blue-600 text-xs"
            >
              قراءة الكل
            </Button>
          )}
        </div>

        <div className="relative">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="البحث في الإشعارات..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pr-10 border-gray-300"
          />
        </div>
      </div>

      {/* Notifications List */}
      <div className="p-4 space-y-3">
        {filteredNotifications.map((notification) => (
          <Card
            key={notification.id}
            className={`bg-white shadow-sm border cursor-pointer transition-all ${
              !notification.isRead ? 'border-r-4 border-r-blue-500 bg-blue-50/30' : 'border-gray-200'
            }`}
            onClick={() => markAsRead(notification.id)}
          >
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <span className="text-lg">{getNotificationIcon(notification.type)}</span>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <Badge className={getNotificationColor(notification.type)} variant="secondary">
                      {notification.type}
                    </Badge>
                    <div className="text-xs text-gray-500 text-left">
                      <div>{notification.time}</div>
                      <div>{notification.date}</div>
                    </div>
                  </div>
                  <p className={`text-sm mb-2 ${!notification.isRead ? 'font-medium text-gray-800' : 'text-gray-600'}`}>
                    {notification.message}
                  </p>
                  {notification.details && (
                    <p className="text-xs text-gray-500 bg-gray-50 p-2 rounded-lg">
                      {notification.details}
                    </p>
                  )}
                  {!notification.isRead && (
                    <div className="flex items-center gap-2 mt-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-xs text-blue-600 font-medium">جديد</span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredNotifications.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="h-8 w-8 text-blue-600" />
            </div>
            <p className="text-gray-500">لا توجد إشعارات</p>
          </div>
        )}
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Notifications;
