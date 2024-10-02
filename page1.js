document.getElementById('nextPageButton').addEventListener('click', function () {
    const pageType = document.getElementById('pageType').value;
    const year = document.getElementById('year').value;
    const days = Array.from(document.getElementById('days').selectedOptions).map(option => option.value);
    const semester = document.getElementById('semester').value;

    if (pageType) {
        // Store the selected year and first-page inputs in localStorage
        localStorage.setItem('selectedYear', year);
        localStorage.setItem('selectedDays', JSON.stringify(days));
        localStorage.setItem('selectedSemester', semester);

        // Redirect to the selected page type
        if (pageType === 'theory') {
            window.location.href = 'theory.html'; // Redirect to theory page
        } else if (pageType === 'practical') {
            window.location.href = 'practical.html'; // Redirect to practical page
        }
    } else {
        alert('Please select a page type.');
    }
});
