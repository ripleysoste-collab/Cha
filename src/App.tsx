import React, { useState } from 'react';
import { CheckCircle2, RotateCcw, Send, HelpCircle, Award } from 'lucide-react';

interface ColorChoice {
  id: string;
  name: string;
  bgHex: string;
  textHex: string;
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

interface OptionItem {
  id: string;
  value: string;
  label: string;
  desc: string;
}

interface QuestionItem {
  id: string;
  name: string;
  category: string;
  question: string;
  targetValue: string;
  options: OptionItem[];
}

const QUESTIONS: QuestionItem[] = [
  {
    id: 'pregunta_1',
    name: 'pregunta_1',
    category: 'Historia',
    question: '¿Quién lideró la expedición que llegó a América en 1492?',
    targetValue: 'cristobal_colon',
    options: [
      { id: 'p1_opt_colon', value: 'cristobal_colon', label: 'Cristóbal Colón', desc: 'Navegante genovés' },
      { id: 'p1_opt_vespucio', value: 'americo_vespucio', label: 'Américo Vespucio', desc: 'Cosmógrafo florentino' },
      { id: 'p1_opt_magallanes', value: 'fernando_magallanes', label: 'Fernando de Magallanes', desc: 'Explorador portugués' },
      { id: 'p1_opt_gama', value: 'vasco_da_gama', label: 'Vasco da Gama', desc: 'Navegante pionero de la ruta a India' },
    ],
  },
  {
    id: 'pregunta_2',
    name: 'pregunta_2',
    category: 'Ciencia & Física',
    question: '¿Quién formuló las teorías de la Relatividad Especial y General?',
    targetValue: 'albert_einstein',
    options: [
      { id: 'p2_opt_einstein', value: 'albert_einstein', label: 'Albert Einstein', desc: 'Físico teórico alemán' },
      { id: 'p2_opt_newton', value: 'isaac_newton', label: 'Isaac Newton', desc: 'Autor de los Principia' },
      { id: 'p2_opt_tesla', value: 'nikola_tesla', label: 'Nikola Tesla', desc: 'Pionero de la corriente alterna' },
      { id: 'p2_opt_curie', value: 'marie_curie', label: 'Marie Curie', desc: 'Pionera en radiactividad' },
    ],
  },
  {
    id: 'pregunta_3',
    name: 'pregunta_3',
    category: 'Literatura Universal',
    question: '¿Quién escribió la obra cumbre "Don Quijote de la Mancha"?',
    targetValue: 'miguel_cervantes',
    options: [
      { id: 'p3_opt_cervantes', value: 'miguel_cervantes', label: 'Miguel de Cervantes', desc: 'Novelista del Siglo de Oro' },
      { id: 'p3_opt_garcia_marquez', value: 'gabriel_garcia_marquez', label: 'Gabriel García Márquez', desc: 'Autor de Cien años de soledad' },
      { id: 'p3_opt_shakespeare', value: 'william_shakespeare', label: 'William Shakespeare', desc: 'Dramaturgo inglés' },
      { id: 'p3_opt_borges', value: 'jorge_luis_borges', label: 'Jorge Luis Borges', desc: 'Escritor y poeta argentino' },
    ],
  },
  {
    id: 'pregunta_4',
    name: 'pregunta_4',
    category: 'Arte y Pintura',
    question: '¿Quién pintó la célebre obra renacentista "La Gioconda" (Mona Lisa)?',
    targetValue: 'leonardo_da_vinci',
    options: [
      { id: 'p4_opt_da_vinci', value: 'leonardo_da_vinci', label: 'Leonardo da Vinci', desc: 'Polímata florentino' },
      { id: 'p4_opt_miguel_angel', value: 'miguel_angel_buonarroti', label: 'Miguel Ángel Buonarroti', desc: 'Escultor y pintor de la Sixtina' },
      { id: 'p4_opt_rafael', value: 'rafael_sanzio', label: 'Rafael Sanzio', desc: 'Pintor de La escuela de Atenas' },
      { id: 'p4_opt_van_gogh', value: 'vincent_van_gogh', label: 'Vincent van Gogh', desc: 'Pintor postimpresionista' },
    ],
  },
  {
    id: 'pregunta_5',
    name: 'pregunta_5',
    category: 'Tecnología e Informática',
    question: '¿Quién inventó la World Wide Web (WWW) en el CERN en 1989?',
    targetValue: 'tim_berners_lee',
    options: [
      { id: 'p5_opt_berners_lee', value: 'tim_berners_lee', label: 'Tim Berners-Lee', desc: 'Científico de la computación británico' },
      { id: 'p5_opt_alan_turing', value: 'alan_turing', label: 'Alan Turing', desc: 'Pionero de la computación moderna' },
      { id: 'p5_opt_steve_jobs', value: 'steve_jobs', label: 'Steve Jobs', desc: 'Cofundador de Apple Inc.' },
      { id: 'p5_opt_bill_gates', value: 'bill_gates', label: 'Bill Gates', desc: 'Cofundador de Microsoft' },
    ],
  },
];

export default function App() {
  const [activeColor, setActiveColor] = useState<ColorChoice | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [submissionData, setSubmissionData] = useState<Record<string, string> | null>(null);

  const currentBg = activeColor ? activeColor.bgHex : '#FFFFFF';
  const currentTextColor = activeColor ? activeColor.textHex : '#000000';
  const currentName = activeColor ? activeColor.name : '';

  const handleSelectOption = (questionName: string, optionValue: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionName]: optionValue,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setSubmissionData({ ...answers, timestamp: new Date().toISOString() });
  };

  const handleResetForm = () => {
    setAnswers({});
    setIsSubmitted(false);
    setSubmissionData(null);
  };

  const answeredCount = Object.keys(answers).length;

  return (
    <div
      className="min-h-screen w-full transition-colors duration-300 flex flex-col items-center pt-8 pb-16 px-4 selection:bg-transparent"
      style={{ backgroundColor: currentBg }}
    >
      {/* Logo de la plataforma */}
      <div className="mb-4">
        <button
          onClick={() => setActiveColor(null)}
          title="Restablecer a fondo blanco"
          className="flex items-center gap-2.5 px-3 py-1.5 rounded-2xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer shadow-xs border"
          style={{
            backgroundColor: activeColor
              ? currentTextColor === '#FFFFFF'
                ? 'rgba(255,255,255,0.15)'
                : 'rgba(0,0,0,0.06)'
              : '#FFFFFF',
            borderColor: activeColor
              ? currentTextColor === '#FFFFFF'
                ? 'rgba(255,255,255,0.25)'
                : 'rgba(0,0,0,0.12)'
              : '#E4E4E7',
            backdropFilter: 'blur(8px)',
          }}
        >
          <div className="w-7 h-7 relative flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xs" fill="none">
              <circle cx="50" cy="50" r="46" stroke="currentColor" strokeWidth="3" opacity="0.25" style={{ color: currentTextColor }} />
              <circle cx="50" cy="28" r="14" fill="#FACC15" stroke="#CA8A04" strokeWidth="1.5" />
              <circle cx="31" cy="65" r="14" fill="#2563EB" stroke="#1D4ED8" strokeWidth="1.5" />
              <circle cx="69" cy="65" r="14" fill="#0A0A0A" stroke="#52525B" strokeWidth="1.5" />
              <circle cx="50" cy="50" r="4" fill="#FFFFFF" stroke="#71717A" strokeWidth="1.5" />
            </svg>
          </div>
          <span
            className="font-bold text-xs tracking-wider uppercase font-mono transition-colors duration-300"
            style={{ color: currentTextColor }}
          >
            Tríada
          </span>
        </button>
      </div>

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

      {/* Opción sutil para volver a fondo blanco */}
      {activeColor && (
        <button
          onClick={() => setActiveColor(null)}
          className="mt-4 mb-2 text-xs font-medium tracking-wide underline underline-offset-4 opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
          style={{ color: currentTextColor }}
        >
          Volver a fondo blanco
        </button>
      )}

      {/* FORMULARIO ABAJITO DE LOS COLORES */}
      <div className="w-full max-w-2xl mt-8">
        <div className="bg-white/95 backdrop-blur-md text-zinc-900 border border-zinc-200/90 shadow-xl rounded-3xl p-6 sm:p-8">
          <div className="flex items-center justify-between pb-5 mb-6 border-b border-zinc-100">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <HelpCircle className="w-5 h-5 text-blue-600" />
                <h2 className="text-xl sm:text-2xl font-extrabold text-zinc-900 tracking-tight">
                  Formulario de Evaluación
                </h2>
              </div>
              <p className="text-xs text-zinc-500">
                5 temas diferentes con recuadros de selección.
              </p>
            </div>
            <div className="text-right">
              <span className="inline-block px-2.5 py-1 text-xs font-mono font-bold bg-zinc-100 text-zinc-700 rounded-full border border-zinc-200">
                {answeredCount}/5 respondidas
              </span>
            </div>
          </div>

          {/* Formulario HTML con IDs precisos para robots y humanos */}
          <form
            id="formulario-preguntas"
            data-testid="formulario-preguntas"
            onSubmit={handleSubmit}
            className="space-y-8"
          >
            {QUESTIONS.map((q, qIndex) => (
              <div
                key={q.id}
                id={`card-${q.id}`}
                className="space-y-3 pt-2 first:pt-0"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md mb-1 border border-blue-100">
                      Pregunta #{qIndex + 1} • {q.category}
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-zinc-900 leading-snug">
                      {q.question}
                    </h3>
                  </div>
                </div>

                {/* Recuadros de opciones */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {q.options.map((opt) => {
                    const isChecked = answers[q.name] === opt.value;
                    return (
                      <label
                        key={opt.id}
                        htmlFor={opt.id}
                        className={`flex items-start gap-3 p-3.5 rounded-xl border-2 transition-all cursor-pointer select-none ${
                          isChecked
                            ? 'bg-blue-50/70 border-blue-600 shadow-xs ring-1 ring-blue-600'
                            : 'bg-white border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50/50'
                        }`}
                      >
                        <input
                          type="radio"
                          id={opt.id}
                          name={q.name}
                          value={opt.value}
                          checked={isChecked}
                          onChange={() => handleSelectOption(q.name, opt.value)}
                          className="mt-0.5 h-4 w-4 text-blue-600 border-zinc-300 focus:ring-blue-500 cursor-pointer"
                        />
                        <div className="flex-1">
                          <span className="block font-semibold text-xs sm:text-sm text-zinc-900">
                            {opt.label}
                          </span>
                          <span className="block text-[11px] text-zinc-500 leading-tight mt-0.5">
                            {opt.desc}
                          </span>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Botón de Enviar Formulario en la parte de abajo */}
            <div className="pt-6 border-t border-zinc-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-zinc-500">
                {answeredCount === 5 ? (
                  <span className="text-emerald-600 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Formulario listo para enviar
                  </span>
                ) : (
                  <span>Por favor selecciona una opción en cada recuadro.</span>
                )}
              </div>

              <div className="flex items-center gap-2.5 w-full sm:w-auto">
                {answeredCount > 0 && (
                  <button
                    type="button"
                    onClick={handleResetForm}
                    className="px-3.5 py-2.5 text-xs font-semibold text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 rounded-xl border border-zinc-200 transition cursor-pointer"
                    title="Reiniciar selecciones"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                )}

                <button
                  type="submit"
                  id="btn-enviar-formulario"
                  data-testid="btn-enviar-formulario"
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white bg-blue-600 hover:bg-blue-700 active:scale-95 transition-all shadow-md cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Enviar Formulario</span>
                </button>
              </div>
            </div>
          </form>

          {/* Panel de Confirmación de Envío Exitoso */}
          {isSubmitted && submissionData && (
            <div
              id="mensaje-confirmacion-envio"
              className="mt-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-3"
            >
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-emerald-600" />
                <h4 className="font-bold text-sm">
                  ¡Formulario Enviado con Éxito!
                </h4>
              </div>
              <p className="text-xs text-emerald-700">
                Se han registrado las respuestas correctamente.
              </p>
              <div className="bg-white/80 rounded-xl p-3 text-xs font-mono border border-emerald-100 space-y-1">
                {Object.entries(submissionData).map(([key, val]) => (
                  <div key={key} className="flex justify-between">
                    <span className="text-zinc-500">{key}:</span>
                    <span className="font-bold text-zinc-800">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
