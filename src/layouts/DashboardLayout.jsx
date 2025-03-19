import React, { useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "../components/ui/sidebar";
import { Outlet, useLocation, Link } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";
import { AppSidebar } from "../components/app-sidebar";

export default function DashboardLayout() {
  const [isSidebarVisible, setSidebarVisible] = useState(true);
  const location = useLocation();

  // Convert pathname to breadcrumb items
  const getBreadcrumbs = () => {
    const pathnames = location.pathname.split('/').filter((x) => x);
    
    return pathnames.map((name, index) => {
      const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
      const displayName = name.charAt(0).toUpperCase() + name.slice(1);
      
      return (
        <React.Fragment key={routeTo}>
          <BreadcrumbItem>
            <BreadcrumbLink as={Link} to={routeTo}>
              {displayName}
            </BreadcrumbLink>
          </BreadcrumbItem>
          {index < pathnames.length - 1 && <BreadcrumbSeparator />}
        </React.Fragment>
      );
    });
  };

  return (
    <SidebarProvider>
      <AppSidebar isVisible={isSidebarVisible} />
      <SidebarInset>
        <header>
          <div className="flex justify-between mt-4">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger
                className="-ml-1"
                onClick={() => setSidebarVisible((prev) => !prev)}
              />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink as={Link} to="/">
                      Home
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  {getBreadcrumbs()}
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <div className="mr-3">
              <ThemeToggle />
            </div>
          </div>
        </header>

        <div className="flex-1 p-4">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
