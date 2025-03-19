import React from "react";
import KPI from "./KPI";
import { Overview } from "./Overview";
import { InventoryStatus } from "./InventoryStatus";
import { RecentActivity } from "./RecentActivity";

function Dashboard() {
  return (
    <div className="space-y-8">
      {/* KPI Section */}
      <KPI />
      <div className="grid grid-cols1 md:grid-cols-3">
        {/* Overview - Takes 2/3 of the row */}
        <div className="md:col-span-2">
          <Overview />
        </div>
        {/* Inventory Status - Takes 1/3 of the row */}
        <div className="md:col-span-1">
          <InventoryStatus />
        </div>
      </div>
      {/* Recent Activity */}
      <RecentActivity />
    </div>
  );
}

export default Dashboard;
