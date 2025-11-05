$(document).ready(function () {

  // this for top nav bar
  var divWidth = $('#nav').width();
  if (divWidth > 960) {
    $('#navp').addClass('p-fixed');
  }

  // this for work section tabs
  $('.header-right-nav > a').click(function () {
    document.querySelectorAll('.header-right-nav > a').forEach(function (item) {
      item.classList.remove('active')
    })
    this.classList.add('active')
  });

  $('.nav-parent > a').click(function () {
    document.querySelectorAll('.nav-parent > a').forEach(function (item) {
      item.classList.remove('active')
    })
    this.classList.add('active')
  });

  const observerConfig = {
    rootMargin: '-50% 0% -50% 0%',
    threshold: 0
  }

  let observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateListItems();
        textAnimation();
        observer.disconnect();
        console.log('intersecting')
      }
    });
  }, observerConfig);

  function textAnimation() {
    $("p, h2, h1").css({
      "opacity": "1",
      "transition": "opacity 1s"
    });
  }


  observer.observe($("#Intro")[0]);

  // Contact form handling
  $('.contact-form').on('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const name = $(this).find('input[type="text"]').val();
    const email = $(this).find('input[type="email"]').val();
    const message = $(this).find('textarea').val();
    
    // Animate button to show processing
    const submitBtn = $(this).find('button[type="submit"]');
    submitBtn.html('<span class="spinner-border spinner-border-sm me-2"></span>Sending...');
    submitBtn.prop('disabled', true);
    
    // Prepare email content
    const subject = `Portfolio Contact from ${name}`;
    const emailBody = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
    
    // Create mailto link
    const mailtoLink = `mailto:manids1801@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    // Reset form and button after a short delay
    setTimeout(() => {
      // Reset form
      this.reset();
      submitBtn.html('Send Message');
      submitBtn.prop('disabled', false);
      
      // Show success message
      const alertHtml = '<div class="alert alert-success alert-dismissible fade show mt-3" role="alert">' +
        'Email client opened! Please send the email to complete.' +
        '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>' +
        '</div>';
      $(this).append(alertHtml);
      
      // Auto-hide alert after 5 seconds
      setTimeout(() => {
        $('.alert').alert('close');
      }, 5000);
    }, 1000);
  });

  // Smooth animation for contact form collapse
  $('.contact-toggle').on('click', function() {
    $(this).toggleClass('active');
    if ($(this).hasClass('active')) {
      $(this).html('Close Form');
    } else {
      $(this).html('Contact Me');
    }
  });
});