
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Users, Plus, Edit, Trash2, ArrowLeft, User, Mail, Shield } from 'lucide-react';
import AppHeader from '@/components/AppHeader';

interface Employee {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  joinDate: string;
  department: string;
}

const AdminUsers = () => {
  const [userType, setUserType] = useState<string>('');
  const [showAddUserDialog, setShowAddUserDialog] = useState(false);
  const [newUser, setNewUser] = useState({ 
    name: '', 
    email: '', 
    role: 'employee', 
    department: '' 
  });
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

  const [employees, setEmployees] = useState<Employee[]>([
    { 
      id: 1, 
      name: 'أحمد محمد', 
      email: 'ahmed@hst.com', 
      role: 'موظف', 
      status: 'active',
      joinDate: '2024-01-15',
      department: 'المبيعات'
    },
    { 
      id: 2, 
      name: 'فاطمة علي', 
      email: 'fatima@hst.com', 
      role: 'موظف', 
      status: 'active',
      joinDate: '2024-02-20',
      department: 'المخازن'
    },
    { 
      id: 3, 
      name: 'خالد سعيد', 
      email: 'khaled@hst.com', 
      role: 'مشرف', 
      status: 'inactive',
      joinDate: '2023-11-10',
      department: 'الصيانة'
    },
    { 
      id: 4, 
      name: 'مسؤول النظام', 
      email: 'admin@hst.com', 
      role: 'مسؤول', 
      status: 'active',
      joinDate: '2023-01-01',
      department: 'تقنية المعلومات'
    }
  ]);

  const handleAddUser = () => {
    if (newUser.name && newUser.email) {
      const user: Employee = {
        id: employees.length + 1,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role === 'admin' ? 'مسؤول' : 'موظف',
        status: 'active',
        joinDate: new Date().toISOString().split('T')[0],
        department: newUser.department
      };
      setEmployees([...employees, user]);
      setNewUser({ name: '', email: '', role: 'employee', department: '' });
      setShowAddUserDialog(false);
    }
  };

  const handleDeleteUser = (userId: number) => {
    setEmployees(employees.filter(emp => emp.id !== userId));
  };

  const toggleUserStatus = (userId: number) => {
    setEmployees(employees.map(emp => 
      emp.id === userId 
        ? { ...emp, status: emp.status === 'active' ? 'inactive' : 'active' }
        : emp
    ));
  };

  const activeEmployees = employees.filter(emp => emp.status === 'active').length;
  const inactiveEmployees = employees.filter(emp => emp.status === 'inactive').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 pb-20">
      <AppHeader 
        title="إدارة المستخدمين" 
        subtitle="عرض وإدارة جميع المستخدمين"
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
          
          <Dialog open={showAddUserDialog} onOpenChange={setShowAddUserDialog}>
            <DialogTrigger asChild>
              <Button className="bg-green-600 hover:bg-green-700">
                <Plus className="h-4 w-4 mr-2" />
                إضافة مستخدم جديد
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>إضافة مستخدم جديد</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">الاسم الكامل</Label>
                  <Input
                    id="name"
                    value={newUser.name}
                    onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                    placeholder="أدخل اسم المستخدم"
                  />
                </div>
                <div>
                  <Label htmlFor="email">البريد الإلكتروني</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                    placeholder="user@hst.com"
                  />
                </div>
                <div>
                  <Label htmlFor="department">القسم</Label>
                  <Input
                    id="department"
                    value={newUser.department}
                    onChange={(e) => setNewUser({...newUser, department: e.target.value})}
                    placeholder="مثال: المبيعات، المخازن، الصيانة"
                  />
                </div>
                <div>
                  <Label htmlFor="role">الدور</Label>
                  <select 
                    id="role"
                    value={newUser.role}
                    onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="employee">موظف</option>
                    <option value="supervisor">مشرف</option>
                    <option value="admin">مسؤول</option>
                  </select>
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleAddUser} className="flex-1 bg-green-600 hover:bg-green-700">
                    إضافة المستخدم
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setShowAddUserDialog(false)}
                    className="flex-1"
                  >
                    إلغاء
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card className="bg-white/80 backdrop-blur border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Users className="h-5 w-5 text-green-600" />
                <div className="text-2xl font-bold text-green-600">{activeEmployees}</div>
              </div>
              <div className="text-sm text-gray-600">مستخدمين نشطين</div>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Users className="h-5 w-5 text-gray-600" />
                <div className="text-2xl font-bold text-gray-600">{inactiveEmployees}</div>
              </div>
              <div className="text-sm text-gray-600">مستخدمين غير نشطين</div>
            </CardContent>
          </Card>
        </div>

        {/* Users List */}
        <div className="space-y-4">
          {employees.map((employee, index) => (
            <Card key={employee.id} className="bg-white shadow-lg border-0 animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-blue-100 rounded-full">
                      <User className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-lg">{employee.name}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <Mail className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600">{employee.email}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <Shield className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600">{employee.role}</span>
                      </div>
                      <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                        <span>القسم: {employee.department}</span>
                        <span>تاريخ الانضمام: {employee.joinDate}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge 
                      className={
                        employee.status === 'active' 
                          ? 'bg-green-100 text-green-800 border-green-300' 
                          : 'bg-gray-100 text-gray-800 border-gray-300'
                      }
                    >
                      {employee.status === 'active' ? 'نشط' : 'غير نشط'}
                    </Badge>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => toggleUserStatus(employee.id)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    {employee.role !== 'مسؤول' && (
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleDeleteUser(employee.id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;
