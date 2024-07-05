<template>
    <div>
      <input v-model="filtro" placeholder="Digite para filtrar produtos" />
        <ul>
          <li v-for="produto in produtosFiltrados" :key="produto.Code">{{ produto.Description }}</li>
        </ul>
      <v-btn @click="salvar()">salvar</v-btn>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        filtro: '',
        produtos: [],
      };
    },
    methods:{
        salvar(){
            localStorage.setItem('produtost', JSON.stringify([
            { Code: '001', Description: 'thiago' },
            { Code: '002', Description: 'guilherme correia' },
            { Code: '003', Description: 'guilherme Ghisi' },
            { Code: '003', Description: 'fernando Ghisi' },
    // Adicione mais produtos conforme necessário
        ]));
    },
    },
    computed: {
      produtosFiltrados() {
        const filtro = this.filtro.toLowerCase();
        return this.produtos.filter(produto => produto.Description.toLowerCase().includes(filtro));
      },
    },
  
    created() {
        
      // Carregue os dados do localStorage quando o componente for criado
      const produtos = localStorage.getItem('apiData');

      this.produtos = produtos ? JSON.parse(produtos) : [];
    },
  };
  </script>