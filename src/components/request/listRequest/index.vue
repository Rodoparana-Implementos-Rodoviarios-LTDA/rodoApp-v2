<template >
	<div style="background-color: rgb(232, 232, 232) !important; height: 100%;overflow: hidden;">
		<template >
			
			<v-card style="width: 98vw;border-radius: 3px !important;border-radius: 0;" v-if="!isModalVisible && !requestModal && !filterModal"  class=" aurean-margin-list" elevation="0">
				
				<v-row  class="aurean-card-actions ma-1">  
					<v-col md="6" class=" mt-2 " >
						<v-btn @click="backRouteHome()" dark block color="black" class="rodo-btn" elevation="0">
							<v-icon color="red" class="ma-1">mdi-backspace-outline</v-icon>
								VOLTAR
							<div class="btnTriangle" style="margin-top:8px"></div>
						</v-btn>
					</v-col>

					<v-col md="6" class=" mt-2 " >
						<v-btn @click="goRoute()" dark block color="black" class="rodo-btn" elevation="0">
							<v-icon color="green"  class="ma-1">mdi-text-box-plus-outline </v-icon>
                            	CRIAR
                        	<div class="btnTriangle" style="margin-top: 8px;"></div>
						</v-btn>
					</v-col>
				</v-row>

				<v-row  class="aurean-card-actions ma-1">
					<v-col md="3">
						<v-autocomplete v-if="options"
							required
							v-model="optionBranch"
							:items="options"
							label="filial"
							:filter="customFilter"
							@input="onItemSelected"
						></v-autocomplete>
					</v-col>
					
					<v-col md="1" class=" mt-2" >
						<v-btn @click="opemModalFilter()" block dark color="black"  class="rodo-btn" elevation="0">
							<v-icon color="blue" class="ma-1">mdi-filter </v-icon>
								FILTRAR
							<div class="btnTriangle" style="margin-top: 8px;"></div>
						</v-btn>
					</v-col>

					<v-col md="3" class=" mt-2 "  >
						<v-btn v-if="checkValueFilter()" @click="cleanFilter(requestNumber)" block dark color="black" class="rodo-btn" elevation="0">
							<v-icon color="blue"  class="ma-1">mdi-filter-off </v-icon>
								DESATIVAR FILTROS
							<div class="btnTriangle" style="margin-top: 8px;"></div>
						</v-btn>
					</v-col>

					<v-col md="2" class=" mt-2 "  >
						<v-btn v-if="checkValueFilter()" @click="cleanFilter(requestNumber)" block dark color="black" class="rodo-btn" elevation="0">
							<v-icon color="blue"  class="ma-1">mdi-filter-off </v-icon>
								DESATIVAR FILTROS
							<div class="btnTriangle" style="margin-top: 8px;"></div>
						</v-btn>
					</v-col>

					<v-col md="1" class="mt-2 pr-0" >
						<v-btn @click="contMini()" color="black" block :disabled="cont==0" elevation="0" style="border-radius: 0;">
							<v-icon style="color:white">
								mdi-chevron-left
							</v-icon>
						</v-btn>
					</v-col>

					<v-col md="1" class="mt-2 px-0">
						<v-btn  style="color:white;border-radius: 0;" color="black" block elevation="0">
							<span v-if="showCount">{{valueCont()}}</span>
						</v-btn>
					</v-col>
					
					<v-col md="1" class="mt-2 pl-0" >
						<v-btn @click="contPlus()" color="black" v-if="showCount" block :disabled="!next" elevation="0"  style="border-radius: 0;">
							<v-icon style="color:white">
								mdi-chevron-right
							</v-icon>
						</v-btn>
					</v-col>
				</v-row>
			</v-card>

			<ModalBranch
				:show="isModalVisible"

				@close="closeModal"
			/>

			<ModalRequest 
				:show="requestModal"
				:info="itemInfo"

				@close="closeModal"
			/>
			<modalFilter
				:show="filterModal"
				:info="itemInfoFilter"

				@close="closeModal"
				@filterSend="filterSend"
			/>
			
			<v-card style="height: 68vh; width: 98vw;margin: 14px;margin-top: 0px;border-radius: 0%!important;" v-if="!isModalVisible && !requestModal && tasks.length > 0 && !filterModal"  class="overflow-x-auto overflow-x-auto  cardModal" elevation="0">	
				<v-simple-table style="border-radius: 0px !important; "  v-if="showCount">
					<template v-slot:default>
						<thead >
							<toolbar :toobarList="toolbartTitles"/>
						</thead>
						
						<tbody>
							<tr v-if="allDataRequestList" style="border-left: 1px black ;" v-for="(item, index) in allDataRequestList" >
								<td style="border-left: 1px;">
									{{ item.numero }}
								</td>

					
								<td v-if="item.info" >
									<span v-if="isMultipleNote()">
										<v-btn v-if="isMultipleNote()" @click="verifyDataTbn" icon>
											<ButtonTooltip 
												corzinha="blue" 
												:icon="$t('request.icon.notes')"
												:title="$t('request.iconTooltip.notes')"   
											/>
										</v-btn>
									</span>

									<span v-if="!isMultipleNote()">
										<v-btn  @click="verifyDataTbn" icon>
											<ButtonTooltip
												corzinha="red"
												:icon="$t('request.icon.onlyNote')"
												:title="$t('request.iconTooltip.onlyNote')"
											/>
										</v-btn>
									</span>
								</td>

								<td v-if="item.sinc">{{item.sinc.supplier.selectedOption.fornecedor}}</td>
				
								<td v-if="item.sinc">
									
								
									
									<v-tooltip style="margin: 0;padding: 0;" bottom color="green">
										<template block v-slot:activator="{ on, attrs }">
											<v-alert
												v-bind="attrs"
												v-on="on"

												border="left"
												colored-border
												color="success"
												elevation="0"
												class="ma-0 pa-2"
												style=" background-color: rgb(212, 255, 213);border-radius: 0%;"
											>
											&ensp; {{ item.sinc.status }}
											</v-alert>
										</template>

										<v-alert style="margin: 0;padding: 0;" color="green">{{statusLegend(item.sinc.status)}}</v-alert>
									</v-tooltip>
								</td>
								
								<td v-if="!item.sinc">Não sincronizado</td>
								<td v-if="!item.sinc">Não sincronizado</td>
							
								
								<td class="text-center">
									<v-btn @click="verifyDataTbn(item.numero)" icon >
										<ButtonTooltip
											corzinha="blue"
											
											:icon="$t('request.icon.infoRequest')"
											:title="$t('request.iconTooltip.infoRequest')"
										/>
									</v-btn>

									<v-btn @click="editRequest(item.numero)" icon >
										<ButtonTooltip
											corzinha="blue"
											:icon="$t('request.icon.editRequest')"
											:title="$t('request.iconTooltip.editRequest')"
										/>
									</v-btn>
									
								</td>
							</tr>
						</tbody>
					</template>
				</v-simple-table>
			</v-card>
		</template>

		
	</div>
</template>

<script>
import { db } from '../../../firebaseDb'

import ButtonTooltip from '../../tools/buttonIconTooltip'
import Toolbar from '../../tools/toolbar'
import ModalBranch from './modalSelectBranch.vue'
import ModalRequest from './modalSelectRequest.vue'
import modalFilter from './modalFilter.vue'

export default {
	name: 'Home',

	components:{
		Toolbar,
		ButtonTooltip,
		ModalBranch,
		ModalRequest,
		modalFilter
	},

	

	data: () => ({
		isModalVisible:true,
		toolbartTitles:[
			{title:'request.table.numberRequest'},
			{title:'request.table.supplier'},
			{title:'request.table.statusShip'},
			{title:'request.table.actions'}
		],
		cont:0,
		filterModal:false,
		allDataRequestList:null,
		branchSelect: null,
		options:[],
		requestNumber:'',
		dataStart:'',
		dataEnd:'',
        optionBranch:null,
        option:null,
		filterOn:false,
		permission:null,
		showCount:true,
		user:{
			name:'nome do uuario',
			função:'cordenador'
		},
		itemInfoFilter:{
			dataStart:'',
			dataEnd:'',
			numRequest:'',
			vendor:{}
		},
		tasks:null,
		statusData:{},
		statusList:{
			newRequest:{name:'newRequest',color:'blue', icon:'mdi-account-arrow-left'},
			confirmRequest:{name:'confirmRequest',color:'orange',icon:'mdi-account-arrow-left'},
			salleRequest:{name:'salleRequest',color:'green',icon:'mdi-account-arrow-left'},
			stokeRequest:{name:'stokeRequest',color:'purple',icon:'mdi-account-arrow-left'},
			paymentRequest:{name:'paymentRequest',color:'yeallow',icon:'mdi-account-arrow-left'},
		},
		contActive:true,
		next:null,
		requestModal:false,
		format_start_data:'',
		format_end_data:'',
		loading:false,
		itemInfo:null,
		valid:false
	}),
	mounted() {
        this.loadOptionsFromLocalStorage(); 
    },
    methods:{
		filterSend(){
			this.dataStart = this.itemInfoFilter.dataStart
			this.format_start_data = this.itemInfoFilter.dataStart 

			this.convertData()
			this.requestNumber = this.itemInfoFilter.numRequest
			this.closeFilterModal()
			this.dataBTN(this.itemInfoFilter.numRequest)
		},
		checkValueFilter(){
			if(this.itemInfoFilter.dataStart||this.itemInfoFilter.dataEnd||this.itemInfoFilter.numRequest){
				this.filterOn = true
			}
				
			
		},
		statusLegend(statusData){
			let status =''
			if(statusData == 'Aguardando Clasificação De Nota'){
				status = 'Aguardando setor responsavel classificar a nota'
			}
			if(statusData == 'Aguardando entrega'){
				status = 'Aguardando entrega de produtos'
			}
			if(statusData == 'Finalizado'){
				status = 'Nenhum outro status esta pendente, pedido finalizado com sucesso'
			}
			return status
		},
		backRouteHome(){
			this.allDataRequestList = null
			this.$router.push({ name: 'homerequest' })
		},
		loadData(){
				if(!value.check.bought.read){
					this.$router.push({ name: 'home' })
					
				}
		},
		valueCont(){
			return this.cont + 1
		},
		contPlus(){
			if(this.contActive){
				this.cont++
				this.showCount = false
				this.takeAllRequest()
			}
		},
		convertData(){
			let data_format_START = this.dataStart.replace("-", "")
			data_format_START = data_format_START.replace("-", "")
			
			let data_format_END = this.dataEnd.replace("-", "")
			data_format_END = data_format_END.replace("-", "")

			this.format_start_data = data_format_START,
			this.format_end_data = data_format_END
		},
		contMini(){
			this.cont--
			this.showCount = false
			this.takeAllRequest()
		},
        customFilter(item, queryText, itemText) {
            const normalizedQuery = queryText.toLowerCase()
            const normalizedItemText = itemText.toLowerCase()
            return normalizedItemText.includes(normalizedQuery) 
        },
        onItemSelected(){
            this.branchSelect = this.optionBranch

			this.$store.dispatch('selectedBranch',this.optionBranch)
			this.takeAllRequest()
			this.cont = 0
        },
        async loadOptionsFromLocalStorage() {
            const requestItensGetApiSolicited = localStorage.getItem('branch');
          
			let API_URL = `${this.$store.state.linkBaseApiProtheusHomologation}reidoapsdu/consultar/filiais/`

			await axios.get(API_URL)
				.then(response => {
				
				if (response.status !== 200 ) {
					console.error('Erro na solicitação:', response.status);
					throw new Error('Não foi possível acessar a API da TOTVS');
				}

				const items = response.data;
					
				if(items){
					this.createOptions(items)
				}

				localStorage.setItem('branch', JSON.stringify(items.data));
			})
			
			.catch(error => {
				console.error('Erro:', error);
			});
        },
		createOptions(items){
			this.options = items.map(item => ({
				text: `${item.numero.trim()} -> ${item.filial.trim()}` ,
				value: item,
			}));
		},
		dataBTN(requestNumber){
			requestNumber ? this.takeAllRequest(requestNumber):this.takeAllRequest()	
			this.cont=0
		},
		cleanFilter(requestNumber){
			this.checkValueFilter()
			this.itemInfoFilter.dataStart = ''
			this.itemInfoFilter.dataEnd = ''
			this.format_start_data = ''
			this.format_end_data = ''
			this.requestNumber = ''
			requestNumber = ''
			 this.takeAllRequest(requestNumber)
			this.cont=0
		},
		goRoute(){
			this.allDataRequestList = null
			this.$router.push({ name: 'create' })
		},

		isMultipleNote(){
			return true
		},
		checkRequest(numberRequest){

			this.tasks.some(objectTask => {
				if (objectTask.info.numberRequest === numberRequest) {
					const taskId =  objectTask.id;
					return taskId;
				}
				return false;
			});
		},
		verifyDataTbn(numberRequest){
			axios.get(`${this.$store.state.linkBaseApiProtheusHomologation}reidoapsdu/consultar/pedido?codeEdit=${numberRequest}&branchNumber=${this.optionBranch.numero}`)
			.then(response => {
				if (response.status !== 200 ) {
					console.error('Erro na solicitação:', response.status);
					throw new Error('Não foi possível acessar a API da TOTVS');
				}
					this.itemInfo = response
			})

			this.requestModal = true
		},

		editRequest(ID_REQUEST){//requestEdit, index
			this.allDataRequestList = null	
			let isValid = false
			this.tasks.some(objectTask => {
				if (objectTask.info.numberRequest === ID_REQUEST) {
					
					// Aqui, você pode acessar o taskId do objeto que corresponde ao númeroRequest
					const taskId =  objectTask.id;
					this.$router.push({ name: 'createdWithId',params: { id: taskId } });
					isValid = true
					return true;
				}
			});

			if(!isValid){
				window.alert('Pedido não vinculado a protheus, (OPÇÃO DE VINCULAR EM BREVE)')
			}
		},

		changeStatus(text){
			this.statusData = text
		},

		async takeValues(){
			this.tasks = [];
			db.collection('task').get().then(snapshot => {
				snapshot.forEach(doc =>{
					let objectTask = doc.data();
					//objectTask.info.numberRequest
					objectTask.id = doc.id
					this.tasks.push(objectTask)
				})
				this.takeAllRequest()
				this.valid = true
			})
		
		},
		showModal() {
			this.isModalVisible = true
		},
		opemModalFilter(){
			this.filterModal = true
		},
		closeFilterModal(){
			const requestItensGetApiSolicited = localStorage.getItem('branchSelect');
			this.branchSelect = JSON.parse(requestItensGetApiSolicited)
			this.optionBranch = JSON.parse(requestItensGetApiSolicited)
			this.isModalVisible = false 
			this.requestModal = false
			this.filterModal = false
		},
		closeModal() {
			const requestItensGetApiSolicited = localStorage.getItem('branchSelect');
			this.branchSelect = JSON.parse(requestItensGetApiSolicited)
			this.optionBranch = JSON.parse(requestItensGetApiSolicited)
			this.isModalVisible = false 
			this.requestModal = false
			this.filterModal = false
			this.takeAllRequest()
			this.takeValues()
		},
		brancNumber(){
			return this.optionBranch && this.optionBranch.numero ? `branchNumber=${this.optionBranch.numero}&`:''
		},
		takeAllRequest(requestNumber){
			if( !requestNumber ) requestNumber = ''
			let filterVendor = ''
			if(this.itemInfoFilter.vendor && this.itemInfoFilter.vendor.loja && this.itemInfoFilter.vendor.codigo){
			filterVendor = `&lojaForn=${this.itemInfoFilter.vendor.loja}&codFonr=${this.itemInfoFilter.vendor.codigo}`
			}
			this.contActive = false
			let API_URL = `${this.$store.state.linkBaseApiProtheusHomologation}reidoapsdu/consultar/pedidos/?pageSelect=${this.cont*30}&dataStart=${this.format_start_data}&dataFinaly=${this.format_end_data}&${this.brancNumber()}codeEdit=${requestNumber}${filterVendor}`//codeEdit=006267

			axios.get(API_URL)
			.then(response => {
			if (response.status !== 200 ) {
				console.error('Erro na solicitação:', response.status);
				throw new Error('Não foi possível acessar a API da TOTVS');
			}
				axios.get(`${this.$store.state.linkBaseApiProtheusHomologation}reidoapsdu/consultar/pedidos/?pageSelect=${(this.cont*30)+1}&dataStart=${this.format_start_data}&dataFinaly=${this.format_end_data}&${this.brancNumber()}codeEdit=${requestNumber}`)
				.then(response => {
					
					if (response.status !== 200 ) {
						throw new Error('Não foi possível acessar a API da TOTVS');
					}
					this.next = false
					const items = response.data;
					this.next = items.length > 0 &&  items.length >= 30 ? this.next = true : this.next = false
					
					this.contActive = true
				})
			
				const items = response.data;
				this.allDataRequestList = items
				if(!items.length || !items.length > 0){
					
					window.alert('n foi possivel achar nenhum registro')
				}

				for(let item of this.allDataRequestList){
		
					this.tasks.some(objectTask => {
	
					if (objectTask.info.numberRequest == item.numero) {
						// Aqui, você pode acessar o taskId do objeto que corresponde ao númeroRequest
						item.sinc = objectTask
														//selectedOption.numero
													//supplier.cnpj
						this.requestValid(item.sinc.info.selectedOption.numero, item.sinc.supplier.cnpj,item.sinc.info.numberRequest)		
					}
				});
				}
				this.showCount = true
			})
			.catch(error => {
				console.error('Erro:', error);
			});
		},
		requestValid(branch, cnpj, numberRequest){
			let API_URL = `${this.$store.state.linkBaseApiProtheusHomologation}reidoapsdu/consultar/pedido/?branchNumber=${branch}&cnpjVendor=${cnpj.trim()}`

			axios.get(API_URL,{
				method: 'GET',
				headers: {
					'cpfCnpjForn': cnpj
				}
			})
			.then(response => {
		
				if (response.status !== 200 ) {
					console.error('Erro na solicitação:', response.status);
					throw new Error('Não foi possível acessar a API da TOTVS');
				}

				const items = response;
			
			})

			.catch(error => {
				console.error('Erro:', error);
			});
		}
	},
	async created(){

			this.takeAllRequest()
			await this.takeValues()
		

		
	}
}
</script>
<style scoped>

*{
	font-family: 'Roboto', sans-serif;
}
.subTooltip{
	opacity: 0;
	display: none;
}
.alertArea:hover .subTooltip{
	display: block;
}
.btnTriangle {
  width: 0;
  height: 0;
  border-top:12px solid transparent;
  border-left:12px solid transparent;
  border-right:12px solid transparent;
  border-bottom:12px solid transparent;
  position: absolute;
  top: 2px;
  right: -16px;
}
.rodo-btn{
	border-radius: 0px;
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