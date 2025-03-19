import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import {
  Download,
  BarChart3,
  PieChart,
  LineChart,
  TrendingUp,
} from "lucide-react";
import SalesPerformance from "@/components/analytics/SalesPerformance";
import InventoryOverview from "@/components/analytics/InventoryOverview";
import TopProducts from "@/components/analytics/TopProducts";
import RevenueInsights from "@/components/analytics/RevenueInsights";
import { analyticsService } from "@/services/analyticsService";

function AnalyticsDashboard() {
  const [timeRange, setTimeRange] = useState("weekly");
  const [analyticsData, setAnalyticsData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true); // Start loading
        const data = await analyticsService.fetchAnalyticsData(timeRange);
        setAnalyticsData(data);
        setIsLoading(false); // End loading
      } catch (error) {
        console.error("Error fetching analytics data:", error);
        setIsLoading(false); // End loading on error
      }
    };

    fetchData();
  }, [timeRange]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen space-y-4">
        <Spinner size="lg" className="text-primary" />
        <h2 className="text-lg font-medium text-muted-foreground"></h2>
      </div>
    );
  }

  return (
    <div className="bg-background text-foreground min-h-screen">
      <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r text-transparent bg-clip-text">
            Analytics Dashboard
          </h1>
          <Button
            variant="outline"
            onClick={() => window.print()}
            className="w-full sm:w-auto"
          >
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
            <TabsTrigger
              value="overview"
              className="flex items-center justify-center"
            >
              <BarChart3 className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger
              value="sales"
              className="flex items-center justify-center"
            >
              <LineChart className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Sales</span>
            </TabsTrigger>
            <TabsTrigger
              value="inventory"
              className="flex items-center justify-center"
            >
              <PieChart className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Inventory</span>
            </TabsTrigger>
            <TabsTrigger
              value="revenue"
              className="flex items-center justify-center"
            >
              <TrendingUp className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Revenue</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            {/* Top Row */}
            <div className="flex flex-col lg:flex-row gap-6 mb-6 items-stretch h-[498px]">
              {/* SalesPerformance (75%) */}
              <div className="lg:w-3/4 h-full">
                <SalesPerformance data={analyticsData?.sales} detailed />
              </div>

              {/* TopProducts (25%) */}
              <div className="lg:w-1/4 h-full overflow-y-auto">
                <TopProducts data={analyticsData?.products} detailed />
              </div>
            </div>

            {/* Bottom Row */}
            <div className="flex flex-col lg:flex-row gap-6">
              {/* InventoryOverview (50%) */}
              <div className="lg:w-1/2 h-[400px] overflow-y-auto">
                <InventoryOverview data={analyticsData?.inventory} detailed />
              </div>
              {/* RevenueInsights (50%) */}
              <div className="lg:w-1/2 h-[400px] overflow-y-auto">
                <RevenueInsights
                  data={{
                    categories: analyticsData?.revenue?.categories || [],
                  }}
                  detailed
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="sales">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4">
              Sales Performance
            </h2>
            <SalesPerformance data={analyticsData?.sales} detailed />
          </TabsContent>

          <TabsContent value="inventory">
            <div className="overflow-y-auto">
              <InventoryOverview
                data={analyticsData?.inventory}
                showFilters
                detailed
                infiniteScroll
              />
            </div>
          </TabsContent>

          <TabsContent value="revenue">
            <div className="max-h-96 overflow-y-auto">
              <RevenueInsights
                data={{
                  categories: analyticsData?.revenue?.categories || [],
                }}
                detailed
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default AnalyticsDashboard;
