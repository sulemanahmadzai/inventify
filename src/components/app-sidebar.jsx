import * as React from "react";
import {
  LifeBuoy,
  Send,
  Package,
  Users,
  BarChart2,
  FileText,
  Globe,
  PieChart,
  Layers,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { profileService } from "@/services/profileService";

export function AppSidebar({ isVisible, ...props }) {
  const [profileData, setProfileData] = React.useState(null);

  React.useEffect(() => {
    if (isVisible) {
      profileService
        .fetchProfile()
        .then((data) => setProfileData(data))
        .catch((err) => console.error("Error fetching profile:", err));
    }
  }, [isVisible]);

  const data = {
    user: {
      name: profileData?.name || "Loading...",
      email: profileData?.email || "",
    },
    navMain: [
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: BarChart2,
        items: [],
      },
      {
        title: "User Management",
        url: "/user-management",
        icon: Users,
        items: [],
      },
      {
        title: "Analytics",
        url: "/analytics",
        icon: PieChart,
      },

      {
        title: "Geographic Insights",
        url: "/geo-sales",
        icon: Globe,
        items: [],
      },
    ],
  };

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex justify-center">
                  <img
                    src="/inventify.svg"
                    alt="Logo"
                    className="h-10 w-full animate-bounceSlow"
                  />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Inventify</span>
                  <span className="truncate text-xs">Smart Inventory</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
