
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, Book, Bell, Calendar } from 'lucide-react';

interface Material {
  id: number;
  name: string;
  type: string;
  quantity: number;
  available: number;
  reserved: number;
  status: 'متوفر' | 'منخفض' | 'نفدت الكمية';
  description: string;
  minStock: number;
}

const Materials = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('الكل');
  
  const [materials, setMaterials] = useState<Material[]>([
    {
      id: 1,
      name: 'ألواح شمسية 300 وات',
      type: 'ألواح',
      quantity: 150,
      available: 120,
      reserved: 30,
      status: 'متوفر',
      description: 'ألواح شمسية عالية الكفاءة 300 وات من السيليكون',
      minStock: 20
    },
    {
      id: 2,
      name: 'انفرتر 5 كيلو وات',
      type: 'انفرتر',
      quantity: 25,
      available: 20,
      reserved: 5,
      status: 'متوفر',
      description: 'انفرتر هجين 5 كيلو وات مع شاحن MPPT',
      minStock: 5
    },
    {
      id: 3,
      name: 'بطاريات ليثيوم 100 أمبير',
      type: 'بطاريات',
      quantity: 8,
      available: 3,
      reserved: 5,
      status: 'منخفض',
      description: 'بطاريات ليثيوم فوسفات الحديد 12 فولت 100 أمبير',
      minStock: 10
    },
    {
      id: 4,
      name: 'كابلات DC 4mm',
      type: 'كابلات',
      quantity: 0,
      available: 0,
      reserved: 0,
      status: 'نفدت الكمية',
      description: 'كابلات DC مقاومة للأشعة فوق البنفسجية 4mm',
      minStock: 50
    },
    {
      id: 5,
      name: 'انفرتر 3 كيلو وات',
      type: 'انفرتر',
      quantity: 40,
      available: 35,
      reserved: 5,
      status: 'متوفر',
      description: 'انفرتر أحادي الطور 3 كيلو وات',
      minStock: 8
    },
    {
      id: 6,
      name: 'ألواح شمسية 400 وات',
      type: 'ألواح',
      quantity: 75,
      available: 60,
      reserved: 15,
      status: 'متوفر',
      description: 'ألواح شمسية من السيليكون أحادي البلورة 400 وات',
      minStock: 15
    }
  ]);

  const types = ['الكل', 'ألواح', 'انفرتر', 'بطاريات', 'كابلات'];

  const filteredMaterials = materials.filter(material => {
    const matchesSearch = material.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         material.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'الكل' || material.type === selectedType;
    return matchesSearch && matchesType;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'متوفر':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'منخفض':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'نفدت الكمية':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const handleReserve = (materialId: number, quantity: number) => {
    setMaterials(prev => prev.map(material => {
      if (material.id === materialId && material.available >= quantity) {
        return {
          ...material,
          available: material.available - quantity,
          reserved: material.reserved + quantity
        };
      }
      return material;
    }));
  };

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
            <h1 className="text-2xl font-bold">المواد</h1>
          </div>
          <div className="text-left">
            <p className="text-sm text-white/80">إجمالي المواد</p>
            <p className="text-xl font-bold">{materials.length}</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 h-5 w-5" />
          <Input
            placeholder="البحث عن مادة..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pr-10 bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:bg-white/30"
          />
        </div>

        {/* Type Filter */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {types.map((type) => (
            <Button
              key={type}
              variant={selectedType === type ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setSelectedType(type)}
              className={`whitespace-nowrap ${
                selectedType === type 
                  ? 'bg-white text-primary' 
                  : 'text-white/80 hover:bg-white/20'
              }`}
            >
              {type}
            </Button>
          ))}
        </div>
      </div>

      {/* Materials List */}
      <div className="p-6 space-y-4">
        {filteredMaterials.map((material, index) => (
          <Card
            key={material.id}
            className="hover:shadow-lg transition-all duration-300 animate-slide-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg mb-1">{material.name}</CardTitle>
                  <p className="text-sm text-gray-600 mb-2">{material.description}</p>
                  <Badge variant="outline" className="text-xs">
                    {material.type}
                  </Badge>
                </div>
                <Badge className={getStatusColor(material.status)}>
                  {material.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">{material.quantity}</p>
                  <p className="text-xs text-gray-500">الإجمالي</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">{material.available}</p>
                  <p className="text-xs text-gray-500">متوفر</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-orange-600">{material.reserved}</p>
                  <p className="text-xs text-gray-500">محجوز</p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>الحد الأدنى: {material.minStock}</span>
                  <span>{Math.round((material.available / material.quantity) * 100)}% متوفر</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-500"
                    style={{
                      width: `${Math.max((material.available / material.quantity) * 100, 5)}%`
                    }}
                  ></div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button
                  size="sm"
                  className="flex-1 gradient-primary text-white"
                  disabled={material.available === 0}
                  onClick={() => handleReserve(material.id, 1)}
                >
                  حجز سريع
                </Button>
                <Link to={`/materials/${material.id}`} className="flex-1">
                  <Button variant="outline" size="sm" className="w-full">
                    التفاصيل
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredMaterials.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse-slow">
              <Search className="h-8 w-8 text-white" />
            </div>
            <p className="text-gray-500">لم يتم العثور على مواد</p>
          </div>
        )}
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
          <Link to="/materials" className="flex flex-col items-center gap-1 text-primary">
            <Book className="w-6 h-6" />
            <span className="text-xs font-medium">المواد</span>
          </Link>
          <Link to="/account" className="flex flex-col items-center gap-1 text-gray-500">
            <div className="w-6 h-6 bg-gray-400 rounded-full"></div>
            <span className="text-xs">الحساب</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Materials;
