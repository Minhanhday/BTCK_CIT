// Toggle menu on mobile
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

menuToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
  menuToggle.textContent = navMenu.classList.contains('active') ? '✖' : '☰';
});

// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCartCount() {
  const cartCount = document.querySelectorAll('#cart-count');
  cartCount.forEach(count => {
    count.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
  });
}

function addToCart(name, price) {
  const item = cart.find(product => product.name === name);
  if (item) {
    item.quantity += 1;
  } else {
    cart.push({ name, price: parseInt(price), quantity: 1 });
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
}

document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', () => {
    const name = button.dataset.name;
    const price = button.dataset.price;
    addToCart(name, price);
    alert(`${name} đã được thêm vào giỏ hàng!`);
  });
});

// Search functionality
const searchInput = document.querySelector('#search');
const productList = document.querySelector('#product-list');

if (searchInput && productList) {
  searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    const products = productList.querySelectorAll('.product-card');
    products.forEach(product => {
      const name = product.querySelector('h3').textContent.toLowerCase();
      product.style.display = name.includes(query) ? 'block' : 'none';
    });
  });
}

// Contact form handling
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất.');
    this.reset();
  });
}

// Engrave form handling
const engraveForm = document.getElementById('engrave-form');
if (engraveForm) {
  engraveForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const messageInput = document.getElementById('engrave-message');
    const error = document.getElementById('engrave-error');
    const message = messageInput.value;

    if (/^[a-zA-Z0-9\s]{1,15}$/.test(message)) {
      error.style.display = 'none';
      addToCart('Vòng Tay Khắc Thông Điệp', 2000000);
      alert(`Thông điệp "${message}" đã được thêm vào giỏ hàng!`);
      messageInput.value = '';
    } else {
      error.style.display = 'block';
    }
  });
}

// Initialize cart count
updateCartCount();

// khắc
document.getElementById('engrave-message').addEventListener('input', function(e) {
  const message = e.target.value;
  const error = document.getElementById('engrave-error');
  const previewText = document.getElementById('preview-text');
  const regex = /^[a-zA-Z0-9\s]{1,15}$/;
  if (!regex.test(message)) {
    error.style.display = 'block';
    previewText.textContent = 'Xem trước thông điệp của bạn...';
  } else {
    error.style.display = 'none';
    previewText.textContent = message || 'Xem trước thông điệp của bạn...';
  }
});

document.querySelectorAll('.symbol').forEach(symbol => {
  symbol.addEventListener('click', function() {
    const previewText = document.getElementById('preview-text');
    const currentText = previewText.textContent === 'Xem trước thông điệp của bạn...' ? '' : previewText.textContent;
    previewText.textContent = currentText + this.textContent;
  });
});