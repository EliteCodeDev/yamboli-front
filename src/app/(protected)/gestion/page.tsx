"use client";

import React from 'react';
import { Home, Map, Clipboard, ShoppingCart, User, Truck, DollarSign, BarChart2, FileText, TrendingUp } from 'lucide-react';
import { useSession } from "next-auth/react";

export default function GestionPage() {
  const { data: session } = useSession();
  
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
          {/* First card */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-300">
            <div className="flex justify-evenly w-full">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-blue-600 rounded-md flex items-center justify-center mb-4">
                  <Home className="w-9 h-9 text-white" />
                </div>
                <span className="text-center text-gray-800 font-medium">Registro de<br />bodegas</span>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-blue-600 rounded-md flex items-center justify-center mb-4">
                  <Map className="w-9 h-9 text-white" />
                </div>
                <span className="text-center text-gray-800 font-medium">Registro<br />de rutas</span>
              </div>
            </div>
          </div>
          
          {/* Second card */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-300">
            <div className="flex justify-evenly w-full">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-blue-600 rounded-md flex items-center justify-center mb-4">
                  <Clipboard className="w-9 h-9 text-white" />
                </div>
                <span className="text-center text-gray-800 font-medium">Control de<br />inventario</span>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-blue-600 rounded-md flex items-center justify-center mb-4">
                  <ShoppingCart className="w-9 h-9 text-white" />
                </div>
                <span className="text-center text-gray-800 font-medium">Gestión<br />de pedidos</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Grid of options - second row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Third card */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-300">
            <div className="flex justify-evenly w-full">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-blue-600 rounded-md flex items-center justify-center mb-4">
                  <User className="w-9 h-9 text-white" />
                </div>
                <span className="text-center text-gray-800 font-medium">Gestión de<br />clientes</span>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-blue-600 rounded-md flex items-center justify-center mb-4">
                  <Truck className="w-9 h-9 text-white" />
                </div>
                <span className="text-center text-gray-800 font-medium">Gestión<br />de envíos</span>
              </div>
            </div>
          </div>
          
          {/* Fourth card */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-300">
            <div className="flex justify-evenly w-full">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-blue-600 rounded-md flex items-center justify-center mb-4">
                  <DollarSign className="w-9 h-9 text-white" />
                </div>
                <span className="text-center text-gray-800 font-medium">Facturación</span>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-blue-600 rounded-md flex items-center justify-center mb-4">
                  <BarChart2 className="w-9 h-9 text-white" />
                </div>
                <span className="text-center text-gray-800 font-medium">Reportes<br />de ventas</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Grid of options - third row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Fifth card */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-300">
            <div className="flex justify-center w-full">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-blue-600 rounded-md flex items-center justify-center mb-4">
                  <FileText className="w-9 h-9 text-white" />
                </div>
                <span className="text-center text-gray-800 font-medium">Gestión de documentos</span>
              </div>
            </div>
          </div>
          
          {/* Sixth card */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-300">
            <div className="flex justify-center w-full">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-blue-600 rounded-md flex items-center justify-center mb-4">
                  <TrendingUp className="w-9 h-9 text-white" />
                </div>
                <span className="text-center text-gray-800 font-medium">Análisis de tendencias</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}