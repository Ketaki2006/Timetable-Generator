const sql = require('mssql');

// const config = {
//     server: 'LAPTOP-6IHP1LQE\SQLEXPRESS',  // or your server address
//     database: 'ttgenerator',
//     options: {
//         encrypt: true,  // Use encryption (for Azure)
//         trustServerCertificate: true  // If using self-signed certificates
//     },
//     authentication: {
//         type: 'ntlm',  // For Windows Authentication
//         options: {
//             domain: '',  // Leave blank if not in a domain
//             userName: '',  // Leave blank for current Windows user
//             password: ''   // Leave blank for Windows authentication
//         }
//     }
// };

const sqlConfig = {
    database: "ttgenerator",
    server: 'localhost',
    pool: {
      max: 10,
      min: 0,
      idleTimeoutMillis: 30000
    },
    options: {
      encrypt: true, // for azure
      trustServerCertificate: false // change to true for local dev / self-signed certs
    }
  }


async function saveToDatabase(data) {
    try {
      await sql.connect(sqlConfig);
      console.log("DB connected");
      const request = new sql.Request();
      const result = await request
        .input('param1', sql.VarChar, data.days)
        .input('param2', sql.VarChar, data.semester)
        // .input('param3', sql.VarChar, data.year)
        // .input('param4', sql.VarChar, data.pageType)
        // .input('param5', sql.VarChar, data.shift)
        // .input('param6', sql.VarChar, data.subject)
        // .input('param7', sql.VarChar, data.timeSlot)
        // .input('param8', sql.VarChar, data.classroom)
        // .input('param9', sql.VarChar, data.faculty)
        .query('INSERT INTO Timetable (days, Semester, Year, Pagetype, Shift, Subject, timeslot, Classroom, Faculty) VALUES (@param1, @param2, @param3, @param4, @param6, @param7, @param8, @param9)');
      console.log('Data saved', result);
    } catch (err) {
      console.error('Database error:', err);
    }
  }

  saveToDatabase({
    days:"dc",
    semester:"odd"

  })
module.exports = sqlConfig;