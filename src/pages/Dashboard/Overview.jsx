import React, { useState, useEffect } from "react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { dashboardService } from "@/services/dashboardService"; // Import the service

export function Overview() {
  const [period, setPeriod] = useState("daily"); // Selected period
  const [chartData, setChartData] = useState([]);
  const [isDataAvailable, setIsDataAvailable] = useState(true); // To track if there is data
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  const fetchData = async (selectedPeriod) => {
    try {
      setLoading(true);
      setError(null);
      const data = await dashboardService.fetchTopProducts(selectedPeriod); // Use the service

      const processedData = data
        .map((product) => ({
          name: product.productName,
          total: product.totalSold,
        }))
        .sort((a, b) => b.total - a.total) // Sort by totalSold in descending order
        .slice(0, 7); // Take top 7 products

      setIsDataAvailable(processedData.length > 0);
      setChartData(processedData);
    } catch (error) {
      setError("Failed to load data. Please try again later.");
      setIsDataAvailable(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(period);
  }, [period]);

  return (
    <Card className="shadow-lg rounded-lg p-4">
      {/* Title and Dropdown Section */}
      <CardHeader className="flex flex-col items-start md:flex-row md:justify-between pb-4">
        <div>
          <CardTitle className="text-xl font-semibold">
            Top Products Overview
          </CardTitle>
          <CardDescription>
            Analyze the performance of your top products by period.
          </CardDescription>
        </div>
        <div className="mt-4 md:mt-0">
          <Select onValueChange={(value) => setPeriod(value)} value={period}>
            <SelectTrigger className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Period</SelectLabel>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>

      {/* Chart Section */}
      <CardContent>
        <div className="flex flex-col items-center">
          <h3 className="text-lg font-medium mb-4">Top 7 Most Sold Products</h3>
          {loading ? (
            <div className="flex items-center justify-center w-full h-[300px] text-muted-foreground text-center">
              <p>Loading...</p>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center w-full h-[300px] text-muted-foreground text-center">
              <p>{error}</p>
            </div>
          ) : isDataAvailable ? (
            <div className="w-full h-[300px] sm:h-[350px] lg:h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 20, bottom: 50 }}>
                  <XAxis
                    dataKey="name"
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={10}
                    tickLine={false}
                    axisLine={false}
                    interval={0} // Ensures all labels are shown
                    angle={-45} // Rotates the labels for better fit
                    textAnchor="end" // Aligns the rotated labels
                  />
                  <YAxis
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value}`}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "8px",
                      color: "hsl(var(--chart-1))",
                    }}
                    cursor={{ fill: "rgba(200, 200, 200, 0.2)" }}
                  />
                  <Bar
                    dataKey="total"
                    fill="hsl(var(--chart-1))"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="flex items-center justify-center w-full h-[300px] text-muted-foreground text-center">
              <p>No sales data available for the selected period.</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
