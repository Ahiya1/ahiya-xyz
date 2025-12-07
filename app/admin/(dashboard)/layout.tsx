import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { AdminSidebar } from "@/app/admin/components/AdminSidebar";
import { AdminHeader } from "@/app/admin/components/AdminHeader";

import { verifyAdminToken } from "@/lib/auth";

const AUTH_COOKIE_NAME = "ahiya_admin_session";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;

  if (!token) {
    redirect("/admin/login");
  }

  const { valid } = await verifyAdminToken(token);

  if (!valid) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-[#0a0f1a] flex">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-h-screen">
        <AdminHeader />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
