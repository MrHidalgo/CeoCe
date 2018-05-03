/**
 * @name scrollWindowNavigationFixedLarge
 * @function
 *
 * @description
 */
const scrollWindowNavigationFixedLarge = () => {
    let countScroll = document.body.scrollTop || document.documentElement.scrollTop,
        headerBlock = document.getElementsByTagName("header")[0];

    if(window.innerWidth > 767) {
        if (countScroll > 0) {
            headerBlock.classList.add("header--fixed");
        } else {
            headerBlock.classList.remove("header--fixed");
        }
    }

    if (countScroll > 50) {
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
 *
 * @returns {*}
 */
function getBrowser() {
    let ua = navigator.userAgent,
        tem,
        M = ua.match(/(opera|edge|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];

    if (/trident/i.test(M[1])) {
        tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
        return {name: 'IE', version: (tem[1] || '')};
    }

    if (M[1] === 'Chrome') {
        tem = ua.match(/\bOPR\/(\d+)/);

        if (tem != null) {
            return {name: 'Opera', version: tem[1]};
        }

        tem = ua.match(/\edge\/(\d+)/i);

        if (tem != null) {
            return {name: 'Edge', version: tem[1]};
        }
    }

    M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];

    if ((tem = ua.match(/version\/(\d+)/i)) != null) {
        M.splice(1, 1, tem[1]);
    }

    return {
        name: M[0],
        version: M[1]
    };
}

/**
 *
 * @param element
 * @param to
 * @param duration
 */
function scrollTo(element, to, duration) {
    let start = element.scrollTop,
        change = to - start,
        increment = 20;

    let animateScroll = function (elapsedTime) {
        elapsedTime += increment;

        let position = easeInOut(elapsedTime, start, change, duration);

        element.scrollTop = position;

        if (elapsedTime < duration) {
            setTimeout(function () {
                animateScroll(elapsedTime);
            }, increment);
        }
    };

    animateScroll(0);
}

/**
 *
 * @param currentTime
 * @param start
 * @param change
 * @param duration
 * @returns {*}
 */
function easeInOut(currentTime, start, change, duration) {
    currentTime /= duration / 2;
    if (currentTime < 1) {
        return change / 2 * currentTime * currentTime + start;
    }
    currentTime -= 1;
    return -change / 2 * (currentTime * (currentTime - 2) - 1) + start;
}

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

            const browser = getBrowser(),
                browserName = browser.name;

            let docElem = document.documentElement;

            if (browserName === "Safari") {
                docElem = document.body;
            }

            const currentBtn = ev.currentTarget,
                btnHref = currentBtn.getAttribute("href"),
                headerHeight = document.querySelector("header").offsetHeight;

            const scrollElem = document.querySelector(btnHref).offsetTop - headerHeight;

            scrollTo(docElem, scrollElem, 200);
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
