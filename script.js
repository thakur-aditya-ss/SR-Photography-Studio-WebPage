// ===== Auto Slider =====
let counter = 1;
setInterval(() => {
  document.getElementById('radio' + counter).checked = true;
  counter++;
  if (counter > 4) counter = 1;
}, 5000);

// ===== Form Validation and Submission =====
const inquiryForm = document.getElementById('inquiryForm');
if (inquiryForm) {
  inquiryForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const shootType = document.getElementById('shootType').value;
    const message = document.getElementById('message').value.trim();
    const responseMsg = document.getElementById('responseMsg');

    if (!name || !email || !phone || !shootType || !message) {
      responseMsg.style.color = "red";
      responseMsg.textContent = "⚠️ Please fill all fields!";
      return;
    }

    // Show loading state
    responseMsg.style.color = "blue";
    responseMsg.textContent = "⏳ Sending inquiry...";
    const submitBtn = inquiryForm.querySelector('button');
    if (submitBtn) submitBtn.disabled = true;

    // Send data using Fetch API
    const formData = new FormData(this);

    fetch("https://formsubmit.co/ajax/aaasingh1010@gmail.com", {
      method: "POST",
      body: formData
    })
      .then(response => response.json())
      .then(data => {
        responseMsg.style.color = "green";
        responseMsg.textContent = "✅ Inquiry sent successfully! We will contact you soon.";
        inquiryForm.reset();
      })
      .catch(error => {
        responseMsg.style.color = "red";
        responseMsg.textContent = "⚠️ Something went wrong. Please try again.";
        console.error('Error:', error);
      })
      .finally(() => {
        if (submitBtn) submitBtn.disabled = false;
      });
  });
}

// ===== Mobile Navigation Toggle =====
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });
}

// Close menu when a link is clicked
const links = document.querySelectorAll('.nav-links li a');
links.forEach(link => {
  link.addEventListener('click', () => {
    if (navLinks.classList.contains('active')) {
      navLinks.classList.remove('active');
    }
  });
});