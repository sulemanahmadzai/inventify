import {
  BarChart2,
  User,
  FileText,
  Settings,
  Globe,
  PieChart,
  Layers,
} from "lucide-react";

const sidebarItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: BarChart2,
    items: [], // No sub-items
  },
  {
    title: "User Management",
    url: "/user-management",
    icon: User,
    items: [], // No sub-items
  },
  {
    title: "Reports and Insights",
    url: "/reports",
    icon: FileText,
    items: [
      { title: "Sales Reports", url: "/reports/sales" },
      { title: "Inventory Reports", url: "/reports/inventory" },
    ],
  },
  {
    title: "Performance Tracking",
    url: "/performance-tracking",
    icon: Layers,
    items: [], // No sub-items
  },
  {
    title: "Resource Insights",
    url: "/resource-insights",
    icon: Globe,
    items: [], // No sub-items
  },
  {
    title: "Activity Overview",
    url: "/activity-overview",
    icon: PieChart,
    items: [], // No sub-items
  },
  {
    title: "Trends and Forecasting",
    url: "/trends",
    icon: FileText,
    items: [
      { title: "Sales Trends", url: "/trends/sales" },
      { title: "Stock Trends", url: "/trends/stock" },
    ],
  },
  {
    title: "Revenue and Cost Insights",
    url: "/insights",
    icon: FileText,
    items: [
      { title: "Revenue Insights", url: "/insights/revenue" },
      { title: "Profit Margins", url: "/insights/profit" },
    ],
  },
  {
    title: "Category and Product Analysis",
    url: "/analysis",
    icon: FileText,
    items: [
      { title: "Category Analysis", url: "/analysis/category" },
      { title: "Product Performance", url: "/analysis/product" },
    ],
  },
  {
    title: "Waste and Loss Tracking",
    url: "/tracking",
    icon: FileText,
    items: [
      { title: "Waste Tracking", url: "/tracking/waste" },
      { title: "Loss Tracking", url: "/tracking/loss" },
    ],
  },
  {
    title: "Geographic Insights",
    url: "/insights/geographic",
    icon: Globe,
    items: [
      { title: "Sales by Region", url: "/insights/geographic-sales" },
      { title: "Stock Distribution", url: "/insights/stock-distribution" },
    ],
  },
];

export default sidebarItems;
