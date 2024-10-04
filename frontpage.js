document.getElementById('viewbtn').onclick = function () {
    // Check if a timetable exists in localStorage
    const savedTimetable = localStorage.getItem('timetable');
    
    if (savedTimetable) {
        // If a timetable exists, show it (for now using an alert, can be modified)
        const timetable = JSON.parse(savedTimetable);
        alert("Your previous timetable:\n" + JSON.stringify(timetable, null, 2)); // Display as formatted JSON
    } else {
        // If no timetable exists, show an alert
        alert("You don't have any previous timetable created.");
    }
};


// function saveTimetable(timetableData) {
//     localStorage.setItem('timetable', JSON.stringify(timetableData));
// }