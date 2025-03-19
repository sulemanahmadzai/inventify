import React, { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Package } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { analyticsService } from "@/services/analyticsService";

function InventoryOverview({
  data = null, // initial data if passed (not required if always fetching)
  detailed = false,
  showFilters = false,
  infiniteScroll = false,
  initialLimit = 50,
  pageSize = 12,
}) {
  const [inventoryData, setInventoryData] = useState(data);
  const [isLoading, setIsLoading] = useState(false);

  // Filters (only used if showFilters is true)
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [category, setCategory] = useState("");
  const [limit, setLimit] = useState("");

  // Pagination states for infinite scroll
  const [currentPage, setCurrentPage] = useState(1);
  const [items, setItems] = useState([]);
  const observerRef = useRef(null);

  useEffect(() => {
    if (!infiniteScroll) {
      // Fetch all data at once if not provided as props
      fetchInventoryData();
    } else {
      // Reset for infinite scroll mode
      setItems([]);
      setCurrentPage(1);
    }
  }, [search, sortField, sortOrder, category, limit, infiniteScroll]);

  useEffect(() => {
    if (infiniteScroll) {
      loadMoreItems();
    }
  }, [currentPage, infiniteScroll]);

  useEffect(() => {
    if (infiniteScroll && observerRef.current) {
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !isLoading) {
          setCurrentPage((prev) => prev + 1);
        }
      });
      observer.observe(observerRef.current);
      return () => observer.disconnect();
    }
  }, [infiniteScroll, isLoading]);

  const fetchInventoryData = async () => {
    setIsLoading(true);
    try {
      const data = await analyticsService.fetchInventoryData({
        timeRange: "weekly",
        search: showFilters ? search : undefined,
        sortField: showFilters ? sortField : undefined,
        sortOrder: showFilters ? sortOrder : undefined,
        category: showFilters ? category : undefined,
        limit: showFilters ? limit || initialLimit : initialLimit,
      });
      setInventoryData(data.inventory);
    } catch (error) {
      console.error("Error fetching inventory data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadMoreItems = async () => {
    if (!infiniteScroll) return;
    setIsLoading(true);
    try {
      const skip = (currentPage - 1) * pageSize;
      const data = await analyticsService.fetchInventoryData({
        timeRange: "weekly",
        search: showFilters ? search : undefined,
        sortField: showFilters ? sortField : undefined,
        sortOrder: showFilters ? sortOrder : undefined,
        category: showFilters ? category : undefined,
        limit: pageSize,
        skip,
      });

      if (data.inventory && data.inventory.categories) {
        setItems((prev) => [...prev, ...data.inventory.categories]);
      }
    } catch (error) {
      console.error("Error loading more items:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Determine which data set to render:
  const renderData = infiniteScroll ? items : inventoryData?.categories || [];

  return (
    <Card className={`p-6 h-full ${detailed ? "w-full" : ""}`}>
      <div className="flex items-center justify-between mb-4  ">
        <h3 className="text-lg font-semibold">Inventory Overview</h3>
        <Package className="h-5 w-5 text-green-500" />
      </div>

      {showFilters && (
        <div className="sticky top-0 z-10 bg-background p-4 flex flex-col sm:flex-row gap-4">
          <Input
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1"
          />

          <Select value={sortField} onValueChange={(val) => setSortField(val)}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Sort Field" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="stock">Stock</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortOrder} onValueChange={(val) => setSortOrder(val)}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Order" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="asc">Ascending</SelectItem>
              <SelectItem value="desc">Descending</SelectItem>
            </SelectContent>
          </Select>

          <Input
            placeholder="Category..."
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="flex-1"
          />

          <Input
            placeholder="Limit (e.g., 5)"
            type="number"
            value={limit}
            onChange={(e) => setLimit(e.target.value)}
            className="w-[100px]"
          />

          <Button variant="outline" onClick={() => fetchInventoryData()}>
            Refresh
          </Button>
        </div>
      )}

      {isLoading && renderData.length === 0 ? (
        <div className="flex items-center justify-center">Loading...</div>
      ) : (
        <div
          className={`space-y-4 ${
            infiniteScroll ? "" : "overflow-y-auto"
          } h-[calc(100%-2.5rem)]`}
        >
          {renderData.length > 0 ? (
            renderData.map((categoryItem, index) => (
              <div key={`${categoryItem.name}-${index}`}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">
                    {categoryItem.name}
                  </span>
                  <span className="text-sm text-gray-400">
                    {categoryItem.stock} items
                  </span>
                </div>
                <Progress
                  value={categoryItem.stockPercentage}
                  className="h-2"
                  indicatorClassName="bg-green-500"
                />
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">No inventory data found.</p>
          )}

          {infiniteScroll && !isLoading && (
            <div ref={observerRef} className="h-10" />
          )}

          {isLoading && infiniteScroll && renderData.length > 0 && (
            <div className="text-center text-sm text-gray-500">
              Loading more...
            </div>
          )}
        </div>
      )}
    </Card>
  );
}

export default InventoryOverview;
