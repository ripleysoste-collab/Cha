import React, { useState } from 'react';

interface ColorChoice {
  id: string;
  name: string;
  bgHex: string;
  textHex: string; // Text contrast color
  borderColor?: string;
}

const COLORS: ColorChoice[] = [
  {
    id: 'yellow',
    name: 'Rosaesmeralda12345',
    bgHex: '#FACC15',
    textHex: '#000000',
    borderColor: '#EAB308',
  },
  {
    id: 'blue',
    name: 'catastresfilas345',
    bgHex: '#2563EB',
    textHex: '#FFFFFF',
    borderColor: '#1D4ED8',
  },
  {
    id: 'black',
    name: 'Negroobsidiana12345',
    bgHex: '#000000',
    textHex: '#FFFFFF',
    borderColor: '#27272A',
  },
];

export default function App() {
  // Initial background is pure white
  const [activeColor, setActiveColor] = useState<ColorChoice | null>(null);

  const currentBg = activeColor ? activeColor.bgHex : '#FFFFFF';
  const currentTextColor = activeColor ? activeColor.textHex : '#000000';
  const currentName = activeColor ? activeColor.name : '';

  return (
    <div
      className="min-h-screen w-full transition-colors duration-300 flex flex-col items-center pt-8 px-4 selection:bg-transparent"
      style={{ backgroundColor: currentBg }}
    >
      {/* Arribita: Nombre del color activo */}
      <div className="h-10 flex items-center justify-center mb-4">
        {currentName ? (
          <h1
            className="text-2xl sm:text-3xl font-black font-mono tracking-tight transition-colors duration-300 drop-shadow-xs"
            style={{ color: currentTextColor }}
          >
            {currentName}
          </h1>
        ) : (
          <span
            className="text-xs uppercase tracking-widest font-semibold opacity-40 transition-colors duration-300"
            style={{ color: currentTextColor }}
          >
            Toca una bolita de color
          </span>
        )}
      </div>

      {/* Tres bolitas una con cada color */}
      <div className="flex items-center gap-6 p-2 rounded-full backdrop-blur-xs">
        {COLORS.map((c) => {
          const isSelected = activeColor?.id === c.id;
          return (
            <button
              key={c.id}
              onClick={() => setActiveColor(c)}
              className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full transition-all duration-200 cursor-pointer shadow-md hover:scale-110 active:scale-95 ${
                isSelected ? 'ring-4 ring-offset-2 scale-105' : 'hover:opacity-90'
              }`}
              style={{
                backgroundColor: c.bgHex,
                border: `2px solid ${c.borderColor || 'rgba(0,0,0,0.1)'}`,
                outlineColor: currentTextColor,
              }}
              aria-label={`Seleccionar color ${c.name}`}
            />
          );
        })}
      </div>

      {/* Opción sutil para volver a fondo blanco si se seleccionó algún color */}
      {activeColor && (
        <button
          onClick={() => setActiveColor(null)}
          className="mt-6 text-xs font-medium tracking-wide underline underline-offset-4 opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
          style={{ color: currentTextColor }}
        >
          Volver a fondo blanco
        </button>
      )}
    </div>
  );
}
