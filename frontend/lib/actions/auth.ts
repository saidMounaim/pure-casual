"use server";

import { cookies } from "next/headers";

// register
export async function registerUser(
  email: string,
  password: string,
  username: string
) {
  try {
    const response = await fetch(
      `${process.env.STRAPI_URL}/api/auth/local/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          username: username,
        }),
      }
    );
    await response.json();

    if (!response.ok) {
      return { success: false, message: "Registration failed" };
    }

    return { success: true, message: "Registration successful" };
  } catch (error) {
    console.error("Registration error:", error);
    return { success: false, message: "An error occurred" };
  }
}

// login
export async function loginUser(email: string, password: string) {
  try {
    const response = await fetch(`${process.env.STRAPI_URL}/api/auth/local`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        identifier: email,
        password: password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return { success: false, message: "Email or password is incorrect" };
    }

    const cookiesSet = await cookies();

    cookiesSet.set("token", data.jwt, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return { success: true };
  } catch (error) {
    console.error("Login error:", error);
    return { success: false, message: "An error occurred" };
  }
}

// get user
export async function getUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return null;
  }

  try {
    const res = await fetch(`${process.env.STRAPI_URL}/api/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      return null;
    }

    const user = await res.json();
    return user;
  } catch (err) {
    console.error("Error fetching user:", err);
    return null;
  }
}

// logout
export async function logoutUser() {
  const cookieStore = await cookies();
  cookieStore.delete("token");
}
