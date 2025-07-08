import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Package, Battery, Cable, Sun, Plus, Eye, ShoppingCart, LogOut } from 'lucide-react';
import AppHeader from '@/components/AppHeader';
import BottomNavigation from '@/components/BottomNavigation';

interface Material {
  id: number;
  name: string;
  category: string;
  totalStock: number;
  availableStock: number;
  reservedStock: number;
  icon: any;
  color: string;
  items: MaterialDetail[];
}

interface MaterialDetail {
  id: number;
  name: string;
  type: string;
  quantity: number;
  available: number;
  description: string;
}

const Index = () => {
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null);
  const [reserveQuantity, setReserveQuantity] = useState('');
  const [showReserveDialog, setShowReserveDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MaterialDetail | null>(null);
  const [userType, setUserType] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const storedUserType = localStorage.getItem('userType');
    
    if (!isLoggedIn) {
      navigate('/');
      return;
    }
    
    setUserType(storedUserType || '');
  }, [navigate]);

  const isAdmin = userType === 'admin';

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userType');
    navigate('/');
  };

  const [materials] = useState<Material[]>([
    {
      id: 1,
      name: 'البطاريات',
      category: 'تخزين الطاقة',
      totalStock: 150,
      availableStock: 120,
      reservedStock: 30,
      icon: Battery,
      color: 'from-green-500 to-emerald-600',
      items: [
        {
          id: 1,
          name: 'بطارية ليثيوم 100 أمبير',
          type: 'ليثيوم فوسفات الحديد',
          quantity: 50,
          available: 45,
          description: 'بطارية عالية الجودة 12 فولت 100 أمبير'
        },
        {
          id: 2,
          name: 'بطارية ليثيوم 200 أمبير',
          type: 'ليثيوم فوسفات الحديد',
          quantity: 30,
          available: 25,
          description: 'بطارية عالية الأداء 12 فولت 200 أمبير'
        }
      ]
    },
    {
      id: 2,
      name: 'الألواح الشمسية',
      category: 'توليد الطاقة',
      totalStock: 200,
      availableStock: 180,
      reservedStock: 20,
      icon: Sun,
      color: 'from-blue-500 to-cyan-600',
      items: [
        {
          id: 3,
          name: 'لوح شمسي 300 وات',
          type: 'سيليكون أحادي البلورة',
          quantity: 80,
          available: 75,
          description: 'لوح شمسي عالي الكفاءة 300 وات'
        },
        {
          id: 4,
          name: 'لوح شمسي 400 وات',
          type: 'سيليكون أحادي البلورة',
          quantity: 60,
          available: 55,
          description: 'لوح شمسي فائق الأداء 400 وات'
        }
      ]
    },
    {
      id: 3,
      name: 'الكابلات',
      category: 'التوصيلات',
      totalStock: 500,
      availableStock: 450,
      reservedStock: 50,
      icon: Cable,
      color: 'from-orange-500 to-red-600',
      items: [
        {
          id: 5,
          name: 'كابل DC 4mm',
          type: 'مقاوم للأشعة فوق البنفسجية',
          quantity: 200,
          available: 180,
          description: 'كابل DC عالي الجودة 4mm - المتر'
        },
        {
          id: 6,
          name: 'كابل DC 6mm',
          type: 'مقاوم للأشعة فوق البنفسجية',
          quantity: 150,
          available: 130,
          description: 'كابل DC عالي الجودة 6mm - المتر'
        }
      ]
    }
  ]);

  const handleReserve = (item: MaterialDetail) => {
    setSelectedItem(item);
    setShowReserveDialog(true);
  };

  const confirmReservation = () => {
    if (selectedItem && reserveQuantity) {
      console.log(`حجز ${reserveQuantity} من ${selectedItem.name}`);
      setShowReserveDialog(false);
      setReserveQuantity('');
      setSelectedItem(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 pb-20">
      <AppHeader 
        title="إدارة المواد" 
        subtitle="نظام إدارة مخزون الشركة"
        showNotifications={true}
        notificationCount={3}
      />

      {/* Welcome Section */}
      <div className="p-4">
        <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-6 text-white mb-6 animate-fade-in">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-bold mb-2">مرحباً بك في نظام إدارة المواد</h2>
              <p className="text-blue-100 mb-4">إدارة مخزون الشركة بكل سهولة وفعالية</p>
              <Badge className="bg-white text-blue-600">
                {isAdmin ? 'مسؤول النظام' : 'موظف'}
              </Badge>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleLogout}
              className="border-white text-white hover:bg-white hover:text-blue-600"
            >
              <LogOut className="w-4 h-4 ml-2" />
              خروج
            </Button>
          </div>
          
          {isAdmin && (
            <div className="flex gap-3 mt-4">
              <Button className="bg-white text-blue-600 hover:bg-blue-50">
                <Plus className="w-4 h-4 ml-2" />
                إضافة مادة جديدة
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                إدارة الفئات
              </Button>
            </div>
          )}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <Card className="bg-white/80 backdrop-blur border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">850</div>
              <div className="text-sm text-gray-600">إجمالي المواد</div>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">750</div>
              <div className="text-sm text-gray-600">متوفر</div>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">100</div>
              <div className="text-sm text-gray-600">محجوز</div>
            </CardContent>
          </Card>
        </div>

        {/* Materials List */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">فئات المواد</h3>
        </div>

        <div className="space-y-4">
          {materials.map((material, index) => {
            const IconComponent = material.icon;
            return (
              <Card key={material.id} className="bg-white shadow-lg border-0 overflow-hidden hover:shadow-xl transition-all duration-300 animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                <CardContent className="p-0">
                  <div className={`h-2 bg-gradient-to-r ${material.color}`}></div>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`p-3 rounded-full bg-gradient-to-r ${material.color}`}>
                          <IconComponent className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-800 text-lg">{material.name}</h4>
                          <p className="text-sm text-gray-600">{material.category}</p>
                        </div>
                      </div>
                      <Badge className="bg-blue-100 text-blue-800">
                        {material.items.length} نوع
                      </Badge>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="text-center">
                        <div className="text-lg font-bold text-gray-800">{material.totalStock}</div>
                        <div className="text-xs text-gray-500">الإجمالي</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-green-600">{material.availableStock}</div>
                        <div className="text-xs text-gray-500">متوفر</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-orange-600">{material.reservedStock}</div>
                        <div className="text-xs text-gray-500">محجوز</div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="w-full bg-gray-200 rounded-full h-2 ml-3">
                        <div
                          className={`bg-gradient-to-r ${material.color} h-2 rounded-full transition-all duration-500`}
                          style={{
                            width: `${Math.max((material.availableStock / material.totalStock) * 100, 5)}%`
                          }}
                        ></div>
                      </div>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            size="sm" 
                            className="bg-blue-600 hover:bg-blue-700 whitespace-nowrap"
                            onClick={() => setSelectedMaterial(material)}
                          >
                            <Eye className="w-4 h-4 ml-1" />
                            عرض التفاصيل
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle className="flex items-center gap-2">
                              <IconComponent className="h-5 w-5" />
                              تفاصيل {material.name}
                            </DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            {material.items.map((item) => (
                              <Card key={item.id} className="border border-gray-200">
                                <CardContent className="p-4">
                                  <div className="flex justify-between items-start mb-2">
                                    <div>
                                      <h5 className="font-semibold text-gray-800">{item.name}</h5>
                                      <p className="text-sm text-gray-600">{item.type}</p>
                                      <p className="text-xs text-gray-500 mt-1">{item.description}</p>
                                    </div>
                                  </div>
                                  
                                  <div className="flex justify-between items-center mb-3">
                                    <div className="text-sm">
                                      <span className="text-gray-600">الكمية: </span>
                                      <span className="font-medium">{item.quantity}</span>
                                    </div>
                                    <div className="text-sm">
                                      <span className="text-gray-600">متوفر: </span>
                                      <span className="font-medium text-green-600">{item.available}</span>
                                    </div>
                                  </div>

                                  <Button
                                    size="sm"
                                    className="w-full bg-green-600 hover:bg-green-700"
                                    onClick={() => handleReserve(item)}
                                    disabled={item.available === 0}
                                  >
                                    <ShoppingCart className="w-4 h-4 ml-1" />
                                    {item.available === 0 ? 'غير متوفر' : 'حجز'}
                                  </Button>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Reserve Dialog */}
      <Dialog open={showReserveDialog} onOpenChange={setShowReserveDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>حجز مادة</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {selectedItem && (
              <>
                <div>
                  <p className="font-medium">{selectedItem.name}</p>
                  <p className="text-sm text-gray-600">متوفر: {selectedItem.available} قطعة</p>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">الكمية المطلوبة</label>
                  <Input
                    type="number"
                    value={reserveQuantity}
                    onChange={(e) => setReserveQuantity(e.target.value)}
                    placeholder="أدخل الكمية"
                    min="1"
                    max={selectedItem.available}
                  />
                </div>
                <div className="flex gap-2">
                  <Button 
                    onClick={confirmReservation}
                    className="flex-1"
                    disabled={!reserveQuantity || parseInt(reserveQuantity) <= 0 || parseInt(reserveQuantity) > selectedItem.available}
                  >
                    تأكيد الحجز
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setShowReserveDialog(false)}
                    className="flex-1"
                  >
                    إلغاء
                  </Button>
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <BottomNavigation userType={userType as 'shared' | 'admin' | 'employee'} />
    </div>
  );
};

export default Index;
