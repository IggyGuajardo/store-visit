document.addEventListener('DOMContentLoaded', (event) => {
    const form = document.getElementById('observation-form');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission

        // Submit the form data to the backend
        const formData = new FormData(form);

        fetch('/submit-form', {
            method: 'POST',
            body: formData,
        })
        .then(response => response.text())
        .then(data => {
            alert('Form submitted successfully!');
            form.reset(); // Reset the form
        })
        .catch(error => {
            console.error('Error:', error);
            alert('There was an error submitting the form. Please try again.');
        });
    });
});
