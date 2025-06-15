document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger-menu');
    const nav = document.querySelector('.header-nav');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        nav.classList.toggle('active');
    });
    
    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (nav.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    nav.classList.remove('active');
                }
            }
        });
    });
    
    // Header Scroll Effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
    });
    
    // Product Filtering
    const categoryFilters = document.querySelectorAll('.category-filter');
    const productsGrid = document.querySelector('.products-grid');
    
    // Sample product data - in a real app, this would come from an API
    const products = [
        {
            id: 1,
            title: 'Panneau Basique Blanc',
            category: 'basique',
            description: 'Panneau acoustique minimaliste en blanc mat',
            price: '149$',
            image: 'assets/product-1.jpg'
        },
        {
            id: 2,
            title: 'Panneau Premium Graphite',
            category: 'premium',
            description: 'Design épuré avec finition graphite texturée',
            price: '249$',
            image: 'assets/product-2.jpg'
        },
        {
            id: 3,
            title: 'Panneau Luxe Doré',
            category: 'luxe',
            description: 'Édition limitée avec détails dorés à la feuille',
            price: '399$',
            image: 'assets/product-3.jpg'
        },
        {
            id: 4,
            title: 'Panneau Basique Gris',
            category: 'basique',
            description: 'Panneau acoustique en gris anthracite',
            price: '149$',
            image: 'assets/product-4.jpg'
        },
        {
            id: 5,
            title: 'Panneau Premium Bleu',
            category: 'premium',
            description: 'Teinte bleu profond avec texture subtile',
            price: '249$',
            image: 'assets/product-5.jpg'
        },
                {
            id: 5,
            title: 'Panneau Premium spirale',
            category: 'premium',
            description: 'Teinte rouge profond avec spirale',
            price: '249$',
            image: 'assets/product-5.jpg'
        },
        {
            id: 6,
            title: 'Panneau Luxe Marbre',
            category: 'luxe',
            description: 'Effet marbre réaliste avec finition haute qualité',
            price: '399$',
            image: 'assets/product-6.jpg'
        }
    ];
    
    // Render products
    function renderProducts(filter = 'all') {
        productsGrid.innerHTML = '';
        
        const filteredProducts = filter === 'all' 
            ? products 
            : products.filter(product => product.category === filter);
        
        filteredProducts.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <div class="product-image">
                    <img src="${product.image}" alt="${product.title}">
                </div>
                <div class="product-info">
                    <span class="product-category">${product.category}</span>
                    <h3 class="product-title">${product.title}</h3>
                    <p class="product-description">${product.description}</p>
                    <div class="product-price">${product.price}</div>
                    <div class="product-actions">
                        <button class="btn btn-outline" style="color: var(--primary-color); border-color: var(--primary-color);">Voir détails</button>
                        <button class="btn btn-primary">Ajouter au panier</button>
                    </div>
                </div>
            `;
            productsGrid.appendChild(productCard);
        });
    }
    
    // Initialize products
    renderProducts();
    
    // Filter products by category
    categoryFilters.forEach(filter => {
        filter.addEventListener('click', function() {
            categoryFilters.forEach(f => f.classList.remove('active'));
            this.classList.add('active');
            renderProducts(this.dataset.category);
        });
    });
    
    // Testimonial Slider
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    
    function showSlide(index) {
        testimonialSlides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        testimonialSlides[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlide = index;
    }
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => showSlide(index));
    });
    
    // Auto slide change
    setInterval(() => {
        currentSlide = (currentSlide + 1) % testimonialSlides.length;
        showSlide(currentSlide);
    }, 5000);
    
    // Form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Merci pour votre message! Nous vous contacterons bientôt.');
            this.reset();
        });
    }
    
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            alert(`Merci de vous être abonné avec l'adresse ${emailInput.value}!`);
            emailInput.value = '';
        });
    }
});