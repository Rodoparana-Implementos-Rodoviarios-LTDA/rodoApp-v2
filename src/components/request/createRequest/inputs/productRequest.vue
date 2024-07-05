<template>
    <v-card 
      elevation="2"
      class="pa-2 ma-0"
      
    >
        <v-card  v-if="false">
            <v-alert
                text
                prominent
                type="info"
                icon="mdi-cloud-alert"
   
            >
                Carregando...
            </v-alert>
        </v-card>
        
        <v-form
            v-if="options"
            ref="form"
            @submit.prevent="submit"
        >
    
        
        <v-row v-if="product && selectedOption &&  showNumberProducts ">
            <v-col
                md="3"
            >
                <v-text-field
                
                    :value="`${selectedOption.Code}`"
                    label="Codigo do produto"
                    readonly
                ></v-text-field>
            </v-col>

            <v-col
                md="3"
            >
                <v-text-field
                    :value="`${selectedOption.Description}`"
                    label="Descrição de produto"
                    readonly
                ></v-text-field>
            </v-col>

            <v-col
                md="3"
            >
                <v-text-field
                    :value="`${selectedOption.MercosulNomenclature}`"
                    label="NCM"
                    readonly
                ></v-text-field>
            </v-col>

            <v-col
                md="3"
            >
                <v-text-field v-if="showNumberProducts"
                    :value="`${product.UnitOfMeasureCode}`"
                    label="UNIDADE DE MEDIDA"
                    readonly
                ></v-text-field>
            </v-col>
        </v-row>

            <v-row v-if="product && selectedOption && showNumberProducts">
                <v-col
                    md="3"
                
                >
                    <v-text-field 
                        :rules="rulesField"
                        v-model="product.amontProduct"
                        label="Quantidade"
                        @input="formatValue"
                    ></v-text-field>
                </v-col>
        
                <v-col
                    md="3"
                
                >
                <v-text-field
                    :rules="rulesField"
                    prefix="R$"
                    v-model="valorMonetario"
                    @input="formatValue"
                    maxlength="12"
                    label="Valor unitario"
                />

                    <!-- verificar depois o campo para ter 2 casas decimais -->
                </v-col>

                <v-col
                    md="3"
                    v-if="product && selectedOption && product.amontProduct"
                >
                    <v-text-field
                        prefix="R$"
                        :value="`${maskValue(parseFloat(totalValue))}`"
                        label="VALOR TOTAL"
                        readonly
                    ></v-text-field>
                </v-col>
        
                <v-col
                    md="3"
                
                >
                    <v-text-field
                        v-model="product.observationProduct"
                        label="Observação"
                    ></v-text-field>
                </v-col>
            
                <v-col
                    md="3"
                >
                    <v-text-field
                        v-model="product.suggestionProduct"
                        label="Sugestão(link do produto)"
                    ></v-text-field>
                </v-col>
            </v-row>
        </v-form>
    </v-card>
</template>

<script>
import listProducts from '../../products'
import { statusNewRequest } from './fields';

export default {
    name: 'ProductRequest',
    props: {
        product: Object
    },
    components:{
        listProducts
    },
    data: () => ({
        totalValue:'',
        allProducts : false,
        validNumber : null,
        select: { state: 'Status de entrega'},
        selected: {},
        rules: {
            required: value => !!value || 'Campo obrigatorio.',
            numberValid: value => !parseInt(value) >= 0 || 'Campo aqui.'
        },
        isNumberRule: [
            value => {
                if (!/[^0-9]/.test(value)) return true
                return 'Verifique o valor informado em campo'
            },
        ],
        isNumberPos: [
            value => {
                if (!value >= 0) return true

                return 'Verifique o valor informado em campo'
            },
        ],
        rulesField: [
            value => {
            if (value) return true

                return 'Campo obrigatorio.'
            },

        ],
        items: [
            { state: 'Cancelada' ,color: 'red' },
            { state: 'Aguardando', color: 'yellow lighten-1' },
            { state: 'Entregue', color: 'green' },
            { state: 'Entregue parcialmente', color: 'orange' }
        ],
        newRequestFieldsReturn: {
            selectedOption: true,
            amontProduct: true,
            discountProduct: false,
            valueProduct: true,
            observationProduct: true,
            suggestionProduct: true,
            amontShipedProduct: false,
            statusShipProduct: true
        },

        confirmedRequest: {
            selectedOption: true,
            amontProduct: true,
            discountProduct: false,
            valueProduct: true,
            observationProduct: true,
            suggestionProduct: true,
            amontShipedProduct: true,
            statusShipProduct: true
        },

        boughtRequest: {
            selectedOption: true,
            amontProduct: true,
            discountProduct: true,
            valueProduct: true,
            observationProduct: true,
            suggestionProduct: true,
            amontShipedProduct: true,
            statusShipProduct: true
        },

        receivedRequest: {
            selectedOption: true,
            amontProduct: true,
            discountProduct: true,
            valueProduct: true,
            observationProduct: true,
            suggestionProduct: true,
            amontShipedProduct: true,
            statusShipProduct: true
        },

        Finalizado: {
            selectedOption: true,
            amontProduct: true,
            discountProduct: true,
            valueProduct: true,
            observationProduct: true,
            suggestionProduct: true,
            amontShipedProduct: true,
            statusShipProduct: true
        },

        selectedOption: '',
        options: null, // Aqui armazenaremos as opções do v-select
        loading: false,
        showNumberProducts:true,
        requestStatusNoew: '',
        valorMonetario: '0,00',

        
    }),
    computed: {
        formIsValid() {
            return(
                this.product &&
                this.product.selectedOption &&
                this.product.amontProduct && 
                this.product.amontProduct >= 0 &&  !isNaN(this.product.amontProduct) &&
                this.product.valueProduct &&
                this.product.valueProduct >= 0 &&  !isNaN(this.product.valueProduct) &&
                this.product.dataShapedForecast
            )
        },
    },
    mounted() {
        this.loadOptionsFromLocalStorage(); 
    },
    methods:{
        formatValue() {
            if(this.product && this.product.selectedOption){

            
            const valorNumerico = this.valorMonetario.replace(/[^0-9,]/g, '');
       
            const partes = valorNumerico.split(',');
    
            let value = parseInt(partes[0]+partes[1])
            
            this.valorMonetario = '0,00'

            if(value <= 9){
                this.valorMonetario = `0,0${value}`
                this.product.valueProduct =  `0.0${value}`

            } else if (value <= 99){
                this.valorMonetario = `0,${value}`
                this.product.valueProduct = `0.${value}`
            
            } else {
                let numeroComDecimais = (value / 100).toFixed(2);
                this.valorMonetario = `${parseInt(numeroComDecimais)},${(value % 100) == 0 ? '00':(value % 100)}`
                this.product.valueProduct = `${parseInt(numeroComDecimais)}.${value % 100}`
            } 

            let valueNewVarg =  this.product.amontProduct.indexOf(',');


            let valueCorrige
            if (valueNewVarg !== -1){
                const parteAntesVirgula = this.product.amontProduct.substring(0, valueNewVarg + 1);
                const parteAposVirgula = this.product.amontProduct.substring(valueNewVarg + 1).replace(/,/g, '');
                const valorCorrigido = parteAntesVirgula + parteAposVirgula;
                this.product.amontProduct = valorCorrigido
                valueCorrige =  valorCorrigido
            } else {
                valueCorrige =  this.product.amontProductag
            }
            if(this.product && this.product.selectedOption){
                this.totalValue = ((value / 100) *  this.product.amontProduct.replace(",", '.')).toFixed(2)
            }
            }
        },
        valueAmont(){
            this.product.amontProduct
            if(this.product && this.product.selectedOption){
            this.product.amontProduct = this.product.amontProduct.replace(/[^0-9.]/g, '');
            }
            // Substituir vírgulas (,) por pontos (.)
            if(this.product && this.product.selectedOption){
            this.product.amontProduct = this.product.amontProduct.replace(/,/g, '.');
            }
            // Impedir números negativos
            if (this.product.amontProduct < 0) {
                this.product.amontProduct = '';
            }
        },
        
        async loadOptionsFromLocalStorage() {
            let produtos = this.$store.state.productsList

            if (produtos) {
                let options1 = produtos.data.items.map(item => ({
                    text: `${item.Code.trim()}-> ${item.Description.trim()} -> ${item.MercosulNomenclature.trim()}` ,
                    value: item,
                }));
                this.options = options1
            } 
            this.allProducts = true
        },

        async onItemSelected(){
            this.product.selectedOption = this.selectedOption
            this.product.codeProduct = this.product.selectedOption.Code
            this.product.nameProduct = this.product.selectedOption.Description
            let valueItem
            let API_URL =  `${this.$store.state.linkBaseApiProtheusHomologation}api/retail/v1/retailItem?page=1&pageSize=1&Code=${this.product.selectedOption.Code}`
            
            await axios.get(API_URL)
                .then(response => {
            
                if (response.status !== 200 ) {
                    console.error('Erro na solicitação:', response.status);
                    window.alert('erro em RPO SOLICITE SUPORTE')
                    throw new Error('Não foi possível acessar a API da TOTVS');
                }
                
                this.product.UnitOfMeasureCode = response.data.UnitOfMeasureCode
                
                
            })
                .catch(error => {
                console.error('Erro:', error);
            });
            this.showNumberProducts = true
        },

        customFilter(item, queryText, itemText) {
            const normalizedQuery = queryText.toLowerCase()
            const normalizedItemText = itemText.toLowerCase()
            return normalizedItemText.includes(normalizedQuery) 
        },

        saveModal() {
            this.$emit('save');
        },

        showField(field){
            const statusAndFieldValid = statusDefine => {
                const listStatus = {
                    newRequest: this.fieldReturn(field, (this.newRequestFieldsReturn)),   
                }
                return listStatus[statusDefine]
            }
            
            return statusAndFieldValid(this.requestStatusNoew)
        },
        
        fieldReturn(field, returnRequest) {
            const newRequestFields = statusDefine => {
                const listStatus = returnRequest
                return listStatus[statusDefine]
            }

            return newRequestFields(field)
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
            
            return statusAndFieldValid( this.requestStatusNoew)
        },
        dateToday(){

            if(this.product){
                const dataPrevista = this.product.dataShapedForecast;
           
                const partesDataPrevista = dataPrevista.split('-');
                const anoPrevisto = parseInt(partesDataPrevista[0], 10);
                const mesPrevisto = parseInt(partesDataPrevista[1], 10) - 1; 
                const diaPrevisto = parseInt(partesDataPrevista[2], 10);
                const dataPrevistaObj = new Date(anoPrevisto, mesPrevisto, diaPrevisto);

                const dataAtual = new Date();

                dataAtual.setHours(0, 0, 0, 0);

                dataPrevistaObj.setHours(0, 0, 0, 0);

                const diferencaEmMilissegundos = dataPrevistaObj - dataAtual;

                const diferencaEmDias = Math.floor(diferencaEmMilissegundos / (1000 * 60 * 60 * 24));

            if(diferencaEmDias >= 0){
                return 'EM DIA'
            }else {
                return 'atrasado '+ (-diferencaEmDias) + ' DIAS'
            }
            }
        },
        maskValue(value){
            if(this.product && this.product.selectedOption){
                return value.toFixed(2).replace('.', ',');
            }
        }
    },

    created(){
        if(this.product && !this.product.codeProduct){
            this.showNumberProducts = false
        }
        if(this.product){
            this.valorMonetario = this.product.valueProduct
            this.product.statusShipProduct = false
        }
      
        let requestGet = localStorage.getItem('status');
        this.requestStatusNoew = JSON.parse(requestGet)
        this.dateToday()
        this.formatValue()
    }
}
</script>
