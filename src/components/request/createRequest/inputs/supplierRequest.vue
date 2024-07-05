<template>
        <v-card
            elevation="0" class="pa-2" style="border-radius: 0;"
        >
        <p class="text-h5 text--primary">
            DADOS DO FORNECEDOR
        </p>
            <v-row>
                <v-col md="6"
                    v-if="true"
                >
                    <v-text-field
                        v-model="propReceived.supplier.nameVendor"
                        label="Nome do vendedor"
                    ></v-text-field>
                </v-col>
            </v-row>
            
            <v-row>
                <v-col md="6"
                
                >
                    <v-autocomplete 
                        v-if="cnpjOptions.length >0"
                        required
                        v-model="propReceived.supplier.selectedOptionCnpj"
                        :items="cnpjOptions"
                        label="Selecione um CNPJ"
                        :filter="customFilter"
                        @input="onItemSelectedCnpj"
                    ></v-autocomplete>
                    
                        
                    <v-alert v-if="!cnpjOptions.length > 0"
                        color="blue"
                        outlined
                        icon="mdi-clock-fast"
                        border="left"
                        class="text-subtitle-2 text-center"
                    >CARREGANDO...</v-alert>
                </v-col>
                <v-col md="6"
                    v-if="showField('nameSupplier')" 
                >
                    <v-autocomplete v-if="cnpjOptions.length >0 && options && options.length > 1"
                        required
                        v-model="propReceived.supplier.selectedOption"
                        :items="options"
                        label="Selecione um fornecedor(OBRIGATORIO)"
                        :filter="customFilter"
                        @input="onItemSelectedVendor"
                    ></v-autocomplete>

                
                     <v-alert  v-if="!options && !propReceived.supplier.selectedOptionCnpj"
                        outlined
                        type="warning"
                        
                        border="left"
                    >
                        SELECIONE UM CNPJ(OBRIGATORIO)
                    </v-alert>

                    <v-alert v-if="!options && propReceived.supplier.selectedOptionCnpj"
                        color="blue"
                        outlined
                        icon="mdi-clock-fast"
                        border="left"
                        class="text-subtitle-2 text-center"
                    >CARREGANDO...</v-alert>

                    <!-- <v-alert v-if="options && options.length == 1 && propReceived.supplier.selectedOptionCnpj"
                        color="green"
                        type="LOADING"
                        class="text-subtitle-2 text-center"
                    >CARREGANDO...</v-alert> -->

                    <v-text-field v-if="options && options.length == 1 && propReceived.supplier.selectedOptionCnpj"
                        :value="`${propReceived.supplier.selectedOption.numero} -> ${propReceived.supplier.selectedOption.fornecedor}`"
                        label="SELECIONE UM FORNECEDOR"
                        readonly
                    ></v-text-field>
                        
                </v-col>
                <v-col md="6"
                    v-if="true"
                >
                     <v-text-field v-if="propReceived.supplier.selectedOption"
                        :value="propReceived.supplier.selectedOption.estado"
                        label="Estado"
                        readonly
                    ></v-text-field>
                </v-col>
                <v-col md="6"
                    v-if="true"
                >
                     <v-text-field v-if="propReceived.supplier.selectedOption"
                        :value="propReceived.supplier.selectedOption.cidade"
                        label="Cidade"
                        readonly
                    ></v-text-field>
                </v-col>
                <v-col md="6"
                    v-if="true"
                >
                     <v-text-field v-if="propReceived.supplier.selectedOption"
                        :value="propReceived.supplier.selectedOption.bairro"
                        label="Bairro"
                        readonly
                    ></v-text-field>
                </v-col>
                <v-col md="6"
                    v-if="true"
                >
                     <v-text-field v-if="propReceived.supplier.selectedOption"
                        :value="propReceived.supplier.selectedOption.rua"
                        label="Rua"
                        readonly
                    ></v-text-field>
                </v-col>
            </v-row>
            
            <v-row v-if="false">
              
                <v-col md="6"
                    v-if="showField('dateShipedSupplier')"
                >
                    <v-text-field
                        v-model="propReceived.supplier.dateShipedSupplier"
                        label="Data de entrega(input)"
                    ></v-text-field>
                </v-col>

                <v-col md="6"
                    v-if="showField('valueShipedSupplier')"
                >
                    <v-text-field
                        v-model="propReceived.supplier.valueShipedSupplier"
                        label="Valor frete(input)"
                    ></v-text-field>
                </v-col>
            </v-row>
        </v-card>
</template>

<script>
import { statusNewRequest } from './fields';

    export default {
        props:{
            propReceived: Object
        },
        name: 'SupplierRequest',

        data: () => ({
            fornecedor: ['0001', '0002', '0003', '0004'],
            show:false,
            options:null,
            cnpjOptions:[],
            newRequestFieldsReturn:{
                nameSupplier: true,
                dateShipedSupplier: true,
                valueShipedSupplier: true
            },
            newRequestFieldsReturn: {
                nameSupplier: true,
                dateShipedSupplier: true,
                valueShipedSupplier: true
            },

            confirmedRequest: {
                nameSupplier: true,
                dateShipedSupplier: true,
                valueShipedSupplier: true
            },

            boughtRequest: {
                nameSupplier: true,
                dateShipedSupplier: true,
                valueShipedSupplier: true
            },

            receivedRequest: {
                nameSupplier: true,
                dateShipedSupplier: true,
                valueShipedSupplier: true
            },

            Finalizado: {
                nameSupplier: true,
                dateShipedSupplier: true,
                valueShipedSupplier: true
            }
        }),
         mounted() {
            this.loadOptionsFromLocalStorage(); 
            this.loadOptionsFromLocalStorageCnpj()
        },
        methods:{
           

            takeVendor(CODIGO,LOJA ){
                this.show = false
                let API_URL = `${this.$store.state.linkBaseApiProtheusHomologation}reidoapsdu/consultar/fornecedores/`
                
                axios.get(API_URL,{
                    method: 'GET',
                    headers: {
                        'codForn': CODIGO,//6 caracters
                        'lojaForn': LOJA,//2 caracters
                    }
                })
                    .then(response => {
                    
                    if (response.status !== 200 ) {
                        console.error('Erro na solicitação:', response.status);
                        throw new Error('Não foi possível acessar a API da TOTVS');
                    }

                    const items = response;

                    localStorage.setItem('vendor', JSON.stringify(items.data));


                        // this.propReceived.supplier.nameSupplier =
                        this.propReceived.supplier.selectedOption = items.data[0]
                        this.loadOptionsFromLocalStorage(); 
                   
                })
                .catch(error => {
                    console.error('Erro:', error);
                });
                this.show = true

            },

            onItemSelectedVendor(){
                
                this.propReceived.supplier.nameSupplier = this.propReceived.supplier.selectedOptionCnpj.codigo
            },
            onItemSelectedCnpj(){
                this.options = null
                this.propReceived.supplier.nameSupplier = null
                console.log("aqui",this.propReceived.supplier)
                this.propReceived.supplier.cnpj = this.propReceived.supplier.selectedOptionCnpj.cnpj.trim()
        
                this.takeVendor(this.propReceived.supplier.selectedOptionCnpj.codigo,this.propReceived.supplier.selectedOptionCnpj.loja)
            },
            customFilter(item, queryText, itemText) {
         
                const normalizedQuery = queryText.toLowerCase()
                const normalizedItemText = itemText.toLowerCase()
                return normalizedItemText.includes(normalizedQuery) 
            },

            loadOptionsFromLocalStorage() {
                const requestItensGetApiSolicited = localStorage.getItem('vendor');

                if (requestItensGetApiSolicited) {
                    this.options = JSON.parse(requestItensGetApiSolicited).map(item => ({
                        text: `${item.numero.trim()} -> ${item.fornecedor.trim()}` ,
                        value: item,
                    }));
                }
            },

            loadOptionsFromLocalStorageCnpj() {
                const requestItensGetApiSolicited = localStorage.getItem('cnpjVendor')
                if (requestItensGetApiSolicited) {
                   
                    this.cnpjOptions = JSON.parse(requestItensGetApiSolicited).map(item => ({
                        
                        text: `${item}` ,
                        value: item,
                    }));
                }else {
                    let API_URL = `${this.$store.state.linkBaseApiProtheusHomologation}reidoapsdu/consultar/cnpjFornecedores`

                    axios.get(API_URL)
                    .then(response => {
                        if (response.status !== 200 ) {
                            console.error('Erro na solicitação:', response.status);
                            throw new Error('Não foi possível acessar a API da TOTVS');
                        }
                        
                        const items = response.data;
                        this.cnpjOptions = items.map(item => ({
                            
                            text: `${item.loja} - ${item.codigo} : ${item.cnpj.trim()} : ${item.Empresa.trim()} ` ,
                            value: item,
                        }));
                    })
                    .catch(error => {
                        console.error('Erro:', error);
                    });
                }
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
        },
        created(){
            this.loadOptionsFromLocalStorageCnpj()
        }
    }
</script>





