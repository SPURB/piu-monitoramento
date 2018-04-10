let ficha = {
	name:'ficha',
	data (){
		return {
			data: monitoramento
		}
	},
	template: `
	<div id="ficha">
		<h3>Ficha</h3>
		{{ data }}
	</div>
	`
}