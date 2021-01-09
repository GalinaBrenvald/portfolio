function sendForm() {
	if($("#contactForm").valid()){
		var datas = { name: $('[name="name"]').val(),
			email: $('[name="email"]').val(),
			comments: $('[name="comments"]').val()}
		$.ajax({
		    type: "POST",
		    url:  "form.php",
		    dataType: 'json',
		    data: datas ,
		    success:function(data){
		        if(data != null && data.length > 0 && data[0] == "success"){
		           onMailSent();
		        } else {
		           onMailFailed();
		        }
		    }
		});
	}
}

var validator;

$(function(){
	validator = $("#contactForm").validate({
		rules: {
			name: {
				required: true,
				digits: false
			},
			email: {
				required: true,
				email: true
			}
		},
		focusCleanup: true,
		focusInvalid: false
	});	
})

window.onload = function(){
	document.getElementById("btn-submit").addEventListener("click",sendForm);
}

function showModalWindow(message, isResetForm){
	var buttonConfirm = document.getElementById("btn_confirm");
	var buttonClose = document.getElementById("btn_close");
	buttonConfirm.removeEventListener("click", resetContactForm);
	buttonClose.removeEventListener("click", resetContactForm);

	if(isResetForm){
		buttonConfirm.addEventListener("click", resetContactForm);
		buttonClose.addEventListener("click", resetContactForm);
	}

var darkLayer = document.createElement('div');
		darkLayer.id = 'shadow';
		document.body.appendChild(darkLayer);

		var modalWindow = document.getElementById('modal');
		modalWindow.style.display = 'block';

		var newElem = document.getElementById('modal_body');
		newElem.innerHTML = message;
		
		btn_close.onclick  = function(){
			darkLayer.parentNode.removeChild(darkLayer);
			modalWindow.style.display = 'none';
		};

		btn_confirm.onclick  = function(){
			darkLayer.parentNode.removeChild(darkLayer);
			modalWindow.style.display = 'none';
		};
}

function onMailSent(){
	 showModalWindow("Your Message has been successfully sent", true);
}

function onMailFailed(){
	showModalWindow("Message Failed to Send", false);		
}

function resetContactForm(){
	document.getElementById("contactForm").reset();
}


