
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Bell, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface AppHeaderProps {
  title: string;
  subtitle?: string;
  showBackButton?: boolean;
  showNotifications?: boolean;
  notificationCount?: number;
  backTo?: string;
}

const AppHeader = ({ 
  title, 
  subtitle, 
  showBackButton = false, 
  showNotifications = false,
  notificationCount = 0,
  backTo = "/"
}: AppHeaderProps) => {
  return (
    <div className="bg-white shadow-sm p-4 border-b sticky top-0 z-50">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {showBackButton && (
            <Link to={backTo}>
              <Button variant="ghost" size="icon" className="text-gray-600">
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          )}
          <div className="flex items-center gap-3">
            <img 
              src="/lovable-uploads/0857b8ab-239c-4f2e-9a9f-2e631bf5c277.png" 
              alt="HST Logo" 
              className="h-10 w-auto"
            />
            <div>
              <h1 className="text-lg font-semibold text-gray-800">{title}</h1>
              {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
            </div>
          </div>
        </div>
        
        {showNotifications && (
          <Link to="/notifications">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              {notificationCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 bg-red-500 text-xs">
                  {notificationCount}
                </Badge>
              )}
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default AppHeader;
