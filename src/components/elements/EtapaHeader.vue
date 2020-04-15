<template>
  <div class="bloco">
	    <div class="thead">
			<div>
				Etapas
			</div>
			<div>
				PIUs de iniciativa pública
			</div>
			<div>
				PIUs de iniciativa privada
			</div>
		</div>
	</div>	
</template>

<script>
export default {
    name: 'etapa-head'
}
</script>

<style lang="scss" scoped>
.bloco {
    border-radius: 2px;
    transition: background-color 0.1s ease-out;
    border-left: 0px;
    padding: 4px 0;
    .thead {
        height: 20px;
        font-size: 13px;
        color: #999999;
        display: flex;
        justify-content: space-between;
        text-transform: none;
        margin-bottom: -16px;
        div:nth-child(2), div:nth-child(3) {
            margin-left: 24px;
        }
        &:hover, div:hover {
            background-color: transparent;
        }
    }
}
@media (max-width: 720px) {
	.bloco {
		border-radius: 2px !important;
        .thead { display: none; };
    }
}
</style>