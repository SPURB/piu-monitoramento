new Vue({
	name:'app',
	el: '#app',
	data:{
		data: monitoramento
	},
	template:"<projects></projects>", 
	components: {
		projects,
	}
})