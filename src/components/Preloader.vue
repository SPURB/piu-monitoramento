<template>
	<div class="preloader">Carregando...</div>
</template>
<script>
export default {
	name: 'Preloader'
}
</script>
<style lang='scss'>
.preloader {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 5rem;
	min-height: 15rem;
	background: #FFF;
	font-size: x-small;
	text-transform: uppercase;
	letter-spacing: .1em;
	font-family: sans-serif;
}
.preloader::before {
	content: '';
	display: block;
	width: 1.5em;
	height: 1.5em;
	margin-bottom: 1em;
	border-radius: 100%;
	animation-name: oscila;
	animation-duration: .5s;
	animation-iteration-count: infinite;
	animation-direction: alternate;
	animation-timing-function: ease-in-out;
}

@keyframes oscila {
	from {
		transform: translate(-5em);
		background-color: #FFCCB3;
	}
	50% {
		background-color: #FF5500;
	}
	to {
		transform: translate(5em);
		background-color: #802B00;
	}
}
</style>