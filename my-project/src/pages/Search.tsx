
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search as SearchIcon, MapPin, Clock, Filter } from 'lucide-react';
import AppHeader from '@/components/AppHeader';
import BottomNavigation from '@/components/BottomNavigation';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('الكل');
  const [selectedSaleType, setSelectedSaleType] = useState('الكل');
  const [selectedCategory, setSelectedCategory] = useState('الكل');

  const locations = ['الكل', 'الرياض', 'جدة', 'الدمام', 'مكة', 'المدينة'];
  const saleTypes = ['الكل', 'تجزئة', 'جملة', 'تجزئة وجملة'];
  const categories = ['الكل', 'ألواح شمسية', 'بطاريات', 'انفرتر', 'كابلات', 'أنظمة متكاملة'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 pb-20">
      <AppHeader title="البحث" subtitle="ابحث عن التجار والمنتجات" showBackButton={true} />

      <div className="p-4 space-y-4">
        {/* Search Input */}
        <div className="relative">
          <SearchIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            placeholder="ابحث عن اسم التاجر أو الشركة..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pr-12 py-6 text-lg border-2 border-gray-200 focus:border-blue-500 rounded-xl"
          />
        </div>

        {/* Filters */}
        <Card className="bg-white shadow-lg border-0">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-4">
              <Filter className="h-5 w-5 text-gray-600" />
              <h3 className="font-semibold text-gray-800">تصفية النتائج</h3>
            </div>

            <div className="space-y-4">
              {/* Location Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">الموقع</label>
                <div className="flex flex-wrap gap-2">
                  {locations.map((location) => (
                    <Button
                      key={location}
                      variant={selectedLocation === location ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedLocation(location)}
                      className={`${
                        selectedLocation === location 
                          ? 'bg-blue-600 text-white' 
                          : 'text-gray-600 border-gray-300'
                      }`}
                    >
                      {location}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Sale Type Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">نوع البيع</label>
                <div className="flex flex-wrap gap-2">
                  {saleTypes.map((type) => (
                    <Button
                      key={type}
                      variant={selectedSaleType === type ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedSaleType(type)}
                      className={`${
                        selectedSaleType === type 
                          ? 'bg-green-600 text-white' 
                          : 'text-gray-600 border-gray-300'
                      }`}
                    >
                      {type}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">فئة المنتج</label>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category)}
                      className={`${
                        selectedCategory === category 
                          ? 'bg-orange-600 text-white' 
                          : 'text-gray-600 border-gray-300'
                      }`}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Search Results */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">نتائج البحث</h3>
          
          {/* Sample Results */}
          <Card className="bg-white shadow-lg border-0">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-semibold text-gray-800">شركة الطاقة الشمسية المتقدمة</h4>
                  <p className="text-sm text-blue-600">أحمد محمد</p>
                </div>
                <Badge className="bg-green-100 text-green-800">موثق</Badge>
              </div>
              
              <div className="space-y-2 mb-3">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="h-4 w-4" />
                  <span>الرياض، المملكة العربية السعودية</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="h-4 w-4" />
                  <span>8:00 ص - 6:00 م</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <Badge variant="outline" className="text-xs">تجزئة وجملة</Badge>
                  <Badge variant="outline" className="text-xs">ألواح شمسية</Badge>
                </div>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  عرض التفاصيل
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <BottomNavigation userType="shared" />
    </div>
  );
};

export default Search;
