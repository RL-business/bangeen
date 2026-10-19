
/* DEUTSCHLAND BOUTIQUE - 12 PERFUMES */

/* Replace these with your real contact details */
const CONTACT = {
  instagram: "https://www.instagram.com/YOUR_ACCOUNT/",
  whatsapp: "9647XXXXXXXX"
};

/* =================================
   PERFUMES AND YOUR IMAGE FILENAMES
================================= */

const perfumes = [

  // LOUIS VUITTON - 4
  {
    name: "Imagination",
    brand: "lv",
    image: "imagination.jpeg",
    description: "A fresh and elegant citrus fragrance.",
    family: "Fresh citrus",
    character: "Clean and uplifting"
  },
  {
    name: "Ombre Nomade",
    brand: "lv",
    image: "ombre.jpeg",
    description: "A luxurious, deep and smoky fragrance.",
    family: "Woody oriental",
    character: "Bold and mysterious"
  },
  {
    name: "Afternoon Swim",
    brand: "lv",
    image: "swim.jpeg",
    description: "A refreshing fragrance with vibrant citrus notes.",
    family: "Citrus",
    character: "Bright and energetic"
  },
  {
    name: "Météore",
    brand: "lv",
    image: "meteore.jpeg",
    description: "A modern, fresh and sophisticated fragrance.",
    family: "Citrus aromatic",
    character: "Fresh and dynamic"
  },

  // DIOR - 4
  {
    name: "Sauvage",
    brand: "dior",
    image: "su.jpeg",
    description: "A powerful fresh fragrance with an aromatic character.",
    family: "Fresh spicy",
    character: "Confident and masculine"
  },
  {
    name: "Dior Homme Intense",
    brand: "dior",
    image: "hommte.jpeg",
    description: "An elegant fragrance with a rich iris character.",
    family: "Woody floral",
    character: "Sophisticated and warm"
  },
  {
    name: "Miss Dior",
    brand: "dior",
    image: "miss.jpeg",
    description: "A romantic and elegant floral fragrance.",
    family: "Floral",
    character: "Romantic and feminine"
  },
  {
    name: "J'adore",
    brand: "dior",
    image: "dior.jpeg",
    description: "A radiant floral fragrance with timeless elegance.",
    family: "Floral",
    character: "Elegant and luminous"
  },

  // CHANEL - 4
  {
    name: "Bleu de Chanel",
    brand: "chanel",
    image: "blue.jpeg",
    description: "A sophisticated aromatic woody fragrance.",
    family: "Aromatic woody",
    character: "Confident and versatile"
  },
  {
    name: "Coco Mademoiselle",
    brand: "chanel",
    image: "coco.jpeg",
    description: "An elegant fragrance with a vibrant floral character.",
    family: "Amber floral",
    character: "Chic and expressive"
  },
  {
    name: "Chanel No. 5",
    brand: "chanel",
    image: "n5.jpeg",
    description: "An iconic fragrance with classic elegance.",
    family: "Floral aldehydic",
    character: "Classic and elegant"
  },
  {
    name: "Chance Eau Tendre",
    brand: "chanel",
    image: "chance.jpeg",
    description: "A delicate and luminous fruity floral fragrance.",
    family: "Fruity floral",
    character: "Tender and fresh"
  }
];

/* =================================
   ELEMENTS
================================= */

const productsContainer = document.getElementById("products");
const searchInput = document.getElementById("search");
const filterButtons = document.querySelectorAll(".filter");
const resultsCount = document.getElementById("results-count");
const dialog = document.getElementById("product-dialog");

let currentFilter = "all";

/* =================================
   BRAND NAME
================================= */

function brandName(brand) {
  if (brand === "lv") return "Louis Vuitton";
  if (brand === "dior") return "Dior";
  if (brand === "chanel") return "CHANEL";
  return brand;
}

/* =================================
   WHATSAPP
================================= */

function whatsappLink(
  message = "Hello, I would like to ask about your perfume collection."
) {
  const number = CONTACT.whatsapp.replace(/\D/g, "");

  if (!number || CONTACT.whatsapp.includes("X")) {
    return "https://wa.me/?text=" + encodeURIComponent(message);
  }

  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

/* =================================
   DISPLAY PERFUMES
================================= */

function renderProducts() {
  const query = searchInput.value.trim().toLowerCase();

  const filtered = perfumes.filter(perfume => {
    const matchesBrand =
      currentFilter === "all" || perfume.brand === currentFilter;

    const searchText = [
      perfume.name,
      brandName(perfume.brand),
      perfume.description,
      perfume.family,
      perfume.character
    ].join(" ").toLowerCase();

    return matchesBrand && searchText.includes(query);
  });

  productsContainer.replaceChildren();

  filtered.forEach(perfume => {

    const card = document.createElement("article");
    card.className = "product-card";

    const image = document.createElement("img");

    // Images are directly inside BANGEEN
    image.src = perfume.image;
    image.alt = perfume.name;
    image.loading = "lazy";

    const info = document.createElement("div");
    info.className = "product-info";

    const brand = document.createElement("div");
    brand.className = "product-brand";
    brand.textContent = brandName(perfume.brand);

    const name = document.createElement("h3");
    name.textContent = perfume.name;

    const description = document.createElement("p");
    description.textContent = perfume.description;

    const button = document.createElement("button");
    button.type = "button";
    button.className = "details-button";
    button.textContent = "VIEW DETAILS";

    button.addEventListener("click", () => {
      showDetails(perfume);
    });

    info.append(brand, name, description, button);
    card.append(image, info);
    productsContainer.appendChild(card);
  });

  resultsCount.textContent =
    `${filtered.length} ${filtered.length === 1 ? "fragrance" : "fragrances"}`;

  if (filtered.length === 0) {
    const empty = document.createElement("p");
    empty.className = "empty-message";
    empty.textContent = "No fragrances found. Try another search.";
    productsContainer.appendChild(empty);
  }
}

/* =================================
   PERFUME DETAILS
================================= */

function showDetails(perfume) {
  const image = document.getElementById("dialog-image");

  // Same folder as index.html
  image.src = perfume.image;
  image.alt = perfume.name;

  document.getElementById("dialog-brand").textContent =
    brandName(perfume.brand);

  document.getElementById("dialog-name").textContent =
    perfume.name;

  document.getElementById("dialog-description").textContent =
    perfume.description;

  document.getElementById("dialog-family").textContent =
    perfume.family;

  document.getElementById("dialog-character").textContent =
    perfume.character;

  document.getElementById("dialog-contact").href =
    whatsappLink(
      `Hello, I would like to ask about ${perfume.name} by ${brandName(perfume.brand)}.`
    );

  dialog.showModal();
}

/* =================================
   BRAND FILTER BUTTONS
================================= */

filterButtons.forEach(button => {
  button.setAttribute(
    "aria-pressed",
    String(button.classList.contains("active"))
  );

  button.addEventListener("click", () => {
    currentFilter = button.dataset.filter;

    filterButtons.forEach(item => {
      const active = item === button;
      item.classList.toggle("active", active);
      item.setAttribute("aria-pressed", String(active));
    });

    renderProducts();
  });
});

/* =================================
   SEARCH
================================= */

searchInput.addEventListener("input", renderProducts);

/* =================================
   CLOSE POPUP
================================= */

document.getElementById("close-dialog").addEventListener("click", () => {
  dialog.close();
});

dialog.addEventListener("click", event => {
  if (event.target === dialog) {
    dialog.close();
  }
});

/* =================================
   CONTACT LINKS
================================= */

document.getElementById("whatsapp").href = whatsappLink();

document.getElementById("instagram").href =
  CONTACT.instagram.includes("YOUR_ACCOUNT")
    ? "https://www.instagram.com/"
    : CONTACT.instagram;

/* =================================
   FOOTER YEAR
================================= */

document.getElementById("year").textContent =
  new Date().getFullYear();

/* START */
renderProducts();
