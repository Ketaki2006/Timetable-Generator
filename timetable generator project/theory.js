// const subjects = {
//     "1st": ["Maths", "Physics", "Chemistry"],
//     "2nd": ["Biology", "Statistics", "Programming"],
//     "3rd": ["Software Testing", "Computer Security", "Network Management and Administration", "Data Analytics using R", "Major Project"]
// };

// const faculty = {
//     "1st": ["Prof. A", "Prof. B", "Prof. C"],
//     "2nd": ["Prof. D", "Prof. E", "Prof. F"],
//     "3rd": ["Prof. G", "Prof. H", "Prof. I"]
// };

// // Function to get existing data from local storage
// function getExistingData() {
//     const data = localStorage.getItem('timetableData');
//     return data ? JSON.parse(data) : [];
// }

// // Function to save new data to local storage
// function saveData(newData) {
//     const existingData = getExistingData();
//     existingData.push(...newData);
//     localStorage.setItem('timetableData', JSON.stringify(existingData));
// }

// // Populate subjects and faculty based on the selected year
// function populateDropdowns() {
//     const year = localStorage.getItem('selectedYear');
//     const subjectSelect = document.getElementById('subject');
//     const facultySelect = document.getElementById('faculty');
    
//     // Clear previous options
//     subjectSelect.innerHTML = '<option value="">Select a subject</option>';
//     facultySelect.innerHTML = '<option value="">Select a faculty</option>';

//     // Populate subjects
//     if (subjects[year]) {
//         subjects[year].forEach(subject => {
//             const option = document.createElement('option');
//             option.value = subject;
//             option.textContent = subject;
//             subjectSelect.appendChild(option);
//         });
//     }

//     // Populate faculty
//     if (faculty[year]) {
//         faculty[year].forEach(facultyName => {
//             const option = document.createElement('option');
//             option.value = facultyName;
//             option.textContent = facultyName;
//             facultySelect.appendChild(option);
//         });
//     }
// }

// // Call populateDropdowns on page load
// window.onload = populateDropdowns;

// // Handle form submission to generate the timetable
// document.getElementById('secondPage').addEventListener('submit', function (event) {
//     event.preventDefault();

//     // Retrieve selected shift, subject, timeSlot, faculty, and classroom
//     const shift = document.getElementById('shift').value;
//     const subject = document.getElementById('subject').value;
//     const timeSlot = document.getElementById('timeSlot').value;
//     const facultyName = document.getElementById('faculty').value;
//     const classroom = document.getElementById('classroom').value; // Retrieve selected classroom

//     // Retrieve first-page data
//     const days = JSON.parse(localStorage.getItem('selectedDays'));
//     const semester = localStorage.getItem('selectedSemester');
//     const year = localStorage.getItem('selectedYear');

//     // Check if days are correctly retrieved
//     console.log('Days:', days);

//     // Create a new timetable entry with all fields
//     const newData = [
//         {
//             year,
//             semester,
//             days: days.join(', '),  // Join array to string for better display
//             shift,
//             subject,
//             timeSlot,
//             faculty: facultyName,
//             classroom,  // Include classroom in the new data
//             sessionType: 'Theory' // Specify the session type as Theory
//         }
//     ];

//     // Save the new timetable entry to localStorage
//     saveData(newData);

//     // Export all data to Excel (using XLSX library)
//     const allData = getExistingData();
//     const wb = XLSX.utils.book_new();
//     const ws = XLSX.utils.json_to_sheet(allData);
//     XLSX.utils.book_append_sheet(wb, ws, "Timetable");

//     XLSX.writeFile(wb, "Timetable.xlsx");
// });


const subjects = {
    "1st": ["Maths", "Physics", "Chemistry"],
    "2nd": ["Biology", "Statistics", "Programming"],
    "3rd": ["Software Testing", "Computer Security", "Network Management and Administration", "Data Analytics using R", "Major Project"]
};

const faculty = {
    "1st": ["Prof. A", "Prof. B", "Prof. C"],
    "2nd": ["Prof. D", "Prof. E", "Prof. F"],
    "3rd": ["RMK", "RVM", "VAP", "PSS"]
};

// Track selected time slots
let selectedTimeSlots = [];

// Function to get existing data from local storage
function getExistingData() {
    const data = localStorage.getItem('timetableData');
    return data ? JSON.parse(data) : [];
}

// Function to save new data to local storage
function saveData(newData) {
    const existingData = getExistingData();
    existingData.push(...newData);
    localStorage.setItem('timetableData', JSON.stringify(existingData));
}

// Populate subjects and faculty based on the selected year
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

    // Populate time slots and remove selected ones
    populateTimeSlots();
}

// Call populateDropdowns on page load
window.onload = populateDropdowns;

// Function to populate time slots, excluding selected ones
function populateTimeSlots() {
    const timeSlotSelect = document.getElementById('timeSlot');

    // Clear previous options
    timeSlotSelect.innerHTML = '';

    // Time slot options
    const timeSlots = [
        "10:00-11:00",
        "11:00-12:00",
        "12:00-1:00",
        "1:00-2:00",
        "2:00-3:00",
        "3:00-4:00",
        "4:00-5:00"
    ];

    // Filter out already selected time slots
    const availableTimeSlots = timeSlots.filter(slot => !selectedTimeSlots.includes(slot));

    // Add available time slots to the dropdown
    availableTimeSlots.forEach(slot => {
        const option = document.createElement('option');
        option.value = slot;
        option.textContent = slot;
        timeSlotSelect.appendChild(option);
    });
}

// Handle time slot selection and track it
document.getElementById('timeSlot').addEventListener('change', function () {
    const selectedTimeSlot = this.value;

    // Add the selected time slot to the array (if it's not already there)
    if (!selectedTimeSlots.includes(selectedTimeSlot)) {
        selectedTimeSlots.push(selectedTimeSlot);
    }
});

// Handle form submission to generate the timetable
document.getElementById('secondPage').addEventListener('submit', function (event) {
    event.preventDefault();

    // Retrieve selected shift, subject, timeSlot, faculty, and session type
    const shift = document.getElementById('shift').value;
    const subject = document.getElementById('subject').value;
    const timeSlot = document.getElementById('timeSlot').value;
    const facultyName = document.getElementById('faculty').value;

    // Retrieve first-page data
    const days = JSON.parse(localStorage.getItem('selectedDays'));
    const semester = localStorage.getItem('selectedSemester');
    const year = localStorage.getItem('selectedYear');

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
});
