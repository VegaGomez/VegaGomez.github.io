// Menú hamburguesa mejorado
function toggleMenu() {
  const menu = document.getElementById('sideMenu');
  menu.classList.toggle('hidden');
  
  // Bloquear scroll cuando el menú está abierto
  document.body.style.overflow = menu.classList.contains('hidden') ? 'auto' : 'hidden';
}

// Cerrar menú al hacer clic fuera de él
document.addEventListener('click', (e) => {
  const menu = document.getElementById('sideMenu');
  const menuBtn = document.querySelector('.menu-btn');
  
  if (!menu.contains(e.target) && e.target !== menuBtn && !menuBtn.contains(e.target)) {
    menu.classList.add('hidden');
    document.body.style.overflow = 'auto';
  }
});

// Efecto al hacer clic en logos mejorado
document.querySelectorAll('.logo').forEach(logo => {
  logo.addEventListener('click', () => {
    logo.style.transform = 'scale(0.95)';
    setTimeout(() => {
      logo.style.transform = 'scale(1)';
    }, 200);
  });
});

// Carrito funcional
let cart = [];

function agregarAlCarrito(nombre, precio) {
  cart.push({ nombre, precio });
  actualizarCarrito();
  // Feedback visual
  const feedback = document.createElement('div');
  feedback.textContent = '¡Añadido al carrito!';
  feedback.style.position = 'fixed';
  feedback.style.bottom = '20px';
  feedback.style.left = '50%';
  feedback.style.transform = 'translateX(-50%)';
  feedback.style.backgroundColor = 'var(--primary-color)';
  feedback.style.color = 'white';
  feedback.style.padding = '10px 20px';
  feedback.style.borderRadius = '20px';
  feedback.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
  feedback.style.zIndex = '1000';
  document.body.appendChild(feedback);
  
  setTimeout(() => {
    feedback.style.opacity = '0';
    feedback.style.transition = 'opacity 0.5s ease';
    setTimeout(() => feedback.remove(), 500);
  }, 2000);
}

function actualizarCarrito() {
  const cartItems = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  
  if (cartItems) {
    cartItems.innerHTML = '';
    let total = 0;
    
    cart.forEach((item, index) => {
      total += item.precio;
      const itemElement = document.createElement('div');
      itemElement.className = 'cart-item';
      itemElement.innerHTML = `
        <p>${item.nombre}</p>
        <div>
          <span>$${item.precio.toFixed(2)}</span>
          <button class="remove-btn" onclick="eliminarDelCarrito(${index})">×</button>
        </div>
      `;
      cartItems.appendChild(itemElement);
    });
    
    if (cartTotal) {
      cartTotal.textContent = total.toFixed(2);
    }
    
    // Guardar en localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
  }
}

function eliminarDelCarrito(index) {
  cart.splice(index, 1);
  actualizarCarrito();
}

function checkout() {
  if (cart.length === 0) {
    alert('Tu carrito está vacío');
    return;
  }
  alert(`Compra confirmada! Total: $${cart.reduce((sum, item) => sum + item.precio, 0).toFixed(2)}`);
  cart = [];
  actualizarCarrito();
}

// Cargar carrito al iniciar
document.addEventListener('DOMContentLoaded', () => {
  const savedCart = localStorage.getItem('cart');
  if (savedCart) {
    cart = JSON.parse(savedCart);
    actualizarCarrito();
  }
  
  // Mejorar los botones de añadir al carrito
  document.querySelectorAll('.add-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const productItem = this.closest('.product-item');
      const name = productItem.querySelector('.product-name').textContent;
      const price = parseFloat(productItem.querySelector('.product-price').textContent.replace('$', ''));
      agregarAlCarrito(name, price);
    });
  });
});