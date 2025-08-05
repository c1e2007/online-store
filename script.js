document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contact-name').value.trim();
      const email = document.getElementById('contact-email').value.trim();
      const message = document.getElementById('contact-message').value.trim();
      let messages = JSON.parse(localStorage.getItem('messages')) || [];
      messages.push({ name, email, message });
      localStorage.setItem('messages', JSON.stringify(messages));
      contactForm.reset();
      const successMsg = document.getElementById('contact-success');
      successMsg.style.display = 'block';
      setTimeout(() => {
        successMsg.style.display = 'none';
      }, 3000);
    });
  }
});

function renderProducts() {
  const grid = document.getElementById('product-grid');
  if (!grid) return;
  grid.innerHTML = '';
  let products = JSON.parse(localStorage.getItem('products')) || [
    { id: 1, name: 'Sample Product 1', desc: 'This is a sample product description.', price: 9.99, image: '' },
    { id: 2, name: 'Sample Product 2', desc: 'Another sample product description.', price: 19.99, image: '' }
  ];
  products.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      ${product.image ? `<img src="${product.image}" alt="${product.name}">` : ''}
      <h3>${product.name}</h3>
      <p>${product.desc}</p>
      <p>$${Number(product.price).toFixed(2)}</p>
      <button>Buy Now</button>
    `;
    const btn = card.querySelector('button');
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      alert('Thank you for your interest! This is a demo store.');
    });
    grid.appendChild(card);
  });
}
