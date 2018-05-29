new Vue({
	el: '#app',
	data:{
		zoom: 10.65,
		center: [-5190080.00000,-2708530.34945],
		projectId: undefined, 
		display:{
			mapa: true,
			sumario: true,
			ficha: false
		}
	}, 
	components: {
		mapa,
		sumario,
		ficha
	},
	watch:{
		projectId(newprop, oldprop){
			if(this.projectId != undefined) {
				this.display.sumario = false
				this.display.ficha = true  
			}
			else{
				this.display.mapa = true
				this.display.sumario = true
				this.display.ficha = false
			}
		}
	},
	methods:{
		receiveId(value){
			this.projectId = value
		}
	}
})