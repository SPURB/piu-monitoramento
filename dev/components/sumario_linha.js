let sumario_linha = {
	name: 'sumario_linha',
	data() {
		return {
			data: monitoramento,
			clickedId: undefined,
		}
	},
	methods: {
	},
	mounted() {
		let app = this;		
		let container = document.getElementById('linha_do_tempo');

		let itemsTemp = [];

		let preencheItems = function() {
			for (var i = 0; i < app.data.length; i++) {
				let inicio = new Date((Math.floor(app.data[i].b_data_inicio - 25568))*86400000);
				let start = inicio.getFullYear()+'-'+inicio.getMonth()+'-'+inicio.getDate();
				let final = new Date((Math.floor(app.data[i].b_data_final - 25568))*86400000);
				let end = final.getFullYear()+'-'+final.getMonth()+'-'+final.getDate();
				itemsTemp.push({
					id: app.data[i].ID_rev+i,
					group: app.data[i].ID_rev,
					content: 'Consulta pública inicial',
					start: start,
					end: end,
					title: start+' até '+end
				});
			};
			console.log(itemsTemp);
		}();

		let items = new vis.DataSet(itemsTemp);

		let groups = [];

		let preencheGroups = function() {
			for (var i = 0; i < app.data.length; i++) {
				groups.push({
					id: app.data[i].ID_rev,
					content: app.data[i].id_nome
				});
			};
		}();

		let options = {
			align: 'left',
			stackSubgroups: false,
			stack: false,
			tooltip: {
				followMouse: true,
			},
		};

		let timeline = new vis.Timeline(container, items, groups, options);
	},
	template: `
	<section id="sumario_linha">
		<div id="linha_do_tempo"></div>
	</section>
	`
}