import {
  Home,
  ShoppingBag,
  Package,
  User,
  UserPlus,
  ShoppingCart,
  Heart,
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
    url: "/my-orders",
    icon: ShoppingBag,
  },
  {
    title: "Checkout",
    url: "/checkout",
    icon: ShoppingCart,
  },
  {
    title: "Wishlist",
    url: "/wishlist",
    icon: Heart,
  },
];

export const authItems = [
  {
    title: "Sign In",
    url: "/sign-in",
    icon: User,
  },
  {
    title: "Sign Up",
    url: "/sign-up",
    icon: UserPlus,
  },
];
