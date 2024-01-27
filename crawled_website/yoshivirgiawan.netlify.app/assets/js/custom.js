/* ==============
 ========= js documentation ==========================

 * theme name: Exgrid
 * version: 1.0
 * description: Personal Portfolio Html5 Template
 * author: Creationic
 * author-url: https://themeforest.net/user/creationic

    ==================================================

     01. get device width
     -------------------------------------------------
     02. get initial scroll position
     -------------------------------------------------
     03. custom cursor
     -------------------------------------------------
     04. primary navbar effects
     -------------------------------------------------
     05. mobile menu
     -------------------------------------------------
     06. offcanvas info
     -------------------------------------------------
     07. on window resize
     -------------------------------------------------
     08. scroll to top with progress
     -------------------------------------------------
     09. data background
     -------------------------------------------------
     10. data before background
     -------------------------------------------------
     11. copyright year
     -------------------------------------------------
     12. case study image move with cursor
     -------------------------------------------------
     13. download cv
     -------------------------------------------------
     14. animated split btn
     -------------------------------------------------
     15. offcanvas navigation
     -------------------------------------------------
     16. drive tab
     -------------------------------------------------
     17. experience tab
     -------------------------------------------------
     18. case study
     -------------------------------------------------
     19. expertise
     -------------------------------------------------
     20. preloader
     -------------------------------------------------
     21. typing effect
     -------------------------------------------------
     22. text slider
     -------------------------------------------------
     23. odometer counter
     -------------------------------------------------
     24. testimonial two slider
     -------------------------------------------------
     25. video modal
     -------------------------------------------------
     26. sponsor slider
     -------------------------------------------------
     27. company slider
     -------------------------------------------------
     28. language slider
     -------------------------------------------------
     29. testimonial slider
     -------------------------------------------------
     30. awards slider
     -------------------------------------------------
     31. project details slider
     ------------------------------------------------
     32. poster slider
     -------------------------------------------------
     33. gsap plugin register
     -------------------------------------------------
     34. gsap null config
     -------------------------------------------------
     35. taget id
     -------------------------------------------------
     36. animated footer text
     -------------------------------------------------
     37. img view horizontal scroll
     -------------------------------------------------
     38. title animation
     -------------------------------------------------
     39. banner sticky
     -------------------------------------------------
     40. fade top gsap animation
     -------------------------------------------------
     41. large title animation
     -------------------------------------------------
     42. skill bar progress
     -------------------------------------------------
     43. recent content fixed
     -------------------------------------------------
     44. horizontal text slider
     -------------------------------------------------
     45. appear down
     -------------------------------------------------
     46. split title
     -------------------------------------------------
     47. reveal title
     -------------------------------------------------
     48. banner four thumb animation
     -------------------------------------------------
     49. cta background
     -------------------------------------------------
     50. project horizontal slider
     -------------------------------------------------
     51. home three testimonial slider
     -------------------------------------------------
     52. smooth scroll
     -------------------------------------------------
     53. banner three sticky
     -------------------------------------------------
     54. blog sidebar sticky

    ==================================================
============== */

(function ($) {
  "use strict";

  jQuery(document).ready(function () {
    /**
     * ======================================
     * 01. get device width
     * ======================================
     */
    var device_width = window.innerWidth;

    /**
     * ======================================
     * 02. get initial scroll position
     * ======================================
     */
    var initialScroll = $(window).scrollTop();

    /**
     * ======================================
     * 03. custom cursor
     * ======================================
     */
    if ($(".mouseCursor").length > 0) {
      function itCursor() {
        var myCursor = jQuery(".mouseCursor");
        if (myCursor.length) {
          if ($("body")) {
            const e = document.querySelector(".cursor-inner"),
              t = document.querySelector(".cursor-outer");
            let n,
              i = 0,
              o = !1;
            (window.onmousemove = function (s) {
              o ||
                (t.style.transform =
                  "translate(" + s.clientX + "px, " + s.clientY + "px)"),
                (e.style.transform =
                  "translate(" + s.clientX + "px, " + s.clientY + "px)"),
                (n = s.clientY),
                (i = s.clientX);
            }),
              $("body").on(
                "mouseenter",
                "button, a, .cursor-pointer",
                function () {
                  e.classList.add("cursor-hover"),
                    t.classList.add("cursor-hover");
                }
              ),
              $("body").on(
                "mouseleave",
                "button, a, .cursor-pointer",
                function () {
                  ($(this).is("a", "button") &&
                    $(this).closest(".cursor-pointer").length) ||
                    (e.classList.remove("cursor-hover"),
                    t.classList.remove("cursor-hover"));
                }
              ),
              (e.style.visibility = "visible"),
              (t.style.visibility = "visible");
          }
        }
      }
      itCursor();
    }

    /**
     * ======================================
     * 04. top navbar effects
     * ======================================
     */
    $(window).on("scroll", function () {
      var scroll = $(window).scrollTop();
      if (scroll < 100) {
        $(".primary-navbar").removeClass("navbar-active");
      } else {
        $(".primary-navbar").addClass("navbar-active");
      }
    });

    var initialScroll = $(window).scrollTop();
    if (initialScroll >= 100) {
      $(".primary-navbar").addClass("navbar-active");
    }

    /**
     * ======================================
     * 05. mobile menu
     * ======================================
     */
    if ($(".mobile-menu").length > 0) {
      var mobileMenuLogo = $(".navbar__logo").html();
      $(".mobile-menu__logo").append(mobileMenuLogo);

      var mobileMenuContent = $(".navbar__menu").html();
      $(".mobile-menu__list").append(mobileMenuContent);

      $(".mobile-menu .navbar__dropdown-label").on("click", function () {
        $(this).parent().siblings().find(".navbar__sub-menu").slideUp(300);
        $(this)
          .parent()
          .siblings()
          .find(".navbar__dropdown-label")
          .removeClass("navbar__item-active");
        $(this).siblings(".navbar__sub-menu").slideToggle(300);
        $(this).toggleClass("navbar__item-active");
      });
    }

    $(".open-mobile-menu").on("click", function () {
      $(".mobile-menu__backdrop").addClass("mobile-menu__backdrop-active");
      $(this).addClass("animated-bar-active");
      $(".nav-fade").each(function (i) {
        $(this).css("animation-delay", 0.2 * 1 * i + "s");
      });

      $(".mobile-menu").addClass("show-menu");
      $(".mobile-menu__wrapper").removeClass("nav-fade-active");
      $("body").addClass("body-active");
    });

    $(".close-mobile-menu, .mobile-menu__backdrop").on("click", function () {
      setTimeout(function () {
        $(".mobile-menu").removeClass("show-menu");
      }, 900);
      setTimeout(function () {
        $(".mobile-menu__backdrop").removeClass("mobile-menu__backdrop-active");
      }, 1100);

      $(".mobile-menu__wrapper").addClass("nav-fade-active");
      $("body").removeClass("body-active");
      $(".open-mobile-menu").removeClass("animated-bar-active");
      $(".mobile-menu .navbar__sub-menu").slideUp(900);
      $(".mobile-menu .navbar__dropdown-label").removeClass(
        "navbar__item-active"
      );
    });

    /**
     * ======================================
     * 06. offcanvas info
     * ======================================
     */
    $(".open-mobile-info").on("click", function () {
      $(this).toggleClass("animated-bar-active");
      $(".menu").toggleClass("menu-active");
      $("body").toggleClass("body-active");
    });

    $(".off-canvas-backdrop, .off-canvas-close").on("click", function () {
      $(".menu").removeClass("menu-active");
      $(".open-mobile-info").removeClass("animated-bar-active");
      $("body").removeClass("body-active");
    });

    /**
     * ======================================
     * 07. on window resize
     * ======================================
     */
    $(window).on("resize", function () {
      $("body").removeClass("body-active");

      // mobile menu
      $(".mobile-menu").removeClass("show-menu");
      $(".mobile-menu__backdrop").removeClass("mobile-menu__backdrop-active");
      $(".mobile-menu__wrapper").addClass("nav-fade-active");
      $(".mobile-menu .navbar__dropdown-label").removeClass(
        "navbar__item-active"
      );
      $(".mobile-menu .navbar__sub-menu").slideUp(300);
      $(".open-mobile-menu").removeClass("animated-bar-active");

      // offcanvas info
      $(".open-mobile-info").removeClass("animated-bar-active");
      $(".menu").removeClass("menu-active");

      // offcanvas nav
      $(".offcanvas-menu .navbar__dropdown-label").removeClass(
        "navbar__item-active"
      );
      $(".offcanvas-menu .navbar__sub-menu").slideUp(300);
      $(".offcanvas-menu").removeClass("show-offcanvas-menu");
    });

    /**
     * ======================================
     * 08. scroll to top with progress
     * ======================================
     */
    if ($(".progress-wrap").length > 0) {
      var progressPath = document.querySelector(".progress-wrap path");
      var pathLength = progressPath.getTotalLength();
      progressPath.style.transition = progressPath.style.WebkitTransition =
        "none";
      progressPath.style.strokeDasharray = pathLength + " " + pathLength;
      progressPath.style.strokeDashoffset = pathLength;
      progressPath.getBoundingClientRect();
      progressPath.style.transition = progressPath.style.WebkitTransition =
        "stroke-dashoffset 10ms linear";
      var updateProgress = function () {
        var scroll = $(window).scrollTop();
        var height = $(document).height() - $(window).height();
        var progress = pathLength - (scroll * pathLength) / height;
        progressPath.style.strokeDashoffset = progress;
      };
      updateProgress();
      $(window).scroll(updateProgress);
      var offset = 50;
      var duration = 10;
      $(window).on("scroll", function () {
        if ($(this).scrollTop() > offset) {
          $(".progress-wrap").addClass("active-progress");
        } else {
          $(".progress-wrap").removeClass("active-progress");
        }
      });
      $(".progress-wrap").on("click", function (event) {
        event.preventDefault();
        $("html, body").animate({ scrollTop: 0 }, duration);
        return false;
      });

      var initialScroll = $(window).scrollTop();
      if (initialScroll >= 100) {
        $(".progress-wrap").addClass("active-progress");
      }
    }

    /**
     * ======================================
     * 09. data background
     * ======================================
     */
    $("[data-background]").each(function () {
      var backgroundImages = $(this).attr("data-background").split(",");
      var cssValue = backgroundImages
        .map(function (image) {
          return 'url("' + image.trim() + '")';
        })
        .join(",");

      $(this).css("background-image", cssValue);
    });

    /**
     * ======================================
     * 10. data before background
     * ======================================
     */
    $("[data-before-image]").each(function () {
      var backgroundImage = $(this).attr("data-before-image");
      $(this).css("position", "relative");
      $(this)
        .prepend('<div class="before-image"></div>')
        .find(".before-image")
        .css({
          "background-image": 'url("' + backgroundImage + '")',
        });
    });
    /**
     * ======================================
     * 11. copyright year
     * ======================================
     */
    $("#copyYear").text(new Date().getFullYear());

    /**
     * ======================================
     * 12. case study image move with cursor
     * ======================================
     */

    if (device_width > 576) {
      const caseStudyItem = document.querySelectorAll(
        ".banner__content-study__single"
      );

      function followImageCursor(event, caseStudyItem) {
        const contentBox = caseStudyItem.getBoundingClientRect();
        const dx = event.clientX - contentBox.x;
        const dy = event.clientY - contentBox.y;
        caseStudyItem.children[2].style.transform = `translate(${dx}px, ${dy}px) rotate(10deg)`;
      }
      caseStudyItem.forEach((item, i) => {
        item.addEventListener("mousemove", (event) => {
          setInterval(followImageCursor(event, item), 1000);
        });
      });
    }

    /**
     * ======================================
     * 13. download cv
     * ======================================
     */
    $("#downloadCv").on("click", function () {
      var pdfURL = "assets/documents/Resume.pdf";

      var downloadLink = document.createElement("a");
      downloadLink.href = pdfURL;
      downloadLink.download = "achmed-yoshi-virgiawan-cv.pdf";

      document.body.appendChild(downloadLink);

      downloadLink.click();

      $(downloadLink).on("click", function () {
        $(this).remove();
      });
    });

    /**
     * ======================================
     * 14. animated split btn
     * ======================================
     */
    $(".anim-btn").each(function () {
      const text = $(this).find(".btn-anim").text();

      $(this).find(".btn-anim").empty();

      const letters = text.split("").map((letter) => `<span>${letter}</span>`);

      $(this).find(".btn-anim").append(letters);

      $(this)
        .find(".btn-anim span")
        .each(function (index) {
          $(this).css("transition-delay", `${index * 0.05}s`);
        });
    });

    /**
     * ======================================
     * 15. offcanvas navigation
     * ======================================
     */

    if ($(".offcanvas-nav").length) {
      $(".offcanvas-menu .navbar__dropdown-label").on("click", function () {
        $(this).parent().siblings().find(".navbar__sub-menu").slideUp(300);
        $(this)
          .parent()
          .siblings()
          .find(".navbar__dropdown-label")
          .removeClass("navbar__item-active");
        $(this).siblings(".navbar__sub-menu").slideToggle(300);
        $(this).toggleClass("navbar__item-active");
      });
    }

    $(".open-offcanvas-nav").on("click", function () {
      $(".nav-fade").each(function (i) {
        $(this).css("animation-delay", 1 + 0.2 * 1 * i + "s");
      });

      $(".offcanvas-menu").addClass("show-offcanvas-menu");
      $(".offcanvas-menu__wrapper").removeClass("nav-fade-active");
    });

    $(".close-offcanvas-menu, .offcanvas-menu__backdrop").on(
      "click",
      function () {
        setTimeout(function () {
          $(".offcanvas-menu").removeClass("show-offcanvas-menu");
        }, 900);
        $(".offcanvas-menu__wrapper").addClass("nav-fade-active");
        $(".offcanvas-menu .navbar__dropdown-label").removeClass(
          "navbar__item-active"
        );
        $(".offcanvas-menu .navbar__sub-menu").slideUp(300);
      }
    );

    /**
     * ======================================
     * 16. drive tab
     * ======================================
     */
    $(".tab-content").hide();
    $(".tab-content:first").show();

    $(".generate__content-btn").click(function () {
      $(".generate__content-btn").removeClass("generate__content-btn-active");
      $(".tab-content").hide();

      $(this).addClass("generate__content-btn-active");

      var tabIndex = $(this).index();
      $(".tab-content").eq(tabIndex).fadeIn(900);
    });

    /**
     * ======================================
     * 17. experience tab
     * ======================================
     */

    $(".faq-tab-content").hide();
    $(".faq-tab-content:first").show();

    $("#switch").on("change", function () {
      $(".faq-tab-content").hide();
      $(".atc, .abc").removeClass("cd");

      if ($(this).is(":checked")) {
        $("#faqTwo").fadeIn(900);
        $(".atc").addClass("cd");
      } else {
        $("#faqOne").fadeIn(900);
        $(".abc").addClass("cd");
      }
    });

    $(".service-f-single:first").addClass("service-f-single-active");
    $(".service-f-single:first .p-single").show();
    $(".toggle-service-f").on("click", function () {
      var parent = $(this).parent();
      parent.find(".p-single").slideToggle(600);
      parent.toggleClass("service-f-single-active");
      parent.siblings().removeClass("service-f-single-active");
      parent.siblings().find(".p-single").slideUp(600);
    });

    /**
     * ======================================
     * 18. case study
     * ======================================
     */
    $(".case-study-name:nth-child(1)").on("mouseenter", function () {
      $(".case-study-name.active").removeClass("active");
      $(".case-study-images li.show").removeClass("show");
      $(".case-study-images li:nth-child(1)").addClass("show");
      $(this).addClass("active");
    });
    $(".case-study-name:nth-child(2)").on("mouseenter", function () {
      $(".case-study-name.active").removeClass("active");
      $(".case-study-images li.show").removeClass("show");
      $(".case-study-images li:nth-child(2)").addClass("show");
      $(this).addClass("active");
    });
    $(".case-study-name:nth-child(3)").on("mouseenter", function () {
      $(".case-study-name.active").removeClass("active");
      $(".case-study-images li.show").removeClass("show");
      $(".case-study-images li:nth-child(3)").addClass("show");
      $(this).addClass("active");
    });
    $(".case-study-name:nth-child(4)").on("mouseenter", function () {
      $(".case-study-name.active").removeClass("active");
      $(".case-study-images li.show").removeClass("show");
      $(".case-study-images li:nth-child(4)").addClass("show");
      $(this).addClass("active");
    });
    $(".case-study-name:nth-child(1)").trigger("mouseenter");

    /**
     * ======================================
     * 19. expertise
     * ======================================
     */
    $(".expertise-alt .expertise__single").on("mouseover", function () {
      $(".expertise-alt .expertise__single").removeClass(
        "expertise__single-active"
      );
      $(this).addClass("expertise__single-active");
    });

    /**
     * ======================================
     * 20. preloader
     * ======================================
     */
    $("#preloader").fadeOut(800);

    /**
     * ======================================
     * 21. typing effect
     * ======================================
     */
    if ($("#textTyped").length) {
      new Typed("#textTyped", {
        strings: [
          "web developer",
          "ui designer",
          "Digital Marketter",
          "Freelancer",
          "Psychiatrist",
        ],
        typeSpeed: 50,
        startDelay: 50,
        backSpeed: 50,
        backDelay: 1000,
        loop: true,
      });
    }

    /**
     * ======================================
     * 22. text slider
     * ======================================
     */
    $(".text-slider").not(".slick-initialized").slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 0,
      speed: 7000,
      arrows: false,
      dots: false,
      pauseOnHover: false,
      cssEase: "linear",
      variableWidth: true,
    });

    /**
     * ======================================
     * 23. odometer counter
     * ======================================
     */
    $(".odometer").each(function () {
      $(this).isInViewport(function (status) {
        if (status === "entered") {
          for (
            var i = 0;
            i < document.querySelectorAll(".odometer").length;
            i++
          ) {
            var el = document.querySelectorAll(".odometer")[i];
            el.innerHTML = el.getAttribute("data-odometer-final");
          }
        }
      });
    });

    /**
     * ======================================
     * 24. testimonial two slider
     * ======================================
     */
    $(".testimonial-two__slider")
      .not(".slick-initialized")
      .slick({
        infinite: true,
        autoplay: true,
        focusOnSelect: false,
        slidesToShow: 2,
        speed: 1000,
        autoplaySpeed: 4000,
        slidesToScroll: 1,
        arrows: false,
        dots: true,
        appendDots: $(".testimonial-two-dots"),
        centerMode: false,
        responsive: [
          {
            breakpoint: 992,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ],
      });

    /**
     * ======================================
     * 25. video modal
     * ======================================
     */
    if (document.querySelector(".video-btn") !== null) {
      $(".video-btn").magnificPopup({
        disableOn: 768,
        type: "iframe",
        mainClass: "mfp-fade",
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false,
      });
    }

    /**
     * ======================================
     * 26.sponsor slider
     * ======================================
     */
    $(".sponsor__slider")
      .not(".slick-initialized")
      .slick({
        infinite: true,
        autoplay: true,
        focusOnSelect: true,
        slidesToShow: 4,
        speed: 1000,
        autoplaySpeed: 3000,
        slidesToScroll: 1,
        arrows: false,
        dots: false,
        centerMode: true,
        centerPadding: "0px",
        responsive: [
          {
            breakpoint: 1400,
            settings: {
              slidesToShow: 4,
            },
          },
          {
            breakpoint: 1200,
            settings: {
              slidesToShow: 3,
            },
          },
          {
            breakpoint: 576,
            settings: {
              slidesToShow: 2,
            },
          },
        ],
      });

    /**
     * ======================================
     * 27. company slider
     * ======================================
     */
    $(".spon-wrap")
      .not(".slick-initialized")
      .slick({
        infinite: true,
        autoplay: true,
        focusOnSelect: false,
        slidesToShow: 5,
        speed: 1000,
        autoplaySpeed: 4000,
        slidesToScroll: 1,
        arrows: false,
        dots: false,
        centerMode: true,
        centerPadding: "0px",
        responsive: [
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 500,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
            },
          },
        ],
      });

    /**
     * ======================================
     * 28. language slider
     * ======================================
     */
    $(".language__slider").not(".slick-initialized").slick({
      infinite: true,
      autoplay: true,
      focusOnSelect: false,
      slidesToShow: 1,
      speed: 1000,
      autoplaySpeed: 0,
      slidesToScroll: 1,
      arrows: false,
      autoplay: true,
      autoplaySpeed: 0,
      speed: 5000,
      cssEase: "linear",
      pauseOnHover: false,
      pauseOnFocus: false,
      dots: false,
      centerMode: false,
      variableWidth: true,
    });

    $(".language__slider-rtl").not(".slick-initialized").slick({
      infinite: true,
      autoplay: true,
      focusOnSelect: false,
      slidesToShow: 1,
      speed: 1000,
      autoplaySpeed: 0,
      slidesToScroll: 1,
      arrows: false,
      autoplaySpeed: 0,
      speed: 5000,
      cssEase: "linear",
      pauseOnHover: false,
      pauseOnFocus: false,
      dots: false,
      centerMode: false,
      variableWidth: true,
      rtl: true,
    });

    /**
     * ======================================
     * 29. testimonial slider
     * ======================================
     */
    $(".testimonial-slider")
      .not(".slick-initialized")
      .slick({
        infinite: true,
        autoplay: true,
        focusOnSelect: false,
        slidesToShow: 1,
        speed: 1000,
        autoplaySpeed: 4000,
        slidesToScroll: 1,
        arrows: false,
        dots: true,
        appendDots: $(".testimonial-dots"),
        variableWidth: true,
        centerMode: true,
      });

    $(".subject").niceSelect();

    /**
     * ======================================
     * 30. awards slider
     * ======================================
     */
    $(".awards__slider")
      .not(".slick-initialized")
      .slick({
        infinite: true,
        autoplay: true,
        focusOnSelect: false,
        slidesToShow: 2,
        speed: 1000,
        autoplaySpeed: 4000,
        slidesToScroll: 1,
        arrows: false,
        dots: true,
        appendDots: $(".awards-dots"),
        centerMode: false,
        responsive: [
          {
            breakpoint: 992,
            settings: {
              slidesToShow: 1,
            },
          },
        ],
      });

    /**
     * ======================================
     * 31. project details slider
     * ======================================
     */
    $(".project-d__slider")
      .not(".slick-initialized")
      .slick({
        infinite: true,
        autoplay: true,
        focusOnSelect: true,
        slidesToShow: 3,
        speed: 1000,
        autoplaySpeed: 4000,
        slidesToScroll: 1,
        arrows: false,
        dots: false,
        centerMode: true,
        centerPadding: "15%",
        responsive: [
          {
            breakpoint: 1400,
            settings: {
              slidesToShow: 2,
            },
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 1,
            },
          },
        ],
      });

    /**
     * ======================================
     * 32. poster slider
     * ======================================
     */
    $(".poster__slider")
      .not(".slick-initialized")
      .slick({
        infinite: true,
        autoplay: true,
        focusOnSelect: true,
        slidesToShow: 1,
        speed: 1000,
        autoplaySpeed: 4000,
        slidesToScroll: 1,
        arrows: true,
        prevArrow: $(".prev-project-d"),
        nextArrow: $(".next-project-d"),
        dots: false,
        centerMode: true,
        centerPadding: "0px",
      });

    /**
     * ======================================
     * 33. gsap plugin register
     * ======================================
     */
    gsap.registerPlugin(
      ScrollTrigger,
      ScrollSmoother,
      ScrollToPlugin,
      SplitText
    );

    /**
     * ======================================
     * 34. gsap null config
     * ======================================
     */
    gsap.config({
      nullTargetWarn: false,
      debug: false,
    });

    /**
     * ======================================
     * 35. target id
     * ======================================
     */
    $('a[href^="#"]').on("click", function (event) {
      event.preventDefault();

      var target = $(this).attr("href");

      gsap.to(window, {
        scrollTo: {
          y: target,
          offsetY: 50,
        },
        duration: 0.1,
        ease: "power3.inOut",
      });
    });

    /**
     * ======================================
     * 36. animated footer text
     * ======================================
     */
    if ($(".animated-text").length > 0) {
      let folksBD = gsap.timeline({
        repeat: -1,
        delay: 0.5,
        scrollTrigger: {
          trigger: ".animated-text",
          start: "bottom 100%-=50px",
        },
      });
      gsap.set(".animated-text", {
        opacity: 1,
      });
      gsap.to(".animated-text", {
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".animated-text",
          start: "bottom 100%-=50px",
          once: true,
        },
      });
      let mySplitText = new SplitText(".animated-text", {
        type: "words,chars,capitalize",
      });
      let chars = mySplitText.chars;
      let folksGradient = chroma.scale(["#181818", "#181818"]);
      folksBD.to(chars, {
        duration: 0.5,
        scaleY: 0.6,
        ease: "power3.out",
        stagger: 0.04,
        transformOrigin: "center bottom",
      });
      folksBD.to(
        chars,
        {
          yPercent: -20,
          ease: "elastic",
          stagger: 0.03,
          duration: 0.8,
        },
        0.5
      );
      folksBD.to(
        chars,
        {
          scaleY: 1,
          ease: "elastic.out(2.5, 0.2)",
          stagger: 0.03,
          duration: 1.5,
        },
        0.5
      );
      folksBD.to(
        chars,
        {
          color: (i, el, arr) => {
            return folksGradient(i / arr.length).hex();
          },
          ease: "power2.out",
          stagger: 0.03,
          duration: 0.3,
        },
        0.5
      );
      folksBD.to(
        chars,
        {
          yPercent: 0,
          ease: "back",
          stagger: 0.03,
          duration: 0.8,
        },
        0.7
      );
      folksBD.to(chars, {
        color: "#181818",
        duration: 1.4,
        stagger: 0.05,
      });
    }

    /**
     * ======================================
     * 37. img view horizontal scroll
     * ======================================
     */
    if ($(".img-view__left").length > 0) {
      let sections = gsap.utils.toArray(".img-view__left .img-view__single");
      gsap.to(sections, {
        xPercent: -100 * (sections.length - 3),
        ease: "none",
        scrollTrigger: {
          trigger: ".img-view__left",
          pin: false,
          invalidateOnRefresh: true,
          start: "top 60%",
          scrub: 1,
          snap: false,
          end: () => "+=" + $(".img-view__left").innerWidth(),
        },
      });
    }
    if ($(".img-view__right").length > 0) {
      let sections = gsap.utils.toArray(".img-view__right .img-view__single");
      gsap.to(sections, {
        xPercent: 100 * (sections.length - 3),
        ease: "none",
        scrollTrigger: {
          trigger: ".img-view",
          pin: false,
          invalidateOnRefresh: true,
          start: "center center",
          scrub: 1,
          snap: false,
          end: () => "+=" + $(".img-view__right").innerWidth(),
        },
      });
    }

    /**
     * ======================================
     * 38. title animation
     * ======================================
     */

    if ($(".title-animation").length > 0) {
      gsap.utils.toArray(".title-animation").forEach((el) => {
        gsap.to(el, {
          scrollTrigger: {
            trigger: el,
            start: "top 100%",
            markers: false,
            onEnter: () => {
              el.classList.add("title-animation-active");
            },
          },
        });
      });
    }

    /**
     * ======================================
     * 39. banner sticky
     * ======================================
     */

    if ($(".banner").length > 0) {
      if (device_width >= 1200) {
        const metaElement = document.querySelector(".banner__meta");
        const sidebarElement = document.querySelector(".banner__sidebar");
        let nullPadding;

        if (device_width >= 1200) {
          nullPadding = 200;
        } else {
          nullPadding: 200;
        }

        ScrollTrigger.create({
          trigger: ".banner",
          start: "top top",
          end: "bottom top+=" + (metaElement.clientHeight + nullPadding),
          pin: metaElement,
          pinSpacing: false,
          id: "l",
          markers: false,
        });

        ScrollTrigger.create({
          trigger: ".banner",
          start: "top top",
          end: "bottom top+=" + (sidebarElement.clientHeight + nullPadding),
          pin: sidebarElement,
          pinSpacing: false,
          id: "r",
          markers: false,
        });
      }

      if (device_width >= 992) {
        var tl = gsap.timeline({
          scrollTrigger: {
            trigger: ".tag-t",
            endTrigger: ".banner",
            start: "top top",
            end: "bottom bottom",
            scrub: 0.5,
            pin: true,
          },
        });
        tl.to(".tag-t h2", {
          position: "fixed",
          y: "-140px",
          opacity: 0.4,
          zIndex: -1,
          duration: 2,
        });
      }
    }

    /**
     * ======================================
     * 40. fade top gsap animation
     * ======================================
     */
    if ($(".fade-wrapper").length > 0) {
      $(".fade-wrapper").each(function () {
        var section = $(this);
        var fadeItems = section.find(".fade-top");

        fadeItems.each(function (index, element) {
          var delay = index * 0.15;

          gsap.set(element, {
            opacity: 0,
            y: 100,
          });

          ScrollTrigger.create({
            trigger: element,
            start: "top 100%",
            end: "bottom 20%",
            scrub: 0.5,
            onEnter: function () {
              gsap.to(element, {
                opacity: 1,
                y: 0,
                duration: 1,
                delay: delay,
              });
            },
            once: true,
          });
        });
      });
    }

    /**
     * ======================================
     * 41. large title animation
     * ======================================
     */

    /**
     * ======================================
     * 42. skill bar progress
     * ======================================
     */
    $("[data-percent]").each(function () {
      $(this)
        .find(".skill-bar-percent")
        .css("width", $(this).attr("data-percent"));
      $(this)
        .parent()
        .find(".percent-value")
        .text($(this).attr("data-percent"));
    });

    const ax_progress_bar = document.querySelectorAll(".skill-bar-single");
    ax_progress_bar.forEach((element) => {
      const w = element.querySelector(".skill-bar-percent");
      const p = element.querySelector(".percent-value");

      const target = p.textContent;

      const ax_bartl = gsap.timeline({
        defaults: {
          duration: 2,
        },
        scrollTrigger: {
          trigger: element,
        },
      });

      ax_bartl.fromTo(
        w,
        {
          width: 0,
        },
        {
          width: target,
        }
      );
      ax_bartl.from(
        p,
        {
          textContent: 0 + "%",
          snap: {
            textContent: 5,
          },
        },
        "<"
      );
    });

    /**
     * ======================================
     * 43. recent content fixed
     * ======================================
     */
    if (device_width > 992) {
      if ($(".recent").length > 0) {
        const metaElement = document.querySelector(".recent .section__content");

        gsap.to(metaElement, {
          scrollTrigger: {
            trigger: metaElement,
            start: `top-=240px top`,
            endTrigger: ".recent",
            end: `bottom+=400px bottom`,
            pin: true,
            pinSpacing: true,
            markers: false,
          },
        });
      }
    }

    /**
     * ======================================
     * 44. horizontal text slider
     * ======================================
     */
    if ($(".hr-t-one").length > 0) {
      let sections = gsap.utils.toArray(".hr-t-one .hr-text-single-wrapper");
      gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: ".hr-text",
          start: `top-=440px top`,
          pin: false,
          invalidateOnRefresh: true,
          scrub: 1,
          snap: false,
          end: () => "+=" + $(".hr-t-one").innerWidth(),
        },
      });
    }

    if ($(".hr-t-two").length > 0) {
      let sections = gsap.utils.toArray(".hr-t-two .hr-text-single-wrapper");
      gsap.to(sections, {
        xPercent: 100 * (sections.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: ".hr-text",
          start: `top-=440px top`,
          pin: false,
          invalidateOnRefresh: true,
          scrub: 1,
          snap: false,
          end: () => "+=" + $(".hr-t-two").innerWidth(),
        },
      });
    }

    if ($(".hr-t-three").length > 0) {
      let sections = gsap.utils.toArray(".hr-t-three .hr-text-single-wrapper");
      gsap.to(sections, {
        xPercent: -100 * (sections.length - 1.5),
        ease: "none",
        scrollTrigger: {
          trigger: ".hr-text",
          start: `top-=440px top`,
          pin: false,
          invalidateOnRefresh: true,
          scrub: 1,
          snap: false,
          end: () => "+=" + $(".hr-t-three").innerWidth(),
        },
      });
    }

    /**
     * ======================================
     * 45. appear down
     * ======================================
     */
    $(".appear-down").each(function () {
      const section = $(this);

      gsap.fromTo(
        section,
        {
          scale: 0.8,
          opacity: 0,
        },
        {
          scale: 1,
          opacity: 1,
          duration: 1.5,
          scrollTrigger: {
            trigger: section[0],
            scrub: 1,
            start: "top bottom",
            end: "bottom center",
            markers: false,
          },
        }
      );
    });

    /**
     * ======================================
     * 47. reveal title
     * ======================================
     */
    if ($(".reveal-title").length > 0) {
      gsap.utils.toArray(".reveal-title").forEach((el) => {
        gsap.to(el, {
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            markers: false,
            onEnter: () => {
              el.classList.add("reveal-title-active");
            },
            onLeaveBack: () => {
              el.classList.remove("reveal-title-active");
            },
          },
        });
      });
    }

    /**
     * ======================================
     * 48. banner four thumb animation
     * ======================================
     */
    if ($(".banner-four").length > 0) {
      var tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".banner-four",
          start: "center center",
          end: "+=60%",
          scrub: 1,
          pin: false,
        },
      });
      tl.to(".banner-four-thumb", {
        y: "120px",
        duration: 4,
      });
    }

    /**
     * ======================================
     * 49. cta background
     * ======================================
     */
    if ($(".cta-s").length > 0) {
      var tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".cta-s",
          start: "top center",
          end: "+=80%",
          scrub: 1,
          pin: false,
        },
      });
      tl.to(".cta-bg", {
        y: "140px",
        zIndex: "-1",
        duration: 6,
      });
    }

    /**
     * ======================================
     * 50. project horizontal slider
     * ======================================
     */
    if (device_width > 992) {
      if ($(".project-sl").length > 0) {
        let sections = gsap.utils.toArray(".project-sl__single");
        gsap.to(sections, {
          xPercent: -100 * (sections.length - 3),
          ease: "none",
          scrollTrigger: {
            trigger: ".project-sl",
            pin: true,
            invalidateOnRefresh: true,
            start: "center center",
            scrub: 1,
            snap: 1 / (sections.length - 3),
            end: () => "+=" + $(".project-sl").innerWidth(),
          },
        });
      }
    }

    /**
     * ======================================
     * 51. home three testimonial slider
     * ======================================
     */

    if (device_width >= 768) {
      const panels = gsap.utils.toArray(".nt-s");

      panels.forEach((panel, i) => {
        ScrollTrigger.create({
          trigger: panel,
          start: "top-=50% top",
          end: "bottom+=260px bottom",
          onEnter: function () {
            $(".nt-w-right .nt-i").removeClass("activer");
            $(".nt-w-right .nt-i").eq(i).addClass("activer");
          },
          onLeave: function () {
            $(".nt-w-right .nt-i").removeClass("activer");
            $(".nt-w-right .nt-i")
              .eq(i + 1)
              .addClass("activer");
          },
          onLeaveBack: function () {
            $(".nt-w-right .nt-i").removeClass("activer");
            $(".nt-w-right .nt-i").eq(i).addClass("activer");
          },
        });
      });

      ScrollTrigger.create({
        trigger: ".scrollpanels",
        start: "top-=50% top",
        endTrigger: ".n-t",
        end: "bottom+=50% bottom",
        pin: true,
        pinSpacing: false,
        scrub: 1,
      });
    }
    /**
     * ======================================
     * 52. smooth scroll
     * ======================================
     */
    ScrollSmoother.create({
      smooth: 2.2,
      effects: true,
      smoothTouch: 0.1,
    });

    /**
     * ======================================
     * 53. banner three sticky
     * ======================================
     */
    if ($(".ban-three").length > 0) {
      if (device_width >= 1200) {
        const metaElement = document.querySelector(".banner-three__sidebar");
        const sidebarElement = document.querySelector(".banner-three__review");
        let nullPadding;

        if (device_width >= 1200) {
          nullPadding = 160;
        } else {
          nullPadding: 160;
        }

        ScrollTrigger.create({
          trigger: ".ban-three",
          start: "top-=160px top",
          end: "bottom top+=" + (metaElement.clientHeight + nullPadding),
          pin: metaElement,
          pinSpacing: false,
          id: "l",
          markers: false,
        });

        ScrollTrigger.create({
          trigger: ".ban-three",
          start: "top-=160px top",
          end: "bottom top+=" + (sidebarElement.clientHeight + nullPadding),
          pin: sidebarElement,
          pinSpacing: false,
          id: "r",
          markers: false,
        });
      }
    }

    /**
     * ======================================
     * 53. blog sidebar sticky
     * ======================================
     */
    if ($(".blog-main__sidebar").length > 0) {
      if (device_width >= 1200) {
        const metaElement = document.querySelector(".blog-main__sidebar");
        let nullPadding;

        if (device_width >= 1200) {
          nullPadding = 160;
        } else {
          nullPadding: 160;
        }

        ScrollTrigger.create({
          trigger: ".blog-main",
          start: "top-=160px top",
          end: "bottom top+=" + (metaElement.clientHeight + nullPadding),
          pin: metaElement,
          pinSpacing: false,
          id: "l",
          markers: false,
        });
      }
    }

    if ($(".title-anim").length > 0) {
      let char_come = gsap.utils.toArray(".title-anim");
      char_come.forEach((char_come) => {
        let split_char = new SplitText(char_come, {
          type: "chars, words",
          lineThreshold: 0.5,
        });
        const tl2 = gsap.timeline({
          scrollTrigger: {
            trigger: char_come,
            start: "top 90%",
            end: "bottom 60%",
            scrub: false,
            markers: false,
            toggleActions: "play none none none",
          },
        });
        tl2.from(split_char.chars, {
          duration: 0.8,
          x: 70,
          autoAlpha: 0,
          stagger: 0.03,
        });
      });
    }

    /**
       * ======================================
       * 54. copyright year
       * ======================================
       */
    const startYearExperience = 2021;
    const currentYearExperience = new Date().getFullYear();
    $(".yearExperience").text(currentYearExperience - startYearExperience);
  
    /**
       * ======================================
       * 55. content fixed
       * ======================================
       */
    if (device_width > 992) {
      if ($(".fixed-content").length > 0) {
        const metaElement = document.querySelector(".fixed-content .section__content");
  
        gsap.to(metaElement, {
          scrollTrigger: {
            trigger: metaElement,
            start: `top-=240px top`,
            endTrigger: ".fixed-content",
            end: `bottom+=400px bottom`,
            pin: true,
            pinSpacing: true,
            markers: false,
          },
        });
      }
    }

    /**
       * ======================================
       * 56. email js
       * ======================================
       */

    emailjs.init("Mg8HRSy5QIvVIaXng");

    $('#contactForm').on('submit', function(e) {
      e.preventDefault();
      $('#contactSubmitButton').html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Sending...');
      $('#contactSubmitButton').prop('disabled', true);

      var templateParams = {
        from_name: $('#contactName').val(),
        from_email: $('#contactEmail').val(),
        subject: $('#contactSubject').val(),
        message: $('#contactMessage').val()
      };
    
      emailjs.send('service_rquraac', 'template_8oqt5uq', templateParams)
        .then(function(response) {
          $('#toast').removeClass('failed');
          $('#toast').addClass('success');
          $('#toast .toast-body').html('Email sent successfully!');

          $('#contactSubmitButton').html('send message <i class="fa-solid fa-circle-arrow-right"></i>');
          $('#contactSubmitButton').prop('disabled', false);

          var toast = new bootstrap.Toast(document.getElementById('toast'));
          toast.show();
        }, function(error) {
          $('#toast').removeClass('success');
          $('#toast').addClass('failed');
          $('#toast .toast-body').html('Something went wrong!');

          $('#contactSubmitButton').html('send message <i class="fa-solid fa-circle-arrow-right"></i>');
          $('#contactSubmitButton').prop('disabled', false);
          
          var toast = new bootstrap.Toast(document.getElementById('toast'));
          toast.show();
        });

      $(this).trigger("reset");
    });
  });
})(jQuery);
