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

function scrollToProducts() {
  const productsSection = document.getElementById("products");
  if (productsSection) {
    productsSection.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

async function loadFeaturedItem() {
  try {
    const response = await fetch("products.json");
    if (!response.ok) {
      throw new Error(`Failed to load products.json: ${response.status}`);
    }
    const products = await response.json();
    const featured = products.find((product) => product.title === "It's Bryan");
    const grid = document.querySelector(".featured-grid");
    if (!grid) {
      return;
    }
    grid.innerHTML = "";

    if (featured) {
      const card = document.createElement("div");
      card.className = "product";
      card.innerHTML = `
        <img src="${featured.image}" alt="${featured.title}">
        <h3>${featured.title}</h3>
        <p>${featured.description}</p>
        <p>$${featured.price.toFixed(2)}</p>
        <button class="view-shop-btn" onclick="window.location.href='shop.html'">View in Shop</button>
      `;
      grid.appendChild(card);
    } else {
      grid.innerHTML = "<p class='loading'>Featured item not available.</p>";
    }
  } catch (err) {
    console.error(err);
  }
}

/**
 * Read products.json and insert product cards into the grid.
 * Adjust the path ('products.json') if your JSON file lives elsewhere.
 */
async function loadProducts() {
  try {
    const response = await fetch("products.json");
    if (!response.ok) {
      throw new Error(`Failed to load products.json: ${response.status}`);
    }
    const products = await response.json();
    const grid = document.querySelector(".product-grid");
    if (!grid) {
      return;
    }
    grid.innerHTML = ""; // clear any existing cards

    products.forEach((product) => {
      const card = document.createElement("div");
      card.className = "product";
      card.innerHTML = `
        <img src="${product.image}" alt="${product.title}">
        <h3>${product.title}</h3>
        <p>${product.description}</p>
        <p>$${product.price.toFixed(2)}</p>
        <button>Add to Cart</button>
      `;
      grid.appendChild(card);
    });
  } catch (err) {
    console.error(err);
  }
}

// Load products after DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  loadProducts();
  loadFeaturedItem();
});