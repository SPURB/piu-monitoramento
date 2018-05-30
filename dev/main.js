let vm = new Vue({
	el: '#app',
	data:{
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
		receiveId(id){
			this.projectId = id
			if (id == undefined){
				this.display.sumario = true
				this.display.ficha = false
			} 
		}
	}
})