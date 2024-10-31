// Contact form submission handler
document.getElementById('contactForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent page reload on form submission

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    const responseMessage = document.getElementById('responseMessage');

    // Basic validation (if fields are empty, show alert)
    if (!name || !email || !subject || !message) {
        responseMessage.style.display = 'block';
        responseMessage.style.color = 'red';
        responseMessage.textContent = 'Please fill in all fields.';
        return;
    }

    // Simulate sending the message
    responseMessage.style.display = 'block';
    responseMessage.style.color = 'green';
    responseMessage.textContent = 'Thank you for your message! We will get back to you shortly.';

    // Clear form fields
    document.getElementById('contactForm').reset();
});
