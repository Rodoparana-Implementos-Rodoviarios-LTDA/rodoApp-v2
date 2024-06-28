"use client";
import { useState } from "react";
import {
  ArrowTopRightOnSquareIcon,
  HomeIcon,
  CreditCardIcon,
  CalculatorIcon,
  CurrencyDollarIcon,
  ClipboardDocumentListIcon,
  LifebuoyIcon,
  AcademicCapIcon,
  ChevronDownIcon,
  TruckIcon,
} from "@heroicons/react/20/solid";

const cat = [
  {
    name: "Início",
    icon: <HomeIcon />,
    href: "/",
    items: [],
  },
  {
    name: "Pré Notas",
    icon: <ClipboardDocumentListIcon />,
    href: "/nota",
    items: [],
  },
  {
    name: "Chamados",
    icon: <LifebuoyIcon />,
    href: "http://hesk.rodoparana.com.br/",
    items: [],
  },
  {
    name: "Intranet",
    icon: <AcademicCapIcon />,
    href: "https://sites.google.com/site/baserodoparana/home/",
    items: [],
  },
  {
    name: "Vendas",
    icon: <CurrencyDollarIcon />,
    drop: <ChevronDownIcon />,
    items: [
      {
        name: "Consulta de Preço de Itens",
        href: "#",
      },
      {
        name: "Simulador de Preço de Venda",
        href: "#",
      },
      {
        name: "Inventário",
        href: "#",
      },
      {
        name: "Controle Portaria",
        href: "#",
      },
    ],
  },
  {
    name: "Financeiro",
    icon: <CalculatorIcon />,
    drop: <ChevronDownIcon />,
    items: [
      {
        name: "Análise de Crédito",
        href: "#",
        icon: <CreditCardIcon />,
      },
      {
        name: "Despesas de Viagens",
        href: "#",
      },
      {
        name: "GED",
        href: "#",
      },
    ],
  },
];

const Sidebar = () => {
  const [activeCategory, setActiveCategory] = useState(null);

  const handleClick = (category) => {
    setActiveCategory(category === activeCategory ? null : category);
  };
  return (
    <main>
      <aside
        id="logo-sidebar"
        className="w-56 h-screen transition-transform -translate-x-full sm:translate-x-0 dark:bg-zinc-950"
        aria-label="Sidebar"
      >
        <div className="flex items-center px-5 py-2 text-zinc-950 dark:text-zinc-100 justify-between border-b border-zinc-200 dark:border-zinc-800">
          <span className="text-lg font-medium">RodoAPP</span>
          <TruckIcon className="flex-shrink-0 w-8 h-8 transition duration-75 text-gray-500 dark:text-gray-400" />
        </div>

        <div className="px-3 pt-5 ">
          {cat.map((category) => (
            <div
              key={category.name}
              className={`cursor-pointer ${
                activeCategory === category.name
                  ? "bg-zinc-200 dark:bg-zinc-950 rounded-lg"
                  : ""
              }`}
              onClick={() => handleClick(category.name)}
            >
              <div className="flex items-center w-full p-2 text-base transition duration-75 rounded-lg group text-gray-900 hover:bg-zinc-200 dark:text-white dark:hover:bg-zinc-800">
                <span className="flex-shrink-0 w-5 h-5 transition duration-75 text-gray-500 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white">
                  {category.icon}
                </span>
                <a href={category.href} className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap dark:text-zinc-100 hover:text-slate-600 dark:hover:text-slate-400">
                  
                  {category.name}
                </a>
                {category.drop && (
                  <span className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white">
                    {category.drop}
                  </span>
                )}
              </div>
              {category.items.length > 0 &&
                activeCategory === category.name && (
                  <ul className="m-2 mx-6 list-none font-medium">
                    {category.items.map((item) => (
                      <li
                        key={item.name}
                        className="mb-1 pb-3 dark:text-zinc-100 hover:text-slate-600 dark:hover:text-slate-400"
                      >
                        <a
                          href={item.href}
                          className="flex-1 items-center py-1.5"
                        >
                          <span className="text-sm">{item.name}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
            </div>
          ))}
        </div>
        <div className="fixed bottom-0 px-4 py-2 w-full  text-black  border-t border-zinc-200 dark:border-zinc-800 hover:bg-zinc-200  dark:hover:bg-zinc-800">
          <div className="flex justify-between items-center w-full text-base transition duration-75 rounded-lg group text-gray-900  dark:text-white">
            <span>Guilherme Correia</span>
            <ArrowTopRightOnSquareIcon className="w-5 group-hover:text-red-800" />
          </div>
        </div>
      </aside>
    </main>
  );
};
export default Sidebar;
