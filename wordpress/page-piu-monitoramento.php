<?php
/*
Template Name: piu-monitoramento
*/
?>
<?php get_header(); ?>
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
<link rel="stylesheet" type="text/css" href="<?php echo get_template_directory_uri(); ?>/css/ol.4.2.0.css">
<link rel="stylesheet" type="text/css" href="<?php echo get_template_directory_uri(); ?>/SPA/piu-monitoramento/styles.min.css">

<div id="loader">Carregando...</div>
<div id="default-inner">
	<div class="wrapper">
			<div class="inner">
				<div id="app">
					<mapa v-show="display.mapa" @clicked="receiveId" :clicked-id="projectId" :projetos="projetos" :tramitacao="tramitacao"></mapa>
					<sumario v-show="display.sumario"	@clicked="receiveId" :clicked-id="projectId" :projetos="projetos"></sumario>
					<ficha v-show="display.ficha" @clicked="receiveId" :clicked-id="projectId" :projetos="projetos" :tramitacao="tramitacao"></ficha>
				</div>
			</div>
		<div class="clear"></div>
	</div>
</div>

<?php get_footer(); ?>
<script src="<?php echo get_template_directory_uri(); ?>/js/vue.v2.5.16.js"></script>
<script src="<?php echo get_template_directory_uri(); ?>/js/ol.4.2.0.js"></script>
<script src="<?php echo get_template_directory_uri(); ?>/SPA/piu-monitoramento/main.min.js"></script>
