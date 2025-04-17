"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Logo from "@/components/ui/Logo";
import { Home, Users, BarChart2, Settings, FileText, Briefcase } from "lucide-react";
import { cn } from "@/utils/helpers";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Usuarios", href: "/users", icon: Users },
  { name: "Reportes", href: "/reports", icon: BarChart2 },
  { name: "Documentos", href: "/documents", icon: FileText },
  { name: "Gestión", href: "/gestion", icon: Briefcase },
  { name: "Configuración", href: "/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="hidden md:flex md:w-64 md:flex-col">
      <div className="flex min-h-0 flex-1 flex-col border-r border-gray-200 bg-white">
        <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
          <div className="flex flex-shrink-0 items-center px-4">
            <Logo />
          </div>
          <nav className="mt-6 flex-1 space-y-1 px-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "group flex items-center px-2 py-2 text-sm font-medium rounded-md",
                    isActive
                      ? "bg-green-50 text-green-600"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  )}
                >
                  <Icon
                    className={cn(
                      "mr-3 h-5 w-5 flex-shrink-0",
                      isActive
                        ? "text-green-500"
                        : "text-gray-400 group-hover:text-gray-500"
                    )}
                  />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
}