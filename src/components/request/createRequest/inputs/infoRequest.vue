<template #app>
  <v-card
  elevation="0" class="pa-2" style="border-radius: 0;"
  >
    <p class="text-h5 text--primary">
      DADOS DO PEDIDO
    </p>

    <v-row>
        <v-col md="6">
          <div>
            <v-autocomplete v-if="haveOptions()"
              required
              v-model="propReceived.info.selectedOption"
              :items="options"
              label="Selecione uma filial(OBRIGATORIO)"
              :filter="customFilter"
              @input="onItemSelected"
            ></v-autocomplete>
          </div>
        </v-col>
        <v-col md="6">
          <div v-if="loadingAllPreRequest">
            <v-autocomplete
                  v-model="propReceived.info.preRequestSelected"
                  :items="prerequest"
              
                  label="Selecione uma cotação"

      
                  item-value="codeStart"
                  item-text="codeStart"
              >
      
              <template v-slot:item="data">
                  <template>
                      <v-list-item-content>
                          <v-list-item-title v-html="data.item.Code"> </v-list-item-title>
                          <v-list-item-subtitle >NÚMERO DA SOLICITAÇÃO: {{ data.item.codeStart }}</v-list-item-subtitle>
                      </v-list-item-content>
                  </template>
              </template>
              </v-autocomplete>
          </div>
        </v-col>
      </v-row>

      <v-row>
        <v-col
          md="6"
        >
          <v-text-field
            v-model="propReceived.info.userRequest"
            label="Solicitante"
          ></v-text-field>
          
        </v-col>

        <v-col
          md="6"
          v-if="true"
        >
          <v-text-field
            v-model="propReceived.info.rateio"
            label="Rateio de despesa"
          ></v-text-field>
        </v-col>

        <v-col
          md="6"
          v-if="true"
        >
          <v-select
            v-model="propReceived.info.typeRequest"
            :items="tipeRequest"
            label="Categoria de custo"
          ></v-select>
        </v-col>
        <v-col
          md="6"
          v-if="showField('contactRequest')"
        >
          <v-text-field
            v-model="propReceived.info.contactRequest"
            label="Contato"
          ></v-text-field>
        </v-col>
        <v-col
          md="6"
          v-if="showField('contactRequest')"
        >
          <v-text-field
            v-model="propReceived.info.nameRequestContact"
            label="Nome do solicitante"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-card>
</template>

<script>
import { statusNewRequest } from './fields';
import { db } from '../../../../firebaseDb'
export default {
  name: 'InfoRequest',

  props:{
    propReceived: Object
  },

  data: () => ({
    select: { state: 'Baixa', color: 'alert' },
    tipeRequest: ['Industrialização', 'Despesa', 'Reposição', 'Revenda','Material consumo', 'Imobilizado', 'Brinde'],
    options:null,
    loadingAllPreRequest:false,
    prerequest:[],
    fields:[
      {nameField:'numberRequest',  label:'Número de pedido'  }
    ],

    items: [
        { state: 'Alta' ,color: 'red' },
        { state: 'Media', color: 'warning' },
        { state: 'Baixa', color: 'green' }
    ],

    newRequestFieldsReturn: {
      numberRequest:true,
      contactRequest:true,
      priorityRequest:true,
    },

    confirmedRequest: {
      numberRequest:true,
      contactRequest:true,
      priorityRequest:true,
    },

    boughtRequest: {
      numberRequest:true,
      contactRequest:true,
      priorityRequest:true,
    },

    receivedRequest: {
      numberRequest:true,
      contactRequest:true,
      priorityRequest:true,
    },

    Finalizado: {
      numberRequest:true,
      contactRequest:true,
      priorityRequest:true,
    }
  }),

  mounted() {
    this.loadOptionsFromLocalStorage();
  },

  methods:{
    customFilter(item, queryText, itemText) {
      const normalizedQuery = queryText.toLowerCase()
      const normalizedItemText = itemText.toLowerCase()
      return normalizedItemText.includes(normalizedQuery) 
    },

    onItemSelected(){
      this.propReceived.info.branchRequest = this.propReceived.info.selectedOption.numero
      
			this.$store.dispatch('selectedBranch',this.propReceived.info.selectedOption)
      
    },

    loadOptionsFromLocalStorage() {
      if(!this.options){
        this.options = this.$store.state.branchsList.map(item => ({
          text: `${item.numero.trim()} -> ${item.filial.trim()}` ,
          value: item,
        }));
      }
    },
    haveOptions(){
			let item =  this.$store.state.branchsList
			 if(item){
				this.loadOptionsFromLocalStorage()
				return true
			}
			return false
		},
    showField(field){ 
      const statusAndFieldValid = statusDefine =>{
        const listStatus = {
          newRequest: statusNewRequest(field, this.newRequestFieldsReturn),
          confirmedRequest: statusNewRequest(field, this.confirmedRequest),
          boughtRequest: statusNewRequest(field, this.boughtRequest),
          receivedRequest: statusNewRequest(field, this.receivedRequest),
          Finalizado: statusNewRequest(field, this.Finalizado),
        }

        return listStatus[statusDefine]
      }

      return statusAndFieldValid( this.propReceived.status)
    },

    lodingDataFirebasePreRequest(){
      this.prerequest = []
      
      db.collection('prerequest').get().then(snapshot => {
      snapshot.forEach(doc => {
              let objectTask = doc.data();
              objectTask.id = doc.id;
              if(objectTask.status == 'Solicitação Aprovada'){
                this.prerequest.push(objectTask)
              }
          });
      });
      
      this.loadingAllPreRequest = true
    },
  },
  created(){
    this.lodingDataFirebasePreRequest()
    const requestItensGetApiSolicited = localStorage.getItem('branchSelect');
    this.branchSelect = JSON.parse(requestItensGetApiSolicited)
    this.propReceived.info.selectedOption = this.branchSelect
    this.propReceived.info.priorityRequest =  { state: 'Baixa', color: 'green' }
    if(!this.propReceived.info.dateStartRequest){
      this.propReceived.info.dateStartRequest = new Date()
    }
  }
}
</script>
