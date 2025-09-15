document.addEventListener('DOMContentLoaded', () => {

    // --- GLOBAL: ACTIVE NAVIGATION LINK ---
    const setActiveNav = () => {
        const navLinks = document.querySelectorAll('nav a');
        const currentPage = window.location.pathname.split('/').pop() || 'index.html'; // Get current page filename
        
        navLinks.forEach(link => {
            const linkPage = link.getAttribute('href');
            if (linkPage === currentPage) {
                link.classList.add('active');
            }
        });
    };
    
    // --- PACKAGES PAGE LOGIC ---
    const handlePackagesPage = () => {
        const packagesTableBody = document.getElementById('packages-table-body');
        if (!packagesTableBody) return;

        const packages = [
            { id: 'himalayan', destination: 'Shimla & Manali', durationDays: 6, basePrice: 10599, season: 'Peak' },
            { id: 'kerala', destination: 'Alleppey & Munnar', durationDays: 7, basePrice: 12000, season: 'Off-season' },
            { id: 'triangle', destination: 'Delhi, Agra, Jaipur', durationDays: 5, basePrice: 9659, season: 'Standard' },
            { id: 'goa', destination: 'North & South Goa', durationDays: 4, basePrice: 8999, season: 'Peak' }
        ];

        const calculateFinalPrice = (pkg) => {
            let finalPrice = pkg.basePrice;
            // Seasonal multiplier logic
            switch (pkg.season) {
                case 'Peak':
                    finalPrice *= 1.25; // 25% surcharge for peak season
                    break;
                case 'Off-season':
                    finalPrice *= 0.85; // 15% discount for off-season
                    break;
            }
            return finalPrice.toFixed(2);
        };

        packages.forEach(pkg => {
            const finalPrice = calculateFinalPrice(pkg);
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${pkg.destination}</td>
                <td>${pkg.durationDays} Days</td>
                <td>Rs ${pkg.basePrice.toFixed(2)}</td>
                <td>${pkg.season}</td>
                <td><strong>Rs ${finalPrice}</strong></td>
            `;
            packagesTableBody.appendChild(row);
        });
    };

    // --- BOOKING PAGE LOGIC ---
    const handleBookingPage = () => {
        const bookingForm = document.getElementById('booking-form');
        if (!bookingForm) return;

        const packageSelect = document.getElementById('package');
        const checkInInput = document.getElementById('start-date');
        const checkOutInput = document.getElementById('end-date');
        const guestsInput = document.getElementById('guests');
        const promoInput = document.getElementById('promo-code');
        const priceEstimateDiv = document.getElementById('price-estimate');
        const submitButton = bookingForm.querySelector('button[type="submit"]');

        const packagePrices = {
            himalayan: 10599, kerala: 12000, triangle: 9659, goa: 8999
        };

        // Function for form validation and price calculation
        const updatePriceEstimate = () => {
            const selectedPackage = packageSelect.value;
            const checkInDate = new Date(checkInInput.value);
            const checkOutDate = new Date(checkOutInput.value);
            const numGuests = parseInt(guestsInput.value, 10);
            const promoCode = promoInput.value.trim().toUpperCase();

            // Validation: Disable submit if fields are invalid
            if (!selectedPackage || !checkInInput.value || !checkOutInput.value || isNaN(numGuests) || numGuests < 1 || checkOutDate <= checkInDate) {
                priceEstimateDiv.textContent = 'Please fill all required fields correctly.';
                submitButton.disabled = true;
                return;
            }
            submitButton.disabled = false;

            // Price calculation logic
            const nights = (checkOutDate - checkInDate) / (1000 * 60 * 60 * 24);
            let basePrice = packagePrices[selectedPackage] * nights;
            let total = basePrice;

            // Guests multiplier
            if (numGuests > 2) {
                total += basePrice * 0.20 * (numGuests - 2); // +20% per extra guest over 2
            }
            
            // Promo code logic
            switch (promoCode) {
                case 'EARLYBIRD':
                    total *= 0.90; // 10% discount
                    break;
                case 'SAVE20':
                    total *= 0.80; // 20% discount
                    break;
            }

            priceEstimateDiv.textContent = `Estimated Total: Rs ${total.toFixed(2)}`;
        };
        
        // Add event listeners to form fields
        bookingForm.addEventListener('input', updatePriceEstimate);
        // Initial call to set form state
        updatePriceEstimate(); 
    };
    
    // --- GALLERY PAGE LOGIC ---
    const handleGalleryPage = () => {
        const galleryGrid = document.getElementById('gallery-grid');
        const modal = document.getElementById('image-modal');
        if (!galleryGrid || !modal) return;

        const modalImage = modal.querySelector('img');
        const modalCaption = modal.querySelector('figcaption');
        const closeModal = modal.querySelector('.close');

        const galleryImages = [
            { thumb: 'https://plus.unsplash.com/premium_photo-1697729733902-f8c92710db07?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', large: 'https://plus.unsplash.com/premium_photo-1697729733902-f8c92710db07?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'The beautiful hills of Shimla' },
            { thumb: 'https://plus.unsplash.com/premium_photo-1697729438401-fcb4ff66d9a8?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', large: 'https://plus.unsplash.com/premium_photo-1697729438401-fcb4ff66d9a8?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Serene backwaters of Kerala' },
            { thumb: 'https://plus.unsplash.com/premium_photo-1661963054563-ce928e477ff3?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', large: 'https://plus.unsplash.com/premium_photo-1661963054563-ce928e477ff3?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'The Pink City, Jaipur' },
            { thumb: 'https://images.unsplash.com/photo-1569034797434-b168fbcf7fcc?q=80&w=2008&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', large: 'https://images.unsplash.com/photo-1569034797434-b168fbcf7fcc?q=80&w=2008&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Relaxing on a Goan beach' }
        ];

        galleryImages.forEach(imgData => {
            const img = document.createElement('img');
            img.src = imgData.thumb;
            img.alt = imgData.alt;

            img.setAttribute('data-large', imgData.large); 
            galleryGrid.appendChild(img);
        });

        // Event listener for opening the modal (using event delegation)
        galleryGrid.addEventListener('click', (e) => {
            if (e.target.tagName === 'IMG') {
                const targetImg = e.target;

                modalImage.src = targetImg.dataset.large; 
                modalImage.alt = targetImg.alt;
                modalCaption.textContent = targetImg.alt;
                modal.style.display = 'flex';
            }
        });

        // Event listener for closing the modal
        closeModal.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        // Close modal if clicking outside the image
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    };

    // --- INITIALIZE PAGE-SPECIFIC LOGIC ---
    setActiveNav();
    handlePackagesPage();
    handleBookingPage();
    handleGalleryPage();
});