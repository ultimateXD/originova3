// ===========================
// EGYPT PREMIUM SERVICES DATA
// ===========================

const SERVICES_DATA = {
    'private-flights': {
        icon: '✈️',
        title: 'Private Flights',
        subtitle: 'Experience ultimate luxury with our exclusive private jet services across Egypt\'s most prestigious destinations.',
        aircraft: [
            {
                name: 'Citation CJ3+',
                type: 'Light Jet',
                capacity: '6-7 passengers',
                maxPassengers: 7,
                range: '2,040 nm',
                speed: '478 mph',
                pricePerHour: 3200,
                description: 'Perfect for short to medium-range flights. Ideal for business trips and small groups seeking comfort and efficiency.',
                image: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=800&auto=format&fit=crop',
                amenities: ['WiFi', 'Refreshments', 'Leather Seats', 'Entertainment System']
            },
            {
                name: 'Hawker 900XP',
                type: 'Midsize Jet',
                capacity: '8-9 passengers',
                maxPassengers: 9,
                range: '2,930 nm',
                speed: '514 mph',
                pricePerHour: 4500,
                description: 'Spacious cabin with stand-up headroom. Perfect balance of range, comfort, and performance for Egypt travel.',
                image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&auto=format&fit=crop',
                amenities: ['WiFi', 'Full Galley', 'Lavatory', 'Entertainment', 'Conference Setup']
            },
            {
                name: 'Gulfstream G280',
                type: 'Super Midsize Jet',
                capacity: '10 passengers',
                maxPassengers: 10,
                range: '3,600 nm',
                speed: '560 mph',
                pricePerHour: 6800,
                description: 'Ultimate luxury with exceptional range. Premium cabin, advanced technology, and unmatched comfort.',
                image: 'https://images.unsplash.com/photo-1583792928584-5e9d36229fc5?w=800&auto=format&fit=crop',
                amenities: ['High-Speed WiFi', 'Gourmet Catering', 'Full Lavatory', '4K Entertainment', 'Lie-Flat Seats', 'Conference Table']
            },
            {
                name: 'Challenger 350',
                type: 'Super Midsize Jet',
                capacity: '9-10 passengers',
                maxPassengers: 10,
                range: '3,200 nm',
                speed: '541 mph',
                pricePerHour: 5900,
                description: 'Wide-body comfort with exceptional performance. Ideal for longer flights with maximum passenger comfort.',
                image: 'https://images.unsplash.com/photo-1474302770737-173ee21bab63?w=800&auto=format&fit=crop',
                amenities: ['WiFi', 'Premium Catering', 'Spacious Lavatory', 'Entertainment', 'Extra Luggage Space']
            }
        ],
        routes: {
            'Cairo': {
                'Sharm El-Sheikh': { distance: 240, duration: 1.0 },
                'Luxor': { distance: 420, duration: 1.2 },
                'Aswan': { distance: 550, duration: 1.5 },
                'Hurghada': { distance: 300, duration: 1.1 },
                'Alexandria': { distance: 140, duration: 0.8 },
                'Marsa Alam': { distance: 480, duration: 1.4 }
            },
            'Alexandria': {
                'Cairo': { distance: 140, duration: 0.8 },
                'Sharm El-Sheikh': { distance: 350, duration: 1.3 },
                'Luxor': { distance: 520, duration: 1.5 },
                'Aswan': { distance: 650, duration: 1.8 }
            },
            'Sharm El-Sheikh': {
                'Cairo': { distance: 240, duration: 1.0 },
                'Luxor': { distance: 380, duration: 1.2 },
                'Hurghada': { distance: 180, duration: 0.9 }
            },
            'Luxor': {
                'Cairo': { distance: 420, duration: 1.2 },
                'Aswan': { distance: 140, duration: 0.7 },
                'Sharm El-Sheikh': { distance: 380, duration: 1.2 }
            },
            'Aswan': {
                'Cairo': { distance: 550, duration: 1.5 },
                'Luxor': { distance: 140, duration: 0.7 }
            },
            'Hurghada': {
                'Cairo': { distance: 300, duration: 1.1 },
                'Sharm El-Sheikh': { distance: 180, duration: 0.9 }
            }
        },
        // Egyptian cities database for autocomplete
        egyptianCities: [
            'Cairo', 'Alexandria', 'Giza', 'Sharm El-Sheikh', 'Hurghada', 'Luxor', 'Aswan',
            'Port Said', 'Suez', 'Mansoura', 'Tanta', 'Asyut', 'Ismailia', 'Faiyum',
            'Zagazig', 'Damietta', 'Minya', 'Damanhur', 'Beni Suef', 'Qena', 'Sohag',
            'Marsa Alam', 'Dahab', 'Nuweiba', 'Taba', 'El Gouna', 'Safaga', 'Siwa Oasis',
            'Bahariya Oasis', 'Kharga Oasis', 'Dakhla Oasis', 'Farafra Oasis'
        ],
        reservationFields: ['departure', 'destination', 'date', 'time', 'aircraft']
    },

    'luxury-hotels': {
        icon: '🏨',
        title: 'Luxury Hotels',
        subtitle: 'Stay at Egypt\'s finest 5-star hotels and resorts, handpicked for exceptional service and elegance.',
        options: [
            {
                name: 'Four Seasons Cairo at Nile Plaza',
                location: 'Cairo, Garden City',
                description: 'Iconic luxury hotel overlooking the Nile River. Features world-class spa, rooftop pool, and Michelin-quality dining.',
                price: '$450',
                perNight: true,
                perPerson: true,
                rating: '5-Star Deluxe',
                image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop'
            },
            {
                name: 'Sofitel Legend Old Cataract Aswan',
                location: 'Aswan, Nile Corniche',
                description: 'Historic palace hotel where Agatha Christie wrote "Death on the Nile". Stunning Nile views and Victorian elegance.',
                price: '$380',
                perNight: true,
                perPerson: true,
                rating: '5-Star Heritage',
                image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&auto=format&fit=crop'
            },
            {
                name: 'Four Seasons Sharm El Sheikh',
                location: 'Sharm El-Sheikh, Red Sea',
                description: 'Beachfront paradise with private beach, coral reef access, and world-class diving. Ultimate Red Sea luxury.',
                price: '$520',
                perNight: true,
                perPerson: true,
                rating: '5-Star Resort',
                image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&auto=format&fit=crop'
            },
            {
                name: 'Marriott Mena House Cairo',
                location: 'Giza, Pyramids View',
                description: 'Historic palace hotel with direct views of the Great Pyramids. Royal gardens and unparalleled location.',
                price: '$400',
                perNight: true,
                perPerson: true,
                rating: '5-Star Historic',
                image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&auto=format&fit=crop'
            }
        ],
        reservationFields: ['checkIn', 'checkOut', 'guests', 'hotel']
    },

    'custom-itineraries': {
        icon: '🎯',
        title: 'Custom Itineraries',
        subtitle: 'Personalized Egypt travel plans crafted by experts to match your unique preferences and desires.',
        options: [
            {
                name: 'Ancient Wonders Explorer',
                location: 'Cairo, Luxor, Aswan',
                description: '7-day luxury journey through Egypt\'s most iconic archaeological sites. Private Egyptologist, luxury hotels, and Nile cruise included.',
                price: '$4,500',
                perPerson: true,
                duration: '7 Days / 6 Nights',
                highlights: 'Pyramids, Valley of Kings, Abu Simbel, Nile Cruise',
                image: 'https://images.unsplash.com/photo-1572252009286-268acec5ca0a?w=800&auto=format&fit=crop'
            },
            {
                name: 'Red Sea Luxury Escape',
                location: 'Hurghada, Sharm El-Sheikh',
                description: '5-day premium beach and diving experience. Private yacht charter, luxury resort, and world-class diving sites.',
                price: '$3,200',
                perPerson: true,
                duration: '5 Days / 4 Nights',
                highlights: 'Private Yacht, Diving, Beach Resort, Water Sports',
                image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&auto=format&fit=crop'
            },
            {
                name: 'Desert & Oasis Adventure',
                location: 'Siwa, White Desert, Bahariya',
                description: '6-day exclusive desert safari with luxury camping. Hot springs, stargazing, and pristine oasis exploration.',
                price: '$3,800',
                perPerson: true,
                duration: '6 Days / 5 Nights',
                highlights: 'Luxury Desert Camps, 4x4 Safari, Siwa Oasis, Stargazing',
                image: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&auto=format&fit=crop'
            }
        ],
        reservationFields: ['startDate', 'travelers', 'itinerary']
    },

    'vip-experiences': {
        icon: '🌟',
        title: 'VIP Experiences',
        subtitle: 'Access exclusive desert safaris, Nile cruises, hot air balloons, and once-in-a-lifetime Egyptian adventures.',
        options: [
            {
                name: 'Private Desert Safari',
                location: 'White Desert, Western Desert',
                description: 'Exclusive 4x4 desert expedition with luxury camping under the stars. Private chef, Bedouin guides, and pristine landscapes.',
                price: '$850',
                duration: '2 Days / 1 Night',
                capacity: 'Up to 6 guests',
                maxGuests: 6,
                image: 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=800&auto=format&fit=crop'
            },
            {
                name: 'Luxury Nile Cruise',
                location: 'Luxor to Aswan',
                description: 'Private yacht charter on the Nile. 5-star service, gourmet dining, and exclusive temple visits with Egyptologist.',
                price: '$1,200',
                duration: '4 Days / 3 Nights',
                capacity: 'Up to 12 guests',
                maxGuests: 12,
                image: 'https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?w=800&auto=format&fit=crop'
            },
            {
                name: 'Hot Air Balloon Luxor',
                location: 'Valley of the Kings, Luxor',
                description: 'Sunrise hot air balloon flight over ancient Luxor. Champagne breakfast and private transfer included.',
                price: '$280',
                duration: '3 hours',
                capacity: 'Up to 4 guests',
                maxGuests: 4,
                image: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800&auto=format&fit=crop'
            },
            {
                name: 'Private Yacht Red Sea',
                location: 'Hurghada, Red Sea',
                description: 'Full-day luxury yacht charter. Snorkeling, diving, gourmet lunch, and pristine coral reef exploration.',
                price: '$950',
                duration: 'Full Day',
                capacity: 'Up to 10 guests',
                maxGuests: 10,
                image: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800&auto=format&fit=crop'
            },
            {
                name: 'Horseback Pyramids Ride',
                location: 'Giza Plateau',
                description: 'Private sunrise horseback riding around the Great Pyramids. Professional guide and photographer included.',
                price: '$320',
                duration: '2 hours',
                capacity: 'Up to 4 guests',
                maxGuests: 4,
                image: 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=800&auto=format&fit=crop'
            },
            {
                name: 'Premium Spa & Wellness',
                location: 'Cairo, Luxury Spa',
                description: 'Full-day luxury spa experience with traditional Egyptian treatments, hammam, and Cleopatra beauty rituals.',
                price: '$450',
                duration: '6 hours',
                capacity: 'Individual or Couple',
                maxGuests: 2,
                image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&auto=format&fit=crop'
            }
        ],
        reservationFields: ['date', 'experience', 'guests', 'time']
    },

    'gourmet-dining': {
        icon: '🍽️',
        title: 'Gourmet Dining',
        subtitle: 'Savor premium Egyptian cuisine and exclusive culinary experiences at Egypt\'s finest restaurants.',
        options: [
            {
                name: 'Sequoia Mediterranean',
                location: 'Zamalek, Cairo',
                description: 'Upscale Nile-side dining with Mediterranean and Egyptian fusion. Stunning river views and celebrity hotspot.',
                price: '$85',
                perPerson: true,
                cuisine: 'Mediterranean & Egyptian',
                image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&auto=format&fit=crop'
            },
            {
                name: 'Abou El Sid',
                location: 'Zamalek, Cairo',
                description: 'Authentic Egyptian fine dining in elegant traditional setting. Classic dishes with modern presentation.',
                price: '$65',
                perPerson: true,
                cuisine: 'Traditional Egyptian',
                image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop'
            },
            {
                name: '1886 Restaurant',
                location: 'Marriott Mena House, Giza',
                description: 'Fine dining with Pyramids view. French-Egyptian fusion cuisine in historic palace setting.',
                price: '$120',
                perPerson: true,
                cuisine: 'French-Egyptian Fusion',
                image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&auto=format&fit=crop'
            },
            {
                name: 'Nile Maxim Dinner Cruise',
                location: 'Nile River, Cairo',
                description: 'Luxury dinner cruise with live entertainment, belly dancing, and gourmet buffet. Unforgettable Nile experience.',
                price: '$95',
                perPerson: true,
                cuisine: 'International Buffet',
                image: 'https://images.unsplash.com/photo-1578474846511-04ba529f0b88?w=800&auto=format&fit=crop'
            }
        ],
        reservationFields: ['date', 'restaurant', 'guests', 'time']
    },

    'concierge': {
        icon: '💎',
        title: 'Concierge 24/7',
        subtitle: 'Round-the-clock premium Egyptian concierge service ensuring every detail of your journey is perfectly executed.',
        options: [
            {
                name: 'Personal Egyptologist Guide',
                location: 'All Egypt Destinations',
                description: 'Private PhD-level Egyptologist for personalized historical tours. Deep knowledge, exclusive access, and VIP treatment.',
                price: '$350',
                perDay: true,
                duration: 'Per Day',
                languages: 'English, French, German, Arabic',
                image: 'https://images.unsplash.com/photo-1503220317375-aaad61436b1b?w=800&auto=format&fit=crop'
            },
            {
                name: 'Luxury Transportation Service',
                location: 'Cairo & All Major Cities',
                description: 'Premium chauffeur service with Mercedes S-Class or BMW 7 Series. Professional drivers and 24/7 availability.',
                price: '$180',
                perDay: true,
                duration: 'Per Day',
                vehicles: 'Mercedes S-Class, BMW 7 Series',
                image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&auto=format&fit=crop'
            },
            {
                name: 'VIP Airport Services',
                location: 'Cairo International Airport',
                description: 'Fast-track immigration, luxury lounge access, and private terminal services. Seamless arrival and departure.',
                price: '$250',
                duration: 'Per Service',
                includes: 'Meet & Greet, Fast Track, Lounge',
                image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&auto=format&fit=crop'
            },
            {
                name: '24/7 Concierge Hotline',
                location: 'Available Nationwide',
                description: 'Round-the-clock personal concierge for reservations, emergencies, and special requests. Your Egypt travel assistant.',
                price: '$150',
                perDay: true,
                duration: 'Per Day',
                availability: '24/7 Multilingual Support',
                image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&auto=format&fit=crop'
            }
        ],
        reservationFields: ['date', 'service', 'duration', 'requirements']
    }
};
