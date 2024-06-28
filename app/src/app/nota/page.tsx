"use client";
import React from "react";
import Sidebar from "../component/sidebar";
import Filtermenu from "../component/filtermenu";
import Search from "../component/search";
import Tabela from "../component/tabela";

const page = () => {
  return (
    <main className="flex min-h-screen"> {/* Set min-h-screen for the main container */}
      <aside className="h-screen">
        <Sidebar />
      </aside>
      <div className="flex flex-col w-full overflow-y-auto"> {/* Apply overflow-y-auto for scrolling content */}
        <div className="m-1 rounded-md bg-white dark:bg-zinc-900 h-full text-zinc-950 dark:text-zinc-50 ">
          <div className="flex flex-col mx-10 items-baseline justify-between border-b dark:border-zinc-800 pt-3">
            <div>
              <h1 className="text-4xl font-bold tracking-tight">
                Geração de Pré Notas
              </h1>
              <h2>Módulo Compras</h2>
            </div>
            <div className="w-full flex justify-between items-center">
              <Filtermenu />
              <Search />
            </div>
          </div>
          <div className="mx-10 mt-5">
            <Tabela />
          </div>
        </div>
      </div>
    </main>
  );
};

export default page;

