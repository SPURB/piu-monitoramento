<template>
	<div class="bloco" :class="attrClass(title)">
		<div class="etapa">{{ title }}</div>
		<div :key="`etapas-${index}`" v-for="(etapa, index) in etapas">

			<div v-if="etapa.marcadorTitle !== 'SUSPENSO'">
				<div class="marcadorEtapa">{{ etapa.marcadorNumber }}</div>
				<span>{{ etapa.marcadorTitle }}</span>
			</div>
			<div v-else><span>&nbsp;</span></div>
			
			<div class="publicos">
					<section
					:key="`item-${etapa.marcadorTitle}-${index}`"
					v-for="(item, index) in etapa.publico"
					>
							<a
									href="#"
									@click="setProjectId(item.id)"
									:class="consultaAbertaClass(item.consultaAberta)"
							>
									{{ item.nome }}
							</a>
					</section>
			</div>

			<div class="privados">
				<section
					:key="`item-${etapa.marcadorTitle}-${index}`"
					v-for="(item, index) in etapa.privado"
				>
					<a 
				href="#"
				@click="setProjectId(item.id)"
				:class="consultaAbertaClass(etapa.consultaAberta)"
			>
				{{ item.nome }}
			</a>
				</section>
			</div>
			
		</div>
	</div>
</template>

<script>
export default {
	name: 'etapa',
		data () {
		return {
			clickedId: undefined
		}
	},
		props: {
			title: {
				type: String,
				required: true
			},
			etapas: {
					type: Array,
					required: true
			}
		},
		methods: {
			setProjectId(id){ 
				this.clickedId = id;
				this.$emit('clicked', id)
			},
			consultaAbertaClass(status) {
				return status ? 'consultaAberta' : ''
			},
			attrClass (value) {
					switch (value) {
							case 'Em proposição':
									return 'proposicao'
									break;
							case 'Em andamento':
									return 'andamento'
									break
							case 'Em implantação':
									return 'implantacao'
									break
							case 'Suspenso':
									return 'suspenso'
									break
							case 'Arquivado':
									return 'arquivado'
									break
							default:
									break;
					}
			}
		},
}
</script>

<style lang="scss" scoped>
@import '../../scss/variables';
.bloco {
	border-radius: 2px;
	transition: background-color 0.1s ease-out;
	:hover {
		background-color: #f8f8f8;
	}
	div {
		display: flex;
		justify-content: flex-start;
		border-left: 0px;
		padding: 4px 0;
		div {
			display: inline-block;
			vertical-align: baseline;
			background-color: transparent;
			width: calc(100% / 3);
			line-height: 16px;
			div.marcadorEtapa {
				display: inline-block;
				border-radius: 2px;
				margin-right: 4px;
				height: 16px;
				width: 24px;
				text-align: center;
				color: #ffffff;
				font-weight: 700;
			}
			a {
				display: block;
				color: #000000;
				text-decoration: none;
				font-weight: 700;
				line-height: 24px;
				padding: 6px 8px;
				border-radius: 2px;
				transition: all 150ms;
				margin-bottom: 8px;
			}
			a:last-child {
				margin-bottom: 0;
			}

			a:hover {
				color: #ffffff;
			}

			a.consultaAberta::after {
				content: "Em consulta";
				font-size: 10px;
				text-transform: uppercase;
				color: #ffffff;
				font-weight: 500;
				background-color: $verde;
				padding: 4px 5px;
				border-radius: 2px;
				vertical-align: top;
				white-space: nowrap;
				margin-left: 4px;
			}
		}
		div:first-child span {
			font-size: 11px;
			vertical-align: baseline;
			text-transform: uppercase;
		}
	}  

	div.etapa {
		color: #ffffff;
		border-radius: 2px;
		line-height: 24px;
		padding: 0 8px;
		margin-top: 16px;
	}
}

div.proposicao {
	border-left-color: $proposicao;
	div.etapa {
		background-color: $proposicao;
	}
	div.etapa div:hover {
		background-color: $proposicao;
	}
	div a:hover {
		background-color: $proposicao;
	}
	div div div.marcadorEtapa {
		background-color: $proposicao;
	}
}

div.andamento {
	border-left-color: $andamento;
	div.etapa {
		background-color: $andamento;
	}
	div.etapa div:hover {
		background-color: $andamento;
	}
	div a:hover {
		background-color: $andamento;
	}
	div div div.marcadorEtapa {
		background-color: $andamento;
	}
}

div.implantacao {
	border-left-color: $implantacao;
	div.etapa {
		background-color: $implantacao;
	}
	div.etapa div:hover {
		background-color: $implantacao;
	}
	div a:hover {
		background-color: $implantacao;
	}
	div div div.marcadorEtapa {
		background-color: $implantacao;
	}
}

div.suspenso {
	border-left-color: $suspenso;
	div.etapa {
		background-color: $suspenso;
	}
	div.etapa div:hover {
		background-color: $suspenso;
	}
	div a:hover {
		background-color: $suspenso;
	}
	div div div.marcadorEtapa {
		background-color: $suspenso;
	}
}

div.arquivado {
	box-sizing: border-box;
	border-left-color: $arquivado;
	div.etapa {
		background-color: transparent;
		border: 1px solid $arquivado;
		color: $arquivado;
	}
	div.etapa div:hover {
		background-color: transparent;
		border: 1px solid $arquivado;
		color: $arquivado;
	}
	div a {
		border: 1px solid transparent !important;
	}
	div a:hover {
		background-color: transparent;
		border-color: $arquivado !important;
		color: $arquivado !important;
	}
}

div.prospeccao {
	border-left-color: $prospeccao;
	margin: -1em 0 2em 0;
	div:nth-child(2) {
		display: block;
	}
	div.etapa {
		background-color: transparent;
		border-radius: 0;
		color: $prospeccao;
		padding: 0;
		margin-top: 2em;
	}
	div:hover,
	div span:hover,
	a:hover {
		background-color: transparent;
	}
	div span.titulo {
		color: #bdbdbd;
		margin-right: 8px;
		&:after {
			content: "";
		}
	}
	div span:not(.titulo) {
		display: inline-flex;
		align-items: center;
		white-space: nowrap;
		margin-right: 20px;
	}
	div span:not(.titulo):after {
		content: "launch";
		font-family: "Material Icons";
		font-size: 16px;
		color: #444444;
		margin-left: 4px;
	}
	div span a {
		color: #444444;
	}
}

@media (max-width: 720px) {
	.bloco {
		border-radius: 2px !important;
		.thead { display: none; };
		div {
			flex-direction: column;
			div {
				display: inline-flex !important;
				flex-direction: row;
				align-items: center;
				width: 100% !important;
				padding: 0 !important;
				margin: 0 !important;
				flex-wrap: wrap;
				div.marcadorEtapa {
					display: inline-flex !important;
					justify-content: center;
					align-items: center;
					width: 24px !important;
					height: 24px !important;
					+ span {
						font-size: 12px;
						margin-left: 4px;
					};
				};
				a {
					display: block !important;
					font-size: 15px;
					border-width: 1px;
					border-style: solid;
					line-height: 20px !important;
					margin: 4px 4px 0 0 !important;
					white-space: nowrap;
				}
			};
		};
	}

	div.bloco > div:not(.etapa) {
		margin-bottom: 8px;
	}

	.proposicao {
		div div a {
			border-color: $proposicao;
		}
	}
	.andamento {
		div div a {
			border-color: $andamento;
		}
	}
	.implantacao {
		div div a {
			border-color: $implantacao;
		}
	}
	.suspenso {
		div div a {
			border-color: $suspenso;
		}
	}
	.arquivado {
		div div a {
			border-color: $arquivado !important;
		}
	}
	.prospeccao {
		border-left-width: 0px;
	}
}
</style>