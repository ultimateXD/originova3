// ===========================
// SMART AUTOCOMPLETE SYSTEM
// For Private Flights Airport Selection
// ===========================

function buildAutocompleteSystem(inputElement, dropdownId) {
    const airportsData = (typeof window !== 'undefined' && window.AIRPORTS_DATA)
        ? window.AIRPORTS_DATA
        : (typeof AIRPORTS_DATA !== 'undefined' ? AIRPORTS_DATA : []);

    if (!inputElement || !airportsData.length) return;

    const dropdown = document.getElementById(dropdownId);
    if (!dropdown) return;

    let selectedIndex = -1;
    let currentResults = [];

    // Input event - filter and show suggestions
    inputElement.addEventListener('input', (e) => {
        const query = e.target.value.trim();

        if (query.length === 0) {
            hideDropdown();
            return;
        }

        // Filter airports based on query
        currentResults = filterAirports(query);

        if (currentResults.length === 0) {
            hideDropdown();
            return;
        }

        // Display results
        displayResults(currentResults);
        showDropdown();
        selectedIndex = -1;
    });

    // Keyboard navigation
    inputElement.addEventListener('keydown', (e) => {
        if (!dropdown.classList.contains('show')) return;

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            selectedIndex = Math.min(selectedIndex + 1, currentResults.length - 1);
            updateSelection();
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            selectedIndex = Math.max(selectedIndex - 1, -1);
            updateSelection();
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (selectedIndex >= 0 && currentResults[selectedIndex]) {
                selectAirport(currentResults[selectedIndex]);
            }
        } else if (e.key === 'Escape') {
            hideDropdown();
        }
    });

    // Click outside to close
    document.addEventListener('click', (e) => {
        if (!inputElement.contains(e.target) && !dropdown.contains(e.target)) {
            hideDropdown();
        }
    });

    // Focus event - show dropdown if there's a value
    inputElement.addEventListener('focus', () => {
        if (inputElement.value.trim().length > 0) {
            const query = inputElement.value.trim();
            currentResults = filterAirports(query);
            if (currentResults.length > 0) {
                displayResults(currentResults);
                showDropdown();
            }
        }
    });

    function filterAirports(query) {
        const lowerQuery = query.toLowerCase();

        return airportsData
            .map(airport => {
                const city = airport.city.toLowerCase();
                const country = airport.country.toLowerCase();
                const airportName = airport.airport.toLowerCase();
                const code = airport.code.toLowerCase();

                let score = -1;
                if (code.startsWith(lowerQuery)) score = 120;
                else if (city.startsWith(lowerQuery)) score = 100;
                else if (airportName.startsWith(lowerQuery)) score = 90;
                else if (country.startsWith(lowerQuery)) score = 70;
                else if (city.includes(lowerQuery)) score = 60;
                else if (airportName.includes(lowerQuery)) score = 50;
                else if (country.includes(lowerQuery)) score = 40;

                return score > -1 ? { airport, score } : null;
            })
            .filter(Boolean)
            .sort((a, b) => b.score - a.score || a.airport.city.localeCompare(b.airport.city))
            .slice(0, 10)
            .map(item => item.airport);
    }

    function displayResults(results) {
        dropdown.innerHTML = results.map((airport, index) => `
            <div class="autocomplete-item" data-index="${index}">
                <div class="autocomplete-city">${airport.city}, ${airport.country}</div>
                <div class="autocomplete-details">${airport.airport} (${airport.code})</div>
            </div>
        `).join('');

        // Add click handlers to items
        dropdown.querySelectorAll('.autocomplete-item').forEach((item, index) => {
            item.addEventListener('click', () => {
                selectAirport(results[index]);
            });
        });
    }

    function updateSelection() {
        const items = dropdown.querySelectorAll('.autocomplete-item');
        items.forEach((item, index) => {
            if (index === selectedIndex) {
                item.classList.add('selected');
            } else {
                item.classList.remove('selected');
            }
        });
    }

    function selectAirport(airport) {
        inputElement.value = airport.city;
        inputElement.setAttribute('data-airport-code', airport.code);
        inputElement.setAttribute('data-airport-country', airport.country);
        hideDropdown();

        // Trigger change event for price update
        inputElement.dispatchEvent(new Event('change', { bubbles: true }));
    }

    function showDropdown() {
        dropdown.classList.add('show');
    }

    function hideDropdown() {
        dropdown.classList.remove('show');
        selectedIndex = -1;
    }
}
