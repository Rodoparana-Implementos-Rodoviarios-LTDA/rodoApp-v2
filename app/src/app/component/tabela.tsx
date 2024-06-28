import React, { useState, useEffect } from "react";
import { Table } from "flowbite-react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/solid";
import { documents } from "./tableitems";
import Search from "./Search";
import Filtermenu from "./filtermenu";

interface Document {
  documento: string;
  fornecedor: string;
  valor: string;
  vencimento: string;
  usuario: string;
  obs: string;
  tipo: string;
  status: string;
  prioridade: string;
}

const Tabela: React.FC = () => {
  const [filter, setFilter] = useState("");
  const [filteredDocuments, setFilteredDocuments] =
    useState<Document[]>(documents);
  const [sortConfig, setSortConfig] = useState<{
    key: string | null;
    direction: string;
  }>({ key: null, direction: "ascending" });

  useEffect(() => {
    const filtered = documents.filter((document) => {
      return (
        document.documento.toUpperCase().includes(filter) ||
        document.fornecedor.toUpperCase().includes(filter) ||
        document.valor.toUpperCase().includes(filter) ||
        document.vencimento.toUpperCase().includes(filter) ||
        document.usuario.toUpperCase().includes(filter) ||
        document.obs.toUpperCase().includes(filter) ||
        document.tipo.toUpperCase().includes(filter) ||
        document.status.toUpperCase().includes(filter) ||
        document.prioridade.toUpperCase().includes(filter)
      );
    });
    setFilteredDocuments(filtered);
  }, [filter]);

  const sortedDocuments = [...filteredDocuments].sort((a, b) => {
    if (sortConfig.key) {
      const aValue = a[sortConfig.key as keyof Document];
      const bValue = b[sortConfig.key as keyof Document];
      if (aValue < bValue) {
        return sortConfig.direction === "ascending" ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === "ascending" ? 1 : -1;
      }
      return 0;
    }
    return 0;
  });

  const requestSort = (key: string) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const getIcon = (key: string) => {
    if (sortConfig.key === key) {
      if (sortConfig.direction === "ascending") {
        return <ChevronUpIcon className="w-4 h-4 inline" />;
      }
      return <ChevronDownIcon className="w-4 h-4 inline" />;
    }
    return null;
  };

  return (
    <div className="overflow-x-auto">
      <div className="flex justify-between ">
        <Filtermenu />
        <Search setFilter={setFilter} />
      </div>
      <Table hoverable>
        <Table.Head>
          {[
            "documento",
            "fornecedor",
            "valor",
            "vencimento",
            "usuario",
            "obs",
            "tipo",
            "status",
            "prioridade",
          ].map((key) => (
            <Table.HeadCell
              key={key}
              className="text-zinc-900 bg-zinc-200 dark:bg-zinc-700 dark:text-zinc-200 cursor-pointer"
              onClick={() => requestSort(key)}
            >
              {key.charAt(0).toUpperCase() + key.slice(1)}
              {getIcon(key)}
            </Table.HeadCell>
          ))}
        </Table.Head>
        <Table.Body className="divide-y">
          {sortedDocuments.map((document) => (
            <Table.Row
              key={document.documento}
              className="bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800 dark:hover:bg-zinc-950 text-zinc-900 dark:text-white"
            >
              <Table.Cell className="whitespace-nowrap font-medium">
                {document.documento}
              </Table.Cell>
              <Table.Cell>{document.fornecedor}</Table.Cell>
              <Table.Cell>{document.valor}</Table.Cell>
              <Table.Cell>{document.vencimento}</Table.Cell>
              <Table.Cell>{document.usuario}</Table.Cell>
              <Table.Cell>{document.obs}</Table.Cell>
              <Table.Cell>{document.tipo}</Table.Cell>
              <Table.Cell>{document.status}</Table.Cell>
              <Table.Cell
                className={`
                  ${
                    document.prioridade === "Alta"
                      ? "font-medium text-red-500"
                      : ""
                  } 
                  ${
                    document.prioridade === "Media"
                      ? " font-medium text-amber-500"
                      : ""
                  } 
                  ${
                    document.prioridade === "Baixa"
                      ? " font-medium text-green-500"
                      : ""
                  }`}
              >
                {document.prioridade}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default Tabela;
