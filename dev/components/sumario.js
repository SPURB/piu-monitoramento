let sumario = {
    name:'sumario',
    data (){
        return {
            data: monitoramento,
            subetapa: {}
        }
    },

    methods: {
        confirmaSubEtapa(){
            let obj = {
                se01: { status: false, counter: 0 },
                se02: { status: false, counter: 0 },
                se03: { status: false, counter: 0 },
                se04: { status: false, counter: 0 },
                se05: { status: false, counter: 0 },
                se06: { status: false, counter: 0 },
                se07: { status: false, counter: 0 },
                se08: { status: false, counter: 0 },
                se09: { status: false, counter: 0 },
                se10: { status: false, counter: 0 },
            };
            this.data.map(function(elem) {
                if (elem.subetapa != 0) {
                    switch (elem.subetapa){
                        case 1: obj.se01.status = true; break;
                        case 2: obj.se02.status = true; break;
                        case 3: obj.se03.status = true; break;
                        case 4: obj.se04.status = true; break;
                        case 5: obj.se05.status = true; break;
                        case 6: obj.se06.status = true; break;
                        case 7: obj.se07.status = true; break;
                        case 8: obj.se08.status = true; break;
                        case 9: obj.se09.status = true; break;
                        case 10: obj.se10.status = true; break;
                    }
                }
            })
            this.subetapa = obj;
        },
        addSubetapaCounter(count){
        	if (this.subetapa.se07.counter == 0) { 
        		return true; 
	        	this.subetapa.se07.counter++;
        	}
        	else { return false }
    	}
	},
    mounted(){
        // this.confirmaSubEtapa();
    },
    template: `<div id="sumario">
	    <div v-for="projeto in data">
	        <div v-if="projeto.subetapa == 7 && subetapa.se07.status">
	            <h3 v-if="addSubetapaCounter(7)">Título da subetapa: {{ projeto.subetapa }}</h3>
	            <div>
	                <div class="publicos" v-if="projeto.natureza == 'Pública'">
	                    <h4>Projetos públicos: {{ projeto.nome }}</h4>
	                </div>
	                <div class="privados" v-if="projeto.natureza == 'Privado'">
	                    <h4>Projetos privados: {{ projeto.nome }}</h4>
	                </div>
	            </div>
	        </div>
	    </div>
	</div>`
}