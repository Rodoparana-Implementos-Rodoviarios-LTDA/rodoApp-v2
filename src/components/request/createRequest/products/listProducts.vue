<template>
    <tr>
      
         

                <td>
                    <v-col
                        md="12"
                    >
                        <div>
                            <v-autocomplete
                                v-model="product.selectedOptionCode"
                                :items="listAllProducts"
                            
                                label="Selecione um produto"

                    
                                item-value="item"
                                item-text="Code"
                                @input="onItemSelected"
                            >
                    
                                <template v-slot:item="data">
                                    <template>
                                        <v-list-item-content>
                                            <v-list-item-title v-html="data.item.Code"> </v-list-item-title>
                                            <v-list-item-subtitle >Descrição: {{ data.item.Description }}</v-list-item-subtitle>
                                            <v-list-item-subtitle >NCM: {{ data.item.MercosulNomenclature }}</v-list-item-subtitle>
                                        </v-list-item-content>
                                    </template>
                                </template>
                            </v-autocomplete>
                        </div>
                    </v-col>
                </td>
                <td >

                    <v-text-field v-if="product.selectedOption &&  showNumberProducts "
                        :value="`${product.selectedOption.Description}`"
                        label="Descrição de produto"
                        readonly
                    ></v-text-field>
                    <span v-else>SELECIONE O PRODUTO</span>
                </td>
                 <td >
    
                    <v-text-field v-if="product.selectedOption &&  showNumberProducts "
                        :value="`${product.selectedOption.MercosulNomenclature}`"
                        label="NCM"
                        readonly
                    ></v-text-field>

                    <span v-else>SELECIONE O PRODUTO</span>
                </td>
           
              
                <td>
                    <v-col
                    md="12"
                    
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
                </td>
                <td>
                    <v-col
                        md="12"
                    
                    >
                        <v-text-field 
                            :rules="rulesField"
                            v-model="product.amontProduct"
                            label="Quantidade"
                            @input="formatValue"
                        ></v-text-field>
                    </v-col>
                </td>
                <td >
                   
                        <v-text-field v-if="product.valueProduct && product.amontProduct"
                            prefix="R$"
                            :value="`${maskValue(parseFloat(totalValue))}`"
                            label="VALOR TOTAL"
                            readonly
                        ></v-text-field>
                   
                </td>
                <td >
                    <v-text-field
                        type="Date"
                        v-model="product.dataShapedForecast"
                    ></v-text-field>
                </td>
        <td>
            <v-btn
                @click="deleteProduct"
                icon
                color="red"
            >
                <v-icon>mdi-delete</v-icon>
            </v-btn>
        </td>
    </tr>
</template>

<script>
    export default {
        name: 'ListProducts',
        
        props:{
            product: Object,
            index: Number,
        },

        data: () => ({
            days:'',
            rulesField: [
            value => {
            if (value) return true

                return 'Campo obrigatorio.'
            },

        ],   
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
        listAllProducts:[],
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

        selectedOption: null,
        options: null, // Aqui armazenaremos as opções do v-select
        loading: false,
        showNumberProducts:true,
        requestStatusNoew: '',
        valorMonetario: '0,00',
        }),
    mounted() {
        this.loadOptionsFromLocalStorage(); 
    },
        methods:{
            formatValue() {
         if(this.valorMonetario){
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
           
             let floatValue 
             floatValue =  `${(value % 100) == 0 ? '00':(value % 100)}`

             if(floatValue < 10 && floatValue > 0){
                floatValue = `0${floatValue}`
             }
 
             this.valorMonetario = `${parseInt(numeroComDecimais)},${floatValue}`
             
   
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

         this.totalValue = ((value / 100) *  this.product.amontProduct.replace(",", '.')).toFixed(2)
         }
         
     },
     
            formatDate(date) {
                // Converte a string para um objeto de data
                const dateObj = new Date(date);
                
                // Obtém o dia, mês e ano
                const day = dateObj.getDate() ;
    
                let dayFormat = day + 1

                const month = dateObj.getMonth() + 1; // monthes começam do zero, então adicionamos 1
                const year = dateObj.getFullYear();

                // Formata a data no formato desejado (DD/MM/YYYY)
                return `${dayFormat.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;
            },
            maskValue(value){
                return value.toFixed(2).replace('.', ',');
            },
            deleteProduct(){
                const newId = this.index
                this.eventEmit('delete',newId)
            },
            editProduct(){
                const newId = this.index
                this.eventEmit('edit',newId)
            },
            eventEmit(event,newId){
                this.$emit(event, newId)
            },
            dateToday(){
                // Data prevista contida na variável product.dataShapedForecast (supondo que seja uma string no formato 'YYYY-MM-DD')
                const dataPrevista = this.product.dataShapedForecast;

                // Converter a data prevista em um objeto Date
                const partesDataPrevista = dataPrevista.split('-');
                const anoPrevisto = parseInt(partesDataPrevista[0], 10);
                const mesPrevisto = parseInt(partesDataPrevista[1], 10) - 1; // Subtrai 1 do mês, pois os meses começam em 0 (janeiro)
                const diaPrevisto = parseInt(partesDataPrevista[2], 10);
                const dataPrevistaObj = new Date(anoPrevisto, mesPrevisto, diaPrevisto);

                // Obter a data atual
                const dataAtual = new Date();

                // Definir a hora, minutos, segundos e milissegundos da data atual como zero
                dataAtual.setHours(0, 0, 0, 0);

                // Definir a hora, minutos, segundos e milissegundos da data prevista como zero
                dataPrevistaObj.setHours(0, 0, 0, 0);

                // Calcular a diferença em milissegundos entre as duas datas
                const diferencaEmMilissegundos = dataPrevistaObj - dataAtual;

                // Calcular a diferença em dias
                const diferencaEmDias = Math.floor(diferencaEmMilissegundos / (1000 * 60 * 60 * 24));
                this.days = diferencaEmDias
                if(diferencaEmDias >= 0){
                    return true
                }else {
                    return false
                }
            },
      
        valueAmont(){
   
            this.product.amontProduct
            this.product.amontProduct = this.product.amontProduct.replace(/[^0-9.]/g, '');
            
            // Substituir vírgulas (,) por pontos (.)
            this.product.amontProduct = this.product.amontProduct.replace(/,/g, '.');
            
            // Impedir números negativos
            if (this.product.amontProduct < 0) {
                this.product.amontProduct = '';
            }
        },
        
        async loadOptionsFromLocalStorage() {
            let produtos = this.$store.state.productsList
            this.listAllProducts = produtos.data.items
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

            let API_URL =  `${this.$store.state.linkBaseApiProtheusHomologation}api/retail/v1/retailItem?page=1&pageSize=1&Code=${this.product.selectedOptionCode}`
            
            await axios.get(API_URL)
                .then(response => {
            
                if (response.status !== 200 ) {
                    console.error('Erro na solicitação:', response.status);
                    window.alert('erro em RPO SOLICITE SUPORTE')
                    throw new Error('Não foi possível acessar a API da TOTVS');
                }
                
                this.product.UnitOfMeasureCode = response.data.UnitOfMeasureCode
                this.product.codeProduct = response.data.Code
                this.product.nameProduct = response.data.Description
                
                this.product.selectedOption = response.data
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
            // Data prevista contida na variável product.dataShapedForecast (supondo que seja uma string no formato 'YYYY-MM-DD')
            const dataPrevista = this.product.dataShapedForecast;

            // Converter a data prevista em um objeto Date
            const partesDataPrevista = dataPrevista.split('-');
            const anoPrevisto = parseInt(partesDataPrevista[0], 10);
            const mesPrevisto = parseInt(partesDataPrevista[1], 10) - 1; // Subtrai 1 do mês, pois os meses começam em 0 (janeiro)
            const diaPrevisto = parseInt(partesDataPrevista[2], 10);
            const dataPrevistaObj = new Date(anoPrevisto, mesPrevisto, diaPrevisto);

            // Obter a data atual
            const dataAtual = new Date();

            // Definir a hora, minutos, segundos e milissegundos da data atual como zero
            dataAtual.setHours(0, 0, 0, 0);

            // Definir a hora, minutos, segundos e milissegundos da data prevista como zero
            dataPrevistaObj.setHours(0, 0, 0, 0);

            // Calcular a diferença em milissegundos entre as duas datas
            const diferencaEmMilissegundos = dataPrevistaObj - dataAtual;

            // Calcular a diferença em dias
            const diferencaEmDias = Math.floor(diferencaEmMilissegundos / (1000 * 60 * 60 * 24));

            if(diferencaEmDias >= 0){
                return 'EM DIA'
            }else {
                return 'atrasado '+ (-diferencaEmDias) + ' DIAS'
            }
        },
        maskValue(value){
            return value.toFixed(2).replace('.', ',');
        }
        },
        created(){
 
        if(!this.product.codeProduct){
            this.showNumberProducts = false
        }
    
        this.valorMonetario = this.product.valueProduct
        this.product.statusShipProduct = false
        let requestGet = localStorage.getItem('status');
        this.requestStatusNoew = JSON.parse(requestGet)
      
        this.formatValue()
        }
    }
</script>