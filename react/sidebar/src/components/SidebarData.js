import React from "react";
import * as AiIcons from "react-icons/ai";
import * as FaIcons from "react-icons/fa";
import * as IoIcons from "react-icons/io";
import * as RiIcons from "react-icons/ri";

export const SidebarData = [
  {
    title: "Home",
    path: "/home",
    icon: <AiIcons.AiFillHome />,
  },
  {
    title: "Service Provider",
    path: "/provider",
    icon: <FaIcons.FaToolbox />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
      {
        title: "My Organization",
        path: "/provider/organization",
        icon: <RiIcons.RiHomeGearFill />,
      },
      {
        title: "My Services",
        path: "/provider/myservices",
        icon: <RiIcons.RiServiceFill />,
      },
      {
        title: "Service Directory",
        path: "/provider/directory",
        icon: <IoIcons.IoIosBook />,
      },
    ],
  },
  {
    title: "Frontline Manager",
    path: "/manager",
    icon: <FaIcons.FaUserTie />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
      {
        title: "My Organization",
        path: "/manager/organization",
        icon: <RiIcons.RiHomeGearFill />,
      },
      {
        title: "My Projects",
        path: "/manager/myprojects",
        icon: <FaIcons.FaUserTie />,
      },
      {
        title: "Job Board",
        path: "/manager/jobboard",
        icon: <RiIcons.RiDashboardFill />,
      },
    ],
  },
];
