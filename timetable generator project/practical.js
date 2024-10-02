const subjects = {
    "1st": ["Lab 1", "Lab 2", "Chemistry Lab"],
    "2nd": ["Biology Lab", "Statistics Lab", "Programming Lab"],
    "3rd": ["Software Testing Lab", "Computer Security Lab", "Network Management Lab"]
};

const faculty = {
    "1st": ["Prof. A", "Prof. B", "Prof. C"],
    "2nd": ["Prof. D", "Prof. E", "Prof. F"],
    "3rd": ["RMK", "RVM", "VAP", "PSS"]
};

// Function to populate subjects and faculty based on the selected year
function populateDropdowns() {
    const year = localStorage.getItem('selectedYear');
    const subjectSelect = document.getElementById('subject');
    const facultySelect = document.getElementById('faculty');

    // Clear previous options
    subjectSelect.innerHTML = '<option value="">Select a subject</option>';
    facultySelect.innerHTML = '<option value="">Select a faculty</option>';

    // Populate subjects
    if (subjects[year]) {
        subjects[year].forEach(subject => {
            const option = document.createElement('option');
            option.value = subject;
            option.textContent = subject;
            subjectSelect.appendChild(option);
        });
    }

    // Populate faculty
    if (faculty[year]) {
        faculty[year].forEach(facultyName => {
            const option = document.createElement('option');
            option.value = facultyName;
            option.textContent = facultyName;
            facultySelect.appendChild(option);
        });
    }
}

// Call populateDropdowns on page load
window.onload = populateDropdowns;

// Function to save data to localStorage
function saveData(data) {
    let existingData = getExistingData();
    existingData = existingData.concat(data);
    localStorage.setItem('timetableData', JSON.stringify(existingData));
}

// Function to retrieve existing data from localStorage
function getExistingData() {
    const data = localStorage.getItem('timetableData');
    return data ? JSON.parse(data) : [];
}

// Handle form submission to generate the timetable
document.getElementById('practicalPage').addEventListener('submit', function (event) {
    event.preventDefault();

    // Retrieve selected values
    const shift = document.getElementById('shift').value;
    const subject = document.getElementById('subject').value;
    const timeSlot = document.getElementById('timeSlot').value;
    const batch = document.getElementById('batch').value; // Get selected batch
    const classroom = document.getElementById('classroom').value; // Get selected classroom
    const facultyName = document.getElementById('faculty').value;

    // Retrieve first-page data
    const days = JSON.parse(localStorage.getItem('selectedDays'));
    const semester = localStorage.getItem('selectedSemester');
    const year = localStorage.getItem('selectedYear');

    // Create a new timetable entry for practicals
    const practicalData = [
        {
            year,
            semester,
            days: days.join(', '),
            shift,
            subject,
            timeSlot,
            batch,          // Include batch
            classroom,      // Include classroom
            faculty: facultyName,
            sessionType: 'Practical'
        }
    ];

    // Save the new practical timetable entry to localStorage
    saveData(practicalData);

    // Prepare data for Excel export
    const allData = getExistingData();
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(allData);
    XLSX.utils.book_append_sheet(wb, ws, "Timetable");

    // Export to Excel
    XLSX.writeFile(wb, "Timetable.xlsx");
});
