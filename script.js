// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", () => {
    console.log("Game Hub is ready!");

    // Add dark mode toggle functionality
    initializeDarkMode();

    // Add category filter functionality
    addCategoryFiltering();
});
/**
 * Add search functionality
 */
// Open Search Section
function openSearchSection() {
    const searchSection = document.getElementById("search-section");
    searchSection.style.display = "block"; // Show search overlay
    document.body.style.overflow = "hidden"; // Prevent background scroll
}

// Close Search Section
function closeSearchSection() {
    const searchSection = document.getElementById("search-section");
    searchSection.style.display = "none"; // Hide search overlay
    document.body.style.overflow = "auto"; // Restore background scroll
}

// Filter Games in Overlay (Real-Time Search)
function filterGamesOverlay() {
    const searchBar = document.getElementById("overlay-search-bar");
    const searchText = searchBar.value.toLowerCase();
    const gameCards = document.querySelectorAll(".game-grid .game-card");
    const searchResultsGrid = document.getElementById("search-results-grid");

    searchResultsGrid.innerHTML = ""; // Clear previous results

    let hasResults = false;

    gameCards.forEach((card) => {
        const title = card.querySelector(".game-title").textContent.toLowerCase();
        if (title.includes(searchText)) {
            const clonedCard = card.cloneNode(true); // Clone the matching game card
            searchResultsGrid.appendChild(clonedCard);
            hasResults = true;
        }
    });

    // Show "No Results Found" message if no matches
    if (!hasResults) {
        const noResultsMessage = document.createElement("p");
        noResultsMessage.id = "no-results";
        noResultsMessage.textContent = "No games found.";
        noResultsMessage.style.textAlign = "center";
        noResultsMessage.style.color = "red";
        searchResultsGrid.appendChild(noResultsMessage);
    }
}




/**
 * Automatically update the meta description
 */
function updateMetaDescription() {
    const metaDescription = document.querySelector('meta[name="description"]');
    const gameTitleElement = document.querySelector('h1');
    if (metaDescription && gameTitleElement) {
        const gameTitle = gameTitleElement.innerText;
        metaDescription.content = `Play ${gameTitle} on Game Hub! Enjoy this exciting game and explore more.`;
    }
}

/**
 * Add dark mode toggle functionality
 */
// Dark Mode Toggle
function initializeDarkMode() {
    const darkModeToggle = document.getElementById("dark-mode-toggle");
    darkModeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        localStorage.setItem(
            "darkMode",
            document.body.classList.contains("dark-mode")
        );
    });

    // Persist Dark Mode
    if (localStorage.getItem("darkMode") === "true") {
        document.body.classList.add("dark-mode");
    }
}

/**
 * Add category filtering functionality
 */
// Add Category Filtering
function addCategoryFiltering() {
    const filterButtons = document.querySelectorAll(".filter-btn");
    const gameCards = document.querySelectorAll(".game-grid .game-card");

    filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const category = button.getAttribute("data-category");

            gameCards.forEach((card) => {
                const cardCategories = card.dataset.category.split(" ");
                if (category === "all" || cardCategories.includes(category)) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }
            });

            // Highlight active button
            filterButtons.forEach((btn) => btn.classList.remove("active"));
            button.classList.add("active");
        });
    });
}

function makeFullscreen() {
    const iframe = document.querySelector('.game-section iframe');
    if (iframe.requestFullscreen) {
        iframe.requestFullscreen();
    } else if (iframe.mozRequestFullScreen) { // Firefox
        iframe.mozRequestFullScreen();
    } else if (iframe.webkitRequestFullscreen) { // Chrome, Safari and Opera
        iframe.webkitRequestFullscreen();
    } else if (iframe.msRequestFullscreen) { // IE/Edge
        iframe.msRequestFullscreen();
    }
}

function shareGame() {
    if (navigator.share) {
        navigator.share({
            title: document.title, // Use the current page title
            text: "Check out this amazing game on Game Hub!",
            url: window.location.href // Current page URL
        })
        .then(() => console.log('Game shared successfully'))
        .catch((error) => console.error('Error sharing the game:', error));
    } else {
        alert('Sharing is not supported in this browser.');
    }
}
function toggleMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu.style.left === '0px') {
        mobileMenu.style.left = '-100%'; // Close menu
    } else {
        mobileMenu.style.left = '0'; // Open menu
    }
}

/** scrollable Description */
document.addEventListener('DOMContentLoaded', () => {
    const descriptionSection = document.querySelector('.game-description');
    if (descriptionSection) {
        const wordLimit = 400;
        const words = descriptionSection.innerText.split(/\s+/).length;

        // Check if the word count exceeds the limit
        if (words > wordLimit) {
            descriptionSection.style.maxHeight = '200px'; // Set max height
            descriptionSection.style.overflowY = 'auto'; // Enable scrolling
        }
    }
});

document.addEventListener("DOMContentLoaded", function () {
        const scrollingGames = document.querySelector(".scrolling-container");

        scrollingGames.addEventListener("mouseenter", () => {
            scrollingGames.style.animationPlayState = "paused"; // Pause animation
        });

        scrollingGames.addEventListener("mouseleave", () => {
            scrollingGames.style.animationPlayState = "running"; // Resume animation
        });
    });
