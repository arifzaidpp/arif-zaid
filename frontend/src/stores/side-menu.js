import { atom } from "recoil";

const sideMenu = atom({
  key: "sideMenu",
  default: {
    menu: [
      {
        icon: "Home",
        title: "Dashboard",
        pathname: "/admin",
      },
      {
        icon: "Waypoints",
        title: "Projects",
        subMenu: [
          {
            icon: "",
            pathname: "/admin/add-project",
            title: "Add Projects",
          },
          {
            icon: "",
            pathname: "/admin/edit-projects",
            title: "Edit Projects",
          },
        ],
      },
      {
        icon: "ChartColumn",
        title: "Skills",
        subMenu: [
          {
            icon: "",
            pathname: "/admin/add-skill",
            title: "Add Skill",
          },
          {
            icon: "",
            pathname: "/admin/edit-skills",
            title: "Edit Skills",
          },
        ],
      },
      {
        icon: "Medal",
        title: "Certificates",
        subMenu: [
          {
            icon: "",
            pathname: "/admin/add-certificate",
            title: "Add Certificate",
          },
          {
            icon: "",
            pathname: "/admin/edit-certificates",
            title: "Edit Certificates",
          },
        ],
      },
      {
        icon: "University",
        title: "Education",
        subMenu: [
          {
            icon: "",
            pathname: "/admin/add-education",
            title: "Add Education", 
          },
          {
            icon: "",
            pathname: "/admin/edit-educations",
            title: "Edit Educations",
          },
        ],
      },
      {
        icon: "Inbox",
        pathname: "/admin/inbox",
        title: "Inbox",
      },
      {
        icon: "HardDrive",
        pathname: "/admin/file-manager",
        title: "File Manager",
      },
      {
        icon: "MessageSquare",
        pathname: "/admin/chat",
        title: "Chat",
      },
      {
        icon: "FileText",
        pathname: "/admin/post",
        title: "Post",
      },
      {
        icon: "Calendar",
        pathname: "/admin/calendar",
        title: "Calendar",
      },
      "devider",
    ],
  },
});

export { sideMenu };
