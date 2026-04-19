import { getCurrentUser } from "@/app/actions/auth";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  
  if (!user || user.role !== "admin") {
    redirect("/dashboard");
  }
  
  return <>{children}</>;
}