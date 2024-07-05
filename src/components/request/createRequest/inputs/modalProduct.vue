<template>
	<div class="modal" v-if="show">
		<p class="text-h5 text--primary">
			DADOS DO PEDIDO
		</p>
		<div class="modal-content">
			<v-row class="mx-1">
				<v-col md="11">
					<h2>Novo produto</h2>
				</v-col>

				<v-col md="1">
					<v-tooltip color="red" top>
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

			<ProductRequest @save="saveModal" :product="product"/>
		</div>
	</div>
</template>

<script>
import ProductRequest from './productRequest.vue';

export default {
	components: {
		ProductRequest,
	},

	props: {
		show: Boolean,
		title: String,
		content: String,
		cep:String,
		product:Object
	},

	methods: {
		closeModal() {
			this.$emit('close');
		},

		saveModal() {
			this.$emit('save');
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
		background-color: rgba(255, 255, 255);
		backdrop-filter: blur(1px);
		padding: 20px;
		border-radius: 8px;
		box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
	}
</style>
