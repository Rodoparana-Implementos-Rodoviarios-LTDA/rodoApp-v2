<template>
	<div class="modal" v-if="show">
		<div class="modal-content">
			<v-row class="mx-1">
				<v-col >
					<h2>INFORMAÇÕES DO PEDIDO: {{info.data[0].numero}}</h2>
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
                    {{ option }}
				</v-col>
			</v-row>
			
            <v-row >
				<v-simple-table>
					<template v-slot:default>
						<thead>
							<tr>
								<th class="text-left">
									NUMERO
								</th>
								<th class="text-left">
									NCM
								</th>
								<th class="text-left">
									DESCRIÇÃO
								</th>
								<th class="text-left">
									QUANTIDADE
								</th>
								<th class="text-left">
									VALOR
								</th>
								<th class="text-left">
									VALOR TOTAL
								</th>
							</tr>
						</thead>

						<tbody>
							<tr
								v-for="item in info.data"
								:key="item.name"
							>
								<td>{{ item.numero }}</td>
								<td>{{ item.ncm }}</td>
								<td>{{ item.descricao }}</td>
								<td>{{ item.quantidade }}</td>
								<td>R$ {{formatarValor(parseFloat(item.preco)) }}</td>
								<td>R$ {{formatarValor(parseFloat( item.total )) }}</td>
							</tr>
						</tbody>
					</template>
				</v-simple-table>
            </v-row>
		</div>
	</div>
</template>

<script>

export default {
	props: {
		show: Boolean,
		info: Array
	},
    data: () => ({
        options:null,
        optionBranch:null,
        option:null
		
    }),   
    methods:{
      
		closeModal() {
			this.$emit('close');
		},
		formatarValor(valor) {

      		// Formata o valor para duas casas decimais e substitui o ponto por vírgula
			return valor.toFixed(2).replace('.', ',');
		}
	},
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
