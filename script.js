


$(document).ready(function() {
    // Open modal when contact button is clicked
    $('#contactBtn').click(function() {
        $('#contactModal').modal('show');
    });

    // Form submission handling
    $('#contactForm').submit(function(e) {
        e.preventDefault();

        // Get form data
        var formData = {
            'work_email': $('#workEmail').val(),
            'first_name': $('#firstName').val(),
            'last_name': $('#lastName').val(),
            'agree_terms': $('#agreeTerms').is(':checked')
        };

        // Submit form data to Getform.io
        $.ajax({
            type: 'POST',
            url: $('#contactForm').attr('action'),
            data: formData,
            dataType: 'json',
            encode: true
        })
        .done(function(data) {
            console.log('Form submitted successfully');
            $('#contactModal').modal('hide');
            // You can add a success message here
            alert('Thank you for contacting us!');
        })
        .fail(function(data) {
            console.error('Error submitting form', data);
            // You can add an error message here
            alert('There was an error submitting the form. Please try again.');
        });
        console.log('Form submitted');
        console.log('Email:', $('#workEmail').val());
        console.log('First Name:', $('#firstName').val());
        console.log('Last Name:', $('#lastName').val());
        $('#contactModal').modal('hide');

    });



    // slide animation
    const slider = $('.slider');
    const slides = $('.slide');
    const dotsContainer = $('.slider-dots');
    let currentSlide = 0;
    const slidesToShow = 4; // Number of slides to show at once
    const totalSlides = slides.length;

    // Clone slides for seamless looping
    slides.slice(0, slidesToShow).clone().appendTo(slider);

    // Create dots
    for (let i = 0; i < totalSlides; i++) {
        dotsContainer.append('<div class="dot"></div>');
    }

    const dots = $('.dot');
    dots.eq(0).addClass('active');

    function updateSlider() {
        const offset = -currentSlide * (100 / slidesToShow);
        slider.css('transform', `translateX(${offset}%)`);
        dots.removeClass('active').eq(currentSlide % totalSlides).addClass('active');

        // Check if we've reached the cloned slides
        if (currentSlide >= totalSlides) {
            setTimeout(() => {
                slider.css('transition', 'none');
                currentSlide = 0;
                slider.css('transform', 'translateX(0)');
                setTimeout(() => slider.css('transition', ''), 50);
            }, 300);
        }
    }

    function nextSlide() {
        currentSlide++;
        updateSlider();
    }

    function prevSlide() {
        if (currentSlide > 0) {
            currentSlide--;
        } else {
            currentSlide = totalSlides - 1;
            slider.css('transition', 'none');
            slider.css('transform', `translateX(-${totalSlides * (100 / slidesToShow)}%)`);
            setTimeout(() => slider.css('transition', ''), 50);
        }
        updateSlider();
    }

    // Auto-slide every 5 seconds
    let autoSlideInterval = setInterval(nextSlide, 3000);

    // Click on dots to change slide
    dots.click(function() {
        clearInterval(autoSlideInterval);
        currentSlide = $(this).index();
        updateSlider();
        autoSlideInterval = setInterval(nextSlide, 5000);
    });

    // Optional: Add next and prev buttons
    $('<button class="slider-prev">&lt;</button>').insertBefore(slider).click(prevSlide);
    $('<button class="slider-next">&gt;</button>').insertAfter(slider).click(nextSlide);

    // Optional: Pause auto-sliding when hovering over the slider
    slider.hover(
        () => clearInterval(autoSlideInterval),
        () => autoSlideInterval = setInterval(nextSlide, 5000)
    );

    //   our project section
    $(document).ready(function() {
        var $projectItems = $('.project-item');
        var currentIndex = 0;
      
        function changeSlide(index) {
          $projectItems.removeClass('active');
          var $currentItem = $projectItems.eq(index);
          $currentItem.addClass('active');
          
          var newImageSrc = $currentItem.data('image');
          $('#projectImage').attr('src', newImageSrc);
        }
      
        function autoChangeSlide() {
          currentIndex = (currentIndex + 1) % $projectItems.length;
          changeSlide(currentIndex);
        }
      
        // Initial activation
        changeSlide(currentIndex);
      
        // Auto-change every 10 seconds
        setInterval(autoChangeSlide, 10000);
      
        // Click handler
        $projectItems.click(function() {
          currentIndex = $projectItems.index(this);
          changeSlide(currentIndex);
        });
      });

      
});