import Sidebar from "./component/sidebar";
import GreetingMessage from "./component/greetingMessage";
import { Card } from "flowbite-react";
export default function Home() {
  return (
    <main className="flex">
      <aside className="h-screen">
        <Sidebar />
      </aside>
      <div className="m-1 p-14 rounded-md bg-white dark:bg-zinc-900 h-100% w-[100%] text-zinc-950 dark:text-zinc-50">
        <h1 className="font-medium text-3xl">
          <GreetingMessage />, Guilherme.
        </h1>
        <div className="mt-14 flex justify-evenly">
          <Card
            href="/nota"
            className="max-w-xs dark:border-zinc-900 dark:bg-zinc-800 dark:hover:bg-zinc-700"
          >
            <h5 className="text-2xl font-bold tracking-tight">
              Gerar Pré Nota
            </h5>
            <p className="text-black/60 dark:text-white/60">
              Lançamento prévio de documento de entrada.
            </p>
          </Card>
          <Card
            href="http://hesk.rodoparana.com.br"
            className="max-w-xs dark:border-zinc-900 dark:bg-zinc-800 dark:hover:bg-zinc-700"
          >
            <h5 className="text-2xl font-bold tracking-tight">Abrir Chamado</h5>
            <p className="text-black/60 dark:text-white/60">
              Precisa de assistência? Abra um chamado para o setor responsável
              fornecer o suporte necessário.
            </p>
          </Card>
          <Card
            href="https://sites.google.com/site/baserodoparana/home"
            className="max-w-xs dark:border-zinc-900 dark:bg-zinc-800 dark:hover:bg-zinc-700"
          >
            <h5 className="text-2xl font-bold tracking-tight">Intranet</h5>
            <p className="text-black/60 dark:text-white/60">
              Tem algum conteudo que precisa de mais informações? Consulte a
              base de informações da Rodoparaná.
            </p>
          </Card>
        </div>
      </div>
    </main>
  );
}
