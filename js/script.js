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

    if(countScroll > 50) {
        document.body.classList.add('is-scroll');
    } else {
        document.body.classList.remove('is-scroll');
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
 * @name sendMail
 * @function
 * @description
 */
const sendMail = () => {
    const btn = document.querySelector("[sendMain-js]");

    btn.addEventListener("click", (ev) => {
        const elem = ev.currentTarget,
            mailName = elem.querySelector("input").value;

        elem.setAttribute("href", mailName);
    });
};

/**
 * @name changeImageSVG
 * @function
 * @description
 */
const changeImageSVG = () => {
    document.querySelectorAll('img.svg').forEach(function (element) {
        let imgID = element.getAttribute('id'),
            imgClass = element.getAttribute('class'),
            imgURL = element.getAttribute('src');

        xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                let svg = xhr.responseXML.getElementsByTagName('svg')[0];

                if (imgID != null) {
                    svg.setAttribute('id', imgID);
                }

                if (imgClass != null) {
                    svg.setAttribute('class', imgClass + ' replaced-svg');
                }

                svg.removeAttribute('xmlns:a');

                if (!svg.hasAttribute('viewBox') && svg.hasAttribute('height') && svg.hasAttribute('width')) {
                    svg.setAttribute('viewBox', '0 0 ' + svg.getAttribute('height') + ' ' + svg.getAttribute('width'))
                }
                element.parentElement.replaceChild(svg, element)
            }
        };

        xhr.open('GET', imgURL, true);
        xhr.send(null);
    })
};


/**
 * @function
 * @description
 */
(() => {
    windowEventChange();
    smoothScroll();
    sendMail();
    changeImageSVG();
})();
