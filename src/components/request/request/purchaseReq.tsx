import React, { useState } from 'react';
import axios from 'axios';

const PurchaseRequest: React.FC = () => {
  const [apiUrl] = useState('http://rodoparanaimplementos120531.protheus.cloudtotvs.com.br:4050/rest/');
  const [listProducts, setListProducts] = useState<any[]>([]);

  const saveToLocalStorage = () => {
    localStorage.setItem('apiData', JSON.stringify(listProducts));
    alert('Dados salvos no LocalStorage.');
  };

  const showLocalStorageData = () => {
    const produtos = localStorage.getItem('apiData');
    setListProducts(produtos ? JSON.parse(produtos) : []);
  };

  const takeValuesApi = () => {
    fetchData(5);
  };

  const fetchData = (page: number) => {
    const pageSize = 5000;
    const API_URL = `${apiUrl}api/retail/v1/retailItem?page=${page}&pageSize=${pageSize}&fields=code,description`;

    axios.get(API_URL)
      .then(response => {
        if (response.status !== 200) {
          console.error('Erro na solicitação:', response.status);
          throw new Error('Não foi possível acessar a API da TOTVS');
        }

        const hasNext = response.data.hasNext;
        const items = response.data.items;

        setListProducts(prevProducts => [...prevProducts, ...items]);

        if (hasNext) {
          fetchData(page + 1);
        }
      })
      .catch(error => {
        console.error('Erro:', error);
      });
  };

  return (
    <div>
      <h1>Dados da API da TOTVS</h1>
      <ul>
        <button onClick={saveToLocalStorage}>Salvar no LocalStorage</button>
        <p></p>
        <button onClick={showLocalStorageData}>Ver Dados do LocalStorage</button>
        <p></p>
        <button onClick={takeValuesApi}>Carregar Dados do LocalStorage</button>
        <p></p>
        {listProducts.map(item => (
          <li key={item.code}>
            Código: {item.code}, Descrição: {item.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PurchaseRequest;
