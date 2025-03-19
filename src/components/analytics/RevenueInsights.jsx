import React from "react";
import { Card } from "@/components/ui/card";
import { DollarSign } from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
function RevenueInsights({ data, detailed = false }) {
  const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#1F2937"];
  const categories = data?.categories || [];

  if (!categories.length) {
    return (
      <Card className="p-4 sm:p-6 h-full">
        <h3 className="text-lg sm:text-xl font-semibold">
          No Revenue Data Available
        </h3>
      </Card>
    );
  }

  return (
    <Card className="p-4 sm:p-6 h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg sm:text-xl font-semibold text-center justify-center">
          Revenue by Category
        </h3>
        <DollarSign className="h-5 w-5 text-yellow-500" />
      </div>

      <div className="h-[200px] sm:h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={categories}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius="80%"
              fill="#8884d8"
            >
              {categories.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend
              layout="vertical"
              verticalAlign="middle"
              align="right"
              wrapperStyle={{ fontSize: "12px" }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

export default RevenueInsights;
