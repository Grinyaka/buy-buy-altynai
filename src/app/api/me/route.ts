import { NextResponse } from "next/server";
import { getCurrentUser } from "@/app/actions/auth";

export const GET = async () => {
  const user = await getCurrentUser();
  
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  
  return NextResponse.json({
    id: user.id,
    name: user.name,
    login: user.login,
    role: user.role,
  });
}