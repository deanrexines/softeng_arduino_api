var customerList = new Firebase("https://incandescent-fire-3535.firebaseIO.com/users");	

/*
function saveToList(event){
	var carName = document.getElementById('carName').value.trim();
	document.getElementById('carName').value = '';
	return false;
}
*/


//customerList.on("value", function(snapshot){
	
//customerList.orderByValue("balance").on("value", function(snapshot){

	//});
customerList.once("value", function(snapshot){	
	var data = snapshot.val();
//	window.alert(data.balance);
	
	var list=[];
	for(var key in data){
		if(data.hasOwnProperty(key)){
			firstname = data[key].firstname ? data[key].firstname : '';
			lastname = data[key].lastname ? data[key].lastname : '';
			balance = data[key].balance ? data[key].balance : '';
			email = data[key].email ? data[key].email : '';			
			paymentform = data[key].paymentform ? data[key].paymentform : '';
			phonenumber = data[key].phonenumber ? data[key].phonenumber : '';
			vehicles = data[key].vehicles ? data[key].vehicles : '';
		//	if(balance.trim().length > 0 ){
				list.push({
					firstname: firstname,
					lastname: lastname,
					balance: balance,
					email: email,
					paymentform: paymentform,
					phonenumber: phonenumber,
					//vehicles: vehicles,
					key: key		
				})
		//	}
			
		}
	}
	
	refreshUI(list);
	
});
/* */

function refreshUI(list){
	var customers = "";
	for(var i=0; i<list.length; i++){
		customers += '<tr><td>' + list[i].firstname +  '</td> <td>' + list[i].lastname + '</td> <td>' + list[i].balance + '</td> <td>' + list[i].email + '</td> <td>' + list[i].paymentform + '</td> <td>' + list[i].phonenumber + '</td></tr>'; 
	};
	document.getElementById('customerList').innerHTML = customers;
};