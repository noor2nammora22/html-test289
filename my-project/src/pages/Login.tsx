
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/components/ui/use-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('employee');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Fake login credentials
    const adminCredentials = { email: 'admin@hst.com', password: 'admin123' };
    const employeeCredentials = { email: 'employee@hst.com', password: 'emp123' };
    
    if (userType === 'admin' && email === adminCredentials.email && password === adminCredentials.password) {
      toast({
        title: "تم تسجيل الدخول بنجاح",
        description: "مرحباً بك في النظام كمسؤول",
      });
      localStorage.setItem('userType', 'admin');
      localStorage.setItem('isLoggedIn', 'true');
      navigate('/home');
    } else if (userType === 'employee' && email === employeeCredentials.email && password === employeeCredentials.password) {
      toast({
        title: "تم تسجيل الدخول بنجاح",
        description: "مرحباً بك في النظام",
      });
      localStorage.setItem('userType', 'employee');
      localStorage.setItem('isLoggedIn', 'true');
      navigate('/home');
    } else {
      toast({
        title: "خطأ في تسجيل الدخول",
        description: "البريد الإلكتروني أو كلمة المرور غير صحيحة",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <Card className="bg-white shadow-xl border-0 animate-scale-in">
          <CardHeader className="text-center pb-4">
            <img 
              src="/lovable-uploads/0857b8ab-239c-4f2e-9a9f-2e631bf5c277.png" 
              alt="HST Logo" 
              className="h-16 w-auto mx-auto mb-4"
            />
            <CardTitle className="text-xl text-gray-800">نظام إدارة المواد</CardTitle>
            <p className="text-gray-600 text-sm">سجل دخولك للمتابعة</p>
          </CardHeader>

          <CardContent>
            <Tabs value={userType} onValueChange={setUserType} className="mb-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="employee" className="text-sm">موظف</TabsTrigger>
                <TabsTrigger value="admin" className="text-sm">مسؤول</TabsTrigger>
              </TabsList>

              <TabsContent value="employee" className="mt-6">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <Label htmlFor="email">البريد الإلكتروني</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="employee@hst.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="mt-1"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="password">كلمة المرور</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="emp123"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="mt-1"
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 py-6">
                    تسجيل الدخول كموظف
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="admin" className="mt-6">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <Label htmlFor="admin-email">البريد الإلكتروني</Label>
                    <Input
                      id="admin-email"
                      type="email"
                      placeholder="admin@hst.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="mt-1"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="admin-password">كلمة المرور</Label>
                    <Input
                      id="admin-password"
                      type="password"
                      placeholder="admin123"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="mt-1"
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 py-6">
                    تسجيل الدخول كمسؤول
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-2">بيانات تجريبية:</h4>
              <div className="text-sm text-gray-600 space-y-1">
                <p><strong>موظف:</strong> employee@hst.com / emp123</p>
                <p><strong>مسؤول:</strong> admin@hst.com / admin123</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
