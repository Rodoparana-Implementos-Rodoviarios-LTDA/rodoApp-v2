import React, { useState, useEffect } from 'react';
import { Button } from '@/components/custom/button'; // ou outra biblioteca de UI

const ProductFilter: React.FC = () => {
  const [filtro, setFiltro] = useState('');
  const [produtos, setProdutos] = useState<{ Code: string, Description: string }[]>([]);

  const salvar = () => {
    const produtosParaSalvar = [
      { Code: '001', Description: 'thiago' },
      { Code: '002', Description: 'guilherme correia' },
      { Code: '003', Description: 'guilherme Ghisi' },
      { Code: '004', Description: 'fernando Ghisi' },
      // Adicione mais produtos conforme necessário
    ];
    localStorage.setItem('produtost', JSON.stringify(produtosParaSalvar));
  };

  const produtosFiltrados = produtos.filter(produto =>
    produto.Description.toLowerCase().includes(filtro.toLowerCase())
  );

  useEffect(() => {
    const produtos = localStorage.getItem('apiData');
    setProdutos(produtos ? JSON.parse(produtos) : []);
  }, []);

  return (
    <div>
      <input
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
        placeholder="Digite para filtrar produtos"
      />
      <ul>
        {produtosFiltrados.map((produto) => (
          <li key={produto.Code}>{produto.Description}</li>
        ))}
      </ul>
      <Button onClick={salvar}>salvar</Button>
    </div>
  );
};

export default ProductFilter;
