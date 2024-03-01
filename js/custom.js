$(window).on("load", function() {
  "use strict";
  var emailAddress = 'cymatlin@gmail.com';
var phoneNumber = '+9720537301993';
var linkedInURL = 'https://www.linkedin.com/in/yechezkel-matlin';
var gitLabURL = 'https://gitlab.com/cymatlin';
var githubURL = 'https://github.com/matlin100';
var portfolioURL = 'https://matlin100.github.io/Chezky-Matlin-Portfolio-html/html/index.html';
  /*=========================================================================
      Preloader
  =========================================================================*/

  /*=========================================================================
      Custom Scrollbar
  =========================================================================*/
  $(".header-inner").mCustomScrollbar();

  /*=========================================================================
   Isotope
   =========================================================================*/
  var $container = $('.portfolio-wrapper');
  $('.portfolio-filter').on('click', 'li', function() {
      var filterValue = $(this).attr('data-filter');
      $container.isotope({
          filter: filterValue
      });
  });

  $('.contact-info .details span').each(function() {
    var type = $(this).parent().find('h5').text().toLowerCase();
    switch (type) {
        case 'phone':
            $(this).text(phoneNumber);
            break;
        case 'email address':
            $(this).text(emailAddress);
            break;
    }
});
// Set dynamic hrefs for social icons
$('.social-icons a').each(function() {
    var iconClass = $(this).find('i').attr('class');
    if (iconClass.includes('fa-phone')) {
        $(this).attr('href', 'tel:' + phoneNumber);
    } else if (iconClass.includes('fa-envelope')) {
        $(this).attr('href', 'mailto:' + emailAddress);
    } else if (iconClass.includes('fa-globe')) {
        $(this).attr('href', portfolioURL);
        $(this).attr('target', '_blank');
    } else if (iconClass.includes('fa-linkedin-in')) {
        $(this).attr('href', linkedInURL);
        $(this).attr('target', '_blank');
    } else if (iconClass.includes('fa-gitlab')) {
        $(this).attr('href', gitLabURL);
        $(this).attr('target', '_blank');
    } else if (iconClass.includes('fa-github')) {
        $(this).attr('href', githubURL);
        $(this).attr('target', '_blank');
    }
});
  // cha    nge is-checked class on buttons
  $('.portfolio-filter').each(function(i, buttonGroup) {
      var $buttonGroup = $(buttonGroup);
      $buttonGroup.on('click', 'li', function() {
          $buttonGroup.find('.current').removeClass('current');
          $(this).addClass('current');
      });

      $("a").on('click', function(event) {

        // Make sure this.hash has a value before overriding default behavior
        if (this.hash !== "") {
            // Prevent default anchor click behavior
            event.preventDefault();

            // Store hash
            var hash = this.hash;

            // Using jQuery's animate() method to add smooth page scroll
            // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 800, function(){

                // Add hash (#) to URL when done scrolling (default click behavior)
                window.location.hash = hash;
            });
        } // End if
    });
  });
  
  var startYear = 2021;
  var currentYear = new Date().getFullYear();
  var yearsOfExperience = currentYear - startYear;
  $("#experience-years").text(yearsOfExperience + (yearsOfExperience > 1 ? ' years' : ' year')); // Handle singular/plural

  // Populate skills
  const skills = [
      'React', 'Angular', 'Bootstrap', 'Material-UI',
      'Node.js', 'Python', 'Java', 'C', 'API Development',
      'Git', 'GitLab', 'Jenkins', 'Local Servers', 'Azure',
      'Switch Configuration', 'AD', 'DHCP', 'vSphere'
  ];

  skills.forEach(skill => {
      $('.skill-container').append(
          `<div class="col-md-6">
              <div class="skill-item">
                  <div class="skill-info clearfix">
                  <h4 class="float-left mb-3 mt-0"><i class="fas fa-check-circle text-primary mr-3"></i> ${skill}</h4>
                  </div>
              </div>
          </div>`
      );
  });

  $container.imagesLoaded(function() {
      $container.isotope({
          // options
          itemSelector: '[class*="col-"]',
          percentPosition: true,
          masonry: {
              // use element for option
              columnWidth: '[class*="col-"]'
          }
      });
  });

  /*=========================================================================
   Infinite Scroll
   =========================================================================*/
  var curPage = 1;
  var pagesNum = $(".portfolio-pagination").find("li a:last").text(); // Number of pages

  $container.infinitescroll({
          itemSelector: '.grid-item',
          nextSelector: '.portfolio-pagination li a',
          navSelector: '.portfolio-pagination',
          extraScrollPx: 0,
          bufferPx: 0,
          maxPage: 6,
          loading: {
              finishedMsg: "No more works",
              msgText: '',
              speed: 'slow',
              selector: '.load-more',
          },
      },
      // trigger Masonry as a callback
      function(newElements) {

          var $newElems = $(newElements);
          $newElems.imagesLoaded(function() {
              $newElems.animate({
                  opacity: 1
              });
              $container.isotope('appended', $newElems);
          });

          // Check last page
          curPage++;
          if (curPage == pagesNum) {
              $('.load-more').remove();
          }

      });

  $container.infinitescroll('unbind');

  $('.load-more .btn').on('click', function() {
      $container.infinitescroll('retrieve');
      // display loading icon
      $('.load-more .btn i').css('display', 'inline-block');
      $('.load-more .btn i').addClass('fa-spin');

      $(document).ajaxStop(function() {
          setTimeout(function() {
              // hide loading icon
              $('.load-more .btn i').hide();
          }, 1000);
      });
      return false;
  });

  /* ======= Mobile Filter ======= */

  // bind filter on select change
  $('.portfolio-filter-mobile').on('change', function() {
      // get filter value from option value
      var filterValue = this.value;
      // use filterFn if matches value
      $container.isotope({
          filter: filterValue
      });
  });

  var filterFns = {
      // show if number is greater than 50
      numberGreaterThan50: function() {
          var number = $(this).find('.number').text();
          return parseInt(number, 10) > 50;
      },
      // show if name ends with -ium
      ium: function() {
          var name = $(this).find('.name').text();
          return name.match(/ium$/);
      }
  };
});

/*=========================================================================
          Carousels
=========================================================================*/
$(document).on('ready', function() {
  "use strict";

  $('.testimonials-wrapper').slick({
      dots: true,
      arrows: false,
      slidesToShow: 2,
      slidesToScroll: 2,
      responsive: [{
              breakpoint: 768,
              settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
                  dots: true,
                  arrows: false,
              }
          }
      ]
  });

  $('.clients-wrapper').slick({
      dots: false,
      arrows: false,
      slidesToShow: 4,
      slidesToScroll: 4,
      responsive: [{
              breakpoint: 768,
              settings: {
                  slidesToShow: 3,
                  slidesToScroll: 3,
                  dots: false,
                  arrows: false,
              }
          },
          {
              breakpoint: 425,
              settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
                  dots: false,
                  arrows: false,
              }
          }
      ]
  });

});

document.addEventListener('DOMContentLoaded', function() {
    // Select all navigation links
    const navLinks = document.querySelectorAll('.vertical-menu li a');

    // Function to close the sidebar
    function closeSidebar() {
        if($('header.left').toggleClass('open')){
            $('header.left').removeClass('open');
            $('.mobile-header, main.content').removeClass('push');
        }
       
    }

    // Add click event listener to each navigation link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
                closeSidebar();
        });
    });
})

$(function() {
  "use strict";
   
  $('.menu-icon').on('click', function() {
      $('header.left').toggleClass('open');
      $('.mobile-header, main.content').toggleClass('push');
  });

  $('main.content, header.left button.close').on('click', function() {
      $('header.left').removeClass('open');
      $('.mobile-header, main.content').removeClass('push');
  });

  /*=========================================================================
   Counterup JS for facts
   =========================================================================*/
  $('.count').counterUp({
      delay: 10,
      time: 2000
  });

  /*=========================================================================
   Progress bar animation with Waypoint JS
   =========================================================================*/
  if ($('.skill-item').length > 0) {
      var waypoint = new Waypoint({
          element: document.getElementsByClassName('skill-item'),
          handler: function(direction) {

              $('.progress-bar').each(function() {
                  var bar_value = $(this).attr('aria-valuenow') + '%';
                  $(this).animate({
                      width: bar_value
                  }, {
                      easing: 'linear'
                  });
              });

              this.destroy();
          },
          offset: '50%'
      });
  }

  /*=========================================================================
   Background Image with Data Attribute
   =========================================================================*/
  var bgImg = $("[data-bg-img]");
  bgImg.css('background', function() {
      return 'url(' + $(this).data('bg-img') + ') center center';
  });

  /*=========================================================================
   Subscribe Form
   =========================================================================*/
  $("#subscribeForm").submit(function(e) {
      e.preventDefault();
      var subscriberEmail = $("#subscriberEmail").val();
      $.ajax({
          type: "POST",
          url: "assets/php/subscribe.php",
          data: {
              email: subscriberEmail
          },
          success: function(text) {
              if (text == "success") {
                  $("#subscribeMsg").html('<span class="text-success">You have successfully subscribed.</span>');
              } else {
                  $("#subscribeMsg").html('<span class="text-danger">' + text + '</span>');
              }
          }
      });
  });

  /*=========================================================================
   Contact Form
   =========================================================================*/
  $("#contactForm").submit(function(e) {
      e.preventDefault();
      var name = $("#name").val();
      var email = $("#email").val();
      var subject = $("#subject").val();
      var message = $("#message").val();

      $.ajax({
          type: "POST",
          url: "assets/php/contact.php",
          data: {
              name: name,
              email: email,
              subject: subject,
              message: message
          },
          success: function(text) {
              if (text == "success") {
                  $("#contactMsg").html('<span class="text-success">Message sent successfully.</span>');
              } else {
                  $("#contactMsg").html('<span class="text-danger">' + text + '</span>');
              }
          }
      });
  });

  /*=========================================================================
   Modal Open and Close Functions
   =========================================================================*/
  // Define these functions in the global scope
  window.onclick = function(event) {
    let modal = document.getElementById("resumeModal");
    if (event.target == modal) {
        closeModal();
    }
}

  window.openModal = function() {
    let modal = document.getElementById("resumeModal");
    

    modal.style.display = "block";
    modal.style.animation = 'fadeIn 0.3s'; // Apply fadeIn animation
    modal.offsetHeight; // Trigger reflow to restart animation
    modal.style.animation = null;

    
  };

  window.closeModal = function() {
    let modal = document.getElementById("resumeModal");
    

    modal.style.animation = 'fadeOut 0.3s'; // Apply fadeOut animation
    modal.offsetHeight; // Trigger reflow to restart animation

    modal.style.display = "none";
    modal.style.animation = null;

   
  };
});


document.addEventListener('DOMContentLoaded', function () {
  // Set the dates
  const releaseDate = new Date('2024-06-29');
  const startDate = new Date('2021-05-29');
  const currentDate = new Date();

  // Calculate the difference in days
  const daysToRelease = Math.ceil((releaseDate - currentDate) / (1000 * 60 * 60 * 24));
  const daysFromStart = Math.ceil((currentDate - startDate) / (1000 * 60 * 60 * 24));

  // Set the numbers in the HTML
  document.getElementById('daysToRelease').textContent = daysToRelease;
  document.getElementById('daysFromStart').textContent = daysFromStart;
});



document.addEventListener('DOMContentLoaded', function() {
    var observer;
    var videoSection = document.getElementById('video');
    var video = videoSection.querySelector('.video-container');

    // Options for the observer (which parts of the screen the video needs to be in to start playing)
    var options = {
        root: null, // sets the framing element to the viewport
        rootMargin: '0px',
        threshold: 0.25 // 25% of the video must be in view to start
    };

    // Callback function to execute when changes are observed
    var callback = function(entries, observer) {
        entries.forEach(entry => {
            // Each entry describes an intersection change for one observed
            // target element:
            // If video is visible enough, play it; otherwise, pause
            if (entry.isIntersecting) {
                video.play().catch(error => {
                    // Autoplay with sound was prevented.
                    // Show a UI element to let the user manually start playback or remove the mute attribute to attempt playing muted
                    console.error("Autoplay with sound was prevented.");
                    // Optionally, you can prompt the user to click to play
                    video.muted = true; // Attempt to play muted if autoplay with sound fails
                    video.play(); // You can try to play it again after setting it to mute
                });
            } else {
                video.pause();
            }
        });
    };

    // Create an intersection observer instance linked to the callback function
    observer = new IntersectionObserver(callback, options);

    // Start observing the target video element
    observer.observe(video);
});
$(document).ready(function() {
    // Hide the preloader after a delay
    $("#preloader").delay(350).fadeOut('slow');
});

