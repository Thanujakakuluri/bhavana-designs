const announcementTrack = document.getElementById("announcementTrack");

if (announcementTrack) {
    const originalContent = announcementTrack.querySelector(".announcement-content");

    for (let i = 0; i < 3; i++) {
        announcementTrack.appendChild(originalContent.cloneNode(true));
    }
}
// ==============================
// ==============================
// DISPLAY PRODUCTS
// ==============================

const newArrivalsGrid = document.getElementById("newArrivalsGrid");

function displayProducts(category = "new-arrivals") {

    if (!newArrivalsGrid) return;

    const filteredProducts = products.filter(product => {

        if (category === "new-arrivals") {
            return product.isNew;
        }

        if (category === "all") {
            return true;
        }

        return product.category === category;
    });

    newArrivalsGrid.innerHTML = filteredProducts.map(product => `
        <article class="product-card">

            <div class="product-image-wrapper">

                <img src="${product.image}"
                     alt="${product.name}"
                     class="product-image"
                     loading="lazy">

                ${product.isNew
                    ? '<span class="product-badge">New Arrival</span>'
                    : ''
                }

                <button class="product-wishlist"
                        aria-label="Add ${product.name} to wishlist"
                        data-wishlist="${product.id}">♡</button>

            </div>

            <div class="product-info">

                <p class="product-category">
                    ${product.category.replaceAll("-", " ")}
                </p>

                <h3 class="product-name">${product.name}</h3>

               <p class="product-price">Price on request</p>

<button class="view-details-btn"
        data-product-details="${product.id}">
    View Details
</button>

<button class="product-action" data-cart="${product.id}">
    Add to Enquiry Cart
</button>

            </div>

        </article>
    `).join("");
}
// ==============================
// PRODUCT DETAILS POPUP
// ==============================

const productDetailsDialog =
    document.getElementById("productDetailsDialog");

const closeProductDetails =
    document.getElementById("closeProductDetails");

const closeDetailsButton =
    document.getElementById("closeDetailsButton");

if (newArrivalsGrid && productDetailsDialog) {

    newArrivalsGrid.addEventListener("click", function(event) {

        const detailsButton =
            event.target.closest("[data-product-details]");

        if (!detailsButton) return;

        const productId = Number(
            detailsButton.dataset.productDetails
        );

        const product = products.find(
            item => item.id === productId
        );

        if (!product) return;

        document.getElementById("detailProductImage").src =
            product.image;

        document.getElementById("detailProductImage").alt =
            product.name;

        document.getElementById("detailProductName").textContent =
            product.name;

        document.getElementById("detailProductCategory").textContent =
            product.category.replaceAll("-", " ");

        document.getElementById("detailProductPrice").textContent =
            product.price > 0
                ? `₹${product.price}`
                : "Price on request";

        document.getElementById("detailProductDescription").textContent =
            product.description ||
            "Contact us for product details and customisation options.";

        document.getElementById("detailProductStock").textContent =
            product.inStock
                ? "Available for enquiry"
                : "Currently unavailable";

        productDetailsDialog.showModal();
    });

    closeProductDetails.addEventListener("click", () => {
        productDetailsDialog.close();
    });

    closeDetailsButton.addEventListener("click", () => {
        productDetailsDialog.close();
    });

    productDetailsDialog.addEventListener("click", event => {
        if (event.target === productDetailsDialog) {
            productDetailsDialog.close();
        }
    });
}

// ==============================
// CATEGORY FILTER BUTTONS
// ==============================

const filterButtons = document.querySelectorAll(".filter-btn");

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn => btn.classList.remove("active"));

        button.classList.add("active");

        displayProducts(button.dataset.filter);

    });

});


// ==============================
// COLLECTION CARD FILTERING
// ==============================

const collectionLinks = document.querySelectorAll("[data-category-link]");

collectionLinks.forEach(link => {

    link.addEventListener("click", () => {

        const category = link.dataset.categoryLink;

        displayProducts(category);

        filterButtons.forEach(button => {

            button.classList.toggle(
                "active",
                button.dataset.filter === category
            );

        });

    });

});


// ==============================
// INITIAL DISPLAY
// ==============================

displayProducts();
// ==============================
// CUSTOM ORDER WHATSAPP ENQUIRY
// ==============================

const customOrderForm = document.getElementById("customOrderForm");

if (customOrderForm) {
    customOrderForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("customerName").value.trim();
        const phone = document.getElementById("customerPhone").value.trim();
        const category = document.getElementById("customCategory").value;
        const description = document.getElementById("customDescription").value.trim();
        const budget = document.getElementById("customBudget").value;
        const date = document.getElementById("eventDate").value;
        const referenceImage = document.getElementById("referenceImage").files[0];

        let message = `Hello Bhavana Designs!

I would like to enquire about a custom design.

Name: ${name}
WhatsApp Number: ${phone}
Category: ${category}

Design Requirements:
${description}

Budget: ${budget ? "₹" + budget : "Not specified"}
Required Date: ${date || "Not specified"}

${referenceImage ? "I have a reference image. I will send it separately on WhatsApp." : ""}

Please share the details. Thank you!`;

        const businessNumber = "918519991083";

        const whatsappURL =
            `https://wa.me/${businessNumber}?text=${encodeURIComponent(message)}`;

        window.open(whatsappURL, "_blank");
    });
}