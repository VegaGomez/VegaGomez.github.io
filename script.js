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
function searchProducts() {
  const searchTerm = document.getElementById('searchInput').value.toLowerCase();
  const products = document.querySelectorAll('.product-card, .product-item');
  
  products.forEach(product => {
    const productName = product.querySelector('.product-name, .product-title').textContent.toLowerCase();
    if(productName.includes(searchTerm)) {
      product.style.display = 'block';
    } else {
      product.style.display = 'none';
    }
  });
}

// Búsqueda al presionar Enter
document.getElementById('searchInput').addEventListener('keypress', function(e) {
  if(e.key === 'Enter') {
    searchProducts();
  }
});
let cart = [];

function agregarAlCarrito(nombre, precio) {
  cart.push({ nombre, precio });
  actualizarCarrito();
  actualizarContadorCarrito();
  mostrarNotificacion(`${nombre} añadido al carrito`);
}

function eliminarDelCarrito(index) {
  cart.splice(index, 1);
  actualizarCarrito();
  actualizarContadorCarrito();
}

function actualizarCarrito() {
  const cartItems = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  
  if(cartItems) {
    cartItems.innerHTML = '';
    let total = 0;
    
    cart.forEach((item, index) => {
      total += item.precio;
      const itemElement = document.createElement('div');
      itemElement.className = 'cart-item';
      itemElement.innerHTML = `
        <div class="cart-item-info">
          <p class="cart-item-name">${item.nombre}</p>
          <p class="cart-item-price">$${item.precio.toFixed(2)}</p>
        </div>
        <button class="remove-btn" onclick="eliminarDelCarrito(${index})">
          <i class="fas fa-trash"></i>
        </button>
      `;
      cartItems.appendChild(itemElement);
    });
    
    if(cartTotal) {
      cartTotal.textContent = total.toFixed(2);
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
  }
}

function actualizarContadorCarrito() {
  const counter = document.getElementById('cart-counter');
  if(counter) {
    counter.textContent = cart.length;
    counter.style.display = cart.length > 0 ? 'flex' : 'none';
  }
}

function mostrarNotificacion(mensaje) {
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.innerHTML = `<i class="fas fa-check-circle"></i> ${mensaje}`;
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.classList.add('show');
  }, 10);
  
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => notification.remove(), 500);
  }, 3000);
}

// Al cargar la página
document.addEventListener('DOMContentLoaded', () => {
  const savedCart = localStorage.getItem('cart');
  if(savedCart) {
    cart = JSON.parse(savedCart);
    actualizarCarrito();
    actualizarContadorCarrito();
  }
});
// Mejorar la función toggleMenu
function toggleMenu() {
  const menu = document.getElementById('sideMenu');
  menu.classList.toggle('hidden');
  
  // Agregar overlay cuando el menú está abierto
  if (!menu.classList.contains('hidden')) {
    createOverlay();
  } else {
    removeOverlay();
  }
}

// Crear overlay para cerrar el menú al tocar fuera
function createOverlay() {
  const overlay = document.createElement('div');
  overlay.id = 'menuOverlay';
  overlay.style.position = 'fixed';
  overlay.style.top = '0';
  overlay.style.left = '250px'; // Igual al ancho del menú
  overlay.style.right = '0';
  overlay.style.bottom = '0';
  overlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
  overlay.style.zIndex = '5';
  overlay.onclick = toggleMenu;
  document.body.appendChild(overlay);
}

function removeOverlay() {
  const overlay = document.getElementById('menuOverlay');
  if (overlay) {
    overlay.remove();
  }
}

// Cerrar menú al hacer clic en un enlace
document.querySelectorAll('#sideMenu a').forEach(link => {
  link.addEventListener('click', toggleMenu);
});
// Carrito de compras
let cart = [];

// Función para agregar productos
function agregarAlCarrito(nombre, precio, imagen) {
  // Verificar si el producto ya está en el carrito
  const existingItem = cart.find(item => item.nombre === nombre);
  
  if (existingItem) {
    existingItem.cantidad += 1;
  } else {
    cart.push({
      nombre,
      precio: parseFloat(precio),
      imagen,
      cantidad: 1
    });
  }
  
  actualizarCarrito();
  mostrarNotificacion(`${nombre} añadido al carrito`);
  guardarCarrito();
}

// Función para actualizar la visualización del carrito
function actualizarCarrito() {
  // Guardar en localStorage
  localStorage.setItem('pequemarketCart', JSON.stringify(cart));
  
  // Actualizar contadores
  const totalItems = cart.reduce((total, item) => total + item.cantidad, 0);
  
  // Actualizar en el header
  const headerCounter = document.getElementById('cart-counter');
  if (headerCounter) {
    headerCounter.textContent = totalItems;
    headerCounter.style.display = totalItems > 0 ? 'flex' : 'none';
  }
  
  // Actualizar en el botón flotante
  const floatingBadge = document.getElementById('floating-cart-badge');
  if (floatingBadge) {
    floatingBadge.textContent = totalItems;
    floatingBadge.style.display = totalItems > 0 ? 'flex' : 'none';
  }
}
// Función para modificar cantidades
function modificarCantidad(index, change) {
  cart[index].cantidad += change;
  
  if (cart[index].cantidad < 1) {
    cart.splice(index, 1);
  }
  
  actualizarCarrito();
  guardarCarrito();
}

// Función para eliminar items
function eliminarDelCarrito(index) {
  cart.splice(index, 1);
  actualizarCarrito();
  guardarCarrito();
}

// Guardar carrito en localStorage
function guardarCarrito() {
  localStorage.setItem('pequemarketCart', JSON.stringify(cart));
}

// Cargar carrito al iniciar
function cargarCarrito() {
  const savedCart = localStorage.getItem('pequemarketCart');
  if (savedCart) {
    cart = JSON.parse(savedCart);
    actualizarCarrito();
  }
}

// Mostrar notificación
function mostrarNotificacion(mensaje) {
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.innerHTML = `
    <i class="fas fa-check-circle"></i>
    <span>${mensaje}</span>
  `;
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.classList.add('show');
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => notification.remove(), 300);
    }, 2000);
  }, 10);
}

// Inicializar carrito al cargar la página
document.addEventListener('DOMContentLoaded', cargarCarrito);
// Función para mostrar/ocultar el menú
function toggleMenu() {
  const menu = document.getElementById('sideMenu');
  const overlay = document.getElementById('overlay');
  const body = document.body;
  
  menu.classList.toggle('open');
  overlay.classList.toggle('active');
  body.classList.toggle('menu-open');
}

// Cerrar menú al hacer clic en un enlace
document.querySelectorAll('#sideMenu a').forEach(link => {
  link.addEventListener('click', toggleMenu);
});

// Cerrar menú al presionar Esc
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    const menu = document.getElementById('sideMenu');
    if (menu.classList.contains('open')) {
      toggleMenu();
    }
  }
});
// Función para actualizar el contador del carrito
function updateCartCounter() {
  const cart = JSON.parse(localStorage.getItem('pequemarketCart')) || [];
  const totalItems = cart.reduce((total, item) => total + item.cantidad, 0);
  const counter = document.getElementById('cart-counter');
  
  if (counter) {
    counter.textContent = totalItems;
    counter.style.display = totalItems > 0 ? 'block' : 'none';
  }
}

// Llamar esta función cuando se cargue la página
document.addEventListener('DOMContentLoaded', updateCartCounter);