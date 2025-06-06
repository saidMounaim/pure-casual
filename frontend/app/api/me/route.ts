import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const cookiesList = await cookies();
  const token = cookiesList.get("token")?.value;

  if (!token) {
    return NextResponse.json({ user: null }, { status: 200 });
  }

  try {
    const res = await fetch(`${process.env.STRAPI_URL}/api/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      return NextResponse.json({ user: null }, { status: 200 });
    }

    const user = await res.json();
    return NextResponse.json({ user });
  } catch (err) {
    console.error("Error in /api/me:", err);
    return NextResponse.json({ user: null }, { status: 200 });
  }
}
