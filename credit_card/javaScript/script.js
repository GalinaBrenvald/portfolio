$(function(){
    $('.NumGroup').groupinputs();
});

$(function(){
    $('.NumGroup1').groupinputs();
});

window.onload = function(){
	console.log("onload");
	var inputs = document.getElementsByClassName('ValueInput');
	for(var i = 0; i < inputs.length; i++){
		inputs[i].onkeypress = checkNumber;
	}

	document.getElementById("Number1").addEventListener("keyup", changeBackground);
	document.getElementById("Number1").addEventListener("keydown", changeBackground);
	document.getElementById("Number_1").addEventListener("keyup",checkMonth);
	document.getElementById("Number_1").addEventListener("keydown",checkMonth);
}

function checkNumber(e){
	e = e || window.event;
	if(e.ctrlKey || e.altKey) return;
	var c = e.charCode || e.keyCode;
	if(e.charCode == 0 && (e.keyCode == 8 || e.keyCode == 35 || e.keyCode == 36 || e.keyCode == 37 || e.keyCode == 39 || e.keyCode ==9)) return;
	return ((c > 47) && (c < 58));
}

function changeBackground() {
	var result = document.getElementById("Number1").value;
	var width = screen.width;
  
    if(isAmericanExpress(result)){
    	document.getElementById("credit_card").style.backgroundImage = "url(images/AmericanExp.jpg)";
    	if(isAmericanExpress(result) && width < 430){
    		document.getElementById("credit_card").style.backgroundImage = "url(images/AmericanExp-small.jpg)";
    	}
    }else if(isDinnersClub(result)){
    	document.getElementById("credit_card").style.backgroundImage = "url(images/DinnersClub.jpg)";
    	if(isDinnersClub(result) && width < 430){
    		document.getElementById("credit_card").style.backgroundImage = "url(images/DinnersClub-small.jpg)";
    	}
    }else if(isDiscover(result)){
    	document.getElementById("credit_card").style.backgroundImage = "url(images/Discover.jpg)";
    	if(isDiscover(result) && width < 430){
    		document.getElementById("credit_card").style.backgroundImage = "url(images/Discover-small.jpg)";
    	}
    }else if(isJCB(result)){
    	document.getElementById("credit_card").style.backgroundImage = "url(images/JCB.jpg)";
    	if(isJCB(result) && width < 430){
    		document.getElementById("credit_card").style.backgroundImage = "url(images/JCB-small.jpg)";
    	}
    }else if(isMaestro(result)){
    	document.getElementById("credit_card").style.backgroundImage = "url(images/Maestro.jpg)";
    	if(isMaestro(result) && width < 430){
    		document.getElementById("credit_card").style.backgroundImage = "url(images/Maestro-small.jpg)";
    	}
    }else if(isMasterCard(result)){
    	document.getElementById("credit_card").style.backgroundImage = "url(images/MasterCard.jpg)";
    	if(isMasterCard(result) && width < 430){
    		document.getElementById("credit_card").style.backgroundImage = "url(images/MasterCard-small.jpg)";
    	}
    }else if(isVisa(result)){
    	document.getElementById("credit_card").style.backgroundImage = "url(images/VISA.jpg)";
    	if(isVisa(result) && width < 430){
    		document.getElementById("credit_card").style.backgroundImage = "url(images/VISA-small.jpg)";
    	}
    }
    else {
        document.getElementById("credit_card").style.backgroundImage = "url(images/credit-card.jpg)";
        if(width < 430){
      		document.getElementById("credit_card").style.backgroundImage = "url(images/credit-card-small.jpg)";
        }
    }
}

function isAmericanExpress(str){
  var reg = /^3[47]/;
  return reg.test(str);
}

function isDinnersClub(str){
	var reg = /^3(?:0[0-5,9]|[6,8-9])/;
	return reg.test(str);
}

function isDiscover(str){
	var reg = /^6(?:011|5|4[4-9]|22(?:1(?:2[6-9]|[3-9])|[2-8]|9(?:[01]|2[0-5])))/;
	return reg.test(str);
}

function isJCB(str){
	var reg = /^35(?:2[89]|[3-8])/;
	return reg.test(str);
}

function isMaestro(str){
	var reg = /^5[0]|(5[6-9])/;
	return reg.test(str);
}

function isMasterCard(str){
	var reg = /^5[01-55]/;
	return reg.test(str);
}

function isVisa(str){
	var reg = /^4/;
	return reg.test(str);
}

function checkMonth(){
	var field = document.getElementById("Number_1");
	var result = field.value;

	if(result.length < 2 && +result > 1){
	field.value = '0'+result;
	}
	if(+result > 12){
		field.value = 12;
	}
}

function validate(){
	var fields = document.getElementsByClassName("NumGroup");
	var result = "";

	for(var i = 0; i < fields.length; i++){
		result += fields[i].value;
	}
	
	var luhn = getValidationLuhn(result.split('')); 
	
		var today = new Date();
		var month = document.getElementById("Number_1").value;
		var year = document.getElementById("Number_2").value;
		var validateDate = new Date(20+year, month);
		validateDate.setDate(validateDate.getDate() - 1);
	
	var isDateValid = today.valueOf() < validateDate.valueOf();
	
	if(luhn && isDateValid){
		document.getElementById("result-true").style.display = "block";
		document.getElementById("result-false").style.display = "none";
	}else{
		document.getElementById("result-false").style.display = "block";
		document.getElementById("result-true").style.display = "none";
	}
}

function getValidationLuhn(arr){
	var summ = 0;

	for(var i = 0; i < arr.length; i++){
		arr[i] = +arr[i];
		if(i % 2 == 0){
			arr[i] = arr[i] * 2;
		}

		if(arr[i] > 9){
			arr[i] = arr[i] - 9;
		}
		summ = summ + arr[i];
	}
	
	var i = summ % 10;
	return i == 0;
}

function resetForm() {
	var width = screen.width;
	document.getElementById("credit_card").style.backgroundImage = "url(images/credit-card.jpg)"
	if(width < 430){
      	document.getElementById("credit_card").style.backgroundImage = "url(images/credit-card-small.jpg)";
    }

    document.getElementById("cardForm").reset();
    document.getElementById("result-false").style.display = "none";
	document.getElementById("result-true").style.display = "none";
}









