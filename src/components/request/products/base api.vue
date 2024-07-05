<template>
  <div>
    <h1>Dados da API da TOTVS</h1>
    <ul>
          <button @click="saveToLocalStorage">Salvar no LocalStorage</button>
          <p></p>
          <button @click="showLocalStorageData">Ver Dados do LocalStorage</button>
          <p></p>
          <button @click="takeValuesApi">carregar Dados do LocalStorage</button>
          <p></p>
          
          <li v-for="item in this.listProducts" :key="item.code">
              Código: {{ item.Code }}, Descrição: {{ item.Description }}
          </li>
    </ul>

  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      apiUrl: 'http://rodoparanaimplementos120531.protheus.cloudtotvs.com.br:4050/rest/',
      items: [], // Armazenará os dados da API
      
      listProducts:[],

      hasNext:null
    };
  },
  methods: {
    saveToLocalStorage() {
      // Salvar os dados no localStorage
      localStorage.setItem('apiData', JSON.stringify(this.listProducts));
      alert('Dados salvos no LocalStorage.');
    },
    
    showLocalStorageData() {
      // Recuperar os dados do localStorage e exibi-los
      const produtos = localStorage.getItem('apiData');
      this.listProducts = produtos ? JSON.parse(produtos) : [];
    },
    takeValuesApi(){
      this.fetchData(5)
    },
    fetchData(page) {
      let pageSize = 5000
  
      let API_URL =this.apiUrl + `api/retail/v1/retailItem?page=${page}&pageSize=${pageSize}&fields=code,description`

      axios
          .get(API_URL)
          .then(response => {
          // Verifica se a resposta da API foi bem-sucedida (código de status 200)
          if (response.status !== 200 ) {
              console.error('Erro na solicitação:', response.status);
              throw new Error('Não foi possível acessar a API da TOTVS');
          }

          // Armazena os dados da API na variável 'items'
          const hasNext = response.data.hasNext;
          const items = response.data.items;

          // Adicione os itens à lista existente
          this.listProducts = this.listProducts.concat(items);
    
          // Se hasNext for verdadeiro, faça outra chamada recursiva
              if (hasNext) {
                  page=page+1
                  this.fetchData(page);
              }
          })
              .catch(error => {
              console.error('Erro:', error);
          });
      }


  },
 
};
</script>
