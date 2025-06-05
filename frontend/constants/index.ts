import {
  Home,
  ShoppingBag,
  Package,
  User,
  UserPlus,
  ShoppingCart,
} from "lucide-react";

export const navigationItems = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Products",
    url: "/products",
    icon: Package,
  },
  {
    title: "Orders",
    url: "/orders",
    icon: ShoppingBag,
  },
  {
    title: "Checkout",
    url: "/checkout",
    icon: ShoppingCart,
  },
];

export const authItems = [
  {
    title: "Sign In",
    url: "/signin",
    icon: User,
  },
  {
    title: "Sign Up",
    url: "/signup",
    icon: UserPlus,
  },
];
