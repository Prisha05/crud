const sql = require('mssql');

// Define the MS SQL schema for the Users table
const schema = {
    id: {
        type: sql.Int,
        primaryKey: true,
        identity: true // Auto-increment
    },
    username: {
        type: sql.NVarChar(255),
        required: true
    },
    groupname: {
        type: sql.NVarChar(255),
        required: true
    },
    read: {
        type: sql.Bit,
        required: true
    },
    write: {
        type: sql.Bit,
        required: true
    },
    delete: {
        type: sql.Bit,
        required: true
    },
    lastmodifieddate: {
        type: sql.DateTime,
        required: true,
        defaultValue: sql.Default
    }
};

// Define the Users model
const Tbl_Arysoft_Users = {
    // Function to create a new user
    create: async (username, groupName, readPermission, writePermission, deletePermission) => {
        try {
            const pool = await sql.connect({
                server: 'DESKTOP-QFFK0ME\\SQLEXPRESS', // Replace with your SQL Server instance name
                database: 'master',
                user: 'sa',
                password: '123456'
            });

            const result = await pool.request()
                .input('Username', sql.NVarChar(255), username)
                .input('GroupName', sql.NVarChar(255), groupName)

                .input('ReadPermission', sql.Bit, readPermission)
                .input('WritePermission', sql.Bit, writePermission)
                .input('DeletePermission', sql.Bit, deletePermission)
                .query(`INSERT INTO Tbl_Arysoft_Users (Username, GroupName, ReadPermission, WritePermission, DeletePermission, LastModifiedDate) 
                        VALUES (@Username, @GroupName, @ReadPermission, @WritePermission, @DeletePermission, GETDATE())`);
            
            return result.recordset;
        } catch (err) {
            console.error('Error creating user:', err);
            throw err;
        }
    },
    // Add more functions for CRUD operations as needed
};





module.exports = Tbl_Arysoft_Users;