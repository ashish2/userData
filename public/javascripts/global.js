// UserLIst data array for filling in info box
var userListData = [];

// Dom Ready
$(document).ready(function(){

	// Populate the user table on initial page load
	populateTable();


	$("#userList table tbody").on("click", "td a.linkshowuser", showUserInfo);

	// Add User routine
	$("#btnAddUser").on("click", addUser);

	// Delete User routine
	$("#userList table tbody").on("click", "td a.linkdeleteuser", deleteUser);

	// Update user
	$("#userList table tbody").on("click", "td a.linkupdateuser", updateUser);

	$("#btnUpdateUser").on("click", doUpdateUser);

});

function populateTable(){
	// Empty content string
	var tableContent = '';
	$.getJSON('/user/list', function(data){
		userListData = data;
		$.each(data, function(){
			// For each item in our JSON, add a table row and cells to the 
			// content string.
			tableContent += '<tr>';
			tableContent += '<td><a href="#" class="linkshowuser" rel="' + this.username + '" title="Show Details">' + this.username + '</a></td>';
			tableContent += '<td>' + this.email + '</td>';
			tableContent += '<td><a href="#" class="linkupdateuser" rel="' + this._id + '">update</a></td>';
			tableContent += '<td><a href="#" class="linkdeleteuser" rel="' + this._id + '">delete</a></td>';
			tableContent += '</tr>';
		});
		// Inject the whole content string into our existing HTML table
		$("#userList table tbody").html(tableContent);
	});
}

// Show user info
function showUserInfo(event){
	// prevent link from firing
	event.preventDefault();

	// retrieve username from link rel attribute
	var thisUserName = $(this).attr('rel');

	// Get Index of object based on id value
	var arrayPosition = userListData.map( function(arrayItem){
		return arrayItem.username;
	}).indexOf(thisUserName);

	var thisUserObject = userListData[arrayPosition];

	// Populate info box
	$("#userInfoName").text(thisUserObject.fullname);
	$("#userInfoAge").text(thisUserObject.age);
	$("#userInfoGender").text(thisUserObject.gender);
	$("#userInfoLocation").text(thisUserObject.location);	
}

// Add user
function addUser(event){
	event.preventDefault();

	// Super basic validation - increase errorCount variable if any fields are blank
	var errorCount = 0;
	$("#addUser input").each(function(index, val){
		if($(this).val() === '') {errorCount++; }
	});

	// Checck and make sure errorCount's still at zero 
	if(errorCount === 0){
		// iF it is, compile all user info into one object
		var newUser = {
			'username': $('#addUser fieldset input#inputUserName').val(),
			'email': $('#addUser fieldset input#inputUserEmail').val(),
			'fullname': $('#addUser fieldset input#inputUserFullName').val(),
			'age': $('#addUser fieldset input#inputUserAge').val(),
			'location': $('#addUser fieldset input#inputUserLocation').val(),
			'gender': $('#addUser fieldset input#inputUserGender').val(),
		};

		// User AJAX to post the object to our adduser service
		$.ajax({
			type: 'POST',
			data: newUser,
			url: '/user/add',
			dataType: 'JSON'
		}).done(function(response){
			// Check for successful (blank) response
			if(response.msg === ''){
				// Clear the form inputs
				$('#addUser fieldset input').val('');
				// Update the table
				populateTable();
			}
			else {
				// If something goes wrong, alert the error msg that our service returned
				alert('Error: ' + response.msg);
			}
		});
	} 
	else{
		// If errorCount is more than 0, error out
		alert('Please fill in all fields');
		return false;
	}
};

// Delete User
function deleteUser(event){
	event.preventDefault();

	// Pop up a confirmation dialog
	var confirmation = confirm("Are you sure you want to delete this user?");

	// Check and make sure the user confirmed
	if( confirmation == true){
		// If they did, do our delete
		$.ajax({
			type: 'DELETE',
			url: '/user/del/' + $(this).attr('rel'),
		}).done(function(response){
			// Check for a successful (Blank) response
			if(response.msg === ''){
			}
			else{
				alert("Error: " + response.msg);
			}

			// Update the table
			populateTable();
		});
	}
	else{
		// If they said no to the confirm, do nothing.
		return false;
	}

};


function updateUser(event){
	event.preventDefault();

	var rel = $(this).attr('rel');
	var obj = null;
	// userListData
	$.each(userListData, function(i, v) {
		if(v._id === rel ){
			obj = v;
		}
	});
	console.log("obj");
	console.log(obj);

	$('#updateUser fieldset input#rid').val(obj['_id']);
	$('#updateUser fieldset input#inputUserName').val(obj['username']);
	$('#updateUser fieldset input#inputUserEmail').val(obj['email']);
	$('#updateUser fieldset input#inputUserFullName').val(obj['fullname']);
	$('#updateUser fieldset input#inputUserAge').val(obj['age']);
	$('#updateUser fieldset input#inputUserLocation').val(obj['location']);
	$('#updateUser fieldset input#inputUserGender').val(obj['gender']);
}

function doUpdateUser(event){

	// Pop up a confirmation dialog
	// var confirmation = confirm("Are you sure you want to update this user?");
	var errorCount = 0;
	$("#updateUser input").each(function(index, val){
		if($(this).val() === '') {errorCount++; }
	});

	// Checck and make sure errorCount's still at zero 
	if(errorCount === 0){
		var rid = $('#updateUser fieldset input#rid').val()
		// iF it is, compile all user info into one object
		var newUser = {
			'username': $('#updateUser fieldset input#inputUserName').val(),
			'email': $('#updateUser fieldset input#inputUserEmail').val(),
			'fullname': $('#updateUser fieldset input#inputUserFullName').val(),
			'age': $('#updateUser fieldset input#inputUserAge').val(),
			'location': $('#updateUser fieldset input#inputUserLocation').val(),
			'gender': $('#updateUser fieldset input#inputUserGender').val(),
		};

		// User AJAX to post the object to our adduser service
		$.ajax({
			type: 'PUT',
			data: newUser,
			url: '/user/upd/' + rid,
			dataType: 'JSON'
		}).done(function(response){

			// Check for successful (blank) response
			if(response.msg === ''){
				// Clear the form inputs
				$('#updateUser fieldset input').val('');
				// Update the table
				populateTable();
			}
			else {
				// If something goes wrong, alert the error msg that our service returned
				alert('Error: ' + response.msg);
			}
		});

	} 
	else{
		// If errorCount is more than 0, error out
		alert('Please fill in all fields');
		return false;
	}

}












