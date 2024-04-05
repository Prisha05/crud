const sql = require('mssql');

// Config for your database connection
const config = {
  server: 'DESKTOP-QFFK0ME\\SQLEXPRESS',
  database: 'master',
  user: 'sa', // SQL Server login name
  password: '123456', // Password for the login
  options: {
    encrypt: true, // Use encryption (if required)
    trustServerCertificate: true
  }
};



// Function to insert data into the Tbl_Arysoft_Users table
async function insertData() {
  try {
    // Connect to the database
    const pool = await sql.connect(config);

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    rl.question('Enter username: ', async (username) => {
      rl.question('Enter groupname: ', async (groupname) => {
        rl.question('Enter Read (true/false): ', async (read) => {
          rl.question('Enter Write (true/false): ', async (write) => {
            rl.question('Enter Delete (true/false): ', async (del) => {
              // Query to insert data into the Tbl_Arysoft_Users table
              const query = `
                INSERT INTO Tbl_Arysoft_Users(username, [date], groupname, last_modified_date, [Read], [Write], [Delete])
                VALUES (@username, @date, @groupname, @last_modified_date, @read, @write, @del)
              `;

              // Create a new request object
              const request = pool.request();

              // Add parameters to the request
              request.input('username', sql.NVarChar(255), username);
              request.input('date', sql.DateTime, new Date());
              request.input('groupname', sql.NVarChar(255), groupname);
              request.input('last_modified_date', sql.DateTime, new Date());
              request.input('read', sql.Bit, read);
              request.input('write', sql.Bit, write);
              request.input('del', sql.Bit, del);

              // Execute the query
              await request.query(query);
              console.log('Data inserted successfully.');

              rl.close();
              sql.close();
            });
          });
        });
      });
    });
  } catch (err) {
    console.error('Error inserting data:', err);
  }
}

// Call the function to insert data
insertData();
