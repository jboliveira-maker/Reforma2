
import React, { useState, useMemo } from 'react';
import { SCHOOLS, TOTAL_INVESTMENT } from './data';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend 
} from 'recharts';
import { 
  Building2, Users, MapPin, DollarSign, ArrowDownToLine, 
  LayoutDashboard, Table as TableIcon, Map as MapIcon, Info 
} from 'lucide-react';

const COLORS = ['#0ea5e9', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#64748b'];

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<'summary' | 'details'>('summary');

  const totalStudents = useMemo(() => SCHOOLS.reduce((acc, curr) => acc + curr.students, 0), []);

  const investmentByRegion = useMemo(() => {
    const map: Record<string, number> = {};
    SCHOOLS.forEach(s => {
      map[s.region] = (map[s.region] || 0) + s.investment;
    });
    return Object.entries(map).map(([name, value]) => ({ name, value }));
  }, []);

  const studentsBySegment = useMemo(() => {
    const map: Record<string, number> = {};
    SCHOOLS.forEach(s => {
      map[s.segment] = (map[s.segment] || 0) + s.students;
    });
    return Object.entries(map).map(([name, value]) => ({ name, value }));
  }, []);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation Header */}
      <header className="bg-white border-b sticky top-0 z-50 no-print">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg text-white">
              <Building2 size={24} />
            </div>
            <div>
              <h1 className="font-bold text-gray-900 text-lg leading-tight">Reforma Geral</h1>
              <p className="text-gray-500 text-xs">Apresentação Estratégica</p>
            </div>
          </div>
          
          <nav className="flex items-center gap-1">
            <button 
              onClick={() => setActiveView('summary')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${activeView === 'summary' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <LayoutDashboard size={18} /> Resumo
            </button>
            <button 
              onClick={() => setActiveView('details')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${activeView === 'details' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <TableIcon size={18} /> Detalhes
            </button>
            <div className="h-6 w-[1px] bg-gray-200 mx-2" />
            <button 
              onClick={handlePrint}
              className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-sm"
            >
              <ArrowDownToLine size={18} /> Exportar PDF
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-4 md:p-8 space-y-8">
        
        {/* PAGE 1: EXECUTIVE SUMMARY */}
        <section className={`${activeView !== 'summary' ? 'hidden md:block no-print' : 'block'} space-y-8 page-break`}>
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
              <div>
                <span className="text-blue-600 font-semibold text-sm tracking-wider uppercase">Relatório Consolidado 2024</span>
                <h2 className="text-4xl font-bold text-gray-900 mt-1">Plano de Investimento</h2>
                <p className="text-gray-500 mt-2 max-w-2xl text-lg">Demonstrativo completo das intervenções, revitalizações e adequações nas unidades escolares municipais.</p>
              </div>
              <img 
                src="https://www.riopreto.sp.gov.br/wp-content/themes/pref-riopreto/assets/img/logo-pref.png" 
                alt="Logo Prefeitura" 
                className="h-16 w-auto object-contain"
                onError={(e) => (e.currentTarget.src = 'https://picsum.photos/200/80?text=Logo+Prefeitura')}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-blue-600 rounded-xl p-6 text-white shadow-lg shadow-blue-200">
                <p className="text-blue-100 text-sm font-medium flex items-center gap-2 mb-1">
                  <DollarSign size={16} /> Investimento Total
                </p>
                <h3 className="text-3xl font-bold">{formatCurrency(TOTAL_INVESTMENT)}</h3>
                <div className="mt-4 pt-4 border-t border-blue-500/30 text-xs text-blue-100">
                  Total acumulado para 11 unidades escolares
                </div>
              </div>

              <div className="bg-emerald-500 rounded-xl p-6 text-white shadow-lg shadow-emerald-200">
                <p className="text-emerald-100 text-sm font-medium flex items-center gap-2 mb-1">
                  <Users size={16} /> Alunos Impactados
                </p>
                <h3 className="text-3xl font-bold">{totalStudents.toLocaleString('pt-BR')}</h3>
                <div className="mt-4 pt-4 border-t border-emerald-400/30 text-xs text-emerald-100">
                  Atendimento direto em diversos segmentos
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm flex flex-col justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-medium flex items-center gap-2 mb-1">
                    <Building2 size={16} /> Unidades Escolares
                  </p>
                  <h3 className="text-3xl font-bold text-gray-900">{SCHOOLS.length}</h3>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100 text-xs text-gray-400">
                  Reformas, ampliações e adequações estruturais
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <DollarSign className="text-blue-600" /> Investimento por Região
              </h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={investmentByRegion}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} tickFormatter={(val) => `R$ ${(val/1000000).toFixed(1)}M`} />
                    <Tooltip 
                      formatter={(value: number) => formatCurrency(value)}
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                    />
                    <Bar dataKey="value" fill="#0ea5e9" radius={[6, 6, 0, 0]} barSize={40} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Users className="text-emerald-600" /> Alunos por Segmento
              </h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={studentsBySegment}
                      cx="50%"
                      cy="50%"
                      innerRadius={80}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {studentsBySegment.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend verticalAlign="bottom" height={36} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </section>

        {/* PAGE 2: DETAILS, TABLE & MAP */}
        <section className={`${activeView !== 'details' ? 'hidden md:block no-print' : 'block'} space-y-8 pb-12`}>
          
          {/* Map Section */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-red-50 p-2 rounded-lg text-red-600">
                <MapIcon size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Localização das Unidades</h3>
                <p className="text-sm text-gray-500">Mapa georreferenciado das 11 escolas em reforma.</p>
              </div>
            </div>
            <div className="relative rounded-xl overflow-hidden bg-gray-100" style={{ height: '450px' }}>
              <iframe 
                src="https://www.google.com/maps/d/embed?mid=1cSOLT1IFTlPUrZYO_xxqzJV_EQF1S_I&ehbc=2E312F" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                title="Mapa de Escolas"
              ></iframe>
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full text-[10px] font-bold text-gray-600 shadow-sm border border-white/50 no-print">
                Visualização Interativa
              </div>
            </div>
          </div>

          {/* Detailed Table */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-8 py-6 border-b border-gray-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <TableIcon className="text-blue-600" /> Quadro de Obras por Unidade
              </h3>
              <div className="text-sm text-gray-500 italic">
                Dados oficiais - Vigência 2024
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 text-gray-500 uppercase text-[10px] font-bold tracking-wider">
                    <th className="px-6 py-4">Unidade Escolar</th>
                    <th className="px-6 py-4">Bairro / Macro Região</th>
                    <th className="px-6 py-4 text-center">Alunos</th>
                    <th className="px-6 py-4">Serviços / Reformas</th>
                    <th className="px-6 py-4 text-right">Investimento</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {SCHOOLS.map((school) => (
                    <tr key={school.id} className="hover:bg-blue-50/30 transition-colors group">
                      <td className="px-6 py-5">
                        <div className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {school.name}
                        </div>
                        <div className="text-[10px] font-medium text-gray-400 mt-0.5">{school.segment}</div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-start gap-1.5">
                          <MapPin size={12} className="text-gray-400 mt-1 flex-shrink-0" />
                          <div>
                            <div className="text-sm text-gray-700">{school.neighborhood}</div>
                            <div className="text-[10px] text-gray-400 font-semibold">{school.macroRegion} / {school.region}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5 text-center">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700">
                          {school.students}
                        </span>
                      </td>
                      <td className="px-6 py-5 max-w-md">
                        <div className="text-xs text-gray-600 leading-relaxed line-clamp-2 hover:line-clamp-none transition-all cursor-help">
                          {school.description}
                        </div>
                      </td>
                      <td className="px-6 py-5 text-right font-bold text-gray-900 tabular-nums">
                        {formatCurrency(school.investment)}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-gray-900 text-white">
                    <td colSpan={4} className="px-6 py-5 font-bold uppercase text-xs tracking-widest text-gray-400">Total Geral de Investimento</td>
                    <td className="px-6 py-5 text-right text-xl font-bold">{formatCurrency(TOTAL_INVESTMENT)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* Quick Info Cards for individual schools (Mobile Friendly alternative to table) */}
          <div className="md:hidden space-y-4">
             {SCHOOLS.map(school => (
               <div key={`card-${school.id}`} className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
                  <h4 className="font-bold text-gray-900 mb-2">{school.name}</h4>
                  <div className="grid grid-cols-2 gap-4 text-xs mb-4">
                    <div>
                      <span className="text-gray-400 block mb-0.5">Bairro</span>
                      <span className="font-medium">{school.neighborhood}</span>
                    </div>
                    <div>
                      <span className="text-gray-400 block mb-0.5">Valor</span>
                      <span className="font-bold text-blue-600">{formatCurrency(school.investment)}</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 bg-gray-50 p-3 rounded-lg border border-gray-100 italic">
                    {school.description}
                  </p>
               </div>
             ))}
          </div>

        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t py-8 no-print">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-gray-500 text-sm">
          <div className="flex items-center gap-4">
             <img 
                src="https://www.riopreto.sp.gov.br/wp-content/themes/pref-riopreto/assets/img/logo-pref.png" 
                alt="Logo Rodapé" 
                className="h-8 opacity-50 grayscale hover:grayscale-0 transition-all"
              />
              <span>Secretaria Municipal de Educação</span>
          </div>
          <p>© 2024 Projeto Reforma Geral Escolas. Todos os direitos reservados.</p>
        </div>
      </footer>

      {/* Floating Action Button for Info (Mobile Only) */}
      <div className="fixed bottom-6 right-6 md:hidden no-print">
        <button 
          className="bg-blue-600 text-white p-4 rounded-full shadow-2xl flex items-center justify-center"
          onClick={() => alert('Esta é uma apresentação profissional das reformas escolares.')}
        >
          <Info size={24} />
        </button>
      </div>
    </div>
  );
};

export default App;
