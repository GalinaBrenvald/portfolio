function resetForm() {
    document.getElementById("calculator").reset();
}

function resetFieldForm(){
	document.getElementById("message").style.display = "block";
	document.getElementById("grafic").style.display = "none";
	resetBorders();
	clearTable();
}

function resetBorders(){
	document.getElementById("sum").style.border = "1px solid #ccc";
	document.getElementById("term").style.border = "1px solid #ccc";
	document.getElementById("percent").style.border = "1px solid #ccc";
}

function clearBorders(){
	document.activeElement.style.border = "1px solid #ccc";
}

function clearTable(){
	var resetGrafic = document.getElementById("grafic");
	while ( resetGrafic.rows[1] ) {
		resetGrafic.deleteRow(1);
	}
}

window.onload = function(){
	document.getElementById("btn-reset").addEventListener("click", resetFieldForm);
	document.getElementById("sum").addEventListener("focus", clearBorders);
	document.getElementById("term").addEventListener("focus", clearBorders);
	document.getElementById("percent").addEventListener("focus", clearBorders);
}

function validateForm(){
	var totalResult = true;
	if(document.getElementById("sum").value.length == 0 || document.getElementById("sum").value == 0){
		document.getElementById("sum").style.border = "thin solid #ff0000";
		totalResult = false;
	}
	if(document.getElementById("term").value.length == 0 || document.getElementById("term").value == 0 ){
		document.getElementById("term").style.border = "thin solid #ff0000";
		totalResult = false;
	}
	if(document.getElementById("percent").value.length == 0 || document.getElementById("percent").value == 0){
		document.getElementById("percent").style.border = "thin solid #ff0000";
		totalResult = false;
	}	
		return totalResult;
}

function show(){
	document.getElementById("message").style.display = "none";
	document.getElementById("grafic").style.display = "block";
}

function addRowTable(month, balance, loan, monthPercent, month_payment){
	var tr = document.createElement('tr');
		tr.id = 'tr' + month;
		var td1 = document.createElement('td');
		var td2 = document.createElement('td');
		var td3 = document.createElement('td');
		var td4 = document.createElement('td');
		var td5 = document.createElement('td');

		document.getElementById('grafic').appendChild(tr);

		td1.innerHTML = month;
		document.getElementById('tr' + month ).appendChild(td1);

		td2.innerHTML = balance;
		document.getElementById('tr' + month).appendChild(td2);

		td3.innerHTML = loan;
		document.getElementById('tr' + month).appendChild(td3);

		td4.innerHTML = monthPercent;
		document.getElementById('tr' + month).appendChild(td4);

		td5.innerHTML = month_payment;
		document.getElementById('tr' + month).appendChild(td5);
}