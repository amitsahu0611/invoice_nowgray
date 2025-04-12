import { AiOutlineHome } from "react-icons/ai";
import { FiUsers, FiUserCheck } from "react-icons/fi";
import { CiSettings } from "react-icons/ci";
export const routes = [
  {
    id: 1,
    name: "dashboard",
    url: "/dashboard/home",
    icon: <AiOutlineHome size={20} />,
    submenu: false,
  },
  {
    id: 2,
    name: "Client",
    url: "/dashboard/client",
    icon: <FiUserCheck size={20} />,
    submenu: false,
  },

  {
    id: 4,
    name: "Admin/Staff",
    url: "/dashboard/staff",
    icon: <FiUsers size={20} />,
    submenu: false,
  },
  {
    id: 5,
    name: "Tasks",
    url: "/dashboard/tasks",
    icon: <FiUsers size={20} />,
    submenu: false,
  },

  {
    id: 6,
    name: "Setting",
    url: "/setting/lookup",
    icon: <CiSettings size={25} />,
    submenu: true,
    submenus: [
      { id: 1, name: "Lookup", url: "/setting/lookup" },
      { id: 2, name: "File No Config", url: "/setting/file_no_config" },
      { id: 3, name: "Notifications", url: "/setting/notifications" },
    ],
  },
];
