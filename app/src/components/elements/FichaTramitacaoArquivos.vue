<template>
	<div class="arquivos">
		<p>{{ title }}</p>
		<section class="arquivos__group">
			<p 
				:key="index"
				v-for="(arquivo, index) in arquivos"
				class="tramit_link">
				<a 
					class="tramit_link"
					:href="arquivo.arquivo_url"
					:type="getExtension(arquivo.arquivo_url)"
					:title="setFilename(arquivo)"
					target="_blank">
					{{ setFilename(arquivo) }}
				</a>
			</p>
		</section>
	</div>
</template>

<script>
export default {
		name: 'FichaTramitacaoArquivos',
		props: {
			title: {
				type: String,
				required: true
			},
			arquivos: {
				type: Array,
				required: true
			}	
		},
	methods: {
		getExtension(filename) {
			if (!filename) return 'url'
			let extensao = filename.substring(filename.lastIndexOf('.')+1, filename.length).replace('/','')
			if (extensao.length > 4 || extensao.length <= 2) { return 'url' }
			if (extensao.length > 2 || extensao.length <= 4) { return extensao }
		},
		setFilename ({ data, documento, evento }) {
			return `${
				data && data !== ''
					? data
					: ''
				}${
					data && evento ? ' - ' : ''
				}${
				evento && evento !== '' && evento !== '0'
					? evento 
					: ''
				}${
					documento && evento && evento !== '0' ? ' | ' : ''
				}
				${
					documento ? documento : ''
				}`
		}
	},
}
</script>

<style lang="scss" scoped>
@import '../../scss/variables';

.arquivos {
	&__group {
		margin-bottom: 1rem;
	};
	&::before {
		content: attr(nome);
		display: block;
		line-height: 1.5em;
	}

	a.tramit_link {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		display: block;

		&::before {
			content: attr(type);
			line-height: 14px;
			text-transform: uppercase;
			font-size: 10px;
			border-radius: 2px;
			border: 1px solid #bcbcbc;
			color: #bcbcbc;
			min-width: 40px;
			text-align: center;
			transition: all .1s;
			margin: 0 4px 0 0;
			display: inline-block;
			box-sizing: border-box;
			vertical-align: text-top;
		}

		&:hover::before {
			background-color: $vermelho-gestao;
			border-color: $vermelho-gestao;
			color: #F8F8F8;
		}
	}

	p {
		margin: 0;
		font-size: 13px;
		line-height: 1.6;
		color: #333333;

		span {
			font-weight: 700;
		}
	}

	.linkConsulta {
		display: flex;
		width: 100%;
		background: #008015;
		color: #fff;
		padding: 4px 8px;
		font-family: inherit;
		margin: 12px 0;
		border-radius: 2px;
		border-width: 0;
		text-transform: uppercase;
		text-decoration: none;
		transition: color 0.2s;
		box-sizing: border-box;
		justify-content: center;
		align-items: center;

		i {
			font-size: 16px;
			margin-left: 4px;
		}
	}

	.linkConsulta:hover {
		color: rgba(255, 255, 255, 0.25);
		cursor: pointer;
	}

	p .tramit_link {
		margin: 0;
		padding: 0;
		height: 24px;	
	}	
}
</style>