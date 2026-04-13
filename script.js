const menuToggle = document.getElementById("menuToggle");
const siteNav = document.getElementById("siteNav");

if (menuToggle && siteNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");
    if (!targetId || targetId === "#") {
      return;
    }
    const target = document.querySelector(targetId);
    if (!target) {
      return;
    }
    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    siteNav?.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
});

/**
 * Fetch products from a JSON file and render them.
 * Adjust the URL if your JSON lives elsewhere.
 */
async function loadProducts() {
  try {
    // Fetch product data (adjust the path to match your repo structure)
    const response = await fetch("content/products.json");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const products = await response.json();

    // Find the grid container and clear existing products
    const grid = document.querySelector(".product-grid");
    grid.innerHTML = "";

    // Generate product cards dynamically
    products.forEach((product) => {
      const card = document.createElement("div");
      card.className = "product";
      card.innerHTML = `
        <img src="${product.image}" alt="${product.title}">
        <h3>${product.title}</h3>
        <p>${product.description}</p>
        <p>$${product.price}</p>
        <button>Add to Cart</button>
      `;
      grid.appendChild(card);
    });
  } catch (err) {
    console.error("Failed to load products:", err);
  }
}

// Kick off product loading after the page finishes loading
document.addEventListener("DOMContentLoaded", loadProducts);