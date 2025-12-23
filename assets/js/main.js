import { includeHTML } from './include-html.js';

/**
 * Main navigation link active state
 */
function navigationActiveState() {
    const navBar = document.querySelector('.page_header_navbar');

    for (const navItem of navBar.children) {
        if (window.location.href.includes(navItem.href)) {
            navItem.classList.add('is-active');
        } else {
            navItem.classList.remove('is-active');
        }
    }
}

/**
 * Favorite recipes
 */
function handleFavoriteButton() {
    const favoriteButtons = document.querySelectorAll('.favorite-button');

    for (const favoriteButton of favoriteButtons) {
        favoriteButton.addEventListener('click', (event) => {
            event.target.classList.toggle('is-active')
        });
    }
}

/**
 * Handling search form in the header
 */
function handleSearch() {
    const searchParams = new URLSearchParams(window.location.search);
    const hasSearchParam = searchParams.has('search');
    if (!hasSearchParam) return;

    const searchKey = searchParams.get('search');
    searchFunctionality(searchKey);
}

/**
 * Show search results based on the given search key
 */
function searchFunctionality(searchKey) {
    const searchTermElement = document.querySelector('#search-term');
    const searchBarElement = document.querySelector('#search-bar');

    // add search key to search bar when it redirected
    searchBarElement.value = searchKey;
    // show search term in the results page
    searchTermElement.textContent = searchKey;

    // show results
    const recipeItems = document.querySelector('.recipes_list').children;
    for (const recipe of recipeItems) {
        const titleText = recipe.querySelector('h3').textContent.toLowerCase();

        if (titleText.includes(searchKey.toLowerCase())) {
            recipe.classList.add('is-visible');
        } else {
            recipe.classList.remove('is-visible');
        }
    }

    const searchNotFound = document.querySelector('#search-not-found');
    searchNotFound.textContent = `The results you're craving are currently marinating. How about we try a different dish 🤔?`;
}

/**
 * Execute functionality once page loaded
 */
async function onPageReady() {
    await includeHTML();

    navigationActiveState();

    handleFavoriteButton();

    const isSearchPage = window.location.href.includes('search-results.html');
    if (isSearchPage) {
        handleSearch();
    }
}

document.addEventListener('DOMContentLoaded', onPageReady);
