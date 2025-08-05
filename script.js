document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.product-card .btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      alert('Thank you for your interest! This is a demo store.');
    });
  });
});
