// Global variables for slideshow management
let slideIndex = 0; // Tracks the currently displayed slide
let timeoutID = null; // Stores the ID of the slideshow timeout for reset

/**
 * Hides all slides in the slideshow.
 */
function hideSlideshow() {
    const slides = document.querySelectorAll(".slide");
    slides.forEach(slide => slide.style.display = "none");
}

/**
 * Displays the next slide in the slideshow.
 */
function showNextSlide() {
    hideSlideshow();

    const slides = document.querySelectorAll(".slide");
    slideIndex = (slideIndex + 1) % slides.length;
    slides[slideIndex].style.display = "block";

    resetSlideshowTimer();
}

/**
 * Displays the previous slide in the slideshow.
 */
function showPreviousSlide() {
    hideSlideshow();

    const slides = document.querySelectorAll(".slide");
    slideIndex = (slideIndex - 1 + slides.length) % slides.length;
    slides[slideIndex].style.display = "block";

    resetSlideshowTimer();
}

/**
 * Resets the slideshow timer for automatic slide transition.
 */
function resetSlideshowTimer() {
    if (timeoutID) clearTimeout(timeoutID);
    timeoutID = setTimeout(showNextSlide, 4000);
}

/**
 * Creates an image element with a link.
 * @param {string} imageUrl - URL of the image.
 * @param {string} linkUrl - URL of the link.
 * @returns {HTMLElement} - The created anchor element containing the image.
 */
function createImageElement(imageUrl, linkUrl) {
    const link = document.createElement('a');
    link.href = linkUrl;
    link.target = "_blank";

    const image = document.createElement('img');
    image.src = imageUrl;
    image.className = 'slide';

    link.appendChild(image);
    return link;
}

/**
 * Creates a navigation arrow element.
 * @param {string} id - ID for the arrow container.
 * @param {function} clickHandler - Function to call on click.
 * @param {string} svgPath - SVG path for the arrow icon.
 * @returns {HTMLElement} - The created arrow container element.
 */
function createArrowElement(id, clickHandler, svgPath) {
    const arrowContainer = document.createElement('div');
    arrowContainer.id = id;
    arrowContainer.style.cssText = 'width: 30px; height: 30px; background-color: red;';
    arrowContainer.innerHTML = `<a><svg width="100%" height="100%" viewBox="0 0 24 24" fill="none">${svgPath}</svg></a>`;
    arrowContainer.addEventListener('click', clickHandler);
    return arrowContainer;
}

/**
 * Wraps images in a container element.
 * @returns {HTMLElement} - The created container element with images.
 */
function createImageContainer() {
    const container = document.createElement('div');
    container.className = "Slides";

    // Example images (add more as needed)
    container.appendChild(createImageElement("https://example.com/image1.png", "https://example.com/link1"));
    container.appendChild(createImageElement("https://example.com/image2.png", "https://example.com/link2"));

    return container;
}

/**
 * Creates CSS styles for custom elements.
 * @returns {HTMLElement} - The created style element.
 */
function createStyles() {
    const style = document.createElement('style');
    style.textContent = `/* CSS styles here */`;
    return style;
}

class MySlideShow extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.appendChild(createStyles());
        this.appendChild(createImageContainer());
        this.appendChild(createArrowElement('nextarrow', showNextSlide, '/* SVG path for next arrow */'));
        this.appendChild(createArrowElement('prevarrow', showPreviousSlide, '/* SVG path for prev arrow */'));

        hideSlideshow();
        showNextSlide();
    }
}

customElements.define('custom-slideshow', MySlideShow);
