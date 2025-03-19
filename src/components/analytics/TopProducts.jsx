import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown } from "lucide-react";

function TopProducts({ data, detailed = false }) {
  return (
    <Card className="p-6 h-full">
      <h3 className="text-lg font-semibold mb-4">Top Products</h3>

      <div className="space-y-4 overflow-y-auto h-[calc(100%-3rem)]">
        {data?.products.map((product) => (
          <div key={product.id} className="flex items-center justify-between">
            <div>
              <p className="font-medium">{product.name}</p>
              <p className="text-sm text-gray-400">{product.sales} sales</p>
            </div>
            {product.trending === "up" ? (
              <Badge
                variant="success"
                className="bg-green-500/20 text-green-500"
              >
                <TrendingUp className="h-4 w-4 mr-1" />
                {product.percentage}%
              </Badge>
            ) : (
              <Badge
                variant="destructive"
                className="bg-red-500/20 text-red-500"
              >
                <TrendingDown className="h-4 w-4 mr-1" />
                {product.percentage}%
              </Badge>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
}

export default TopProducts;
