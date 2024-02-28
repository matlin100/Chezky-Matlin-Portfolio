
function sendEmail() {
    var name = document.getElementById('InputName').value || 'yechezkel'; // Dynamically get the user's name or default to 'yechezkel'
    var email = document.getElementById('InputEmail').value || 'cymatlin@gmail.com'; // Dynamically get the user's email
    var subject = document.getElementById('InputSubject').value || 'Hello Chezky Matlin'; // Get the subject from the form or default
    var message = document.getElementById('InputMessage').value || 'Your message here'; // Get the message from the form or default

    // Construct the email body with proper line breaks
    var emailBody = 'Hello Chezky Matlin,\n\n';
    emailBody += 'This is ' + name + '.\n';
    emailBody += message + '\n\n'; // Add the user's message here
    emailBody += 'My email to connect is ' + email + '.\n';
    emailBody += 'Thanks,\n';
    emailBody += name; // Add the user's name here

    // Encode subject and body separately to ensure line breaks are preserved
    var encodedSubject = encodeURIComponent(subject);
    var encodedBody = encodeURIComponent(emailBody);

    // Construct the final mailto link
    window.location = 'mailto:cymatlin@gmail.com?subject=' + encodedSubject + '&body=' + encodedBody;
}


function sendWhatsApp() {
    var name = document.getElementById('InputName').value || 'yechezkel'; // Get the user's name from the form or default
    var message = document.getElementById('InputMessage').value || 'Your message here'; // Get the message from the form or default
    var userPhone = ''; // You can optionally add a field in your form to get the user's phone number

    // Construct the WhatsApp message
    var whatsappMessage = 'Hello Chezky Matlin,\n\n';
    whatsappMessage += 'This is ' + name + '.\n';
    whatsappMessage += message + '\n\n'; // Add the user's message here
    whatsappMessage += 'Thanks,\n';
    whatsappMessage += name; // Add the user's name here

    // Encode the message for URL
    var encodedMessage = encodeURIComponent(whatsappMessage);

    // Construct the final WhatsApp URL
    var whatsappUrl = 'https://wa.me/' + userPhone + '?text=' + encodedMessage; // Replace 'userPhone' with the recipient's number if needed

    // Open the URL to send the WhatsApp message
    window.open(whatsappUrl, '_blank');
}
