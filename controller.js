const Tbl_Arysoft_Users = require('../model/model');

// Create and save a new group
exports.create = async (req, res) => {
    try {
        // Validate request body
        if (!req.body || !req.body.groupname) {
            return res.status(400).send({ message: "Group name is required!" });
        }

        // Extract relevant data from request
        const { groupname, read, write, del } = req.body;
        
        // Capture current date and time
        const currentDate = new Date();
        const last_modified_date = currentDate.toISOString(); // Assuming no modifications initially

        // Example: Extract username from request headers (You need to implement this according to your authentication logic)
        const username = req.headers.username || 'Unknown User';

        // Insert the new group into the database
        await Tbl_Arysoft_Users.create(username, groupname, read || false, write || false, del || false);

        res.status(201).send({ message: "Group created successfully!" });
    } catch (err) {
        console.error('Error creating group:', err);
        res.status(500).send({ message: "Error occurred while creating a group" });
    }
}

// Retrieve and return all users
exports.getAll = async (req, res) => {
    try {
        const users = await Tbl_Arysoft_Users.getAll(); // Call the getAll function from the model
        res.send(users);
    } catch (err) {
        res.status(500).send({ message: "Error occurred while retrieving users" });
    }
}

// Update user information by user id
exports.update = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).send({ message: "Data to update can not be empty" });
        }
        const id = req.params.id;
        // Update the user using the model method
        await Tbl_Arysoft_Users.update(id, req.body);
        res.send({ message: "User updated successfully!" });
    } catch (err) {
        res.status(500).send({ message: "Error updating user information" });
    }
}

// Delete user by user id
exports.delete = async (req, res) => {
    try {
        const id = req.params.id;
        // Delete the user using the model method
        await Tbl_Arysoft_Users.delete(id);
        res.send({ message: "User deleted successfully!" });
    } catch (err) {
        res.status(500).send({ message: "Could not delete user with id=" + id });
    }
}
