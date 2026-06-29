/* =================================================================
   1. STICKY GLASS HEADER & SCROLL TRACKING
   Makes the header shrink and blur when scrolling down.
   ================================================================= */
const mainHeader = document.getElementById('mainHeader');

window.addEventListener('scroll', () => {
  // If we scroll down more than 50 pixels from the top...
  if (window.scrollY > 50) {
    mainHeader.classList.add('scrolled'); // Adds the CSS class to shrink it
  } else {
    mainHeader.classList.remove('scrolled'); // Removes it when back at top
  }
});

/* =================================================================
   2. MOBILE NAVIGATION TOGGLE
   ================================================================= */
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mainNav = document.getElementById('mainNav');

if (mobileMenuBtn && mainNav) {
  mobileMenuBtn.addEventListener('click', () => {
    mainNav.classList.toggle('active');
  });

  // Close the mobile menu automatically when a link is clicked
  const navLinks = mainNav.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('active');
    });
  });
}

/* =================================================================
   3. ACTIVE NAVIGATION HIGHLIGHTER (Scroll Spy)
   As you scroll down the page, this highlights the correct link
   in the navigation menu (Home, About, Services, Contact).
   ================================================================= */
const sections = document.querySelectorAll('.page-section, .hero');
const navLinksArray = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';

  sections.forEach((section) => {
    // Get the distance from the top of the page to this section
    const sectionTop = section.offsetTop;
    // Get the height of this section
    const sectionHeight = section.clientHeight;
    
    // If the scroll position is past the top of the section (minus a little buffer)
    if (pageYOffset >= (sectionTop - 150)) {
      current = section.getAttribute('id');
    }
  });

  // Loop through all the links in the header
  navLinksArray.forEach((link) => {
    // Remove the active class from all links first
    link.classList.remove('active');
    // If the link points to the section we are currently looking at, make it active!
    if (link.getAttribute('href').includes(current)) {
      link.classList.add('active');
    }
  });
});

/* =================================================================
   4. SCROLL REVEAL ANIMATIONS
   This makes elements elegantly fade and slide up when they 
   enter the screen while scrolling.
   ================================================================= */
// Grab every single element on the page that has the class "reveal"
const revealElements = document.querySelectorAll('.reveal');

// Create an "Intersection Observer" (a tool that watches when things appear on screen)
const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    // If the element has scrolled into view...
    if (entry.isIntersecting) {
      // Add the "revealed" class which triggers the CSS animation
      entry.target.classList.add('revealed');
      // Stop watching this element so it doesn't animate again if we scroll back up
      observer.unobserve(entry.target);
    }
  });
}, {
  // Trigger the animation when the element is 10% visible from the bottom of the screen
  threshold: 0.1, 
  rootMargin: "0px 0px -50px 0px"
});

// Tell the observer to start watching every single "reveal" element
revealElements.forEach((el) => revealObserver.observe(el));

/* =================================================================
   5. SERVICES SEARCH FILTER
   ================================================================= */
const serviceSearch = document.getElementById('serviceSearch');
const servicesGrid = document.getElementById('servicesGrid');

if (serviceSearch && servicesGrid) {
  const serviceCards = servicesGrid.querySelectorAll('.service-card');

  serviceSearch.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();

    serviceCards.forEach((card) => {
      const text = card.textContent.toLowerCase();
      if (text.includes(searchTerm)) {
        card.style.display = 'block';
        // Give it a tiny pop animation when it reappears
        card.style.animation = 'fadeIn 0.3s ease';
      } else {
        card.style.display = 'none';
      }
    });
  });
}

/* =================================================================
   6. WHATSAPP CONTACT REDIRECTION
   ================================================================= */
const contactForm = document.getElementById('contactForm');
const formFeedback = document.getElementById('formFeedback');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Stop page refresh
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    
    if (!name || !email || !message) {
      formFeedback.textContent = 'Please fill out all fields.';
      formFeedback.className = 'form-feedback error';
      return; 
    }
    
    // 1. Build the message template (use %0A for new line breaks in the URL)
    const whatsappMessage = `Hello! My name is ${name}.%0A%0AMy email is: ${email}%0A%0AHere is my message:%0A${message}`;
    
    // 2. Construct the official WhatsApp API URL with the phone number
    const whatsappUrl = `https://wa.me/919839838585?text=${whatsappMessage}`;
    
    // 3. Open WhatsApp in a new tab (or switch to the app on mobile)
    window.open(whatsappUrl, '_blank');
    
    // 4. Show a success message and clear the form
    formFeedback.textContent = 'Opening WhatsApp...';
    formFeedback.className = 'form-feedback success';
    contactForm.reset();
  });
}
