
import * as React from "react";
import {
  Settings,
  LifeBuoy,
  Map,
  PieChart,
  Send,
  Settings2,
  SquareTerminal,
} from "lucide-react";
import logo from "../../../assets/Logo.svg";

import {
  AlignBoxBottomRightIcon,
  Book02Icon,
  Bookmark03Icon,
  FileDownloadIcon,
  GraduateMaleIcon,
  Home04Icon,
  InformationDiamondIcon,
  Mortarboard02Icon,
  Notification03Icon,
  PenTool03Icon,
  Settings02Icon,
  Store02Icon,
  Ticket03Icon,
  UserAdd01Icon,
} from "hugeicons-react";
import { NavMain } from "@/components/studycenterComponents/sideBar/nav-main";
import { NavProjects } from "@/components/studycenterComponents/sideBar/nav-projects";
import { NavUser } from "@/components/studycenterComponents/sideBar/nav-user";
import { TeamSwitcher } from "@/components/studycenterComponents/sideBar/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Link } from "react-router-dom";

// This is sample data.
const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "",
      icon: Home04Icon,
    },
    {
      title: "Students",
      url: "students",
      icon: Mortarboard02Icon,
    },
    {
      title: "Admission",
      url: "/studycenter/admission",
      icon: UserAdd01Icon,
      items: [
        {
          title: "Admission (Excel)",
          url: "/studycenter/admission/excel",
        },
      ],
    },
    
    {
      title: "Examination",
      url: "examination",
      icon: PenTool03Icon,
    },
    {
      title: "Results",
      url: "results",
      icon: Bookmark03Icon,
    },
    {
      title: "Marksheet",
      url: "marksheet",
      icon: AlignBoxBottomRightIcon,
    },
    {
      title: "Downloads",
      url: "downloads",
      icon: FileDownloadIcon,
    },
    {
      title: "TSSR Store",
      url: "store",
      icon: Store02Icon,
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
  projects: [
    {
      name: "Settings",
      url: "settings",
      icon: Settings02Icon,
    },
    {
      name: "Notifications",
      url: "notifications",
      icon: Notification03Icon,
    },
    // {
    //   name: "Report",
    //   url: "#",
    //   icon: InformationDiamondIcon,
    // },
    
  ],
};

export function AppSidebar({ ...props }) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to="/">
                {/* <div>
                  <img className="w-32" src={logo} alt="" />
                </div> */}
                <div className="border p-0.5 text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <img
                    className="w-full"
                    src={logo}
                    alt="StudyCenterLogo"
                  />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">TSSR </span>
                  <span className="truncate text-xs">Council</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
        {/* <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
