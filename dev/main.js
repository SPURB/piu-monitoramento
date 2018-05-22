new Vue({
	el: '#app',
	data:{
		zoom: 10.65,
		center: [-5190080.00000,-2708530.34945],
		projectId: undefined
	}, 
	components: {
		mapa,
		sumario,
		ficha
	},
	methods:{
		receiveId(value){
			this.projectId = value
		}
	}
})
