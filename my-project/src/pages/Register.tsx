
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppHeader from '@/components/AppHeader';
import BottomNavigation from '@/components/BottomNavigation';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    companyName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    location: '',
    saleType: '',
    productType: '',
    workingHours: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle registration logic here
    console.log('Registration attempt:', formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 pb-20">
      <AppHeader title="إنشاء حساب تاجر" showBackButton={true} />

      <div className="p-4 pt-8">
        <div className="max-w-md mx-auto">
          <Card className="bg-white shadow-xl border-0 animate-scale-in">
            <CardHeader className="text-center pb-4">
              <img 
                src="/lovable-uploads/0857b8ab-239c-4f2e-9a9f-2e631bf5c277.png" 
                alt="HST Logo" 
                className="h-16 w-auto mx-auto mb-4"
              />
              <CardTitle className="text-xl text-gray-800">انضم إلى منصة HST</CardTitle>
              <p className="text-gray-600 text-sm">أنشئ حسابك كتاجر واعرض منتجاتك</p>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">الاسم الكامل</Label>
                    <Input
                      id="name"
                      placeholder="أحمد محمد"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">رقم الهاتف</Label>
                    <Input
                      id="phone"
                      placeholder="+966 50 123 4567"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="companyName">اسم الشركة</Label>
                  <Input
                    id="companyName"
                    placeholder="شركة الطاقة الشمسية"
                    value={formData.companyName}
                    onChange={(e) => handleInputChange('companyName', e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="email">البريد الإلكتروني</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="merchant@example.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="password">كلمة المرور</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="confirmPassword">تأكيد كلمة المرور</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="location">الموقع</Label>
                  <Select onValueChange={(value) => handleInputChange('location', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر المدينة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="riyadh">الرياض</SelectItem>
                      <SelectItem value="jeddah">جدة</SelectItem>
                      <SelectItem value="dammam">الدمام</SelectItem>
                      <SelectItem value="mecca">مكة</SelectItem>
                      <SelectItem value="medina">المدينة</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="saleType">نوع البيع</Label>
                  <Select onValueChange={(value) => handleInputChange('saleType', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر نوع البيع" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="retail">تجزئة</SelectItem>
                      <SelectItem value="wholesale">جملة</SelectItem>
                      <SelectItem value="both">تجزئة وجملة</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="productType">نوع المنتجات</Label>
                  <Select onValueChange={(value) => handleInputChange('productType', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر نوع المنتجات" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="panels">ألواح شمسية</SelectItem>
                      <SelectItem value="batteries">بطاريات</SelectItem>
                      <SelectItem value="inverters">انفرتر</SelectItem>
                      <SelectItem value="cables">كابلات</SelectItem>
                      <SelectItem value="systems">أنظمة متكاملة</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="workingHours">ساعات العمل</Label>
                  <Input
                    id="workingHours"
                    placeholder="8:00 ص - 6:00 م"
                    value={formData.workingHours}
                    onChange={(e) => handleInputChange('workingHours', e.target.value)}
                    required
                  />
                </div>

                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 py-6">
                  إنشاء الحساب
                </Button>
              </form>

              <div className="text-center text-sm text-gray-600 mt-4">
                لديك حساب بالفعل؟{' '}
                <Link to="/login" className="text-blue-600 hover:underline font-medium">
                  تسجيل الدخول
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <BottomNavigation userType="shared" />
    </div>
  );
};

export default Register;
