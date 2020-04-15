<template>
	<div class="arquivos" :nome="nomeSecao">
		<section>
			<p 
                :key="index"
                v-for="(arquivo, index) in arquivos"
                class="tramit_link"
            >
				<a 
					class="tramit_link"
					:href="`#`"
					:type="ext(arquivo.url)"
					:title="arquivo.nome"
					target="_blank">
					{{ arquivo.nome }}
				</a>
			</p>
		</section>
	</div>
</template>

<script>
export default {
    name: 'Hiperlinks',
    props: {
        nomeSecao: { type: String, required: true },
        arquivos: { type: Array, required: true }
    },
	methods: {
		ext(filename) {
			let extensao = filename.substring(filename.lastIndexOf('.')+1, filename.length).replace('/','');
			if (extensao.length > 4 || extensao.length <= 2) { return 'url' };
			if (extensao.length > 2 || extensao.length <= 4) { return extensao };
		},
	},
}
</script>

<style lang="scss" scoped>
@import '../../scss/variables';

.arquivos {

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