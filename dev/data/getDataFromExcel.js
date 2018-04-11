//https://github.com/SheetJS/js-xlsx
// var url_excel_file = "monitoramento.xlsx"; //from index.html and page-piu-monitormento.php
var monitoramento = [];
var teste = [12,23,45,67]
var teste1 = [{um:'um', dois:'2'},{um:'um', dois:'2'}]

var req = new XMLHttpRequest();
req.open("GET", url_excel_file, true);
req.responseType = "arraybuffer";
req.onload = function(e) {
	var data = new Uint8Array(req.response);
	var workbook = XLSX.read(data, {type:"array"});
	var first_sheet_name = workbook.SheetNames[0];
	var worksheet = workbook.Sheets[first_sheet_name];
	// console.log(XLSX.utils.sheet_to_json(worksheet));//array de objetos
				// XLSX.utils.sheet_to_json(worksheet, {header:1}));//arrays multidensionais
				// XLSX.utils.sheet_to_json(worksheet, {raw:true}));//array de objetos com valores numéricos 
	var myObj = XLSX.utils.sheet_to_json(worksheet);
	myObj.map(function(index){ 
		monitoramento.push(index.nome); 
	})
}
req.send();
// console.log(monitoramento);