document.addEventListener('DOMContentLoaded', () => {
  const loginBtn = document.getElementById('login-btn');
  const usernameInput = document.getElementById('admin-username');
  const passwordInput = document.getElementById('admin-password');
  const loginError = document.getElementById('login-error');
  const loginSection = document.getElementById('login-section');
  const adminContent = document.getElementById('admin-content');

  // Handle login
  loginBtn.addEventListener('click', () => {
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();
    if (username === 'admin' && password === 'password') {
      loginSection.classList.add('hidden');
      adminContent.classList.remove('hidden');
      loadProducts();
      loadMessages();
    } else {
      loginError.textContent = 'Invalid credentials';
    }
  });

  // Handle product form submission
  const productForm = document.getElementById('product-form');
  productForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const product = {
      id: Date.now(),
      name: document.getElementById('product-name').value.trim(),
      desc: document.getElementById('product-desc').value.trim(),
      price: parseFloat(document.getElementById('product-price').value).toFixed(2),
      image: document.getElementById('product-image').value.trim()
    };
    let products = JSON.parse(localStorage.getItem('products') || '[]');
    products.push(product);
    localStorage.setItem('products', JSON.stringify(products));
    productForm.reset();
    loadProducts();
  });

  // Load products into table
  function loadProducts() {
    const tbody = document.querySelector('#products-table tbody');
    tbody.innerHTML = '';
    let products = JSON.parse(localStorage.getItem('products') || '[]');
    products.forEach(product => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${product.name}</td>
        <td>${product.desc}</td>
        <td>$${product.price}</td>
        <td>${product.image ? '<img src="' + product.image + '" style="width:50px;height:50px;object-fit:cover;" />' : ''}</td>
        <td><button class="delete-btn" data-id="${product.id}">Delete</button></td>
      `;
      tbody.appendChild(tr);
    });
    document.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        const id = parseInt(this.getAttribute('data-id'));
        let products = JSON.parse(localStorage.getItem('products') || '[]');
        products = products.filter(p => p.id !== id);
        localStorage.setItem('products', JSON.stringify(products));
        loadProducts();
      });
    });
  }

  // Load messages into table
  function loadMessages() {
    const tbody = document.querySelector('#messages-table tbody');
    tbody.innerHTML = '';
    let messages = JSON.parse(localStorage.getItem('messages') || '[]');
    messages.forEach(msg => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${msg.name}</td>
        <td>${msg.email}</td>
        <td>${msg.message}</td>
      `;
      tbody.appendChild(tr);
    });
  }
});
