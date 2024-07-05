<template>
    <div>
      <v-select
        v-model="selectedOption"
        :items="options"
        label="Selecione uma opção"
        :filter="customFilter"
      ></v-select>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        selectedOption: null,
        options: [], // Aqui armazenaremos as opções do v-select
        loading: false,
      };
    },
    methods: {
      loadOptionsFromLocalStorage() {
        const produtos = localStorage.getItem('apiData');

        if (produtos) {
            this.options = JSON.parse(produtos).map(item => ({
                text: item.Description,
                value: item,
            }));
        }
      },
      customFilter(item, queryText, itemText) {
        // Implemente sua lógica de filtro personalizado aqui
        // Neste exemplo, estamos filtrando com base no texto da opção
        const normalizedQuery = queryText.toLowerCase();
        const normalizedItemText = itemText.toLowerCase();
        return normalizedItemText.includes(normalizedQuery);
      },
    },
    mounted() {
      this.loadOptionsFromLocalStorage(); // Carregue as opções do localStorage ao montar o componente
    },
  };
  </script>
  