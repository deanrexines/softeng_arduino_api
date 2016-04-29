var carsList = new Firebase("https://incandescent-fire-3535.firebaseIO.com/vehicles");	

/*
function saveToList(event){
	var carName = document.getElementById('carName').value.trim();
	document.getElementById('carName').value = '';
	return false;
}
*/


//carsList.on("value", function(snapshot){
	
//carsList.orderByValue("licenseplate").on("value", function(snapshot){

	//});
carsList.once("value", function(snapshot){	
	var data = snapshot.val();
//	window.alert(data.licenseplate);	
	
	var list=[];
	var overstay = [];
	for(var key in data){
		if(data.hasOwnProperty(key)){
			licenseplate = data[key].licenseplate ? data[key].licenseplate : '';
			make = data[key].make ? data[key].make : '';			
			model = data[key].model ? data[key].model : '';
			year = data[key].year ? data[key].year : '';
			timestamp = data[key].timestamp ? data[key].timestamp : '';
			user = data[key].timestamp ? data[key].user : '';
			spot = data[key].timestamp ? data[key].spot : ''; 
			if(licenseplate.trim().length > 0 && timestamp > 0){
				list.push({
					licenseplate: licenseplate,
					make: make,
					model: model,
					year: year,
					timestamp: timestamp,
					user: user,
					spot: spot,
					key: key		
				})
			}
			else if(timestamp < 0){
				overstay.push({
					licenseplate: licenseplate,
					make: make,
					model: model,
					year: year,
					timestamp: timestamp,
					user: user,
					spot: spot,
					key: key		
				})
				
			}
			
		}
	}
	
	refreshUI(list, overstay);
	
});
/* */

function refreshUI(list, overstay){
	var cars = "";
	for(var i=0; i<list.length; i++){
		cars += '<tr><td>' + list[i].licenseplate + '</td> <td>' + list[i].make + '</td> <td>' + list[i].model + '</td> <td>' + list[i].year + '</td> <td>' + list[i].timestamp + '</td> <td>' + list[i].user + '</td> <td>' + list[i].spot +'</td></tr> '; 
	};
	document.getElementById('carsList').innerHTML = cars;

	var overstays = "";
	for(var i=0; i<overstay.length; i++){
		overstays += '<tr><td>' + overstay[i].licenseplate + '</td> <td>' + overstay[i].make + '</td> <td>' + overstay[i].model + '</td> <td>' + overstay[i].year + '</td> <td>' + overstay[i].timestamp + '</td> <td>' + overstay[i].user + '</td> <td>' + overstay[i].spot +'</td></tr> '; 
	};	
	document.getElementById('overstayList').innerHTML = overstays;
};var carsList = new Firebase("https://incandescent-fire-3535.firebaseIO.com/vehicles");	

/*
function saveToList(event){
	var carName = document.getElementById('carName').value.trim();
	document.getElementById('carName').value = '';
	return false;
}
*/


//carsList.on("value", function(snapshot){
	
//carsList.orderByValue("licenseplate").on("value", function(snapshot){

	//});
carsList.once("value", function(snapshot){	
	var data = snapshot.val();
//	window.alert(data.licenseplate);	
	
	var list=[];
	var overstay = [];
	for(var key in data){
		if(data.hasOwnProperty(key)){
			licenseplate = data[key].licenseplate ? data[key].licenseplate : '';
			make = data[key].make ? data[key].make : '';			
			model = data[key].model ? data[key].model : '';
			year = data[key].year ? data[key].year : '';
			timestamp = data[key].timestamp ? data[key].timestamp : '';
			user = data[key].timestamp ? data[key].user : '';
			spot = data[key].timestamp ? data[key].spot : ''; 
			if(licenseplate.trim().length > 0 && timestamp > 0){
				list.push({
					licenseplate: licenseplate,
					make: make,
					model: model,
					year: year,
					timestamp: timestamp,
					user: user,
					spot: spot,
					key: key		
				})
			}
			else if(timestamp < 0){
				overstay.push({
					licenseplate: licenseplate,
					make: make,
					model: model,
					year: year,
					timestamp: timestamp,
					user: user,
					spot: spot,
					key: key		
				})
				
			}
			
		}
	}
	
	refreshUI(list, overstay);
	
});
/* */

function refreshUI(list, overstay){
	var cars = "";
	for(var i=0; i<list.length; i++){
		cars += '<tr><td>' + list[i].licenseplate + '</td> <td>' + list[i].make + '</td> <td>' + list[i].model + '</td> <td>' + list[i].year + '</td> <td>' + list[i].timestamp + '</td> <td>' + list[i].user + '</td> <td>' + list[i].spot +'</td></tr> '; 
	};
	document.getElementById('carsList').innerHTML = cars;

	var overstays = "";
	for(var i=0; i<overstay.length; i++){
		overstays += '<tr><td>' + overstay[i].licenseplate + '</td> <td>' + overstay[i].make + '</td> <td>' + overstay[i].model + '</td> <td>' + overstay[i].year + '</td> <td>' + overstay[i].timestamp + '</td> <td>' + overstay[i].user + '</td> <td>' + overstay[i].spot +'</td></tr> '; 
	};	
	document.getElementById('overstayList').innerHTML = overstays;
};
