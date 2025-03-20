document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    let currentIndex = 0;
    let interval;
    
    // Function to show a specific slide
    const showSlide = (index) => {
      // Hide all slides
      slides.forEach(slide => {
        slide.classList.remove('active');
      });
      
      // Deactivate all dots
      dots.forEach(dot => {
        dot.classList.remove('active');
      });
      
      // Show the current slide and activate its dot
      slides[index].classList.add('active');
      dots[index].classList.add('active');
    };
    
    // Function to show the next slide
    const nextSlide = () => {
      currentIndex = (currentIndex + 1) % slides.length;
      showSlide(currentIndex);
    };
    
    // Function to show the previous slide
    const prevSlide = () => {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      showSlide(currentIndex);
    };
    
    // Set up event listeners for buttons
    nextButton.addEventListener('click', () => {
      nextSlide();
      resetInterval();
    });
    
    prevButton.addEventListener('click', () => {
      prevSlide();
      resetInterval();
    });
    
    // Set up event listeners for dots
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        currentIndex = index;
        showSlide(currentIndex);
        resetInterval();
      });
    });
    
    // Set up keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        prevSlide();
        resetInterval();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
        resetInterval();
      }
    });
    
    // Function to start the automatic slideshow
    const startInterval = () => {
      interval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    };
    
    // Function to reset the interval
    const resetInterval = () => {
      clearInterval(interval);
      startInterval();
    };
    
    // Start the slideshow
    startInterval();
  });