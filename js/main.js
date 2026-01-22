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
    parent.addEventListener(event, function(e) {
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

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    //tabs
    delegateEvent(document, 'click', '.block7 .b_header', function() {
        $$('.block7 .b_header').forEach(el => el.classList.remove('active'));
        this.classList.add('active');
        var l_id = this.getAttribute('id');
        var c_id = '#' + l_id + "-content";
        $$('.bl7-content').forEach(el => el.classList.remove('active'));
        $(c_id).classList.add('active');
    });

    delegateEvent(document, 'click', '.block7 .before', function() {
        var activeHeader = $('.block7 .b_header.active');
        if (!activeHeader) return;
        var active_bh_id = '#' + activeHeader.getAttribute('id');
        if (active_bh_id != "#1-link") {
            console.log(active_bh_id);
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
                $(c_id).classList.add('active');
            }
        }
    });

    delegateEvent(document, 'click', '.block7 .after', function() {
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
                $(c_id).classList.add('active');
            }
        }
    });

    //form-tabs
    delegateEvent(document, 'click', '.point2_header', function() {
        $$('.point2_header').forEach(el => el.classList.remove('active'));
        this.classList.add('active');
        var l_id = this.getAttribute('id');
        var c_id = '#' + l_id + "-content";
        $$('.form_point2-automobile').forEach(el => el.classList.remove('active'));
        $(c_id).classList.add('active');
    });

    delegateEvent(document, 'click', '.block_form .before', function() {
        var activeHeader = $('.block_form .point2_header.active');
        if (!activeHeader) return;
        var active_bh_id = '#' + activeHeader.getAttribute('id');
        if (active_bh_id != "#1form-tab") {
            console.log(active_bh_id);
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
                $(c_id).classList.add('active');
            }
        }
    });

    delegateEvent(document, 'click', '.block_form .after', function() {
        var activeHeader = $('.block_form .point2_header.active');
        if (!activeHeader) return;
        var active_bh_id = '#' + activeHeader.getAttribute('id');
        if (active_bh_id != "#3form-tab") {
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
                $(c_id).classList.add('active');
            }
        }
    });

    //video
    delegateEvent(document, 'click', '.play_btn-wrap', function() {
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
    delegateEvent(document, 'click', '.calendar_month.available', function() {
        $$('.calendar_month').forEach(el => el.classList.remove('active'));
        this.classList.add('active');
        var month = this.getAttribute('id');
        var sel_month = '#sel-' + month;
        $$('.calendar_dates').forEach(el => el.classList.remove('active'));
        $(sel_month).classList.add('active');
    });

    delegateEvent(document, 'click', '.calendar_date.available', function() {
        this.classList.add('active');
    });

    delegateEvent(document, 'click', '.calendar_date.active', function() {
        this.classList.remove('active');
    });

    //scroll
    $$('a[href^="#"]').forEach(function(link) {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            var sc = this.getAttribute("href");
            var target = $(sc);
            if (target) {
                smoothScrollTo(target, 1000);
            }
        });
    });

    //menu
    delegateEvent(document, 'click', '.menu a', function() {
        $$('.menu a').forEach(el => el.classList.remove('active'));
        this.classList.add('active');
    });

    window.addEventListener("scroll", function() {
        if (window.pageYOffset > 0) {
            $('.menu').classList.add('fixed');
        } else {
            $('.menu').classList.remove('fixed');
        }
    });

    var menu_selector = ".menu";
    function onScroll() {
        var scroll_top = window.pageYOffset || document.documentElement.scrollTop;
        $$(menu_selector + " a").forEach(function(link) {
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
    $$("a[href^='#']").forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            window.removeEventListener("scroll", onScroll);
            $$(menu_selector + " a.active").forEach(el => el.classList.remove("active"));
            this.classList.add("active");
            var hash = this.getAttribute("href");
            var target = $(hash);
            if (target) {
                smoothScrollTo(target, 500);
                setTimeout(function() {
                    window.location.hash = hash;
                    window.addEventListener("scroll", onScroll);
                }, 500);
            }
        });
    });

    //message animations
    var show1 = true;
    var countbox = ".block2 .quote";
    function checkScroll1() {
        if (!show1) return false;
        var countboxEl = $(countbox);
        if (!countboxEl) return;
        var w_top = window.pageYOffset || document.documentElement.scrollTop;
        var rect = countboxEl.getBoundingClientRect();
        var e_top = rect.top + w_top;
        var w_height = window.innerHeight;
        var d_height = document.documentElement.scrollHeight;
        var e_height = countboxEl.offsetHeight;
        if (w_top + 500 >= e_top || w_height + w_top == d_height || e_height + e_top < w_height) {
            var quote = $(".block2 .quote");
            var name = $(".block2 .name");
            var who = $(".block2 .who");
            if (quote) animate(quote, { opacity: '1' }, 500);
            setTimeout(function() {
                if (name) animate(name, { opacity: '1' }, 500);
                if (who) animate(who, { opacity: '1' }, 500);
            }, 500);
            show1 = false;
        }
    }
    window.addEventListener("scroll", checkScroll1);
    window.addEventListener("load", checkScroll1);

    var show2 = true;
    var countbox2 = ".block4 .quote";
    function checkScroll2() {
        if (!show2) return false;
        var countboxEl = $(countbox2);
        if (!countboxEl) return;
        var w_top2 = window.pageYOffset || document.documentElement.scrollTop;
        var rect = countboxEl.getBoundingClientRect();
        var e_top2 = rect.top + w_top2;
        var w_height2 = window.innerHeight;
        var d_height2 = document.documentElement.scrollHeight;
        var e_height2 = countboxEl.offsetHeight;
        if (w_top2 + 500 >= e_top2 || w_height2 + w_top2 == d_height2 || e_height2 + e_top2 < w_height2) {
            var quote = $(".block4 .quote");
            var name = $(".block4 .name");
            var who = $(".block4 .who");
            if (quote) animate(quote, { opacity: '1' }, 500);
            setTimeout(function() {
                if (name) animate(name, { opacity: '1' }, 500);
                if (who) animate(who, { opacity: '1' }, 500);
            }, 500);
            show2 = false;
        }
    }
    window.addEventListener("scroll", checkScroll2);
    window.addEventListener("load", checkScroll2);

    var show3 = true;
    var countbox3 = ".block6 .quote";
    function checkScroll3() {
        if (!show3) return false;
        var countboxEl = $(countbox3);
        if (!countboxEl) return;
        var w_top3 = window.pageYOffset || document.documentElement.scrollTop;
        var rect = countboxEl.getBoundingClientRect();
        var e_top3 = rect.top + w_top3;
        var w_height3 = window.innerHeight;
        var d_height3 = document.documentElement.scrollHeight;
        var e_height3 = countboxEl.offsetHeight;
        if (w_top3 + 500 >= e_top3 || w_height3 + w_top3 == d_height3 || e_height3 + e_top3 < w_height3) {
            var quote = $(".block6 .quote");
            var name = $(".block6 .name");
            var who = $(".block6 .who");
            if (quote) animate(quote, { opacity: '1' }, 500);
            setTimeout(function() {
                if (name) animate(name, { opacity: '1' }, 500);
                if (who) animate(who, { opacity: '1' }, 500);
            }, 500);
            show3 = false;
        }
    }
    window.addEventListener("scroll", checkScroll3);
    window.addEventListener("load", checkScroll3);

    var show4 = true;
    var countbox4 = ".block8 .quote";
    function checkScroll4() {
        if (!show4) return false;
        var countboxEl = $(countbox4);
        if (!countboxEl) return;
        var w_top4 = window.pageYOffset || document.documentElement.scrollTop;
        var rect = countboxEl.getBoundingClientRect();
        var e_top4 = rect.top + w_top4;
        var w_height4 = window.innerHeight;
        var d_height4 = document.documentElement.scrollHeight;
        var e_height4 = countboxEl.offsetHeight;
        if (w_top4 + 500 >= e_top4 || w_height4 + w_top4 == d_height4 || e_height4 + e_top4 < w_height4) {
            var quote = $(".block8 .quote");
            var name = $(".block8 .name");
            var who = $(".block8 .who");
            if (quote) animate(quote, { opacity: '1' }, 500);
            setTimeout(function() {
                if (name) animate(name, { opacity: '1' }, 500);
                if (who) animate(who, { opacity: '1' }, 500);
            }, 500);
            show4 = false;
        }
    }
    window.addEventListener("scroll", checkScroll4);
    window.addEventListener("load", checkScroll4);

    var show5 = true;
    var countbox5 = ".block10 .quote";
    function checkScroll5() {
        if (!show5) return false;
        var countboxEl = $(countbox5);
        if (!countboxEl) return;
        var w_top5 = window.pageYOffset || document.documentElement.scrollTop;
        var rect = countboxEl.getBoundingClientRect();
        var e_top5 = rect.top + w_top5;
        var w_height5 = window.innerHeight;
        var d_height5 = document.documentElement.scrollHeight;
        var e_height5 = countboxEl.offsetHeight;
        if (w_top5 + 500 >= e_top5 || w_height5 + w_top5 == d_height5 || e_height5 + e_top5 < w_height5) {
            var quote = $(".block10 .quote");
            var name = $(".block10 .name");
            if (quote) animate(quote, { opacity: '1' }, 500);
            setTimeout(function() {
                if (name) animate(name, { opacity: '1' }, 500);
            }, 500);
            show5 = false;
        }
    }
    window.addEventListener("scroll", checkScroll5);
    window.addEventListener("load", checkScroll5);

    //days
    var show61 = true;
    function checkScroll61() {
        if (!show61) return false;
        var days = $$(".scedule>.day");
        if (days.length === 0) return;
        var countboxEl = days[0];
        var w_top61 = window.pageYOffset || document.documentElement.scrollTop;
        var rect = countboxEl.getBoundingClientRect();
        var e_top61 = rect.top + w_top61;
        var w_height61 = window.innerHeight;
        var d_height61 = document.documentElement.scrollHeight;
        var e_height61 = countboxEl.offsetHeight;
        if (w_top61 + 400 >= e_top61 || w_height61 + w_top61 == d_height61 || e_height61 + e_top61 < w_height61) {
            var day = days[0];
            var dline = $(".d-line");
            var span = day.querySelector(".d-text>span");
            if (day) animate(day, { opacity: '1' }, 500);
            if (dline) {
                dline.style.transition = 'height 0.5s';
                dline.style.height = '20%';
            }
            setTimeout(function() {
                if (span) animate(span, { color: '#c0d500' }, 500);
            }, 500);
            show61 = false;
        }
    }
    window.addEventListener("scroll", checkScroll61);
    window.addEventListener("load", checkScroll61);

    var show62 = true;
    function checkScroll62() {
        if (!show62) return false;
        var days = $$(".scedule>.day");
        if (days.length < 2) return;
        var countboxEl = days[1];
        var w_top62 = window.pageYOffset || document.documentElement.scrollTop;
        var rect = countboxEl.getBoundingClientRect();
        var e_top62 = rect.top + w_top62;
        var w_height62 = window.innerHeight;
        var d_height62 = document.documentElement.scrollHeight;
        var e_height62 = countboxEl.offsetHeight;
        if (w_top62 + 400 >= e_top62 || w_height62 + w_top62 == d_height62 || e_height62 + e_top62 < w_height62) {
            var day = days[1];
            var dline = $(".d-line");
            var span = day.querySelector(".d-text>span");
            if (day) animate(day, { opacity: '1' }, 500);
            if (dline) {
                dline.style.transition = 'height 0.5s';
                dline.style.height = '38%';
            }
            setTimeout(function() {
                if (span) animate(span, { color: '#c0d500' }, 500);
            }, 500);
            show62 = false;
        }
    }
    window.addEventListener("scroll", checkScroll62);
    window.addEventListener("load", checkScroll62);

    var show63 = true;
    function checkScroll63() {
        if (!show63) return false;
        var days = $$(".scedule>.day");
        if (days.length < 3) return;
        var countboxEl = days[2];
        var w_top63 = window.pageYOffset || document.documentElement.scrollTop;
        var rect = countboxEl.getBoundingClientRect();
        var e_top63 = rect.top + w_top63;
        var w_height63 = window.innerHeight;
        var d_height63 = document.documentElement.scrollHeight;
        var e_height63 = countboxEl.offsetHeight;
        if (w_top63 + 400 >= e_top63 || w_height63 + w_top63 == d_height63 || e_height63 + e_top63 < w_height63) {
            var day = days[2];
            var dline = $(".d-line");
            var span = day.querySelector(".d-text>span");
            if (day) animate(day, { opacity: '1' }, 500);
            if (dline) {
                dline.style.transition = 'height 0.5s';
                dline.style.height = '58%';
            }
            setTimeout(function() {
                if (span) animate(span, { color: '#c0d500' }, 500);
            }, 500);
            show63 = false;
        }
    }
    window.addEventListener("scroll", checkScroll63);
    window.addEventListener("load", checkScroll63);

    var show64 = true;
    function checkScroll64() {
        if (!show64) return false;
        var days = $$(".scedule>.day");
        if (days.length < 4) return;
        var countboxEl = days[3];
        var w_top64 = window.pageYOffset || document.documentElement.scrollTop;
        var rect = countboxEl.getBoundingClientRect();
        var e_top64 = rect.top + w_top64;
        var w_height64 = window.innerHeight;
        var d_height64 = document.documentElement.scrollHeight;
        var e_height64 = countboxEl.offsetHeight;
        if (w_top64 + 400 >= e_top64 || w_height64 + w_top64 == d_height64 || e_height64 + e_top64 < w_height64) {
            var day = days[3];
            var dline = $(".d-line");
            var span = day.querySelector(".d-text>span");
            if (day) animate(day, { opacity: '1' }, 500);
            if (dline) {
                dline.style.transition = 'height 0.5s';
                dline.style.height = '80%';
            }
            setTimeout(function() {
                if (span) animate(span, { color: '#c0d500' }, 500);
            }, 500);
            show64 = false;
        }
    }
    window.addEventListener("scroll", checkScroll64);
    window.addEventListener("load", checkScroll64);

    var show65 = true;
    function checkScroll65() {
        if (!show65) return false;
        var days = $$(".scedule>.day");
        if (days.length < 5) return;
        var countboxEl = days[4];
        var w_top65 = window.pageYOffset || document.documentElement.scrollTop;
        var rect = countboxEl.getBoundingClientRect();
        var e_top65 = rect.top + w_top65;
        var w_height65 = window.innerHeight;
        var d_height65 = document.documentElement.scrollHeight;
        var e_height65 = countboxEl.offsetHeight;
        if (w_top65 + 400 >= e_top65 || w_height65 + w_top65 == d_height65 || e_height65 + e_top65 < w_height65) {
            var day = days[4];
            var dline = $(".d-line");
            var span = day.querySelector(".d-text>span");
            var beginLine = $(".scedule-begin-line");
            if (day) animate(day, { opacity: '1' }, 500);
            if (dline) {
                dline.style.transition = 'height 0.5s';
                dline.style.height = '100%';
            }
            setTimeout(function() {
                if (span) animate(span, { color: '#c0d500' }, 500);
            }, 500);
            setTimeout(function() {
                if (beginLine) animate(beginLine, { backgroundColor: '#c0d500' }, 500);
            }, 2500);
            show65 = false;
        }
    }
    window.addEventListener("scroll", checkScroll65);
    window.addEventListener("load", checkScroll65);

    //Form
    delegateEvent(document, 'click', '#form_point1_content .block_form_btn', function() {
        $$('.block_form_content').forEach(el => el.classList.remove('active'));
        $$('.form_progress li').forEach(el => el.classList.remove('active'));
        $('#form_point2_content').classList.add('active');
        $('#form_point1').classList.remove('active');
        $('#form_point2').classList.add('active');
        $('#form_point1').classList.add('passed');
    });

    delegateEvent(document, 'click', '#form_point2_content .block_form_btn', function() {
        $$('.block_form_content').forEach(el => el.classList.remove('active'));
        $$('.form_progress li').forEach(el => el.classList.remove('active'));
        $('#form_point3_content').classList.add('active');
        $('#form_point2').classList.remove('active');
        $('#form_point3').classList.add('active');
        $('#form_point2').classList.add('passed');
    });

    delegateEvent(document, 'click', '#form_point3_content .block_form_btn', function() {
        $$('.block_form_content').forEach(el => el.classList.remove('active'));
        $$('.form_progress li').forEach(el => el.classList.remove('active'));
        $('#form_point4_content').classList.add('active');
        $('#form_point3').classList.remove('active');
        $('#form_point4').classList.add('active');
        $('#form_point3').classList.add('passed');
    });

    //typed
    var typed = new Typed('#typed', {
        stringsElement: '#typed-strings',
        typeSpeed: 60,
        startDelay: 1000,
        loop: false
    });
});
