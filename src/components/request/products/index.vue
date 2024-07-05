<template>
    <div>
        <v-autocomplete
            v-model="productData"
            :items="options"
            label="Selecione um produto"
            :filter="customFilter"
            @input="onItemSelected"
        >
            <template v-slot:item="data">
                        
                <template>
                    <v-list-item-content>
                    <v-list-item-title v-html="data.item.Code"></v-list-item-title>
                    <v-list-item-subtitle >Categoria de solicitação</v-list-item-subtitle>
                    </v-list-item-content>
                </template>
            </template>
        </v-autocomplete>
    </div>
  </template>
  
  <script>
  export default {
    props:{
        productData: Object,
    },
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
                    
                    text: `${item.Code} -> ${item.Description}` ,
                    value: item,
                }));
            
            }
     
        },
        customFilter(item, queryText, itemText) {
            const normalizedQuery = queryText.toLowerCase();
            const normalizedItemText = itemText.toLowerCase();
            return normalizedItemText.includes(normalizedQuery);
            
        },
        onItemSelected(){
            
        }
    },
    mounted() {
      this.loadOptionsFromLocalStorage(); 
    },
  };
  </script>
  