<template>
	<div class="modal" v-if="show">
		<div class="modal-content cardModal">
			<v-row class="mx-1">
				<v-col md="11" class="cardTextRODOAPP">
					<h2>SELECIONE A FILIAL:</h2>
				</v-col>

				<v-col md="1">
					<v-tooltip color="red" style="border-radius: 0% !important;" top>
						<template v-slot:activator="{ on, attrs }">
							<v-btn color="red" icon v-bind="attrs" v-on="on" @click="closeModal" >
								<v-icon>
									mdi-close
								</v-icon>
							</v-btn>
						</template>

						<span>fechar</span>
					</v-tooltip>
				</v-col>
			</v-row>
			<v-row  class="aurean-card-actions ma-1">
						<v-autocomplete
							:items="cnpjOptions"

							label="Selecione um produto"
							value="teste"
							v-model="info.vendor"
							item-value="value"
							item-text="text"
						>
				
							<template v-slot:item="data">
								<template>
									
									<v-list-item-content>
										
										<v-list-item-title v-html="data.item.text"> </v-list-item-title>
									</v-list-item-content>
								</template>
							</template>
                        </v-autocomplete>
					<v-col
          class="d-flex"
          cols="12"
          sm="6"
        >
        </v-col>
					<v-col md="4" >
						<v-text-field
							type="date"
							v-model="info.dataStart"
							label="data inicial de busca"
							@input="convertData()"
						></v-text-field>
					</v-col>

					<v-col md="4" >
						<v-text-field
							type="date"
							v-model="info.dataEnd"
							label="data final de busca"
							@input="convertData()"
						></v-text-field>
					</v-col>

					<v-col md="4" >
						<v-text-field
							v-model="info.numRequest"
							label="Número do pedido"
						></v-text-field>
					</v-col>
				</v-row>
			<v-row  class="aurean-card-actions ma-1">
				<v-col md="2" class=" mt-2" >
					<v-btn @click="filterData()" dark color="black"  class="rodo-btn mr-2">
						<div class="btnTriangle"></div>
						
						Aplicar filtro
					</v-btn>
				</v-col>

				<v-col md="2" class=" mt-2 " >
					<v-btn @click="cleanFilter(requestNumber)" dark color="black" class="rodo-btn">
						<div class="btnTriangle"></div>
						
						limpar filtros
					</v-btn>
				</v-col>
			</v-row>
		</div>
	</div>
</template>

<script>

export default {
	props: {
		show: Boolean,
		info: Object,
		dataStart: String,
		dataEnd: String,
	},
    data: () => ({
        options:null,
        optionBranch:null,
        option:null
    }
    ),   
    mounted() {
        this.loadOptionsFromLocalStorage(); 
    },
    methods:{
		cleanFilter(){
			this.info = {
				dataStart: '',
				dataEnd: '',
				numRequest: '',
			}
			window.alert('Filtros limpos')
		},
        loadOptionsFromLocalStorage(item) {
		
			if(item){
				if(!this.options){
					this.options = item.map(item => ({
						text: `${item.numero} -> ${item.filial}` ,
						value: item,
					}));
				}
			}
		
        },
		convertData(){
			let data_format_START = this.dataStart.replace("-", "")
			data_format_START = data_format_START.replace("-", "")
			
			let data_format_END = this.dataEnd.replace("-", "")
			data_format_END = data_format_END.replace("-", "")

			this.info.dataStart = data_format_START,
			this.info.dataEnd = data_format_END
		},
		onItemSelected(){
			this.option = 'teste'
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
		closeModal() {
			this.$emit('close');
		},
		filterData() {
			this.$emit('filterSend');
		},
	},
	created(){
		this.loadOptionsFromLocalStorageCnpj()
	}
};
</script>

<style scoped>
	.modal {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.8);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.modal-content {
		width: 80%;
		backdrop-filter: blur(1px);
		padding: 20px;
		border-radius: 8px;
		box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
	}
</style>
