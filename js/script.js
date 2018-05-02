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
 * @name scrollTo
 * @function
 *
 * @param elem
 * @param offsetVal
 *
 * @description
 */
const scrollTo = (elem, offsetVal) => {
    const val = elem.offsetTop - offsetVal;

    window.scroll({
        behavior: 'smooth',
        left: 0,
        top: val
    });
};
/**
 * @name smoothScroll
 * @function
 * @description
 */
const smoothScroll = () => {
    const smoothButtons = document.querySelectorAll("[smooth-js]");

    smoothButtons.forEach((elem, idx) => {
        elem.addEventListener("click", (ev) => {
            ev.preventDefault();

            const currentBtn = ev.currentTarget,
                btnHref = currentBtn.getAttribute("href"),
                headerHeight = document.querySelector("header").offsetHeight;

            scrollTo(document.querySelector(btnHref), headerHeight);
        });
    });
};


/**
 * @function
 * @description
 */
(() => {
    windowEventChange();
    smoothScroll();
})();
