import { useState } from "react";
import Sidebar from "@/components/sidebar";
import Navbar from "@/components/organisms/navbar";

export default function DefaultLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar isOpen={sidebarOpen} />
      <div className="flex flex-col flex-1">
        <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <main className="p-4 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
