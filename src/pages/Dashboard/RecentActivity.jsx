import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import {
  ShoppingCart,
  User,
  AlertTriangle,
  Package,
  UserPlus,
  AlertCircle,
  ChevronRight,
} from "lucide-react";
import { dashboardService } from "@/services/dashboardService"; // Import the service

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  completed: "bg-green-100 text-green-800",
  processing: "bg-blue-100 text-blue-800",
  cancelled: "bg-red-100 text-red-800",
};

const ActivityCard = ({ title, description, icon: Icon, children }) => (
  <Card className="overflow-hidden transition-shadow hover:shadow-lg">
    <CardHeader className="flex items-center space-x-3 p-4 bg-gray-50">
      <Icon className="w-6 h-6 text-gray-600" />
      <div>
        <CardTitle className="text-lg font-semibold text-gray-800">
          {title}
        </CardTitle>
        <CardDescription className="text-sm text-gray-500">
          {description}
        </CardDescription>
      </div>
    </CardHeader>
    <CardContent className="p-4">
      <ScrollArea className="h-64">{children}</ScrollArea>
    </CardContent>
  </Card>
);

const TimelineItem = ({ icon: Icon, children, className }) => (
  <div className="flex items-center space-x-4 py-2">
    <div
      className={`flex items-center justify-center w-10 h-10 rounded-full ${className}`}
    >
      <Icon className="w-5 h-5" />
    </div>
    <div className="flex-1">{children}</div>
    <ChevronRight className="w-5 h-5 text-gray-400" />
  </div>
);

export function RecentActivity() {
  const [activityData, setActivityData] = useState({
    recentOrders: [],
    newUsers: [],
    lowStockAlerts: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await dashboardService.fetchRecentActivity(); // Use the service
        setActivityData(data);
      } catch (err) {
        setError("Failed to fetch recent activity. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchActivity();
  }, []);

  if (loading) {
    return <div>Loading recent activity...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-3">
      {/* Recent Orders */}
      <ActivityCard
        title="Recent Orders"
        description="Latest orders placed by users"
        icon={Package}
      >
        <div className="space-y-2">
          {activityData.recentOrders.length > 0 ? (
            activityData.recentOrders.map((order) => (
              <TimelineItem
                key={order._id}
                icon={ShoppingCart}
                className="bg-blue-100 text-blue-600"
              >
                <div>
                  <p className="text-sm font-medium">
                    Order #{order._id.slice(-6)}
                  </p>
                  <div className="flex items-center space-x-2">
                    <p className="text-sm text-gray-600">
                      {order.userId?.name || "Unknown User"}
                    </p>
                    <Badge
                      className={`${
                        statusColors[order.status.toLowerCase()]
                      } px-2 py-1 rounded-full text-xs`}
                    >
                      {order.status}
                    </Badge>
                  </div>
                </div>
              </TimelineItem>
            ))
          ) : (
            <p className="text-sm text-gray-500">No recent orders available.</p>
          )}
        </div>
      </ActivityCard>

      {/* New Users */}
      <ActivityCard
        title="New Users"
        description="Recently registered users"
        icon={UserPlus}
      >
        <div className="space-y-2">
          {activityData.newUsers.length > 0 ? (
            activityData.newUsers.map((user) => (
              <TimelineItem
                key={user._id}
                icon={User}
                className="bg-green-100 text-green-600"
              >
                <div>
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-sm text-gray-600">{user.email}</p>
                </div>
              </TimelineItem>
            ))
          ) : (
            <p className="text-sm text-gray-500">No new users registered.</p>
          )}
        </div>
      </ActivityCard>

      {/* Low Stock Alerts */}
      <ActivityCard
        title="Low Stock Alerts"
        description="Items with critical stock levels"
        icon={AlertCircle}
      >
        <div className="space-y-2">
          {activityData.lowStockAlerts.length > 0 ? (
            activityData.lowStockAlerts.map((item) => (
              <TimelineItem
                key={item._id}
                icon={AlertTriangle}
                className="bg-red-100 text-red-600"
              >
                <div>
                  <p className="text-sm font-medium">
                    {item.productId?.name || "Unknown Product"}
                  </p>
                  <p className="text-sm text-gray-600">
                    {item.quantity} units remaining
                  </p>
                </div>
              </TimelineItem>
            ))
          ) : (
            <p className="text-sm text-gray-500">
              All stock levels are sufficient.
            </p>
          )}
        </div>
      </ActivityCard>
    </div>
  );
}
