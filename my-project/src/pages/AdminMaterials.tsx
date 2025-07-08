
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Package, Plus, Edit, Trash2, ArrowLeft } from 'lucide-react';
import AppHeader from '@/components/AppHeader';

interface Material {
  id: number;
  name: string;
  category: string;
  totalQuantity: number;
  availableQuantity: number;
  unit: string;
  items: MaterialItem[];
}

interface MaterialItem {
  id: number;
  name: string;
  type: string;
  quantity: number;
  available: number;
  description: string;
}

const AdminMaterials = () => {
  const [userType, setUserType] = useState<string>('');
  const [showAddMaterialDialog, setShowAddMaterialDialog] = useState(false);
  const [showAddItemDialog, setShowAddItemDialog] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null);
  const [newMaterial, setNewMaterial] = useState({ name: '', category: '', unit: '' });
  const [newItem, setNewItem] = useState({ name: '', type: '', quantity: 0, description: '' });
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

  const [materials, setMaterials] = useState<Material[]>([
    {
      id: 1,
      name: 'البطاريات',
      category: 'تخزين الطاقة',
      totalQuantity: 80,
      availableQuantity: 70,
      unit: 'قطعة',
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
      totalQuantity: 140,
      availableQuantity: 130,
      unit: 'قطعة',
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
    }
  ]);

  const handleAddMaterial = () => {
    if (newMaterial.name && newMaterial.category) {
      const material: Material = {
        id: materials.length + 1,
        name: newMaterial.name,
        category: newMaterial.category,
        totalQuantity: 0,
        availableQuantity: 0,
        unit: newMaterial.unit || 'قطعة',
        items: []
      };
      setMaterials([...materials, material]);
      setNewMaterial({ name: '', category: '', unit: '' });
      setShowAddMaterialDialog(false);
    }
  };

  const handleAddItem = () => {
    if (selectedMaterial && newItem.name && newItem.quantity > 0) {
      const item: MaterialItem = {
        id: Date.now(),
        name: newItem.name,
        type: newItem.type,
        quantity: newItem.quantity,
        available: newItem.quantity,
        description: newItem.description
      };
      
      setMaterials(materials.map(material => 
        material.id === selectedMaterial.id 
          ? {
              ...material,
              items: [...material.items, item],
              totalQuantity: material.totalQuantity + newItem.quantity,
              availableQuantity: material.availableQuantity + newItem.quantity
            }
          : material
      ));
      
      setNewItem({ name: '', type: '', quantity: 0, description: '' });
      setShowAddItemDialog(false);
    }
  };

  const handleDeleteMaterial = (materialId: number) => {
    setMaterials(materials.filter(material => material.id !== materialId));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 pb-20">
      <AppHeader 
        title="إدارة المواد" 
        subtitle="إضافة وتعديل المواد والأصناف"
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
          
          <Dialog open={showAddMaterialDialog} onOpenChange={setShowAddMaterialDialog}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                إضافة مادة جديدة
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>إضافة مادة جديدة</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="material-name">اسم المادة</Label>
                  <Input
                    id="material-name"
                    value={newMaterial.name}
                    onChange={(e) => setNewMaterial({...newMaterial, name: e.target.value})}
                    placeholder="مثال: البطاريات"
                  />
                </div>
                <div>
                  <Label htmlFor="material-category">الفئة</Label>
                  <Input
                    id="material-category"
                    value={newMaterial.category}
                    onChange={(e) => setNewMaterial({...newMaterial, category: e.target.value})}
                    placeholder="مثال: تخزين الطاقة"
                  />
                </div>
                <div>
                  <Label htmlFor="material-unit">الوحدة</Label>
                  <Input
                    id="material-unit"
                    value={newMaterial.unit}
                    onChange={(e) => setNewMaterial({...newMaterial, unit: e.target.value})}
                    placeholder="مثال: قطعة، متر، كيلوغرام"
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleAddMaterial} className="flex-1">
                    إضافة
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setShowAddMaterialDialog(false)}
                    className="flex-1"
                  >
                    إلغاء
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Materials List */}
        <div className="space-y-4">
          {materials.map((material, index) => (
            <Card key={material.id} className="bg-white shadow-lg border-0 animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Package className="h-5 w-5" />
                      {material.name}
                    </CardTitle>
                    <p className="text-sm text-gray-600">{material.category}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-blue-100 text-blue-800">
                      {material.totalQuantity} {material.unit}
                    </Badge>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleDeleteMaterial(material.id)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-lg font-bold text-blue-600">{material.totalQuantity}</div>
                    <div className="text-xs text-gray-500">الإجمالي</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-600">{material.availableQuantity}</div>
                    <div className="text-xs text-gray-500">متوفر</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-orange-600">{material.totalQuantity - material.availableQuantity}</div>
                    <div className="text-xs text-gray-500">محجوز</div>
                  </div>
                </div>

                {/* Items List */}
                <div className="space-y-2 mb-4">
                  {material.items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <div>
                        <p className="font-medium text-sm">{item.name}</p>
                        <p className="text-xs text-gray-600">{item.type}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{item.available}/{item.quantity}</p>
                        <p className="text-xs text-gray-500">متوفر/إجمالي</p>
                      </div>
                    </div>
                  ))}
                </div>

                <Dialog open={showAddItemDialog && selectedMaterial?.id === material.id} onOpenChange={setShowAddItemDialog}>
                  <DialogTrigger asChild>
                    <Button 
                      size="sm" 
                      className="w-full bg-green-600 hover:bg-green-700"
                      onClick={() => setSelectedMaterial(material)}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      إضافة صنف جديد
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>إضافة صنف جديد إلى {material.name}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="item-name">اسم الصنف</Label>
                        <Input
                          id="item-name"
                          value={newItem.name}
                          onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                          placeholder="مثال: بطارية ليثيوم 100 أمبير"
                        />
                      </div>
                      <div>
                        <Label htmlFor="item-type">النوع</Label>
                        <Input
                          id="item-type"
                          value={newItem.type}
                          onChange={(e) => setNewItem({...newItem, type: e.target.value})}
                          placeholder="مثال: ليثيوم فوسفات الحديد"
                        />
                      </div>
                      <div>
                        <Label htmlFor="item-quantity">الكمية</Label>
                        <Input
                          id="item-quantity"
                          type="number"
                          value={newItem.quantity}
                          onChange={(e) => setNewItem({...newItem, quantity: parseInt(e.target.value) || 0})}
                          placeholder="0"
                        />
                      </div>
                      <div>
                        <Label htmlFor="item-description">الوصف</Label>
                        <Input
                          id="item-description"
                          value={newItem.description}
                          onChange={(e) => setNewItem({...newItem, description: e.target.value})}
                          placeholder="وصف المنتج"
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button onClick={handleAddItem} className="flex-1">
                          إضافة
                        </Button>
                        <Button 
                          variant="outline" 
                          onClick={() => setShowAddItemDialog(false)}
                          className="flex-1"
                        >
                          إلغاء
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminMaterials;
