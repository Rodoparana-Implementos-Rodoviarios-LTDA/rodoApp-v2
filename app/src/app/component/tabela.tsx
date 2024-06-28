"use client";

import { Table } from "flowbite-react";
import { documents } from "./tableitems";
export default function Tabela() {
  return (
    <div className="overflow-x-auto ">
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell className="text-zinc-900 bg-zinc-200 dark:bg-zinc-700 dark:text-zinc-200 ">
            Documento
          </Table.HeadCell>
          <Table.HeadCell className="text-zinc-900 bg-zinc-200 dark:bg-zinc-700 dark:text-zinc-200 ">
            Fornecedor
          </Table.HeadCell>
          <Table.HeadCell className="text-zinc-900 bg-zinc-200 dark:bg-zinc-700 dark:text-zinc-200 ">
            Valor
          </Table.HeadCell>
          <Table.HeadCell className="text-zinc-900 bg-zinc-200 dark:bg-zinc-700 dark:text-zinc-200 ">
            Vencimento
          </Table.HeadCell>
          <Table.HeadCell className="text-zinc-900 bg-zinc-200 dark:bg-zinc-700 dark:text-zinc-200 ">
            Usuário
          </Table.HeadCell>
          <Table.HeadCell className="text-zinc-900 bg-zinc-200 dark:bg-zinc-700 dark:text-zinc-200 ">
            Observação
          </Table.HeadCell>
          <Table.HeadCell className="text-zinc-900 bg-zinc-200 dark:bg-zinc-700 dark:text-zinc-200 ">
            Tipo
          </Table.HeadCell>
          <Table.HeadCell className="text-zinc-900 bg-zinc-200 dark:bg-zinc-700 dark:text-zinc-200 ">
            Status
          </Table.HeadCell>
          <Table.HeadCell className="text-zinc-900 bg-zinc-200 dark:bg-zinc-700 dark:text-zinc-200 ">
            Prioridade
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {documents.map((document) => (
            <Table.Row
              key={document.documento}
              className="bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800 dark:hover:bg-zinc-950 text-gray-900 dark:text-white"
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
                className={` items-center rounded-md m-2
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
}
