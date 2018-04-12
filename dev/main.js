new Vue({
	el: '#app',
	data:{
		location: {
			zoom: 10.65,
			center: [-5190080.00000,-2708530.34945],
		}
	}, 
	components: {
		mapa,
		sumario,
		ficha
	},
})
