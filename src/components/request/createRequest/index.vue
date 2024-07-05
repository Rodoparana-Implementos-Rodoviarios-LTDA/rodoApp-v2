<template>
	<div style="height: 100%;">
		
		<v-card  style="background-color: rgb(255, 255, 255);border-radius: 0;" elevation="0" class="aurean-margin-list">
			<v-row class="ma-3">
				<v-col class="md-1">
					<v-btn @click="backRouteHome()" dark block color="black" class="rodo-btn" elevation="0">
						<v-icon color="red" class="ma-1">mdi-backspace-outline </v-icon>
							VOLTAR
						<div class="btnTriangle" style="margin-top:8px"></div>
					</v-btn>
				</v-col>

				<v-col class="md-1"
					v-for="(item,i) of panel"
					:key="i"
				>
					<v-btn elevation="0" block 
						class="mx-2 rodo-btn text--white" style="position: relative !important;border-radius: 0;"
						@click="showExpansionPainel(item.component)" 
						color="black"
						:disabled="!areaIsValid(item)"
					>
						<div  style="padding-top: 10px;"></div>
							<v-progress-circular
								v-if="!areaIsValid(item)"
								indeterminate
								color="primary"
							></v-progress-circular>	
						<div v-if="item.component == componentSelected" class="btnTriangleActived"  ></div><div  style="color:white;">{{item.title}}</div>
						
						<div class="btnTriangle"  ></div>
					</v-btn>
				</v-col>
				
				<v-col class="md-1">
					<v-btn @click="saveRequest(request)" :disabled="!saveValid()" block color="black" class="rodo-btn" style="color:white" elevation="0">
						<v-icon color="green"  class="ma-1">mdi-plus</v-icon>
							SALVAR PEDIDO
						<div class="btnTriangle" style="margin-top: 8px;"></div>
					</v-btn>
				</v-col>
			</v-row>
		</v-card>
		
		<component class="aurean-margin-list" 
			style="background-color: rgb(255, 255, 255); 
			border-radius: 0px;" 
			v-if="componentSelected != 'ProductRequest'"
			:is="componentSelected" :propReceived="request"
			elevation="0"
		/>
		<v-card  v-if="componentSelected == 'ProductRequest'"
			style="background-color: rgb(255, 255, 255); border-radius: 0px;height: 73vh;"
			class="overflow-y-auto overflow-x-hidden ma-3 pa-6 aurean-margin-lis"
			elevation="0"
		>
			<p class="text-h5 text--primary">
				PRODUTOS DE PEDIDO (TODOS CAMPOS OBRIGATORIO)
			</p>
				
			<v-col md="3">
				<v-btn block color="success"
					elevation="2" @click="createProduct"
				>
					<v-icon light>mdi-plus</v-icon>
						Incluir item
				</v-btn>
			</v-col>
			
			<v-simple-table >
				<template v-slot:default>
					<thead>
						<toolbar  style="background-color: rgb(255, 255, 255);" :toobarList="headerProducts"/>
					</thead>

					<tbody>
						<ListProducts :product="item" :index="index" v-for="(item, index) in request.products" @delete="deleteProduct" @edit="editProduct" :key="index"/>
					</tbody>
				</template>
			</v-simple-table>
		</v-card>
		
		<modal
			:show="isModalVisible"
			:product="productWorking"
			@close="closeModal"
			@save="saveModal"
			:isEdit="idEdit" 
		/>
		
		<v-bottom-sheet
			v-model="sheet"
			persistent
		>
			<v-overlay :value="overlay"  v-if="!numberRequestCreateTotvs">
				<v-progress-circular
					indeterminate
					size="64"
				></v-progress-circular>
			</v-overlay>

			<v-dialog
				v-model="numberRequest"
				max-width="290"
			>
			
				<v-card>
					<v-card-title class="text-h5" v-if="numberRequestCreateTotvs && numberRequestCreateTotvs.pedido">
						PEDIDO GERADO COM SUCESSO
					</v-card-title>
					
					<v-card-title class="text-h5" v-if="numberRequestCreateTotvs && numberRequestCreateTotvs.Mensagem">
						PEDIDO EDITADO COM SUCESSO
					</v-card-title>

					<v-card-text v-if="numberRequestCreateTotvs && numberRequestCreateTotvs.pedido">Numero do pedido:{{ numberRequestCreateTotvs.pedido }}</v-card-text>
					<v-card-text v-if="numberRequestCreateTotvs && numberRequestCreateTotvs.Mensagem">{{ numberRequestCreateTotvs.Mensagem }}</v-card-text>
					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn
						color="green darken-1"
						text
						@click="finishRequest()"
						>
						FINALIZAR
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-dialog>
		</v-bottom-sheet>

		<v-expansion-panels>
			<v-expansion-panel 
			v-if="showArea(item) && !isModalVisible"
				v-for="(item,i) of panel"
				:key="i"
			>
				<v-expansion-panel-content v-if="request">
				</v-expansion-panel-content>
			</v-expansion-panel>
		</v-expansion-panels>
	</div>
</template>

<script>
import { db } from '../../../firebaseDb'
import axios from 'axios';

import InfoRequest from './inputs/infoRequest.vue'
import ProductRequest from './inputs/productRequest.vue'
import PaymentRequest from './inputs/paymentRequest.vue'
import SupplierRequest from './inputs/supplierRequest.vue'
import FiscoRequest from './inputs/supRequest'
import Modal from './inputs/modalProduct.vue'

import ListProducts from './products/listProducts.vue'

import Toolbar from '../../tools/toolbar'
import ButtonTooltip from '../../tools/buttonIconTooltip'

import RequestInfo from '../../../models/request/Info'
import RequestFisco from '../../../models/request/Fisco'
import RequestPayment from '../../../models/request/Payment'
import RequestProduct from '../../../models/request/Product'
import RequestSupplier from '../../../models/request/Supplier'

import ModelRequest from '../../../models/Request'
import Product from '../../../models/request/Product';

export default {
    name: 'Home',

    components:{
		InfoRequest,
		PaymentRequest,
		ProductRequest,
		SupplierRequest,
		FiscoRequest,
		Modal,
		Toolbar,
		ListProducts,
		ButtonTooltip
    },
	props:{
		index: {
			type: Number,
			default: null,
			},
		},
    data: () => ({	
		dialog:true,
		sheet:false,
		requestInfo: new RequestInfo,
		requestFisco: new RequestFisco,
		requestPayment: new RequestPayment,
		requestSupplier: new RequestSupplier,

		productWorking:null,

		messagemEdited:null,

		isModalVisible: false,
		BASE_ROUTE_I18N:'request.addRequest.',
		numberRequestCreateTotvs:null,
		numberRequest:null,
		request: null,
		overlay:true,
		requestList:[],
		headerProducts:[
			
			{title:'request.addRequest.headProductsList.productSelect'},
			{title:'request.addRequest.headProductsList.code'},
			{title:'request.addRequest.headProductsList.nameProduct'},
			{title:'request.addRequest.headProductsList.value'},
			{title:'request.addRequest.headProductsList.amountSolicited'},
			{title:'request.addRequest.headProductsList.totalValue'},
			{title:'request.addRequest.headProductsList.dataShiped'},
			{title:'request.addRequest.headProductsList.actions'}
		],

		products: [],
		idEdit: false,
		componentSelected:'InfoRequest',
		panel:[
			{title:'Dados do pedido', tag:1, component:'InfoRequest', show:true, icon:'mdi-information-variant-box-outline'},
			{title:'Dados do fornecedor', tag:5,component:'SupplierRequest', show:true, icon:'mdi-human-dolly'},
			{title:'Produtos de pedido', tag:3, component:'ProductRequest', show:true, icon:'mdi-archive-check-outline'},
			{title:'Pagamento', tag:4, component:'PaymentRequest', show:true, icon:'mdi-cash'},
		],
		form:{
			subject:'teste',
			description:'teste'
		}
    }),
    methods:{
		backRouteHome(){
			this.$router.push({ name: 'home' })
		},
		finishRequest(){
			this.sheet = !this.sheet
			this.backRouteList()
		},
		testeRequest(){
			const produtos = localStorage.getItem('apiData');
            if (produtos) {
                this.options = JSON.parse(produtos).map(item => ({
                    
                    text: `${item.Code} -> ${item.Description}` ,
                    value: item,
                }));
				
            }
		},
		areaIsValid(item){
			if(item.component == 'ProductRequest'){
				return item.show && this.$store.state.productsList
			} else {
				return item.show
			}
		},
		saveValid(){
			if(!this.request.info.selectedOption){
				return false
			}
			
			if(!this.request.supplier.selectedOption){
				return false
			}
			
			if(!this.request.payment.selectedOption){
				return false
			}
			
			if(!this.request.products.length > 0){
				return false
			}

			return true
		},

		async sendData(request) {
			const requestItensGetApiSolicited = localStorage.getItem('branchSelect');

			let itens = []
			this.itens = itens
			for (let index of request.products) {
					let prov = {};
					prov.ITEM = `000${this.itens.length + 1}`; // Gera o valor do campo "ITEM" com base na posição
					prov.PRODUTO = index.codeProduct;
					prov.QUANTIDADE = Number(index.amontProduct);
					prov.VALUNIT = Number(index.valueProduct);
					prov.LINPOS = "S";
					prov.AUTDELETA = "N";
					this.itens.push(prov); // Adiciona o objeto ao array this.itens
				}
				let option = 3
				let number = ''
				if(this.request.info.numberRequest){
					option = 4
					number = this.request.info.numberRequest
				}
			try {
				const data = {
					"OPCAO":option,
					"PC":number,
					"FILIAL":this.$store.state.branchSelected.numero,//check
					"FORNECEDOR":request.supplier.selectedOption.numero,//check
					"LOJA":"01",//CHECK
					"CONDFIN":request.payment.selectedOption.Code,//CHECK
					"itens":this.itens
				};
				const response = await axios.post(
					`${this.$store.state.linkBaseApiProtheusHomologation}WSRDPXPEDCOM/`,
					data
				);
			
				// this.backRouteList()
				if(response.data.pedido){
					this.numberRequestCreateTotvs = response.data
					this.overlay = true
					this.numberRequest = response.data
				} else {
					this.numberRequestCreateTotvs = response.data
					this.overlay = true
					this.numberRequest = response.data
				}
			

			} catch (error) {
				console.error('Erro ao fazer a solicitação:', error);
			}
      	},
		valueProps(){
			return this.requestInfo
		},

		createProduct(){//
			this.request.products.push(new RequestProduct);
		},
		insertModelProduct(){
			this.productWorking = new RequestProduct
		},
		showModal() {
			this.isModalVisible = true
		},
		
		saveModal() {
			this.isEdited() ? this.editedRequestProduct() : this.saveNewRequestProduct()
                                                                                                                                                                                                                            
			this.closeModal()
		},
		isEdited(){
			return this.idEdit
		},
		editedRequestProduct(){
			this.request.products[this.newId] = this.productWorking
			this.idEdit = false
		},
		saveNewRequestProduct(){
			this.request.products.push(this.productWorking);
		},

		closeModal() {
			this.isModalVisible = false
		},

		async saveRequest(newRequest){
			this.sheet = true
	
			

			this.changeStatus()
			await this.sendData(newRequest)
			if(!newRequest.info.numberRequest){
				newRequest.info.numberRequest = this.numberRequestCreateTotvs.pedido
			}
			let request = JSON.stringify(newRequest)
			
			if(this.$route.params.id){
				
				db.collection('task').doc(this.$route.params.id).set(JSON.parse(request))
			}else {
				db.collection('task').add(JSON.parse(request))
			}

			db.collection('prerequest').get().then(snapshot => {
                snapshot.forEach(doc => {
                    let objectTask = doc.data();
                    objectTask.id = doc.id;
                    if(this.request.info.preRequestSelected == objectTask.codeStart){
						objectTask.status = 'Aguardando Pré Nota'
						db.collection('prerequest').doc(objectTask.id).set(objectTask)
                    }
                });
            });

			let requestList = this.fetchAllRequest()
			
			if(this.$route.params.id+1){
				requestList[this.$route.params.id] = newRequest
			} else {
				requestList.push(newRequest)
			}
			this.addNewRequest(requestList)
		
		},
		changeStatus(){
		
				this.request.status = 'Aguardando entrega'

			
		},

		showArea(item){
			item.show = true
			return this.newRequestArea(this.request.status, item)
		},

		newRequestArea(status, item){
			if(status == 'newRequest' && item.component == 'ProductRequest' || item.component == 'InfoRequest' ){
				return true
			}
			if(status == 'confirmedRequest' && (item.component == 'ProductRequest' || item.component == 'InfoRequest' || item.component == 'FiscoRequest')){
				return true
			}
			if(status == 'boughtRequest' || status == 'receivedRequest' || status == 'Finalizado'){
				return true
			}
		},

		fetchAllRequest(){
			const requestGet = localStorage.getItem('requestList');
			return requestGet ? JSON.parse(requestGet) : [];
		},
		addNewRequest(requestList){
			localStorage.setItem('status', JSON.stringify(requestList));
		},
		backRouteList(){
			this.$router.push({ name: 'listRequest' })
		},
		
		deleteProduct(newId){
			this.request.products.splice(newId, 1)
		},

		editProduct(newId) {
			this.idEdit = true;
			this.productWorking = this.request.products[newId];
			this.newId = newId;
			this.showModal();
		},	
		showExpansionPainel(item){
			this.componentSelected = item
		},
		configModel(){
			this.request = new ModelRequest(1, this.requestInfo, this.requestSupplier, this.requestFisco, this.requestPayment,)
			this.request.products = []
		},
		// async sendData() {
		// // try {
		// //   const data = {
		// // 		"PEDIDO":[{
		// // 			"FILIAL":"0101",//zc7
		// // 			"FORNECEDOR":"000111",
		// // 			"LOJA":"01",
		// // 			"CONDFIN":"001",
		// // 			"OPERACAO":"1",
		// // 			"NUMERO":"",
		// // 			"EMISSAO":"",
		// // 			"NFISCAL":"",
		// // 			"SERIE":"",
		// // 		"ITENS":[{
		// // 			"ITEM":"001",//zc8
		// // 			"PRODUTO":"RD208009105",
		// // 			"QUANTIDADE":1,
		// // 			"VALUNIT":5
		// // 			},{
		// // 			"ITEM":"002",
		// // 			"PRODUTO":"RD208009106",
		// // 			"QUANTIDADE":1,
		// // 			"VALUNIT":5
		// // 			}]
		// // 		}]
		// //     };

		// const response = await axios.get(
		// 	'http://rodoparanaimplementos120532.protheus.cloudtotvs.com.br:4050/rest/reidoapsdu/consultar/fornecedores/'//,
		// 	//data
		// );
		
		
		// 	// O código de resposta está em response.status
		// 	// Os dados da resposta estão em response.data

		// }
	},
	
	created(){
		//this.sendData()
		
		this.configModel()
		const requestItensGetApiSolicited = localStorage.getItem('branchSelect');
		this.branchSelect = JSON.parse(requestItensGetApiSolicited)
		if(this.$route.params.id){
			let id = this.$route.params.id

			db.collection('task').doc(id).get().then(snapshot =>{
				const task = snapshot.data()
				this.request = task
			})
			
		} else {
			this.request.status = 'newRequest'
			localStorage.setItem('status', JSON.stringify(this.request.status))
		}
	
	},
}
</script>
<style scoped>
v-btn{
	color: green !important;
	background-color: green !important;
}

*{
	font-family: 'Roboto', sans-serif;
}
.rodo-btn{
	text-align: center;
	margin: 0%;
	padding: 0%;
	border-radius: 0px !important;
}
.btnTriangleActived {
  width: 0;
  height: 0;
  border-top:12px solid transparent;
  border-left:12px solid transparent;
  border-right: 12px solid #129cd8;
  border-bottom: 12px solid #129cd8; /* ou a cor desejada para o triângulo */
  position: absolute;
  top: 2px;
  right: -16px;
}
.rodo-btn:hover .btnTriangle {
  width: 0;
  height: 0;
  border-top:12px solid transparent;
  border-left:12px solid transparent;
  border-right: 12px solid #129cd8;
  border-bottom: 12px solid #129cd8; /* ou a cor desejada para o triângulo */
  position: absolute;
  top: 2px;
  right: -16px;
}
*{
    font-family: 'roboto', sans-serif; /* Adicione a fonte 'Roboto' */
    font-weight: 500;
    
}
:root {
  --grayAll: rgb(232, 232, 232) ;
  --blackAll: rgb(0, 0, 0) ;
}

.cardHome {
    background-color: var(--grayAll) !important;
    position: relative;
 
    width: 200px;
    height: 120px;
    border-radius: 5px !important;
}
.cardModal {
    background-color: var(--grayAll) !important;
    position: relative;
    
    width: 200px;
    border-radius: 5px !important;
    border: 2px solid transparent !important;
}
.cardModalTriangle {
    position: absolute;
    bottom: 0px;
    right: 0px;
    display: flex;
    margin-right: 0%;
    border-top: 20px solid transparent;
    border-right: 20px solid #129cd8;
    border-bottom: 20px solid #129cd8;
    border-left: 20px solid transparent;
}

.Rodo{
    
    color: #129cd8;
}
.Timber{

    color: #d8b712;
}
.cardHome:hover {

    border: 2px solid #129cd8 !important;
}
.borderLeftCard{
    position: absolute;
    
    display: flex;
    margin-right: 0%;
    height: 100%;
    border-top: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid transparent;
    border-left: 10px solid transparent;
}
.cardHome:hover .borderLeftCard{
    transition: 0.3s;
    /* border-top: 20px solid #129cd8;
    border-right: 20px solid transparent;
    border-bottom: 20px solid transparent;
    border-left: 20px solid #129cd8; */
    border-top: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid transparent;
    border-left: 10px solid transparent;
}
.boxHome{
    position: absolute;
    bottom: 0;
    right: 0;
    display: flex;
    margin-right: 0%;
    border-top: 20px solid transparent;
    border-right: 20px solid transparent;
    border-bottom: 20px solid transparent;
    border-left: 20px solid transparent;
}
.cardHome:hover .boxHome {
    position: absolute;
    bottom: 0px;
    right: 0px;
    display: flex;
    margin-right: 0%;
    border-top: 20px solid transparent;
    border-right: 20px solid #129cd8;
    border-bottom: 20px solid #129cd8;
    border-left: 20px solid transparent;
}

.cardTextRODOAPP{
    font-family: 'roboto', sans-serif; /* Adicione a fonte 'Roboto' */
    font-weight: 500;
}
</style>
