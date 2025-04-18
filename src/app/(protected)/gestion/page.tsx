"use client";

import React, { ReactNode } from 'react';
import { Home, Map, Clipboard, ShoppingCart, User, Truck, DollarSign, BarChart2, FileText, TrendingUp } from 'lucide-react';
import { useSession } from "next-auth/react";
import DashboardCard from '@/components/ui/GestionCard';

interface CardItem {
  icon: ReactNode;
  label: string;
}

interface CardData {
  items: CardItem[];
}

export default function GestionPage(): React.ReactNode {
  const { data: session } = useSession();
  
  // Definir los datos para cada tarjeta
  const cardData: CardData[] = [
    {
      items: [
        { icon: <Home className="w-9 h-9 text-white" />, label: "Registro de\nbodegas" },
        { icon: <Map className="w-9 h-9 text-white" />, label: "Registro\nde rutas" }
      ]
    },
    {
      items: [
        { icon: <Clipboard className="w-9 h-9 text-white" />, label: "Control de\ninventario" },
        { icon: <ShoppingCart className="w-9 h-9 text-white" />, label: "Gestión\nde pedidos" }
      ]
    },
    {
      items: [
        { icon: <User className="w-9 h-9 text-white" />, label: "Gestión de\nclientes" },
        { icon: <Truck className="w-9 h-9 text-white" />, label: "Gestión\nde envíos" }
      ]
    },
    {
      items: [
        { icon: <DollarSign className="w-9 h-9 text-white" />, label: "Facturación" },
        { icon: <BarChart2 className="w-9 h-9 text-white" />, label: "Reportes\nde ventas" }
      ]
    },
    {
      items: [
        { icon: <FileText className="w-9 h-9 text-white" />, label: "Gestión de documentos" }
      ]
    },
    {
      items: [
        { icon: <TrendingUp className="w-9 h-9 text-white" />, label: "Análisis de tendencias" }
      ]
    }
  ];
  
  return (
    <div className="flex-1 overflow-auto py-6 px-4 sm:px-6 lg:px-8 relative">
      <div className="bg-white rounded-lg shadow-md p-6 w-full min-h-[calc(100vh-6rem)]">
        {/* Header with greeting and avatar */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Hola, {session?.user?.name?.split(' ')[0] || "Brandon"}
          </h1>
          <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
            {session?.user?.name ? session.user.name[0] : "B"}
          </div>
        </div>
        
        {/* Divider */}
        <div className="border-b border-gray-300 mb-8"></div>
        
        {/* Grid of options - first row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <DashboardCard items={cardData[0].items} />
          <DashboardCard items={cardData[1].items} />
        </div>
        
        {/* Grid of options - second row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <DashboardCard items={cardData[2].items} />
          <DashboardCard items={cardData[3].items} />
        </div>
        
        {/* Grid of options - third row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <DashboardCard items={cardData[4].items} />
          <DashboardCard items={cardData[5].items} />
        </div>
      </div>
    </div>
  );
}