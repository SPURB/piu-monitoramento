let sumario_linha = {
	name: 'sumario_linha',
	data() {
		return {
			data: monitoramento,
			clickedId: undefined,
		}
	},
	mounted() {
		let container = document.getElementById('linha_do_tempo');

		let items = new vis.DataSet([
			{id: 1, content: 'item 1', start: '2013-05-25', group: 1},
			{id: 2, content: 'item 2', start: '2013-04-14', end: '2013-05-15', group: 2},
			{id: 3, content: 'item 3', start: '2013-04-18', group: 1},
			{id: 4, content: 'item 4', start: '2013-04-16', end: '2013-04-19', group: 1, type: 'background'},
			{id: 5, content: 'item 5', start: '2013-04-25', group: 2},
			{id: 6, content: 'item 6', start: '2013-04-27', group: 1},
			{id: 7, content: 'item 7', start: '2013-05-15', group: 2},
		]);

		let groups = [
			{id: 1, content: 'G1', title: 'tttt'},
			{id: 2, content: 'G2'},
			{id: 3, content: 'G3'},
		];

		let options = {
			stackSubgroups: false,
			align: 'left',
		};

		let timeline = new vis.Timeline(container, items, groups, options);
	},
	template: `
	<div id="sumario_linha">
		<div id="linha_do_tempo"></div>
	</div>
	`
}