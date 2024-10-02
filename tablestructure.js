function populateTimetable() {
    let timetableData = {
        Monday: ["Math", "Physics", "Chemistry", "Biology", "English", "PE", "History"],
        Tuesday: ["Geography", "Math", "Physics", "Chemistry", "PE", "English", "Computer Science"],
        Wednesday: ["Biology", "English", "Math", "History", "Geography", "Physics", "PE"],
        Thursday: ["Chemistry", "Biology", "English", "Math", "History", "Geography", "Computer Science"],
        Friday: ["Physics", "Math", "Chemistry", "Biology", "PE", "History", "English"],
        Saturday: ["Math", "PE", "History", "Geography", "Chemistry", "Physics", "Biology"]
    };

    Object.keys(timetableData).forEach(day => {
        let row = document.querySelector(tbody, tr, td,first-child,contains($,{day})).parentElement;
        let classes = timetableData[day];
        classes.forEach((subject, index) => {
            row.children[index + 1].textContent = subject;
        });
    });
}

// Function to clear the timetable
function clearTimetable() {
    let cells = document.querySelectorAll("tbody td");
    cells.forEach(cell => {
        if (cell.textContent !== "" && cell.cellIndex !== 0) {
            cell.textContent = "";
        }
    });
}

// Add event listeners for buttons
document.getElementById('populate-btn').addEventListener('click', populateTimetable);
document.getElementById('clear-btn').addEventListener('click', clearTimetable);





 // Create a new timetable entry with all fields
 const newData = [
    {
        year,
        semester,
        days: days.join(', '),  // Join array to string for better display
        shift,
        subject,
        timeSlot,
        faculty: facultyName,
        sessionType: 'Theory' // Specify the session type as Theory
    }
];

// Save the new timetable entry to localStorage
saveData(newData);

// Export all data to Excel (using XLSX library)
const allData = getExistingData();
const wb = XLSX.utils.book_new();
const ws = XLSX.utils.json_to_sheet(allData);
XLSX.utils.book_append_sheet(wb, ws, "Timetable");

XLSX.writeFile(wb, "Timetable.xlsx");

// Refresh time slots for the next subject
populateTimeSlots();