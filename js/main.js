// Helper functions
function $(selector) {
    return document.querySelector(selector);
}

function $$(selector) {
    return document.querySelectorAll(selector);
}

function animate(element, properties, duration, callback) {
    const start = {};
    const change = {};
    const startTime = performance.now();

    for (let prop in properties) {
        start[prop] = parseFloat(getComputedStyle(element)[prop]) || 0;
        change[prop] = parseFloat(properties[prop]) - start[prop];
    }

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        for (let prop in properties) {
            if (prop === 'opacity') {
                element.style.opacity = start[prop] + change[prop] * progress;
            } else if (prop === 'height') {
                element.style.height = (start[prop] + change[prop] * progress) + (prop === 'height' ? '%' : 'px');
            } else if (prop === 'color') {
                // For color, we need to interpolate RGB values
                const startColor = hexToRgb(getComputedStyle(element).color);
                const endColor = hexToRgb(properties[prop]);
                if (startColor && endColor) {
                    const r = Math.round(startColor.r + (endColor.r - startColor.r) * progress);
                    const g = Math.round(startColor.g + (endColor.g - startColor.g) * progress);
                    const b = Math.round(startColor.b + (endColor.b - startColor.b) * progress);
                    element.style.color = `rgb(${r}, ${g}, ${b})`;
                }
            } else if (prop === 'backgroundColor') {
                const startColor = hexToRgb(getComputedStyle(element).backgroundColor);
                const endColor = hexToRgb(properties[prop]);
                if (startColor && endColor) {
                    const r = Math.round(startColor.r + (endColor.r - startColor.r) * progress);
                    const g = Math.round(startColor.g + (endColor.g - startColor.g) * progress);
                    const b = Math.round(startColor.b + (endColor.b - startColor.b) * progress);
                    element.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
                }
            } else {
                element.style[prop] = (start[prop] + change[prop] * progress) + 'px';
            }
        }

        if (progress < 1) {
            requestAnimationFrame(update);
        } else if (callback) {
            callback();
        }
    }

    requestAnimationFrame(update);
}

function hexToRgb(hex) {
    if (!hex) return null;
    if (hex.startsWith('#')) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }
    // If it's already rgb format, parse it
    const match = hex.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
    return match ? {
        r: parseInt(match[1]),
        g: parseInt(match[2]),
        b: parseInt(match[3])
    } : null;
}

function smoothScrollTo(element, duration) {
    const targetPosition = element.getBoundingClientRect().top + window.pageYOffset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function easeInOutQuad(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
}

// Event delegation helper
function delegateEvent(parent, event, selector, handler) {
    parent.addEventListener(event, function (e) {
        var target = e.target;
        // Use closest to find the matching element
        if (target.closest) {
            var matched = target.closest(selector);
            if (matched && parent.contains(matched)) {
                handler.call(matched, e);
            }
        } else {
            // Fallback for older browsers
            while (target && target !== parent) {
                if (target.matches && target.matches(selector)) {
                    handler.call(target, e);
                    return;
                }
                target = target.parentElement;
            }
        }
    });
}

// Lazy load images from data-src
function loadLazyImages(container) {
    if (!container) return;
    var lazyImages = container.querySelectorAll('img[data-src]');
    lazyImages.forEach(function (img) {
        if (img.dataset.src && !img.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        }
    });
}

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function () {
    // Block7 tabs - только переключение классов
    delegateEvent(document, 'click', '.block7 .b_header', function (e) {
        e.preventDefault();

        // Получаем ID нужного контента
        var l_id = this.getAttribute('id');
        var c_id = '#' + l_id + "-content";

        // Сначала удаляем active со всех заголовков и стрелок
        $$('.block7 .b_header').forEach(el => el.classList.remove('active'));
        $$('.block7 .before').forEach(el => el.classList.remove('active'));
        $$('.block7 .after').forEach(el => el.classList.remove('active'));

        // Добавляем active текущему заголовку
        this.classList.add('active');

        // Активируем стрелки текущего элемента
        const parentLi = this.closest('li');
        if (parentLi) {
            const before = parentLi.querySelector('.before');
            const after = parentLi.querySelector('.after');
            if (before) before.classList.add('active');
            if (after) after.classList.add('active');
        }

        // Удаляем active со всех контентов
        $$('.bl7-content').forEach(el => el.classList.remove('active'));

        // Добавляем active нужному контенту
        const activeContent = document.querySelector(c_id);
        console.log(c_id, activeContent);
        if (activeContent) {
            activeContent.classList.add('active');
        }

        return false;
    });

    delegateEvent(document, 'click', '.block7 .before', function () {
        var activeHeader = $('.block7 .b_header.active');
        if (!activeHeader) return;
        var active_bh_id = '#' + activeHeader.getAttribute('id');
        if (active_bh_id != "#1-link") {
            $$('.block7 .b_header').forEach(el => el.classList.remove('active'));
            $$('.block7 .before').forEach(el => el.classList.remove('active'));
            $$('.block7 .after').forEach(el => el.classList.remove('active'));
            var active = $(active_bh_id);
            var active_li = active.parentElement;
            var prev_li = active_li.previousElementSibling;
            if (prev_li) {
                var prev = prev_li.querySelector('.b_header');
                prev.classList.add('active');
                prev_li.querySelector('.before').classList.add('active');
                prev_li.querySelector('.after').classList.add('active');
                var l_id = prev.getAttribute('id');
                var c_id = '#' + l_id + "-content";
                $$('.bl7-content').forEach(el => el.classList.remove('active'));
                var activeContent = $(c_id);
                if (activeContent) {
                    activeContent.classList.add('active');
                }
            }
        }
    });

    delegateEvent(document, 'click', '.block7 .after', function () {
        var activeHeader = $('.block7 .b_header.active');
        if (!activeHeader) return;
        var active_bh_id = '#' + activeHeader.getAttribute('id');
        if (active_bh_id != "#3-link") {
            $$('.block7 .b_header').forEach(el => el.classList.remove('active'));
            $$('.block7 .before').forEach(el => el.classList.remove('active'));
            $$('.block7 .after').forEach(el => el.classList.remove('active'));
            var active = $(active_bh_id);
            var active_li = active.parentElement;
            var next_li = active_li.nextElementSibling;
            if (next_li) {
                var next = next_li.querySelector('.b_header');
                next.classList.add('active');
                next_li.querySelector('.before').classList.add('active');
                next_li.querySelector('.after').classList.add('active');
                var l_id = next.getAttribute('id');
                var c_id = '#' + l_id + "-content";
                $$('.bl7-content').forEach(el => el.classList.remove('active'));
                var activeContent = $(c_id);
                if (activeContent) {
                    activeContent.classList.add('active');
                }
            }
        }
    });

    // Form tabs - только переключение классов
    delegateEvent(document, 'click', '.point2_header', function () {
        $$('.point2_header').forEach(el => el.classList.remove('active'));
        this.classList.add('active');
        var l_id = this.getAttribute('id');
        var c_id = '#' + l_id + "-content";

        $$('.form_point2-automobile').forEach(el => el.classList.remove('active'));

        var activeContent = $(c_id);
        console.log(c_id);
        if (activeContent) {
            activeContent.classList.add('active');
        }
    });

    delegateEvent(document, 'click', '.block_form .before', function () {
        var activeHeader = $('.block_form .point2_header.active');
        if (!activeHeader) return;
        var active_bh_id = '#' + activeHeader.getAttribute('id');
        if (active_bh_id != "#form-tab1") {
            $$('.block_form .point2_header').forEach(el => el.classList.remove('active'));
            $$('.block_form .before').forEach(el => el.classList.remove('active'));
            $$('.block_form .after').forEach(el => el.classList.remove('active'));
            var active = $(active_bh_id);
            var active_li = active.parentElement;
            var prev_li = active_li.previousElementSibling;
            if (prev_li) {
                var prev = prev_li.querySelector('.point2_header');
                prev.classList.add('active');
                prev_li.querySelector('.before').classList.add('active');
                prev_li.querySelector('.after').classList.add('active');
                var l_id = prev.getAttribute('id');
                var c_id = '#' + l_id + "-content";
                $$('.form_point2-automobile').forEach(el => el.classList.remove('active'));
                var activeContent = $(c_id);
                if (activeContent) {
                    activeContent.classList.add('active');
                }
            }
        }
    });

    delegateEvent(document, 'click', '.block_form .after', function () {
        var activeHeader = $('.block_form .point2_header.active');
        if (!activeHeader) return;
        var active_bh_id = '#' + activeHeader.getAttribute('id');
        if (active_bh_id != "#form-tab3") {
            $$('.block_form .point2_header').forEach(el => el.classList.remove('active'));
            $$('.block_form .before').forEach(el => el.classList.remove('active'));
            $$('.block_form .after').forEach(el => el.classList.remove('active'));
            var active = $(active_bh_id);
            var active_li = active.parentElement;
            var next_li = active_li.nextElementSibling;
            if (next_li) {
                var next = next_li.querySelector('.point2_header');
                next.classList.add('active');
                next_li.querySelector('.before').classList.add('active');
                next_li.querySelector('.after').classList.add('active');
                var l_id = next.getAttribute('id');
                var c_id = '#' + l_id + "-content";
                $$('.form_point2-automobile').forEach(el => el.classList.remove('active'));
                var activeContent = $(c_id);
                if (activeContent) {
                    activeContent.classList.add('active');
                }
            }
        }
    });

    //video
    delegateEvent(document, 'click', '.play_btn-wrap', function () {
        var video = $('#cvideo');
        if (!video) return;
        var src = video.getAttribute('src');
        $$('.video_img').forEach(el => el.style.display = 'none');
        $$('.play_btn-wrap').forEach(el => el.style.display = 'none');
        video.style.zIndex = '1';
        video.style.position = 'relative';
        video.setAttribute('src', src + '&autoplay=1');
    });

    //calendar
    delegateEvent(document, 'click', '.calendar_month.available', function () {
        $$('.calendar_month').forEach(el => el.classList.remove('active'));
        this.classList.add('active');
        var month = this.getAttribute('id');
        var sel_month = '#sel-' + month;
        $$('.calendar_dates').forEach(el => el.classList.remove('active'));
        $(sel_month).classList.add('active');
    });

    delegateEvent(document, 'click', '.calendar_date.available', function () {
        this.classList.add('active');
    });

    delegateEvent(document, 'click', '.calendar_date.active', function () {
        this.classList.remove('active');
    });

    //scroll
    $$('a[href^="#"]').forEach(function (link) {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            var sc = this.getAttribute("href");
            var target = $(sc);
            if (target) {
                smoothScrollTo(target, 1000);
            }
        });
    });

    //menu
    delegateEvent(document, 'click', '.menu a', function () {
        $$('.menu a').forEach(el => el.classList.remove('active'));
        this.classList.add('active');
    });

    window.addEventListener("scroll", function () {
        if (window.pageYOffset > 0) {
            $('.menu').classList.add('fixed');
        } else {
            $('.menu').classList.remove('fixed');
        }
    });

    var menu_selector = ".menu";
    function onScroll() {
        var scroll_top = window.pageYOffset || document.documentElement.scrollTop;
        $$(menu_selector + " a").forEach(function (link) {
            var hash = link.getAttribute("href");
            var target = $(hash);
            if (target) {
                var target_id = target.getAttribute("id");
                target = $('#' + target_id);
                var rect = target.getBoundingClientRect();
                var target_top = rect.top + scroll_top;
                var target_height = target.offsetHeight;
                if (target_top - 200 <= scroll_top && target_top + target_height > scroll_top) {
                    $$(menu_selector + " a.active").forEach(el => el.classList.remove("active"));
                    link.classList.add("active");
                } else {
                    link.classList.remove("active");
                }
            }
        });
    }

    window.addEventListener("scroll", onScroll);
    $$("a[href^='#']").forEach(function (link) {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            window.removeEventListener("scroll", onScroll);
            $$(menu_selector + " a.active").forEach(el => el.classList.remove("active"));
            this.classList.add("active");
            var hash = this.getAttribute("href");
            var target = $(hash);
            if (target) {
                smoothScrollTo(target, 500);
                setTimeout(function () {
                    window.location.hash = hash;
                    window.addEventListener("scroll", onScroll);
                }, 500);
            }
        });
    });

    //message animations
    const quoteConfigs = [
        ".block2", ".block4", ".block6", ".block8", ".block10"
    ];

    const hasWho = [true, true, true, true, false]; // последний без .who

    function checkQuotesScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const windowHeight = window.innerHeight;
        const docHeight = document.documentElement.scrollHeight;

        quoteConfigs.forEach((selector, i) => {
            // уже показан
            if (window[`quoteShown${i}`] === false) return;

            const container = $(selector);
            if (!container) return;

            const quote = container.querySelector(".quote");
            const name = container.querySelector(".name");
            const who = hasWho[i] ? container.querySelector(".who") : null;

            if (!quote) return;

            const rect = quote.getBoundingClientRect();
            const top = rect.top + scrollTop;

            if (scrollTop + 500 < top &&
                scrollTop + windowHeight < docHeight &&
                top + quote.offsetHeight > windowHeight) {
                return;
            }

            animate(quote, { opacity: '1' }, 500);

            setTimeout(() => {
                if (name) animate(name, { opacity: '1' }, 500);
                if (who) animate(who, { opacity: '1' }, 500);
            }, 500);

            window[`quoteShown${i}`] = false;
        });
    }

    window.addEventListener("scroll", checkQuotesScroll);
    window.addEventListener("load", checkQuotesScroll);

    //debounce
    function debounce(fn, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                fn(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    window.addEventListener("scroll", debounce(checkQuotesScroll, 80));

    //days
    const heights = ['20%', '38%', '58%', '80%', '100%'];

    function checkScheduleScroll() {
        const days = $$(".scedule > .day");
        if (!days.length) return;

        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const wHeight = window.innerHeight;
        const docHeight = document.documentElement.scrollHeight;

        const dline = $(".d-line");
        const beginLine = $(".scedule-begin-line");

        for (let i = 0; i < heights.length; i++) {
            if (days.length <= i) break;
            if (window[`shown${i}`] === false) continue;  

            const day = days[i];
            const rect = day.getBoundingClientRect();
            const top = rect.top + scrollTop;

            if (scrollTop + 400 < top &&
                scrollTop + wHeight < docHeight &&
                top + day.offsetHeight > wHeight) continue;

            const span = day.querySelector(".d-text > span");

            animate(day, { opacity: '1' }, 500);
            if (dline) {
                dline.style.transition = 'height 0.5s';
                dline.style.height = heights[i];
            }

            setTimeout(() => {
                if (span) animate(span, { color: '#c0d500' }, 500);
            }, 500);

            if (i === 4 && beginLine) {
                setTimeout(() => {
                    animate(beginLine, { backgroundColor: '#c0d500' }, 500);
                }, 2500);
            }

            window[`shown${i}`] = false;
        }
    }

    window.addEventListener("scroll", checkScheduleScroll);
    window.addEventListener("load", checkScheduleScroll);

    //Form
    const formSteps = [
        { currentContent: '#form_point1_content', nextContent: '#form_point2_content', currentStep: '#form_point1', nextStep: '#form_point2' },
        { currentContent: '#form_point2_content', nextContent: '#form_point3_content', currentStep: '#form_point2', nextStep: '#form_point3' },
        { currentContent: '#form_point3_content', nextContent: '#form_point4_content', currentStep: '#form_point3', nextStep: '#form_point4' }
        // если будет form_point5 → просто добавить объект
    ];
    delegateEvent(document, 'click', '.block_form_btn', function (e) {
        // Проверяем, что кликнули внутри нужного активного контента
        const currentActiveContent = $('.block_form_content.active');
        if (!currentActiveContent) return;

        // Находим, какой это шаг (по селектору текущего активного контента)
        const stepIndex = formSteps.findIndex(step =>
            step.currentContent === '#' + currentActiveContent.id
        );

        if (stepIndex === -1) return; // кликнули не в наш шаг → игнорируем

        const step = formSteps[stepIndex];

        // Сбрасываем active у всех контентов и прогресса
        $$('.block_form_content').forEach(el => el.classList.remove('active'));
        $$('.form_progress li').forEach(el => el.classList.remove('active'));

        // Активируем следующий контент и шаг
        $(step.nextContent).classList.add('active');
        $(step.nextStep).classList.add('active');

        // Помечаем текущий как пройденный
        $(step.currentStep).classList.add('passed');
        $(step.currentStep).classList.remove('active');
    });

    //typed
    var typed = new Typed('#typed', {
        stringsElement: '#typed-strings',
        typeSpeed: 60,
        startDelay: 1000,
        loop: false
    });
});