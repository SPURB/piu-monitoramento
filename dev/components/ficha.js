let ficha = {
	name:'ficha',
	data (){
		show = false
		return {
			data: monitoramento
		}
	},
	template: `

	<div id="ficha">
		<div>
			<select>
				<option font="arial">nome</option>
				<option>nome</option>
				<option>nome</option>
				<option>nome</option>
				<option>nome</option>
				<option>nome</option>
				<option>nome</option>
			</select>
		</div>

		<div class="container">
			<div class="colId">
				<div class="indicador">indica</div>
				<div class="id">
					<ul>
						<li>
							Natureza da proposta
							-natureza-
						</li>
						<li>
							Proponente
							-proponente-
						</li>
						<li>
							Origem
							-origem-
						</li>
						<li>
							Registro administrativo
							-registro-
						</li>
						<li>Documentos</li>
					</ul>

				</div>
			</div>

			<div class="aspectos">
				<h4>Aspectos técnico-urbanísticos</h4>
				<p>Escopo</p>
				<p>Descrição</p>
			</div>

			<div class="tramitacao">
				<h4>Tramitação prevista</h4>
				<ol>
					<li>
						<span>Em proposição dos elementos prévios</span>
						<i class="material-icons">check_box</i>
					</li>
					<li>
						<span>1ª Consulta Pública</span>
						<i class="material-icons">indeterminate_check_box</i>
					</li>
					<li>
						<span>Em avaliação após 1ª Consulta</span>
						<i class="material-icons">check_box_outline_blank</i>
					</li>
					<li class="anterior">
						<span>Em avaliação SMUL</span>
					</li>
					<li>
						<span>PIU em elaboração</span>
					</li>
					<li>
						<span>Discussão pública</span>
					</li>
					<li>
						<span>Consolidação PIU</span>
					</li>
					<li>
						<span>Encaminhamento Jurídico PMSP</span>
					</li>
					<li>
						<span>Consolidado em Decreto</span>
					</li>
					<li>
						<span>Em tratativa na CMSP</span>
					</li>
					<li>
						<span>Consolidado em Lei</span>
					</li>
					<li>
						<span>Aprovado - em implantação</span>
					</li>
				</ol>
			</div>
		</div>

	</div>
	`
}