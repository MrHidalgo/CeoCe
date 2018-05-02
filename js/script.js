/**
 * @name scrollWindowNavigationFixedLarge
 * @function
 *
 * @description
 */
const scrollWindowNavigationFixedLarge = () => {
    let countScroll = document.body.scrollTop || document.documentElement.scrollTop,
        headerBlock = document.getElementsByTagName("header")[0];

    if (countScroll > 0) {
        headerBlock.classList.add("header--fixed");
    } else {
        headerBlock.classList.remove("header--fixed");
    }
};


/**
 * @name windowEventChange
 * @function
 *
 * @description
 */
const windowEventChange = () => {
    ["resize", "change", "scroll"].map((ev) => {
        window.addEventListener(ev, () => {
            scrollWindowNavigationFixedLarge();
        })
    });
};


/**
 * @function
 * @description
 */
(() => {
    windowEventChange();
})();
