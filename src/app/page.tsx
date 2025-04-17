'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function YambolyWebsite() {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Imágenes del slider
  const slides = [
    { id: 1, src: "https://yambolyminio.sitemaster.lat/images/baner1.jpg" },
    { id: 2, src: "https://yambolyminio.sitemaster.lat/images/baner2.jpg" },
    { id: 3, src: "https://yambolyminio.sitemaster.lat/images/baner3.jpg" }
  ];
  
  // Auto-rotación de los slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [slides.length]);
  
  // Cambiar slide manualmente
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Función para redirigir al login
  const handleLoginRedirect = () => {
    router.push("/login");
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-cyan-400">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-10 flex justify-between items-center px-8 py-4 mx-auto max-w-7xl">
        {/* Logo */}
        <div className="w-72 h-28 relative ml-6">
          <Image 
            src="https://yambolyminio.sitemaster.lat/images/yamboly.png" 
            alt="Yamboly Logo" 
            width={280}
            height={110}
            style={{ 
              objectFit: "contain",
              width: "auto",
              height: "100%"
            }}
            priority
          />
        </div>
        
        {/* Navegación con un solo botón */}
        <nav className="mr-8">
          <button 
            onClick={handleLoginRedirect}
            className="bg-purple-700 hover:bg-purple-800 text-white font-bold italic py-3 px-8 rounded-full transition-colors duration-300 cursor-pointer text-lg"
          >
            Ir a login
          </button>
        </nav>
      </header>
      
      {/* Slider */}
      <div className="relative h-screen">
        {/* Slides - Imágenes de banner */}
        {slides.map((slide, index) => (
          <div 
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100 z-0' : 'opacity-0 -z-10'
            }`}
          >
            {/* Imagen de fondo que ocupa toda la pantalla */}
            <div className="w-full h-full relative">
              <img 
                src={slide.src} 
                alt={`Banner ${index + 1}`} 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        ))}
        
        {/* Olas decorativas en la parte inferior */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full">
            <path fill="white" fillOpacity="0.2" d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
            <path fill="white" fillOpacity="0.4" d="M0,96L80,90.7C160,85,320,75,480,80C640,85,800,107,960,112C1120,117,1280,107,1360,101.3L1440,96L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
            <path fill="white" fillOpacity="0.8" d="M0,96L60,96C120,96,240,96,360,90.7C480,85,600,75,720,74.7C840,75,960,85,1080,90.7C1200,96,1320,96,1380,96L1440,96L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z"></path>
          </svg>
        </div>
        
        {/* Indicadores de slide */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center z-10">
          <div className="flex space-x-4">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-4 h-4 rounded-full border-2 border-purple-700 ${
                  index === currentSlide ? 'bg-purple-700' : 'bg-transparent'
                }`}
                aria-label={`Ir al slide ${index + 1}`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}