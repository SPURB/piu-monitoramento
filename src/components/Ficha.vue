<template>
	<div id="ficha">
		<div @click="menu=!menu" class="menu-titulo" id="menuTitulo">
			<div class="titulo" v-bind:class="atribuiEtapaClass(projeto.etapas_NUM)">
				<span v-bind:class="fConsultaAberta(this.projeto)">{{ projeto.id_nome }}</span>
				<i class="material-icons" v-if="!menu">expand_more</i>
				<i class="material-icons" v-if="menu">expand_less</i>
			</div>
			<transition name="menuSlide">
				<ul class="menu" v-if="menu">
					<li v-for="projeto in data.filter(filtroMenu).sort(function(a,b){return a.etapas_NUM - b.etapas_NUM})" 
					v-bind:class="atribuiEtapaClass(projeto.etapas_NUM)" 
					:key="projeto.ID_rev">
						<a v-bind:class="fConsultaAberta(projeto)" @click="gravaId(projeto.ID_rev)">{{ projeto.id_nome }}</a>
					</li>
				</ul>
			</transition>
		</div>

		<div class="container">
				<ficha-sumario
					:projeto="projeto"
					:hiperlinks="hiperlinks"
					:etapaClass="atribuiEtapaClass(projeto.etapas_NUM)" 
					:etapaTag="atribuiEtapaTag(projeto.etapas_NUM)" 
					:clickedId="clickedId" />

			<div class="aspectos">
				<h4>Aspectos técnico-urbanísticos</h4>

				<p>{{ projeto.urb_descricao_basica }}</p>

				<template v-if="testeVazio(projeto.urb_elemento_da_rede_de_estruturacao_urbana) != false">
					<div>
						<h6>Elemento da rede de estruturação urbana</h6>
						{{ projeto.urb_elemento_da_rede_de_estruturacao_urbana }}
					</div>
				</template>
				<template v-if="testeVazio(projeto.urb_area_total) != false">
					<div>
						<h6>Área total</h6>
						{{ projeto.urb_area_total }} ha
					</div>
				</template>
				<template v-if="testeVazio(projeto.urb_zonas_especiais) != false">
					<div>
						<h6>Zonas especiais</h6>
						{{ projeto.urb_zonas_especiais }}
					</div>
				</template>
				<template v-if="testeVazio(projeto.urb_justificativa_interesse_publico) != false">
					<div>
						<h6>Interesse público</h6>
						{{ projeto.urb_justificativa_interesse_publico }}
					</div>
				</template>
				<template v-if="testeVazio(projeto.urb_contrapartida_prevista) != false">
					<div>
						<h6>Contrapartida prevista</h6>
						{{ projeto.urb_contrapartida_prevista }}
					</div>
				</template>
				<!-- <template v-if="testeVazio(projeto.urb_valor_contrapartida_prevista) != false && projeto.urb_valor_contrapartida_prevista != 'ND'">
					<div>
						<h6>Valor da contrapartida prevista</h6>
						{{ numberToReal(parseInt(projeto.urb_valor_contrapartida_prevista)) }}
					</div>
				</template> -->
				<template v-if="testeVazio(projeto.urb_justificativa_interesse_publico) != false">
					<div>
						<h6>Interesse privado</h6>
						{{ projeto.urb_justificativa_interesse_publico }}
					</div>
				</template>
			</div>

			<div class="tramitacao">
				<h4>Tramitação <span>Última atualização <strong>{{ dataExcelJS(projeto.ultima_atualizacao) }}</strong></span></h4>
						
				<div class="etapa">
					<div v-show="testeVazio(projeto.a_data_protocolo)" class="periodoEtapaTramit">
						{{ dataExcelJS(projeto.a_data_protocolo) }}—{{ dataExcelJS(projeto.a_data_envio_comunicacao) }}
					</div>
					<div @click="E01=!E01" v-bind:class="atribuiEstado(1,projeto.etapas_NUM)" class="label">
							01 <span>Proposição dos elementos prévios</span>
					</div>
					<transition name="tramitTransit" class="tramitTransit">
						<div v-if="E01">
							<template v-if="testeVazio(projeto.a_data_protocolo) != false">
								<p>
									<span>Protocolado</span> em {{ dataExcelJS(projeto.a_data_protocolo) }}
								</p>
							</template>
							<template v-for="hiperlink in hiperlinks">
								<p v-if="hiperlink.ID == clickedId && hiperlink.ID_etapa == 1 && testeVazio(hiperlink.arquivo) != false && testeLink(hiperlink.arquivo) != false" class="tramit_link">
									<a class="tramit_link" :href="hiperlink.arquivo" :type="ext(hiperlink.arquivo)" :title="hiperlink.nome_publico_do_arquivo" target="_blank">{{ hiperlink.nome_publico_do_arquivo }}</a>
								</p>
							</template>
						</div>
					</transition>
				</div>
			
				<div class="etapa">
					<div v-show="testeVazio(projeto.b_data_inicio)" class="periodoEtapaTramit">
						{{ dataExcelJS(projeto.b_data_inicio) }}–{{ dataExcelJS(projeto.Data_fim_2) }}
					</div>
					<div @click="E02=!E02" v-bind:class="atribuiEstado(2,projeto.etapas_NUM)" class="label">
						02 <span>Consulta pública inicial</span>
					</div>
					<transition name="tramitTransit" class="tramitTransit">
						<div v-if="E02">
							<template v-if="testeVazio(projeto.b_status) != false">
								<p v-if="projeto.b_status == 'aberta'">
									Consulta <span>aberta</span> ({{ dataExcelJS(projeto.b_data_inicio) }}—{{ dataExcelJS(projeto.b_data_final) }})<br>
									<template v-for="hiperlink in hiperlinks" v-if="hiperlink.ID == clickedId && hiperlink.ID_etapa == 2 && hiperlink.Idp == 50">
										<a class="linkConsulta" :href="hiperlink.arquivo" title="Participe da consulta pública" target="_blank">Participe da consulta pública <i class="material-icons">launch</i></a>
									</template>
								</p>
								<p v-else>
									Consulta <span>encerrada</span> ({{ dataExcelJS(projeto.b_data_inicio) }}—{{ dataExcelJS(projeto.b_data_final) }})
									<template v-if="testeVazio(projeto.b_numero_de_contribuicoes) != false">
										<br>({{ projeto.b_numero_de_contribuicoes }} contribuições)
									</template>
								<p>
								</p>
							</template>
							<div class="arquivos" :nome="arquivosDiscussao(2,1)">
								<template v-for="hiperlink in hiperlinks">
									<p class="tramit_link" v-if="hiperlink.ID == clickedId && testeLink(hiperlink.arquivo) != false && 
									hiperlink.ID_etapa == 2 && hiperlink.Idp == 1">
										<a class="tramit_link" :href="hiperlink.arquivo" :type="ext(hiperlink.arquivo)" :title="hiperlink.nome_publico_do_arquivo" target="_blank">{{ hiperlink.nome_publico_do_arquivo }}</a>
									</p>
								</template>
							</div>
							<div class="arquivos" :nome="arquivosDiscussao(2,2)">
								<template v-for="hiperlink in hiperlinks">
									<p class="tramit_link" v-if="hiperlink.ID == clickedId && testeLink(hiperlink.arquivo) != false && 
									hiperlink.ID_etapa == 2 && hiperlink.Idp == 2">
										<a class="tramit_link" :href="hiperlink.arquivo" :type="ext(hiperlink.arquivo)" :title="hiperlink.nome_publico_do_arquivo" target="_blank">{{ hiperlink.nome_publico_do_arquivo }}</a>
									</p>
								</template>
							</div>
							<div class="arquivos" :nome="arquivosDiscussao(2,3)">
								<template v-for="hiperlink in hiperlinks">
									<p class="tramit_link" v-if="hiperlink.ID == clickedId && testeLink(hiperlink.arquivo) != false && 
									hiperlink.ID_etapa == 2 && hiperlink.Idp == 3">
										<a class="tramit_link" :href="hiperlink.arquivo" :type="ext(hiperlink.arquivo)" :title="hiperlink.nome_publico_do_arquivo" target="_blank">{{ hiperlink.nome_publico_do_arquivo }}</a>
									</p>
								</template>
							</div>
							<div class="arquivos" :nome="arquivosDiscussao(2,4)">
								<template v-for="hiperlink in hiperlinks">
									<p class="tramit_link" v-if="hiperlink.ID == clickedId && testeLink(hiperlink.arquivo) != false && 
									hiperlink.ID_etapa == 2 && hiperlink.Idp == 4">
										<a class="tramit_link" :href="hiperlink.arquivo" :type="ext(hiperlink.arquivo)" :title="hiperlink.nome_publico_do_arquivo" target="_blank">{{ hiperlink.nome_publico_do_arquivo }}</a>
									</p>
								</template>
							</div>
							<div class="arquivos" :nome="arquivosDiscussao(2,5)">
								<template v-for="hiperlink in hiperlinks">
									<p class="tramit_link" v-if="hiperlink.ID == clickedId && testeLink(hiperlink.arquivo) != false && 
									hiperlink.ID_etapa == 2 && hiperlink.Idp == 5">
										<a class="tramit_link" :href="hiperlink.arquivo" :type="ext(hiperlink.arquivo)" :title="hiperlink.nome_publico_do_arquivo" target="_blank">{{ hiperlink.nome_publico_do_arquivo }}</a>
									</p>
								</template>
							</div>
							<div class="arquivos" :nome="arquivosDiscussao(2,6)">
								<template v-for="hiperlink in hiperlinks">
									<p class="tramit_link" v-if="hiperlink.ID == clickedId && testeLink(hiperlink.arquivo) != false && 
									hiperlink.ID_etapa == 2 && hiperlink.Idp == 6">
										<a class="tramit_link" :href="hiperlink.arquivo" :type="ext(hiperlink.arquivo)" :title="hiperlink.nome_publico_do_arquivo" target="_blank">{{ hiperlink.nome_publico_do_arquivo }}</a>
									</p>
								</template>
							</div>
							<div class="arquivos" :nome="arquivosDiscussao(2,7)">
								<template v-for="hiperlink in hiperlinks">
									<p class="tramit_link" v-if="hiperlink.ID == clickedId && testeLink(hiperlink.arquivo) != false && 
									hiperlink.ID_etapa == 2 && hiperlink.Idp == 7">
										<a class="tramit_link" :href="hiperlink.arquivo" :type="ext(hiperlink.arquivo)" :title="hiperlink.nome_publico_do_arquivo" target="_blank">{{ hiperlink.nome_publico_do_arquivo }}</a>
									</p>
								</template>
							</div>
						</div>
					</transition>
				</div>
			
				<div class="etapa">
					<div v-show="testeVazio(projeto.c_data_envio)" class="periodoEtapaTramit">
						{{ dataExcelJS(projeto.c_data_envio) }}—{{ dataExcelJS(projeto.c_data_devolucao_spurb) }}
					</div>
					<div @click="E03=!E03" v-bind:class="atribuiEstado(3,projeto.etapas_NUM)" class="label">
						03 <span>Avaliação SMUL</span>
					</div>
					<transition name="tramitTransit" class="tramitTransit">
						<div v-if="E03">
							<template v-if="testeVazio(projeto.c_data_envio) != false && projeto.c_data_envio != 'NA'">
								<p>
									<span>Enviado para SMUL</span> em {{ dataExcelJS(projeto.c_data_envio) }}
								</p>
							</template>
							<template v-if="testeVazio(projeto.c_data_envio) != false && projeto.c_data_envio == 'NA'">
								<p>
									Não se aplica
								</p>
							</template>
							<template v-if="testeVazio(projeto.c_data_cmpu) != false && projeto.c_data_cmpu != 'NA'">
								<p>
									<span>CMPU</span><br>
									{{ dataExcelJS(projeto.c_data_cmpu) }}
								</p>
							</template>
							<template v-for="hiperlink in hiperlinks">
								<p class="tramit_link" v-if="hiperlink.ID == clickedId && hiperlink.ID_etapa == 3 && testeLink(hiperlink.arquivo)">
									<a class="tramit_link" :href="hiperlink.arquivo" :type="ext(hiperlink.arquivo)" :title="hiperlink.nome_publico_do_arquivo" target="_blank">{{ hiperlink.nome_publico_do_arquivo }}</a>
								</p>
							</template>
						</div>
					</transition>
				</div>
			
				<div class="etapa">
					<div v-show="testeVazio(projeto.Data_inicio_4)" class="periodoEtapaTramit">
						{{ dataExcelJS(projeto.Data_inicio_4) }}–{{ dataExcelJS(projeto.Data_fim_4) }}
					</div>
					<div @click="E04=!E04" v-bind:class="atribuiEstado(4,projeto.etapas_NUM)" class="label">
						04 <span>Elaboração</span>
					</div>
					<transition name="tramitTransit" class="tramitTransit">
						<div v-if="E04">
							<template v-if="testeVazio(projeto.d_responsavel) != false && projeto.d_responsavel != 'NA'">
								<p>
									Responsável<br>
									<span>{{ projeto.d_responsavel }}</span>
								</p>
							</template>
							<template v-if="testeVazio(projeto.d_secretarias_envolvidas) != false && projeto.d_secretarias_envolvidas != 'NA'">
								<p>
									Secretarias envolvidas<br>
									<span>{{ projeto.d_secretarias_envolvidas }}</span>
								</p>
							</template>
							<template v-if="testeVazio(projeto.d_orgaos_externos_envolvidos) != false && projeto.d_orgaos_externos_envolvidos != 'NA'">
								<p>
									Órgãos externos envolvidos<br>
									<span>{{ projeto.d_orgaos_externos_envolvidos }}</span>
								</p>
							</template>
							<template v-for="hiperlink in hiperlinks">
								<p class="tramit_link" v-if="hiperlink.ID == clickedId && hiperlink.ID_etapa == 4 && testeLink(hiperlink.arquivo)">
									<a class="tramit_link" :href="hiperlink.arquivo" :type="ext(hiperlink.arquivo)" :title="hiperlink.nome_publico_do_arquivo" target="_blank">{{ hiperlink.nome_publico_do_arquivo }}</a>
								</p>
							</template>
						</div>
					</transition>
				</div>
			
				<div class="etapa">
					<div v-show="testeVazio(projeto.Data_inicio_5)" class="periodoEtapaTramit">
						{{ dataExcelJS(projeto.Data_inicio_5) }}–{{ dataExcelJS(projeto.Data_fim_5) }}
					</div>
					<div @click="E05=!E05" v-bind:class="atribuiEstado(5,projeto.etapas_NUM)" class="label">
						05 <span>Discussão pública</span>
					</div>
					<transition name="tramitTransit" class="tramitTransit">
						<div v-if="E05">
							<template v-if="testeVazio(projeto.e_status_consulta_internet_minuta) != false && projeto.e_status_consulta_internet_minuta != 'NA'">
								<p v-if="projeto.e_status_consulta_internet_minuta == 'aberta'">
									Consulta online <span>aberta</span> ({{ dataExcelJS(projeto.e_data_inicio_consulta_minuta) }}—{{ dataExcelJS(projeto.e_data_final_consulta_minuta) }})<br>
									<template v-for="hiperlink in hiperlinks" v-if="hiperlink.ID == clickedId && hiperlink.ID_etapa == 5 && hiperlink.Idp == 50">
										<a class="linkConsulta" :href="hiperlink.arquivo" title="Participe da consulta pública" target="_blank">Participe da consulta pública <i class="material-icons">launch</i></a>
									</template>
								</p>
								<p v-else>
									Consulta online <span>encerrada</span> ({{ dataExcelJS(projeto.e_data_inicio_consulta_minuta) }}—{{ dataExcelJS(projeto.e_data_final_consulta_minuta) }})
								</p>
							</template>
							<template v-if="testeVazio(projeto.e_status_consulta_internet_caderno) != false && projeto.e_status_consulta_internet_caderno != 'NA'">
								<p v-if="projeto.e_status_consulta_internet_caderno == 'aberta'">
									Consulta online <span>aberta</span> ({{ dataExcelJS(projeto.e_data_inicio_consulta_caderno) }}—{{ dataExcelJS(projeto.e_data_final_consulta_caderno) }})<br>
									<template v-for="hiperlink in hiperlinks" v-if="hiperlink.ID == clickedId && hiperlink.ID_etapa == 5 && hiperlink.Idp == 55">
										<a class="linkConsulta" :href="hiperlink.arquivo" title="Participe da consulta pública" target="_blank">Participe da consulta pública <i class="material-icons">launch</i></a>
									</template>
								</p>
								<p v-else>
									Consulta online <span>encerrada</span> ({{ dataExcelJS(projeto.e_data_inicio_consulta_caderno) }}—{{ dataExcelJS(projeto.e_data_final_consulta_caderno) }})
								</p>
							</template>
							<template v-if="testeVazio(projeto.e_instancias_consultadas) != false && projeto.e_instancias_consultadas != 'NA'">
								<p>
									Instâncias consultadas<br>
									<span>{{ projeto.e_instancias_consultadas }}</span>
								</p>
							</template>
							<template v-if="testeVazio(projeto.e_data_audiencia_publica) != false">
								<p>
									Audiências públicas realizadas em <span>{{ projeto.e_data_audiencia_publica }}</span>
								</p>
							</template>
							<template v-if="testeVazio(projeto.e_outras_atividades_participativas) != false && projeto.e_outras_atividades_participativas != 'NA'">
								<p>
									Outras atividades participativas<br>
									<span>{{ projeto.e_outras_atividades_participativas }}</span>
								</p>
							</template>
							<div class="arquivos" :nome="arquivosDiscussao(5,1)">
								<template v-for="hiperlink in hiperlinks">
									<p class="tramit_link" v-if="hiperlink.ID == clickedId && testeLink(hiperlink.arquivo) != false && 
									hiperlink.ID_etapa == 5 && hiperlink.Idp == 1">
										<a class="tramit_link" :href="hiperlink.arquivo" :type="ext(hiperlink.arquivo)" :title="hiperlink.nome_publico_do_arquivo" target="_blank">{{ hiperlink.nome_publico_do_arquivo }}</a>
									</p>
								</template>
							</div>
							<div class="arquivos" :nome="arquivosDiscussao(5,2)">
								<template v-for="hiperlink in hiperlinks">
									<p class="tramit_link" v-if="hiperlink.ID == clickedId && testeLink(hiperlink.arquivo) != false && 
									hiperlink.ID_etapa == 5 && hiperlink.Idp == 2">
										<a class="tramit_link" :href="hiperlink.arquivo" :type="ext(hiperlink.arquivo)" :title="hiperlink.nome_publico_do_arquivo" target="_blank">{{ hiperlink.nome_publico_do_arquivo }}</a>
									</p>
								</template>
							</div>
							<div class="arquivos" :nome="arquivosDiscussao(5,3)">
								<template v-for="hiperlink in hiperlinks">
									<p class="tramit_link" v-if="hiperlink.ID == clickedId && testeLink(hiperlink.arquivo) != false && 
									hiperlink.ID_etapa == 5 && hiperlink.Idp == 3">
										<a class="tramit_link" :href="hiperlink.arquivo" :type="ext(hiperlink.arquivo)" :title="hiperlink.nome_publico_do_arquivo" target="_blank">{{ hiperlink.nome_publico_do_arquivo }}</a>
									</p>
								</template>
							</div>
							<div class="arquivos" :nome="arquivosDiscussao(5,4)">
								<template v-for="hiperlink in hiperlinks">
									<p class="tramit_link" v-if="hiperlink.ID == clickedId && testeLink(hiperlink.arquivo) != false && 
									hiperlink.ID_etapa == 5 && hiperlink.Idp == 4">
										<a class="tramit_link" :href="hiperlink.arquivo" :type="ext(hiperlink.arquivo)" :title="hiperlink.nome_publico_do_arquivo" target="_blank">{{ hiperlink.nome_publico_do_arquivo }}</a>
									</p>
								</template>
							</div>
							<div class="arquivos" :nome="arquivosDiscussao(5,5)">
								<template v-for="hiperlink in hiperlinks">
									<p class="tramit_link" v-if="hiperlink.ID == clickedId && testeLink(hiperlink.arquivo) != false && 
									hiperlink.ID_etapa == 5 && hiperlink.Idp == 5">
										<a class="tramit_link" :href="hiperlink.arquivo" :type="ext(hiperlink.arquivo)" :title="hiperlink.nome_publico_do_arquivo" target="_blank">{{ hiperlink.nome_publico_do_arquivo }}</a>
									</p>
								</template>
							</div>
							<div class="arquivos" :nome="arquivosDiscussao(5,6)">
								<template v-for="hiperlink in hiperlinks">
									<p class="tramit_link" v-if="hiperlink.ID == clickedId && testeLink(hiperlink.arquivo) != false && 
									hiperlink.ID_etapa == 5 && hiperlink.Idp == 6">
										<a class="tramit_link" :href="hiperlink.arquivo" :type="ext(hiperlink.arquivo)" :title="hiperlink.nome_publico_do_arquivo" target="_blank">{{ hiperlink.nome_publico_do_arquivo }}</a>
									</p>
								</template>
							</div>
							<div class="arquivos" :nome="arquivosDiscussao(5,7)">
								<template v-for="hiperlink in hiperlinks">
									<p class="tramit_link" v-if="hiperlink.ID == clickedId && testeLink(hiperlink.arquivo) != false && 
									hiperlink.ID_etapa == 5 && hiperlink.Idp == 7">
										<a class="tramit_link" :href="hiperlink.arquivo" :type="ext(hiperlink.arquivo)" :title="hiperlink.nome_publico_do_arquivo" target="_blank">{{ hiperlink.nome_publico_do_arquivo }}</a>
									</p>
								</template>
							</div>
						</div>
					</transition>
				</div>
			
				<div class="etapa">
					<div v-show="testeVazio(projeto.Data_inicio_6)" class="periodoEtapaTramit">
						{{ dataExcelJS(projeto.Data_inicio_6) }}–{{ dataExcelJS(projeto.Data_fim_6) }}
					</div>
					<div @click="E06=!E06" v-bind:class="atribuiEstado(6,projeto.etapas_NUM)" class="label">
						06 <span>Consolidação</span>
					</div>
					<transition name="tramitTransit" class="tramitTransit">
						<div v-if="E06">
							<template v-if="testeVazio(projeto.f_instrumento_urbanistico_proposto) != false">
								<p>
									Instrumento urbanístico proposto<br />
									<span>{{ projeto.f_instrumento_urbanistico_proposto }}</span>
								</p>
							</template>
							<template v-if="testeVazio(projeto.f_instrumento_juridico_necessario) != false">
								<p>
									Instrumento jurídico necessário<br />
									<span>{{ projeto.f_instrumento_juridico_necessario}}</span>
								</p>
							</template>
							<template v-if="testeVazio(projeto.f_instancias_consultadas) != false">
								<p>
									Instâncias consultadas<br />
									<span>{{ projeto.f_instancias_consultadas }}</span>
								</p>
							</template>
							<template v-for="hiperlink in hiperlinks">
								<p class="tramit_link" v-if="hiperlink.ID == clickedId && hiperlink.ID_etapa == 6 && testeLink(hiperlink.arquivo)">
									<a class="tramit_link" :href="hiperlink.arquivo" :type="ext(hiperlink.arquivo)" :title="hiperlink.nome_publico_do_arquivo" target="_blank">{{ hiperlink.nome_publico_do_arquivo }}</a>
								</p>
							</template>
						</div>
					</transition>
				</div>
			
				<div class="etapa">
					<div v-show="testeVazio(projeto.g_data_envio_aprovacao)" class="periodoEtapaTramit">
						{{ dataExcelJS(projeto.g_data_envio_aprovacao) }}–{{ dataExcelJS(projeto.Data_fim_7) }}
					</div>
					<div @click="E07=!E07" v-bind:class="atribuiEstado(7,projeto.etapas_NUM)" class="label">
						07 <span>Encaminhamento jurídico</span>
					</div>
					<transition name="tramitTransit" class="tramitTransit">
						<div v-if="E07">
							<template v-if="testeVazio(projeto.g_normativo_numero_ano) != false">
								<p>
									<span>{{ projeto.g_normativo_numero_ano }}</span> ({{ dataExcelJS(projeto.g_data_envio_aprovacao) }})<br/>
									<span>{{ projeto.g_status_aprovacao }}</span>
								</p>
							</template>
							<template v-for="hiperlink in hiperlinks">
								<p class="tramit_link" v-if="hiperlink.ID == clickedId && hiperlink.ID_etapa == 7 && testeLink(hiperlink.arquivo)">
									<a class="tramit_link" :href="hiperlink.arquivo" :type="ext(hiperlink.arquivo)" :title="hiperlink.nome_publico_do_arquivo" target="_blank">{{ hiperlink.nome_publico_do_arquivo }}</a>
								</p>
							</template>
						</div>
					</transition>
				</div>
			
				<div class="etapa">
					<div v-show="testeVazio(projeto.h_data_inicio)" class="periodoEtapaTramit">
						{{ dataExcelJS(projeto.h_data_inicio) }}–{{ dataExcelJS(projeto.Data_fim_8) }}
					</div>
					<div @click="E08=!E08" v-bind:class="atribuiEstado(8,projeto.etapas_NUM)" class="label">
						08 <span>Implantação</span>
					</div>
					<transition name="tramitTransit" class="tramitTransit">
						<div v-if="E08">
							<template v-if="testeVazio(projeto.h_registro_administrativo) != false">
								<p>
									Número do Processo Administrativo<br>
									<span>{{ projeto.h_registro_administrativo }}</span>
								</p>
							</template>
							<template v-if="testeVazio(projeto.h_interessado) != false">
								<p>
									Interessado<br>
									<span>{{ projeto.h_interessado }}</span>
								</p>
							</template>
							<template v-if="testeVazio(projeto.h_status_implantacao) != false">
								<p>
									<span>{{ projeto.h_status_implantacao }}</span>
								</p>
							</template>
							<template v-if="testeVazio(projeto.h_orgao_em_analise) != false">
								<p>
									Órgão em análise<br>
									<span>{{ projeto.h_orgao_em_analise }}</span>
								</p>
							</template>
							<template v-for="hiperlink in hiperlinks">
								<p class="tramit_link" v-if="hiperlink.ID == clickedId && hiperlink.ID_etapa == 8 && testeLink(hiperlink.arquivo)">
									<a class="tramit_link" :href="hiperlink.arquivo" :type="ext(hiperlink.arquivo)" :title="hiperlink.nome_publico_do_arquivo" target="_blank">{{ hiperlink.nome_publico_do_arquivo }}</a>
								</p>
							</template>
						</div>
					</transition>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import FichaSumario from './FichaSumario.vue'

export default {
	name:'ficha',
	data (){
		return {
			projeto: {},
			menuClickedId: 0,
			menu: false,
			E01: false, E02: false, E03: false, E04: false,
			E05: false, E06: false, E07: false, E08: false,
			agenda: [
				{ titulo: 'Audiência Pública', data: '12.08.2018', horario: '19h', local: 'Estádio do Morumbi', endereco: 'Praça Roberto Gomes Pedrosa, 1' },
				{ titulo: 'Renião temática - SABESP', data: '22.08.2018', horario: '15h', local: 'Sede SABESP', endereco: 'Rua Costa Carvalho, 300' },
				{ titulo: 'Reunião CMPU', data: '30.08.2018', horario: '09h', local: 'Auditório – Ed. Martinelli', endereco: 'Rua São Bento, 405' },
				{ titulo: 'Workshop temático', data: '06.09.2018', horario: '09h', local: 'Parque da Aclimação', endereco: 'Rua Muniz de Sousa, 1119' }
			],
		}
	},
	props: [
		'clicked-id', 
		'data', 
		'hiperlinks'
	],
	components:{
		FichaSumario
	},
	methods: {
		atribuiEtapaClass(etp) {
			if (etp <= 3) { return 'proposicao' };
			if (etp > 3 && etp <= 7) { return 'andamento'};
			if (etp == 8) { return 'implantacao' };
			if (etp == 9) { return 'suspenso' };
			if (etp == 10) { return 'arquivado' };
			if (etp == 11) { return 'prospeccao' };
		},

		atribuiEtapaTag(etp) {
			const etapa = parseInt(etp)
			switch (etapa) {
				case 1: return 'Proposição';
				case 2: return 'Consulta púb. inicial';
				case 3: return 'Avaliação SMUL';
				case 4: return 'Elaboração';
				case 5: return 'Discussão pública';
				case 6: return 'Consolidação';
				case 7: return 'Enc. jurídico';
				case 8: return 'Implantação';
				case 9: return 'Suspenso';
				case 10: return 'Arquivado';
				case 11: return 'Em prospecção';
			};
		},

		dataExcelJS(data) {
			if (data != null && data != '-' && data != 'NA') {
				if (data.toString().length == 5) {
					let d = new Date((Math.floor(data - 25568))*86400000);
					let string = ('0' + d.getDate()).slice(-2)+'/'+('0' + (d.getMonth()+1)).slice(-2)+'/'+d.getFullYear();
					return string;
				} else if (data.replace('/','').length > 5 && data.replace('/','').length <= 8) {
					return data;
				} else { return data };
			} else { return '' }
		},

		encontraProjeto(newClickedId) {
			this.data.map(function(index) {
				if (index.id == newClickedId) {
					this.projeto = index;
				};
			});
			this.hiperlinks.map(function(index) {
				if (index.ID == newClickedId) {
					this.proj == index;
				};
			});
		},

		enviaId(event) {
			this.$emit('clicked', this.menuClickedId)
		},

		gravaId(id) {
			this.menuClickedId = id;
			this.enviaId();
		},

		atribuiEstado(etapa) {
			let e = this.projeto.etapas_NUM;
			if (e < etapa || e > 8) { return 'posterior' };
			if (e == etapa) { return 'atual' };
			if (e > etapa) { return 'anterior' };
		},

		ext(filename) {
			let extensao = filename.substring(filename.lastIndexOf('.')+1, filename.length).replace('/','');
			if (extensao.length > 4 || extensao.length <= 2) { return 'url' };
			if (extensao.length > 2 || extensao.length <= 4) { return extensao };
		},

		abreTramitacao(par) {
			let etapa = par.etapas_NUM;
			if (etapa == 1) { this.E01 = true; this.E02 = false; this.E03 = false; this.E04 = false; this.E05 = false; this.E06 = false; this.E07 = false; this.E08 = false; };
			if (etapa == 2) { this.E02 = true; this.E01 = false; this.E03 = false; this.E04 = false; this.E05 = false; this.E06 = false; this.E07 = false; this.E08 = false; };
			if (etapa == 3) { this.E03 = true; this.E01 = false; this.E02 = false; this.E04 = false; this.E05 = false; this.E06 = false; this.E07 = false; this.E08 = false; };
			if (etapa == 4) { this.E04 = true; this.E01 = false; this.E02 = false; this.E03 = false; this.E05 = false; this.E06 = false; this.E07 = false; this.E08 = false; };
			if (etapa == 5) { this.E05 = true; this.E01 = false; this.E02 = false; this.E03 = false; this.E04 = false; this.E06 = false; this.E07 = false; this.E08 = false; };
			if (etapa == 6) { this.E06 = true; this.E01 = false; this.E02 = false; this.E03 = false; this.E04 = false; this.E05 = false; this.E07 = false; this.E08 = false; };
			if (etapa == 7) { this.E07 = true; this.E01 = false; this.E02 = false; this.E03 = false; this.E04 = false; this.E05 = false; this.E06 = false; this.E08 = false; };
			if (etapa == 8) { this.E08 = true; this.E01 = false; this.E02 = false; this.E03 = false; this.E04 = false; this.E05 = false; this.E06 = false; this.E07 = false; };
		},

		fConsultaAberta(par) {
			if (par.b_status == 'aberta' || par.e_status_consulta_internet_minuta == 'aberta' || par.e_status_consulta_internet_caderno == 'aberta') { 
				return 'consultaAberta'
			};
		},

		arquivosDiscussao(etapa, arquivoCat) {
			var output = '';
			for (var i = 0; i < this.hiperlinks.length; i++) {
				if (this.hiperlinks[i].ID == this.projeto.ID_rev && 
					this.hiperlinks[i].ID_etapa == etapa && 
					this.hiperlinks[i].Idp == arquivoCat) {
					switch (arquivoCat) {
						case 1: output = 'Consulta Instâncias'; break;
						case 2: output = 'Consulta Caderno'; break;
						case 3: output = 'Consulta Minuta'; break;
						case 4: output = 'Audiência Pública'; break;
						case 5: output = 'Reuniões Bilaterais'; break;
						case 6: output = 'Outras'; break;
						case 7: output = 'Projeto Final'; break;
						default: output = ''; break;
					};
				};
			};
			return output;
		},

		testeVazio(file) {
			if (file != undefined && file != null && file != '-' && file != '' && file != 'NA') {
				return true;
			} else { return false };
		},

		testeLink(file) {
			if (file != undefined && file != null && file != '-' && file != '' && file.indexOf('http') === 0) {
				return true
			} else {
				return false
			};
		},

		numberToReal(numero) {
			var numero = numero.toFixed(2).split('.');
			numero[0] = "R$ " + numero[0].split(/(?=(?:...)*$)/).join('.');
			return numero.join(',');
		},

		filtroMenu(proj) {
			return (proj.etapas_NUM > 0 && proj.etapas_NUM <= 10);
		},
	},

	watch:{
		clickedId(newprop,oldprop){
			const app = this;
			app.data.map(function(index) {
				if (index.ID_rev == newprop) {
					app.projeto = index;
					app.abreTramitacao(index);
				};
			});
		},
	}
}
</script>
