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

// ===== Cart Logic =====
let cart = JSON.parse(localStorage.getItem('sr_cart')) || [];

// Toast Notification Function
function showToast(message) {
    let toast = document.querySelector('.toast-notification');
    if (!toast) {
        toast = document.createElement('div');
        toast.className = 'toast-notification';
        document.body.appendChild(toast);
    }
    toast.innerText = message;
    toast.classList.add('show');
    
    // Animate badge
    const badge = document.querySelector('.cart-count');
    if (badge) {
        badge.style.transform = 'scale(1.5)';
        setTimeout(() => badge.style.transform = 'scale(1)', 300);
    }

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

function updateCartBadge() {
    const badge = document.querySelector('.cart-count');
    if (badge) {
        badge.innerText = cart.length;
        if (cart.length === 0) {
            badge.classList.add('hidden');
        } else {
            badge.classList.remove('hidden');
        }
    }
}

function addToCart(name, price) {
    cart.push({ id: Date.now(), name, price: parseInt(price) });
    localStorage.setItem('sr_cart', JSON.stringify(cart));
    updateCartBadge();
    showToast(`${name} added to your booking!`);
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem('sr_cart', JSON.stringify(cart));
    updateCartBadge();
    renderCart();
}

function renderCart() {
    const list = document.getElementById('cart-items-list');
    const summary = document.getElementById('cart-summary');
    const totalSpan = document.getElementById('total-amount');
    
    if (!list) return;

    if (cart.length === 0) {
        list.innerHTML = '<p style="text-align: center; color: #888; padding: 100px 20px; font-size: 1.2rem; background: rgba(255,255,255,0.02); border-radius: 20px; border: 1px dashed rgba(255,255,255,0.1);">Your booking inventory is currently empty. <br><br> <a href="gallary.html" style="color: #f8b400; text-decoration: none; border-bottom: 1px solid;">Browse Categories</a></p>';
        summary.classList.add('hidden');
        return;
    }

    summary.classList.remove('hidden');
    list.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        total += item.price;
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
            <div class="cart-item-info">
                <span class="cart-item-name">${item.name}</span>
                <span class="cart-item-price">₹${item.price.toLocaleString()}</span>
            </div>
            <button onclick="removeFromCart(${item.id})" class="remove-btn">✕ REMOVE</button>
        `;
        list.appendChild(div);
    });

    totalSpan.innerText = total.toLocaleString();

    // Attach Checkout Logic
    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.onclick = generateProfessionalBill;
    }
}

// Event Listeners for Add to Cart
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('add-to-cart-btn')) {
        const name = e.target.getAttribute('data-name');
        const price = e.target.getAttribute('data-price');
        addToCart(name, price);
    }
});

function generateProfessionalBill() {
    const billView = document.getElementById('bill-view');
    const billDetails = document.getElementById('bill-details');
    const billId = document.getElementById('bill-id');
    const billDate = document.getElementById('bill-date');
    
    if (!billView || !billDetails) return;

    // Generate unique ID and Date
    const id = Math.floor(Math.random() * 900000) + 100000;
    const now = new Date();
    const dateStr = now.toLocaleDateString() + ' ' + now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});

    if (billId) billId.innerText = id;
    if (billDate) billDate.innerText = dateStr;

    let total = 0;
    let itemsHtml = `
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <thead>
                <tr style="border-bottom: 1px solid rgba(255,255,255,0.1); text-align: left;">
                    <th style="padding: 15px 0; color: #f8b400;">SHOOT TYPE</th>
                    <th style="padding: 15px 0; text-align: right; color: #f8b400;">PRICE</th>
                </tr>
            </thead>
            <tbody>
    `;

    cart.forEach(item => {
        total += item.price;
        itemsHtml += `
            <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
                <td style="padding: 15px 0; font-weight: 600;">${item.name}</td>
                <td style="padding: 15px 0; text-align: right; font-weight: 700;">₹${item.price.toLocaleString()}</td>
            </tr>
        `;
    });

    itemsHtml += `
            </tbody>
            <tfoot>
                <tr>
                    <td style="padding: 30px 0 10px 0; font-size: 1.2rem; font-weight: 800; color: #f8b400;">GRAND TOTAL (Estimated)</td>
                    <td style="padding: 30px 0 10px 0; text-align: right; font-size: 1.5rem; font-weight: 800; color: #fff;">₹${total.toLocaleString()}</td>
                </tr>
            </tfoot>
        </table>
        <p style="margin-top:30px; font-size:0.9rem; color:#888; text-align:center; border-top:1px solid rgba(255,255,255,0.05); padding-top:20px;">
            * This is a computer generated estimate. Final pricing may vary based on specific requirements discussed during consultation.
        </p>
    `;

    billDetails.innerHTML = itemsHtml;
    billView.classList.remove('hidden');
    billView.scrollIntoView({ behavior: 'smooth' });
}

// Hamburger Menu Logic
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

if (hamburger) {
    hamburger.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });
}

// Initial badge update
updateCartBadge();

// Close menu when a link is clicked
const links = document.querySelectorAll('.nav-links li a');
links.forEach(link => {
  link.addEventListener('click', () => {
    if (navLinks.classList.contains('active')) {
      navLinks.classList.remove('active');
    }
  });
});