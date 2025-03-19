import React, { useEffect, useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { feature } from "topojson-client";
import worldData from "world-atlas/countries-110m.json";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../../components/ui/tooltip";
import { salesService } from "../../services/salesService"; // Import the sales service

const geoFeatures = feature(worldData, worldData.objects.countries).features;

const SalesByRegion = () => {
  const [regionSales, setRegionSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRegionSales = async () => {
      try {
        setLoading(true);
        const data = await salesService.fetchRegionSales(); // Use the service
        setRegionSales(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRegionSales();
  }, []);

  // Map to resolve mismatches between the backend and map data
  const countryNameMapping = {
    "United States of America": "USA",
    CAN: "Canada",
    // Add other mappings as needed
  };

  const getSalesData = (countryName) => {
    // Map country name from the API to the backend identifier
    const backendCountryId = countryNameMapping[countryName] || countryName;
    return regionSales.find((item) => item._id === backendCountryId);
  };

  if (loading) {
    return <div>Loading Geographic Insights...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Geographic Insights</h2>
      <ComposableMap>
        <Geographies geography={geoFeatures}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const countryName = geo.properties.name;

              const salesData = getSalesData(countryName);

              return (
                <Tooltip key={geo.rsmKey}>
                  <TooltipTrigger asChild>
                    <Geography
                      geography={geo}
                      style={{
                        default: {
                          fill: "#D6D6DA",
                          outline: "none",
                        },
                        hover: {
                          fill: "#F53",
                          outline: "none",
                        },
                        pressed: {
                          fill: "#E42",
                          outline: "none",
                        },
                      }}
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <div className="p-2">
                      <h3 className="text-lg font-semibold">{countryName}</h3>
                      <p>
                        Total Sales:{" "}
                        {salesData
                          ? `$${salesData.totalSales.toLocaleString()}`
                          : "N/A"}
                      </p>
                      <p>
                        Order Count: {salesData ? salesData.orderCount : "N/A"}
                      </p>
                    </div>
                  </TooltipContent>
                </Tooltip>
              );
            })
          }
        </Geographies>
      </ComposableMap>
    </div>
  );
};

export default SalesByRegion;
