document.addEventListener('DOMContentLoaded', () => {

    // --- SAMPLE DATA ---
    // In a real application, this data would come from a database.
    let hostels = [
        {
            id: 1,
            name: 'VEER PG Boys Pg',
            location: 'Rohini, Delhi',
            price: 8500,
            verified: true,
            sharing: ['single', 'double'],
            gender: 'male',
            resident: ['students', 'professionals'],
            image: 'https://placehold.co/250x180/3498db/ffffff?text=Hostel+1',
        },
        {
            id: 2,
            name: 'Girls Paradise Hostel',
            location: 'Kankarbagh, Patna',
            price: 7000,
            verified: true,
            sharing: ['double', 'triple'],
            gender: 'female',
            resident: ['students'],
            image: 'https://placehold.co/250x180/e74c3c/ffffff?text=Hostel+2',
        },
        {
            id: 3,
            name: 'ProStay Co-Living',
            location: 'Boring Road, Patna',
            price: 12000,
            verified: false,
            sharing: ['single'],
            gender: 'any',
            resident: ['professionals'],
            image: 'https://placehold.co/250x180/2ecc71/ffffff?text=Hostel+3',
        },
        {
            id: 4,
            name: 'Student Hub',
            location: 'Ashok Rajpath, Patna',
            price: 6500,
            verified: true,
            sharing: ['triple'],
            gender: 'male',
            resident: ['students'],
            image: 'https://placehold.co/250x180/f1c40f/ffffff?text=Hostel+4',
        },
         {
            id: 5,
            name: 'Saket Girls Hostel',
            location: 'Nageshwar Colony, Patna',
            price: 9500,
            verified: true,
            sharing: ['single', 'double'],
            gender: 'female',
            resident: ['students', 'professionals'],
            image: 'https://placehold.co/250x180/9b59b6/ffffff?text=Hostel+5',
        }
    ];

    // --- DOM Elements ---
    const hostelListContainer = document.getElementById('hostelList');
    const filterForm = document.getElementById('filterForm');
    const propertyCountEl = document.getElementById('propertyCount');
    const budgetRange = document.getElementById('budgetRange');
    const budgetValue = document.getElementById('budgetValue');
    const clearFiltersBtn = document.getElementById('clearFiltersBtn');
    
    // Modal elements
    const modal = document.getElementById('addHostelModal');
    const openModalBtn = document.getElementById('listPropertyBtn');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const addHostelForm = document.getElementById('addHostelForm');
    
    // Responsive Filter Toggle
    const toggleFilterBtn = document.getElementById('toggleFilterBtn');
    const filtersSidebar = document.getElementById('filtersSidebar');

    // --- Functions ---

    /**
     * Renders a list of hostel cards to the DOM.
     * @param {Array} hostelsToRender - The array of hostel objects to display.
     */
    const renderHostels = (hostelsToRender) => {
        hostelListContainer.innerHTML = ''; // Clear existing list

        if (hostelsToRender.length === 0) {
            hostelListContainer.innerHTML = '<p class="col-span-full text-center text-gray-500">No properties match your filters.</p>';
        }

        hostelsToRender.forEach(hostel => {
            const card = document.createElement('div');
            card.className = 'hostel-card';
            card.innerHTML = `
                <div class="image-gallery">
                    <img src="${hostel.image}" alt="${hostel.name}">
                </div>
                <div class="info">
                    <div class="details">
                        ${hostel.verified ? '<div class="verified-badge"><i class="fas fa-check-circle"></i> Verified</div>' : ''}
                        <h3>${hostel.name}</h3>
                        <p class="location">${hostel.location}</p>
                        <div class="tags">
                            <div class="tag"><i class="fas fa-bed"></i> ${hostel.sharing.join(', ')}</div>
                            <div class="tag"><i class="fas fa-user-friends"></i> ${hostel.gender === 'male' ? 'Boys' : hostel.gender === 'female' ? 'Girls' : 'Co-ed'}</div>
                            <div class="tag"><i class="fas fa-briefcase"></i> ${hostel.resident.join(', ')}</div>
                        </div>
                    </div>
                    <div class="pricing-action">
                        <button class="like-btn"><i class="far fa-heart"></i></button>
                        <div class="price">Starts from <br><span>₹${hostel.price.toLocaleString()}</span></div>
                        <button class="interested-btn">I'm Interested</button>
                    </div>
                </div>
            `;
            hostelListContainer.appendChild(card);
        });

        // Update property count
        propertyCountEl.textContent = `${hostelsToRender.length} properties found in Patna, India`;
    };

    /**
     * Filters the main hostels array based on current form inputs.
     */
    const applyFilters = () => {
        const formData = new FormData(filterForm);
        const sharingTypes = formData.getAll('sharing');
        const gender = formData.get('gender');
        const residentTypes = formData.getAll('resident');
        const maxBudget = parseInt(budgetRange.value, 10);

        const filteredHostels = hostels.filter(hostel => {
            // Budget check
            if (hostel.price > maxBudget) return false;

            // Gender check
            if (gender !== 'any' && hostel.gender !== 'any' && hostel.gender !== gender) return false;

            // Sharing type check
            if (sharingTypes.length > 0 && !sharingTypes.some(type => hostel.sharing.includes(type))) {
                return false;
            }
            
            // Resident type check
            if (residentTypes.length > 0 && !residentTypes.some(type => hostel.resident.includes(type))) {
                return false;
            }

            return true;
        });

        renderHostels(filteredHostels);
    };
    
    // --- Event Listeners ---

    // Apply filters whenever the form changes
    filterForm.addEventListener('change', applyFilters);

    // Update budget display on slider input
    budgetRange.addEventListener('input', (e) => {
        budgetValue.textContent = `₹${parseInt(e.target.value).toLocaleString()}`;
    });
    
    // Reset all filters
    clearFiltersBtn.addEventListener('click', () => {
        filterForm.reset();
        budgetValue.textContent = `₹50,000`;
        applyFilters();
    });
    
    // Modal functionality
    openModalBtn.addEventListener('click', () => modal.classList.remove('hidden'));
    closeModalBtn.addEventListener('click', () => modal.classList.add('hidden'));
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.add('hidden');
        }
    });
    
    // Handle adding a new hostel
    addHostelForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const newHostel = {
            id: hostels.length + 1,
            name: document.getElementById('hostelName').value,
            location: document.getElementById('hostelLocation').value,
            price: parseInt(document.getElementById('hostelPrice').value, 10),
            verified: false, // New properties are not verified by default
            sharing: ['single', 'double', 'triple'], // Default values
            gender: document.getElementById('hostelGender').value,
            resident: ['students', 'professionals'], // Default values
            image: document.getElementById('hostelImage').value || 'https://placehold.co/250x180/7f8c8d/ffffff?text=New+Hostel',
        };
        
        hostels.unshift(newHostel); // Add to the beginning of the array
        applyFilters(); // Re-render the list with the new hostel
        modal.classList.add('hidden'); // Close the modal
        addHostelForm.reset(); // Reset the form
    });
    
    // Like button functionality (event delegation)
    hostelListContainer.addEventListener('click', (e) => {
        const likeBtn = e.target.closest('.like-btn');
        if (likeBtn) {
            likeBtn.classList.toggle('active');
            const icon = likeBtn.querySelector('i');
            icon.classList.toggle('far');
            icon.classList.toggle('fas');
        }
    });
    
    // Responsive filter sidebar toggle
    toggleFilterBtn.addEventListener('click', () => {
        filtersSidebar.classList.toggle('active');
    });

    // --- Initial Render ---
    applyFilters();
});
