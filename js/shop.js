// ==============================
// SHOP PAGE FUNCTIONALITY
// ==============================

const shopProductGrid = document.getElementById("shopProductGrid");
const shopSearch = document.getElementById("shopSearch");
const shopSort = document.getElementById("shopSort");
const productCount = document.getElementById("productCount");
const shopEmptyMessage = document.getElementById("shopEmptyMessage");

let selectedCategory = "all";

function displayShopProducts() {

    if (!shopProductGrid) return;

    let filteredProducts = products.filter(product => {

        const matchesCategory =
            selectedCategory === "all" ||
            product.category === selectedCategory;

        const searchText = shopSearch.value.toLowerCase().trim();

        const matchesSearch =
            product.name.toLowerCase().includes(searchText) ||
            product.category.toLowerCase().replaceAll("-", " ").includes(searchText);

        return matchesCategory && matchesSearch;

    });

    // SORT PRODUCTS

    if (shopSort.value === "name-asc") {
        filteredProducts.sort((a, b) =>
            a.name.localeCompare(b.name)
        );
    }

    if (shopSort.value === "name-desc") {
        filteredProducts.sort((a, b) =>
            b.name.localeCompare(a.name)
        );
    }

    // UPDATE PRODUCT COUNT

    productCount.textContent =
        `${filteredProducts.length} products found`;

    // SHOW EMPTY MESSAGE

    shopEmptyMessage.hidden = filteredProducts.length !== 0;

    // DISPLAY PRODUCTS

    shopProductGrid.innerHTML = filteredProducts.map(product => `

        <article class="product-card">

            <div class="product-image-wrapper">

                <img
                    src="../${product.image}"
                    alt="${product.name}"
                    class="product-image"
                    loading="lazy"
                >

                ${product.isNew
                    ? '<span class="product-badge">New Arrival</span>'
                    : ''
                }

                <button
                    class="product-wishlist"
                    aria-label="Add ${product.name} to wishlist"
                    data-wishlist="${product.id}">
                    ♡
                </button>

            </div>

            <div class="product-info">

                <p class="product-category">
                    ${product.category.replaceAll("-", " ")}
                </p>

                <h3 class="product-name">
                    ${product.name}
                </h3>

                <p class="product-price">
                    ${product.price > 0
                        ? "₹" + product.price
                        : "Price on request"
                    }
                </p>

                <button
                    class="product-action"
                    data-cart="${product.id}">
                    Add to Enquiry Cart
                </button>

            </div>

        </article>

    `).join("");

}

// CATEGORY FILTERS

const shopFilterButtons =
    document.querySelectorAll(".shop-filter");

shopFilterButtons.forEach(button => {

    button.addEventListener("click", () => {

        shopFilterButtons.forEach(btn =>
            btn.classList.remove("active")
        );

        button.classList.add("active");

        selectedCategory = button.dataset.category;

        displayShopProducts();

    });

});

// SEARCH

shopSearch.addEventListener("input", displayShopProducts);

// SORT

shopSort.addEventListener("change", displayShopProducts);

// INITIAL DISPLAY

displayShopProducts();