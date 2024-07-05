<template>

        <v-card
            elevation="0" class="pa-2" style="border-radius: 0;"
        >
        <p class="text-h5 text--primary">
            DADOS DO PAGAMENTO
        </p>
            <v-row>
                <v-col
                    v-if="showField('valuePayment')"
                    md="3"            
                >
                    <v-text-field 
                        :value="maskValue(parseFloat(valueTotal()))"
                        label="valor"
                        prefix="R$"
                        readonly
                    ></v-text-field>
                </v-col>
            </v-row>

            <v-row>

            <!-- <v-col
                md="3"
                v-if="showField('statusPayment')"
            >
                <v-select
                    v-model="propReceived.payment.statusPayment"
                    :items="statusPayment"
                    label="status"
                ></v-select>
            </v-col> -->

            <v-col
                md="3"
                v-if="showField('termsPayment')"
            >
                <v-autocomplete v-if="options"
                    required
                    v-model="propReceived.payment.selectedOption"
                    :items="options"
                    label="Selecione um metodo de pagamento(OBRIGATORIO)"
                ></v-autocomplete>
                <v-alert v-if="!options"
                        color="blue"
                        type="LOADING"
                        outlined
                        icon="mdi-clock-fast"
                        border="left"
                        class="text-subtitle-2 text-center"
                    >CARREGANDO...</v-alert>
            </v-col>

            <v-col
                md="3"
                v-if="showField('installmentsPayment') && propReceived.payment.selectedOption"
            >
                <v-text-field
                    :value="`${propReceived.payment.selectedOption.QuantityPlots}`"
                    label="Valor de parcela"
                    readonly
                ></v-text-field>
            </v-col>

            <v-col
                md="3"
                v-if="showField('valueInstallmentsPayment') && propReceived.payment.selectedOption && valueTotal()"
            >
                <v-text-field
                    :value="`${maskValue(parseFloat(valueTotal() / propReceived.payment.selectedOption.QuantityPlots))}`"
                    label="Valor de parcela"
                    prefix="R$"
                    readonly
                ></v-text-field>
            </v-col>
        </v-row>
      </v-card>

</template>

<script>

import { statusNewRequest } from './fields';
    export default {
        name: 'PaymentRequest',
        props:{
            propReceived: Object
        },
        data: () => ({
            mutiplayerPayment: ['1x', '2x', '3x', '4x'],
            methodPayment: ['boleto', 'cartao', 'pix', 'permuta'],
            statusPayment:['Pago', 'Não pago', 'Parcialmente pago', 'Aguardando pagamento'],
            options:null,
            isValidLoader : false,
            newRequestFieldsReturn:{
                valuePayment:               true,
                statusPayment:              true,
                termsPayment:               true,
                installmentsPayment:        true,
                valueInstallmentsPayment:   true,
                observationPayment:         true,
            },

            newRequestFieldsReturn: {
                valuePayment:               true,
                statusPayment:              true,
                termsPayment:               true,
                installmentsPayment:        true,
                valueInstallmentsPayment:   true,
                observationPayment:         true,
            },

            confirmedRequest: {
                valuePayment:               true,
                statusPayment:              true,
                termsPayment:               true,
                installmentsPayment:        true,
                valueInstallmentsPayment:   true,
                observationPayment:         true,
            },

            boughtRequest: {
                valuePayment:               true,
                statusPayment:              true,
                termsPayment:               true,
                installmentsPayment:        true,
                valueInstallmentsPayment:   true,
                observationPayment:         true,
            },

            receivedRequest: {
                valuePayment:               true,
                statusPayment:              true,
                termsPayment:               true,
                installmentsPayment:        true,
                valueInstallmentsPayment:   true,
                observationPayment:         true,
            },

            Finalizado: {
                valuePayment:               true,
                statusPayment:              true,
                termsPayment:               true,
                installmentsPayment:        true,
                valueInstallmentsPayment:   true,
                observationPayment:         true,
            }
           
        }),mounted() {
            this.loadOptionsFromLocalStorage(); 
        },
        methods:{
            loadOptionsFromLocalStorage() {
                let optionsPayment=[]
                for(let item of this.$store.state.paymentsList.items){
                        if(item.Code[0] == 'C' || item.Code[0] == 'c'){

                            if(optionsPayment){
                                optionsPayment = optionsPayment.concat(item)
                            }
                            else{
                                optionsPayment = item
                            }
                        }
                    }

                    this.options = optionsPayment.map(item => ({
                        
                        text:`${item.Description.trim()}` ,
                        value: item,
                    }));
            },

            onItemSelected(){
                this.propReceived.payment.termsPayment = propReceived.payment.selectedOption.code
            },

            customFilter(item, queryText, itemText) {
                const normalizedQuery = queryText.toLowerCase()
                const normalizedItemText = itemText.toLowerCase()
                return normalizedItemText.includes(normalizedQuery) 
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
            valueTotal(){
                let value = 0

                for(let item of this.propReceived.products){
                    value = value + parseFloat(item.valueProduct * item.amontProduct)
                }
                return value
            },
            maskValue(value){
                return value.toFixed(2).replace('.', ',');
            }
        },
        created(){
            this.propReceived.payment.statusPayment = 'Não pago'
            this.loadOptionsFromLocalStorage()
        
        }
    }
</script>
