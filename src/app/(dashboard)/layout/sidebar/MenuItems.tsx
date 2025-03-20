// import {
//   IconAperture,
//   IconCopy,
//   IconLayoutDashboard,
//   IconLogin,
//   IconMoodHappy,
//   IconTypography,
//   IconUserPlus,
// } from "@tabler/icons-react";
import CameraIcon from '@mui/icons-material/Camera';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LoginIcon from '@mui/icons-material/Login';
import MoodIcon from '@mui/icons-material/Mood';
import MarginIcon from '@mui/icons-material/Margin';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

import { uniqueId } from "lodash";


const Menuitems = [
  {
    navlabel: true,
    subheader: "Home",
  },

  {
    id: uniqueId(),
    title: "Dashboard",
    icon: DashboardIcon,
    href: "/",
  },
  {
    navlabel: true,
    subheader: "Operation",
  },
  {
    id: uniqueId(),
    title: "Orders",
    icon: AddShoppingCartIcon,
    href: "/orders",
  },
  {
    id: uniqueId(),
    title: "Products",
    icon: MarginIcon,
    href: "/products",
  },

  {
    navlabel: true,
    subheader: "Marketing",
  },
  {
    id: uniqueId(),
    title: "Blogs",
    icon: ContentCopyIcon,
    href: "/blogs",
  },
  {
    navlabel: true,
    subheader: "Auth",
  },
  {
    id: uniqueId(),
    title: "Register",
    icon: PersonAddIcon,
    href: "/authentication/register",
  }

];

export default Menuitems;
