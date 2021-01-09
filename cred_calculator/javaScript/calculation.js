window.onload = function(){
 	var inputs = document.getElementsByClassName('form-control');
	for(var i=0; i<inputs.length; i++){
		inputs[i].onkeypress=checkNumber;
	}
}

function checkNumber(e){
  e = e || window.event;
  if(e.ctrlKey||e.altKey)return;
  var c = e.charCode || e.keyCode;
  if(e.charCode == 0 && (e.keyCode == 8||e.keyCode == 35||e.keyCode == 36||e.keyCode == 37||e.keyCode == 39))return;
  return ((c > 47) && (c < 58)) || c == 46;
}

$(function(){
	$('.control').on('input', function(){
         var preg = $(this).val().replace(/[^.\d]+/g,"").replace( /^\.|^([^\.]*\.)|\./g, '$1');
         $(this).val(preg);
    });
});


function calculatePayment () {
	resetBorders();
	if(!validateForm()){
		return;
	}
	clearTable();
	show();
	var sum = Number(document.getElementById("sum").value);
	var percent = Number(document.getElementById("percent").value);
	var term = Number(document.getElementById("term").value);
	var initial = Number(document.getElementById("initial").value);

	var intRate = percent/1200;

	var a = intRate * Math.pow((1 + intRate), term)/(Math.pow((1 + intRate),term) - 1);
	a = (Math.ceil(a * 10000))/10000;

	if(initial){
		sum = sum - initial;
	}

	var month_payment = (a * sum).toFixed(2);
	var number_payment = term;
	var total_sum = (term * month_payment).toFixed(2);
	var over_payment = (total_sum - sum).toFixed(2);

	var balance = (sum).toFixed(2);
	var allpercent = 0;
	var allsum = 0;

	for(var i = 1; i < term; i++){
		var monthPercent = ((balance * percent * 30)/(365*100)).toFixed(2);
		var loan = (month_payment - monthPercent).toFixed(2);
		allpercent = (+allpercent + +monthPercent);
		allsum = (+allsum + +month_payment);
		
		addRowTable(i, balance, loan, monthPercent, month_payment);	
		balance = (balance - loan).toFixed(2);

	}

	var lastMonthPercent = ((balance * percent * 31)/(365*100)).toFixed(2);
	var lastPayment = (+balance + +lastMonthPercent).toFixed(2);
	allpercent = (+allpercent + +lastMonthPercent).toFixed(2);
	allsum = (+allsum + +lastPayment).toFixed(2);
	addRowTable(term,balance, balance, lastMonthPercent, lastPayment);
	addRowTable('Итого','', sum.toFixed(2), allpercent, allsum);	
}


   

 




