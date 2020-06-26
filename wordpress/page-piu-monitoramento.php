<?php
/*
Template Name: piu-monitoramento
*/
?>
<?php get_header(); ?>
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/gh/openlayers/openlayers.github.io@master/en/v5.3.0/css/ol.css">

<div id="default-inner">
	<div class="wrapper">
		<div class="inner">
		<div id="app" class="app" :class="{ 'app--loading': !appLoaded }">
			<preloader v-if="!appLoaded"></preloader>
			<mapa v-show="display.mapa" @clicked="receiveId" :clicked-id="projectId" :projetos="projetos" :tramitacao="tramitacao"></mapa>
			<sumario v-show="display.sumario"	@clicked="receiveId" :clicked-id="projectId" :projetos="projetos"></sumario>
			<ficha v-show="display.ficha" @clicked="receiveId" :clicked-id="projectId" :projetos="projetos" :tramitacao="tramitacao"></ficha>
		</div>
	</div>
</div>

<?php get_footer(); ?>
<script src="https://cdn.jsdelivr.net/npm/vue@2.6.11"></script>
<script src="https://cdn.rawgit.com/openlayers/openlayers.github.io/master/en/v5.3.0/build/ol.js"></script>
<script src="<?php echo get_template_directory_uri(); ?>/SPA/piu-monitoramento/main.min.js"></script>