$(document).ready(function(){
	$('[data-toggle="tooltip"]').tooltip()
	$('#url').on('change',function(e){
			var web_address = $(this).val();
			if(/^(http|https|ftp):\/\/[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i.test($("#url").val())){
			    //alert("valid URL");
			    $('#usersUrl').addClass('has-success').addClass('has-feedback');
			    $('#urlApproved').addClass('glyphicon glyphicon-ok form-control-feedback');
			    $('#submitButton').removeAttr('disabled');
			} else {
			    //alert("invalid URL");
			    $('#usersUrl').addClass('has-error').addClass('has-feedback');
			    $('#urlApproved').addClass('glyphicon glyphicon-remove form-control-feedback');
			    $('#submitButton').attr('disabled','disabled');
			}
	});
	$('#key').on('keyup',function(e){
		var custom_key = $(this).val();
		if(custom_key.length!=0){
			console.log('keyup: '+custom_key);
			$.ajax({
				type: "POST",
				url: "/check",
				data: { key:custom_key },
				success: function(data)
				{	
					//console.log(data);
					if(data=="exists"){
						$('#customUrlBanner').html('<p class="bg-danger">Not Available</p>');
						$('#submitButton').attr('disabled','disabled');
					}else{
						$('#customUrlBanner').html('<p class="bg-success">Available</p>');
						$('#submitButton').removeAttr('disabled');
					}			
				},
				error: function(data)
				{
					console.log('Custom URL Check Request Failed! :(');				
				}
				});
			}else
			{
					$('#submitButton').removeAttr('disabled');
			}


	});

	$('#shortUrlCreatorForm').submit(function(e){
		e.preventDefault();
		var u = $('#url').val();
		var k = $('#key').val();
			$.ajax({
				type: "POST",
				url: "/create",
				data: { url: u,key: k},
				success: function(data)
				{	
					console.log('d'+data);
					if(data){
						$('#result').html('<p class="bg-success">Alas! Here is your short url<br/><div class="form-group"><div class="input-group"><div class="input-group-addon"><span class="glyphicon glyphicon-link" aria-hidden="true"></span></div><input type="text" class="form-control input-sm"  id="resultKey" name="resultKey" value=http://vipurl.herokuapp.com/'+data+' readonly></div></div></p>');
					}else{
						$('#result').html('<p class="bg-danger">Some Error Occured!</p>');
					}			
				},
				error: function(data)
				{
					console.log('Custom URL Generate Request Failed! :(');				
				}
				});
	});
})


	var url = window.location.hostname;
	document.getElementById("webHost").innerHTML='http://'+url+'/';
