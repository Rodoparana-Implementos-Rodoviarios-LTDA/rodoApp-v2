"use client";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import { useState } from "react";

import { filiais, tipo, prioridade, status } from "./filterItems";
import clsx from "clsx";

const people = [
  { id: 1, name: "Durward Reynolds" },
  { id: 2, name: "Kenton Towne" },
  { id: 3, name: "Therese Wunsch" },
  { id: 4, name: "Benedict Kessler" },
  { id: 5, name: "Katelyn Rohan" },
];

const filtermenu = () => {
  const [selectedFilial, setSelectedFilial] = useState(filiais[0]);
  const [selectedTipo, setSelectedTipo] = useState(tipo[0]);
  const [selectedPrior, setSelectedPrior] = useState(prioridade[0]);
  const [selectedStatus, setSelectedStatus] = useState(status[0]);

  return (
    <div className="flex gap-10 pt-5">
      <div className="mx-auto w-52 mb-1">
        <Listbox value={selectedFilial} onChange={setSelectedFilial}>
          <ListboxButton
            className={clsx(
              "relative block w-full rounded-lg bg-white/5 py-1.5 pr-8 pl-3 text-left text-sm/6 text-white",
              "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
            )}
          >
            Filial
            <ChevronDownIcon
              className="group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-white/60"
              aria-hidden="true"
            />
          </ListboxButton>
          <ListboxOptions
            anchor="bottom"
            transition
            className={clsx(
              "w-[var(--button-width)] rounded-xl border border-white/5 bg-white/5 p-1 [--anchor-gap:var(--spacing-1)] focus:outline-none",
              "transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0"
            )}
          >
            {filiais.map((filiais) => (
              <ListboxOption
                key={filiais.label}
                value={filiais}
                className="group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-white/10"
              >
                <CheckIcon className="invisible size-4 fill-white group-data-[selected]:visible" />
                <div className="text-sm/6 text-white">{filiais.label}</div>
              </ListboxOption>
            ))}
          </ListboxOptions>
        </Listbox>
      </div>

      <div className="mx-auto w-52 mb-1">
        <Listbox value={selectedTipo} onChange={setSelectedTipo}>
          <ListboxButton
            className={clsx(
              "relative block w-full rounded-lg bg-white/5 py-1.5 pr-8 pl-3 text-left text-sm/6 text-white",
              "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
            )}
          >
            Tipo
            <ChevronDownIcon
              className="group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-white/60"
              aria-hidden="true"
            />
          </ListboxButton>
          <ListboxOptions
            anchor="bottom"
            transition
            className={clsx(
              "w-[var(--button-width)] rounded-xl border border-white/5 bg-white/5 p-1 [--anchor-gap:var(--spacing-1)] focus:outline-none",
              "transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0"
            )}
          >
            {tipo.map((tipo) => (
              <ListboxOption
                key={tipo.label}
                value={tipo}
                className="group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-white/10"
              >
                <CheckIcon className="invisible size-4 fill-white group-data-[selected]:visible" />
                <div className="text-sm/6 text-white">{tipo.label}</div>
              </ListboxOption>
            ))}
          </ListboxOptions>
        </Listbox>
      </div>

      <div className="mx-auto w-52 mb-1">
        <Listbox value={selectedStatus} onChange={setSelectedStatus}>
          <ListboxButton
            className={clsx(
              "relative block w-full rounded-lg bg-white/5 py-1.5 pr-8 pl-3 text-left text-sm/6 text-white",
              "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
            )}
          >
            Status
            <ChevronDownIcon
              className="group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-white/60"
              aria-hidden="true"
            />
          </ListboxButton>
          <ListboxOptions
            anchor="bottom"
            transition
            className={clsx(
              "w-[var(--button-width)] rounded-xl border border-white/5 bg-white/5 p-1 [--anchor-gap:var(--spacing-1)] focus:outline-none",
              "transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0"
            )}
          >
            {status.map((status) => (
              <ListboxOption
                key={status.label}
                value={status}
                className="group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-white/10"
              >
                <CheckIcon className="invisible size-4 fill-white group-data-[selected]:visible" />
                <div className="text-sm/6 text-white">{status.label}</div>
              </ListboxOption>
            ))}
          </ListboxOptions>
        </Listbox>
      </div>

      <div className="mx-auto w-52 mb-1">
        <Listbox value={selectedPrior} onChange={setSelectedPrior}>
          <ListboxButton
            className={clsx(
              "relative block w-full rounded-lg bg-white/5 py-1.5 pr-8 pl-3 text-left text-sm/6 text-white",
              "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
            )}
          >
            Prioridade
            <ChevronDownIcon
              className="group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-white/60"
              aria-hidden="true"
            />
          </ListboxButton>
          <ListboxOptions
            anchor="bottom"
            transition
            className={clsx(
              "w-[var(--button-width)] rounded-xl border border-white/5 bg-white/5 p-1 [--anchor-gap:var(--spacing-1)] focus:outline-none",
              "transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0"
            )}
          >
            {prioridade.map((prioridade) => (
              <ListboxOption
                key={prioridade.label}
                value={prioridade}
                className="group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-white/10"
              >
                <CheckIcon className="invisible size-4 fill-white group-data-[selected]:visible" />
                <div className="text-sm/6 text-white">{prioridade.label}</div>
              </ListboxOption>
            ))}
          </ListboxOptions>
        </Listbox>
      </div>
    </div>
  );
};

export default filtermenu;
