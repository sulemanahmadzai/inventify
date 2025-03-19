import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

function WasteLossTable({ dateRange }) {
  // Sample data - replace with actual API call
  const wasteLossData = [
    {
      id: 1,
      product: "Wireless Headphones",
      quantity: 5,
      reason: "Damaged in Transit",
      value: 999.95,
      date: "2024-03-15",
    },
    // Add more sample data
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Waste & Loss Tracking</h2>
        <Badge variant="destructive">Total Loss: $999.95</Badge>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Reason</TableHead>
            <TableHead>Value</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {wasteLossData.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.product}</TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell>{item.reason}</TableCell>
              <TableCell>${item.value.toFixed(2)}</TableCell>
              <TableCell>{item.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default WasteLossTable;
