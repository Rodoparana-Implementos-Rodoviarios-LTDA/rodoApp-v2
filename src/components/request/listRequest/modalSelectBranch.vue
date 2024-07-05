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
                    {{ option }}
				</v-col>
			</v-row>
			
            <v-row class="mx-1">
                <v-col
                    md="3"
                >
                <!-- select -->
                    <div>
						<div 	v-if="haveOptions()">
							<v-autocomplete  
								required
								v-model="optionBranch"
								:items="options"
								label="Selecione uma filial"
								:filter="customFilter"
								@input="onItemSelected"
							></v-autocomplete>
						</div>
						<v-alert v-if="!haveOptions()"
                        color="blue"
                        outlined
                        icon="mdi-clock-fast"
                        border="left"
                        class="text-subtitle-2 text-center"
                    >CARREGANDO...</v-alert>
                    </div>
                
                </v-col>
            </v-row>
			
		</div>
	</div>
</template>

<script>

export default {
	props: {
		show: Boolean,
		
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
        customFilter(item, queryText, itemText) {
            const normalizedQuery = queryText.toLowerCase()
            const normalizedItemText = itemText.toLowerCase()
            return normalizedItemText.includes(normalizedQuery) 
        },
        onItemSelected(){
            this.option = this.optionBranch
            localStorage.setItem('branchSelect', JSON.stringify(this.option));

			this.$store.dispatch('selectedBranch',this.option)
            this.closeModal()
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
		closeModal() {
			this.$emit('close');
		},
		saveModal() {
			this.$emit('save');
		},
		isValid(){
			let item =  this.$store.state.branchsList
			 if(item){
				this.loadOptionsFromLocalStorage(item)
				return true
			}
			return false
		},
		haveOptions(){
			let item =  this.$store.state.branchsList
			 if(item){
				this.loadOptionsFromLocalStorage(item)
				return true
			}
			return false
		}
		
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
