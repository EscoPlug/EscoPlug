// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Menu Toggle Logic ---
    const menuButton = document.getElementById('mobile-menu');
    const navList = document.getElementById('nav-list');

    menuButton.addEventListener('click', () => {
        navList.classList.toggle('active');
        menuButton.classList.toggle('active');
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navList.classList.remove('active');
        });
    });

    // --- 2. Catalog Data & Generation ---
    const products = [
        { name: "Nike Shox TL", price: "€150.00", img: "https://www.jdsports.cy/2758906-product_medium/nike-shox-tl.jpg", description2: "more info on our Instagram", description: "available sizes 44 & 44.5" },
        { name: "Minimalist Hoodie", price: "€50.00", img: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400", description2: "more info on our Instagram", description: "available sizes 44 & 44.5" },
        { name: "Streetwear Tee", price: "€25.00", img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400", description2: "more info on our Instagram", description: "available sizes 44 & 44.5" },
        { name: "Cargo Pants", price: "€60.00", img: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=400", description2: "more info on our Instagram", description: "available sizes 44 & 44.5" }
    ];

    const catalog = document.getElementById('catalog');
    
    products.forEach(item => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${item.img}" alt="${item.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-name">${item.name}</h3>
                <p class="product-price">${item.price}</p>
                <p class="product-description">${item.description}</p>
                <p class="product-description2">${item.description2}</p>
            </div>
        `;
        catalog.appendChild(card);
    });
});

// --- 3. Custom Cursor Logic ---
const dot = document.querySelector('.cursor-dot');
const outline = document.querySelector('.cursor-outline');

let mouseX = 0;
let mouseY = 0;

let dotX = 0;
let dotY = 0;
let outlineX = 0;
let outlineY = 0;

// Update mouse coordinates
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animate() {
    // 1. Lerp for the Dot (follows instantly)
    dotX += (mouseX - dotX) * 1; // Change 1 to 0.5 if you want the dot to lag slightly too
    dotY += (mouseY - dotY) * 1;
    dot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0) translate(-50%, -50%)`;

    // 2. Lerp for the Outline (the "Fluid" delay)
    // 0.15 is the "smoothness" factor. Lower = more laggy/fluid. Higher = snappier.
    outlineX += (mouseX - outlineX) * 0.15; 
    outlineY += (mouseY - outlineY) * 0.15;
    outline.style.transform = `translate3d(${outlineX}px, ${outlineY}px, 0) translate(-50%, -50%)`;

    requestAnimationFrame(animate);
}

// Start the animation loop
animate();

const observerOptions = {
  threshold: 0.1 // Triggers when 10% of the product is visible
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
    }
  });
}, observerOptions);

document.querySelectorAll('.product-card').forEach(card => {
  observer.observe(card);
});

document.addEventListener("DOMContentLoaded", () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  }, { threshold: 0.1 }); // Triggers when 10% of the card is visible

  document.querySelectorAll(".product-card").forEach((card) => {
    observer.observe(card);
  });
});