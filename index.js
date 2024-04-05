// Frontend code for creating a new user
document.getElementById('add-user').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission
    const groupName = document.getElementById('groupname').value;
    const readPermission = document.getElementById('read-option').checked;
    const writePermission = document.getElementById('write-option').checked;
    const deletePermission = document.getElementById('delete-option').checked;

    const data = {
        groupname: groupName,
        read: readPermission,
        write: writePermission,
        delete: deletePermission
    };

    // Send data to backend using fetch
    fetch('/api/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('User created successfully:', data);
        // Redirect or show success message as needed
        alert('User created successfully');
    })
    .catch(error => {
        console.error('Error creating user:', error);
        // Handle error, show error message, etc.
        alert('Error creating user');
    });
});

// Function to handle form submission for updating a user
$("#update_user").submit(function(event){
    event.preventDefault();

    var unindexed_array = $(this).serializeArray();
    var data = {}

    $.map(unindexed_array, function(n, i){
        data[n['name']] = n['value']
    })

    var request = {
        "url" : `http://localhost:3000/api/users/${data.id}`,
        "method" : "PUT",
        "data" : data
    }

    $.ajax(request).done(function(response){
        alert("Data Updated Successfully!");
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
        console.error("Error updating user:", textStatus, errorThrown);
        // Handle error, show error message, etc.
        alert("Error updating user");
    });
});

// Function to handle deletion of a user
if(window.location.pathname == "/"){
    $ondelete = $(".table tbody td a.delete");
    $ondelete.click(function(){
        var id = $(this).attr("data-id")

        var request = {
            "url" : `http://localhost:3000/api/users/${id}`,
            "method" : "DELETE"
        }

        if(confirm("Do you really want to delete this record?")){
            $.ajax(request).done(function(response){
                alert("Data Deleted Successfully!");
                location.reload();
            })
            .fail(function(jqXHR, textStatus, errorThrown) {
                console.error("Error deleting user:", textStatus, errorThrown);
                // Handle error, show error message, etc.
                alert("Error deleting user");
            });
        }
    })
}
