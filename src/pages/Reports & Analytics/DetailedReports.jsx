import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Download, FileSpreadsheet } from "lucide-react";
import WasteLossTable from "@/components/reports/WasteLossTable";
import ProductPerformance from "@/components/reports/ProductPerformance";
import RevenueBreakdown from "@/components/reports/RevenueBreakdown";
import { DateRangePicker } from "@/components/reports/DateRangePicker";

function DetailedReports() {
  const [dateRange, setDateRange] = useState({
    from: new Date(),
    to: new Date(),
  });

  const handleExport = (format) => {
    // Implementation for export functionality
    console.log(`Exporting in ${format} format`);
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Detailed Reports</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => handleExport("excel")}>
            <FileSpreadsheet className="mr-2 h-4 w-4" />
            Export Excel
          </Button>
          <Button variant="outline" onClick={() => handleExport("pdf")}>
            Export PDF
          </Button>
        </div>
      </div>

      <div className="flex justify-end">
        <DateRangePicker date={dateRange} setDate={setDateRange} />
      </div>

      <Tabs defaultValue="waste" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
          <TabsTrigger value="waste">Waste & Loss</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
        </TabsList>

        <TabsContent value="waste">
          <Card className="p-6">
            <WasteLossTable dateRange={dateRange} />
          </Card>
        </TabsContent>

        <TabsContent value="performance">
          <Card className="p-6">
            <ProductPerformance dateRange={dateRange} />
          </Card>
        </TabsContent>

        <TabsContent value="revenue">
          <Card className="p-6">
            <RevenueBreakdown dateRange={dateRange} />
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default DetailedReports;
