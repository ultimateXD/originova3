// ===========================
// INTERNATIONAL AIRPORTS DATABASE
// Private Jet & Business Aviation Capable
// ===========================

const AIRPORTS_DATA = [
    // EGYPT
    { city: 'Cairo', country: 'Egypt', airport: 'Cairo International Airport', code: 'CAI', privateJet: true },
    { city: 'Alexandria', country: 'Egypt', airport: 'Borg El Arab Airport', code: 'HBE', privateJet: true },
    { city: 'Sharm El-Sheikh', country: 'Egypt', airport: 'Sharm El-Sheikh International', code: 'SSH', privateJet: true },
    { city: 'Hurghada', country: 'Egypt', airport: 'Hurghada International Airport', code: 'HRG', privateJet: true },
    { city: 'Luxor', country: 'Egypt', airport: 'Luxor International Airport', code: 'LXR', privateJet: true },
    { city: 'Aswan', country: 'Egypt', airport: 'Aswan International Airport', code: 'ASW', privateJet: true },
    { city: 'Marsa Alam', country: 'Egypt', airport: 'Marsa Alam International', code: 'RMF', privateJet: true },

    // UNITED ARAB EMIRATES
    { city: 'Dubai', country: 'UAE', airport: 'Dubai International Airport', code: 'DXB', privateJet: true },
    { city: 'Dubai', country: 'UAE', airport: 'Al Maktoum International', code: 'DWC', privateJet: true },
    { city: 'Abu Dhabi', country: 'UAE', airport: 'Abu Dhabi International', code: 'AUH', privateJet: true },
    { city: 'Sharjah', country: 'UAE', airport: 'Sharjah International Airport', code: 'SHJ', privateJet: true },

    // SAUDI ARABIA
    { city: 'Riyadh', country: 'Saudi Arabia', airport: 'King Khalid International', code: 'RUH', privateJet: true },
    { city: 'Jeddah', country: 'Saudi Arabia', airport: 'King Abdulaziz International', code: 'JED', privateJet: true },
    { city: 'Dammam', country: 'Saudi Arabia', airport: 'King Fahd International', code: 'DMM', privateJet: true },
    { city: 'Medina', country: 'Saudi Arabia', airport: 'Prince Mohammad Bin Abdulaziz', code: 'MED', privateJet: true },

    // QATAR & BAHRAIN & KUWAIT & OMAN
    { city: 'Doha', country: 'Qatar', airport: 'Hamad International Airport', code: 'DOH', privateJet: true },
    { city: 'Manama', country: 'Bahrain', airport: 'Bahrain International Airport', code: 'BAH', privateJet: true },
    { city: 'Kuwait City', country: 'Kuwait', airport: 'Kuwait International Airport', code: 'KWI', privateJet: true },
    { city: 'Muscat', country: 'Oman', airport: 'Muscat International Airport', code: 'MCT', privateJet: true },

    // JORDAN & LEBANON
    { city: 'Amman', country: 'Jordan', airport: 'Queen Alia International', code: 'AMM', privateJet: true },
    { city: 'Beirut', country: 'Lebanon', airport: 'Rafic Hariri International', code: 'BEY', privateJet: true },

    // TURKEY
    { city: 'Istanbul', country: 'Turkey', airport: 'Istanbul Airport', code: 'IST', privateJet: true },
    { city: 'Istanbul', country: 'Turkey', airport: 'Sabiha Gokcen Airport', code: 'SAW', privateJet: true },
    { city: 'Ankara', country: 'Turkey', airport: 'Esenboga Airport', code: 'ESB', privateJet: true },
    { city: 'Antalya', country: 'Turkey', airport: 'Antalya Airport', code: 'AYT', privateJet: true },
    { city: 'Bodrum', country: 'Turkey', airport: 'Bodrum-Milas Airport', code: 'BJV', privateJet: true },

    // GREECE
    { city: 'Athens', country: 'Greece', airport: 'Athens International Airport', code: 'ATH', privateJet: true },
    { city: 'Mykonos', country: 'Greece', airport: 'Mykonos Airport', code: 'JMK', privateJet: true },
    { city: 'Santorini', country: 'Greece', airport: 'Santorini Airport', code: 'JTR', privateJet: true },
    { city: 'Thessaloniki', country: 'Greece', airport: 'Thessaloniki Airport', code: 'SKG', privateJet: true },
    { city: 'Corfu', country: 'Greece', airport: 'Corfu International Airport', code: 'CFU', privateJet: true },
    { city: 'Rhodes', country: 'Greece', airport: 'Rhodes International Airport', code: 'RHO', privateJet: true },

    // ITALY
    { city: 'Rome', country: 'Italy', airport: 'Leonardo da Vinci Airport', code: 'FCO', privateJet: true },
    { city: 'Milan', country: 'Italy', airport: 'Malpensa Airport', code: 'MXP', privateJet: true },
    { city: 'Milan', country: 'Italy', airport: 'Linate Airport', code: 'LIN', privateJet: true },
    { city: 'Venice', country: 'Italy', airport: 'Marco Polo Airport', code: 'VCE', privateJet: true },
    { city: 'Florence', country: 'Italy', airport: 'Peretola Airport', code: 'FLR', privateJet: true },
    { city: 'Naples', country: 'Italy', airport: 'Naples International', code: 'NAP', privateJet: true },
    { city: 'Bologna', country: 'Italy', airport: 'Bologna Guglielmo Marconi', code: 'BLQ', privateJet: true },
    { city: 'Turin', country: 'Italy', airport: 'Turin Airport', code: 'TRN', privateJet: true },
    { city: 'Pisa', country: 'Italy', airport: 'Pisa International Airport', code: 'PSA', privateJet: true },
    { city: 'Olbia', country: 'Italy', airport: 'Olbia Costa Smeralda Airport', code: 'OLB', privateJet: true },

    // FRANCE
    { city: 'Paris', country: 'France', airport: 'Charles de Gaulle Airport', code: 'CDG', privateJet: true },
    { city: 'Paris', country: 'France', airport: 'Le Bourget Airport', code: 'LBG', privateJet: true },
    { city: 'Nice', country: 'France', airport: 'Nice Cote d\'Azur Airport', code: 'NCE', privateJet: true },
    { city: 'Cannes', country: 'France', airport: 'Cannes Mandelieu Airport', code: 'CEQ', privateJet: true },
    { city: 'Lyon', country: 'France', airport: 'Lyon-Saint Exupery', code: 'LYS', privateJet: true },
    { city: 'Marseille', country: 'France', airport: 'Marseille Provence Airport', code: 'MRS', privateJet: true },
    { city: 'Bordeaux', country: 'France', airport: 'Bordeaux-Merignac Airport', code: 'BOD', privateJet: true },
    { city: 'Toulouse', country: 'France', airport: 'Toulouse-Blagnac Airport', code: 'TLS', privateJet: true },

    // SPAIN
    { city: 'Madrid', country: 'Spain', airport: 'Adolfo Suarez Madrid-Barajas', code: 'MAD', privateJet: true },
    { city: 'Barcelona', country: 'Spain', airport: 'Barcelona-El Prat Airport', code: 'BCN', privateJet: true },
    { city: 'Ibiza', country: 'Spain', airport: 'Ibiza Airport', code: 'IBZ', privateJet: true },
    { city: 'Malaga', country: 'Spain', airport: 'Malaga-Costa del Sol', code: 'AGP', privateJet: true },
    { city: 'Palma de Mallorca', country: 'Spain', airport: 'Palma de Mallorca Airport', code: 'PMI', privateJet: true },
    { city: 'Valencia', country: 'Spain', airport: 'Valencia Airport', code: 'VLC', privateJet: true },
    { city: 'Seville', country: 'Spain', airport: 'Seville Airport', code: 'SVQ', privateJet: true },
    { city: 'Bilbao', country: 'Spain', airport: 'Bilbao Airport', code: 'BIO', privateJet: true },

    // PORTUGAL
    { city: 'Lisbon', country: 'Portugal', airport: 'Lisbon Portela Airport', code: 'LIS', privateJet: true },
    { city: 'Porto', country: 'Portugal', airport: 'Porto Airport', code: 'OPO', privateJet: true },
    { city: 'Faro', country: 'Portugal', airport: 'Faro Airport', code: 'FAO', privateJet: true },

    // UNITED KINGDOM
    { city: 'London', country: 'UK', airport: 'Heathrow Airport', code: 'LHR', privateJet: true },
    { city: 'London', country: 'UK', airport: 'London City Airport', code: 'LCY', privateJet: true },
    { city: 'London', country: 'UK', airport: 'Luton Airport', code: 'LTN', privateJet: true },
    { city: 'London', country: 'UK', airport: 'Farnborough Airport', code: 'FAB', privateJet: true },
    { city: 'London', country: 'UK', airport: 'Biggin Hill Airport', code: 'BQH', privateJet: true },
    { city: 'Manchester', country: 'UK', airport: 'Manchester Airport', code: 'MAN', privateJet: true },
    { city: 'Birmingham', country: 'UK', airport: 'Birmingham Airport', code: 'BHX', privateJet: true },
    { city: 'Edinburgh', country: 'UK', airport: 'Edinburgh Airport', code: 'EDI', privateJet: true },
    { city: 'Glasgow', country: 'UK', airport: 'Glasgow Airport', code: 'GLA', privateJet: true },

    // IRELAND
    { city: 'Dublin', country: 'Ireland', airport: 'Dublin Airport', code: 'DUB', privateJet: true },
    { city: 'Cork', country: 'Ireland', airport: 'Cork Airport', code: 'ORK', privateJet: true },

    // SWITZERLAND
    { city: 'Geneva', country: 'Switzerland', airport: 'Geneva Airport', code: 'GVA', privateJet: true },
    { city: 'Zurich', country: 'Switzerland', airport: 'Zurich Airport', code: 'ZRH', privateJet: true },
    { city: 'Bern', country: 'Switzerland', airport: 'Bern Airport', code: 'BRN', privateJet: true },

    // GERMANY
    { city: 'Frankfurt', country: 'Germany', airport: 'Frankfurt Airport', code: 'FRA', privateJet: true },
    { city: 'Munich', country: 'Germany', airport: 'Munich Airport', code: 'MUC', privateJet: true },
    { city: 'Berlin', country: 'Germany', airport: 'Berlin Brandenburg Airport', code: 'BER', privateJet: true },
    { city: 'Hamburg', country: 'Germany', airport: 'Hamburg Airport', code: 'HAM', privateJet: true },
    { city: 'Dusseldorf', country: 'Germany', airport: 'Dusseldorf Airport', code: 'DUS', privateJet: true },
    { city: 'Cologne', country: 'Germany', airport: 'Cologne Bonn Airport', code: 'CGN', privateJet: true },
    { city: 'Stuttgart', country: 'Germany', airport: 'Stuttgart Airport', code: 'STR', privateJet: true },

    // AUSTRIA
    { city: 'Vienna', country: 'Austria', airport: 'Vienna International Airport', code: 'VIE', privateJet: true },
    { city: 'Salzburg', country: 'Austria', airport: 'Salzburg Airport', code: 'SZG', privateJet: true },
    { city: 'Innsbruck', country: 'Austria', airport: 'Innsbruck Airport', code: 'INN', privateJet: true },

    // NETHERLANDS & BELGIUM
    { city: 'Amsterdam', country: 'Netherlands', airport: 'Amsterdam Schiphol Airport', code: 'AMS', privateJet: true },
    { city: 'Rotterdam', country: 'Netherlands', airport: 'Rotterdam The Hague Airport', code: 'RTM', privateJet: true },
    { city: 'Brussels', country: 'Belgium', airport: 'Brussels Airport', code: 'BRU', privateJet: true },
    { city: 'Antwerp', country: 'Belgium', airport: 'Antwerp International Airport', code: 'ANR', privateJet: true },

    // SCANDINAVIA
    { city: 'Copenhagen', country: 'Denmark', airport: 'Copenhagen Airport', code: 'CPH', privateJet: true },
    { city: 'Stockholm', country: 'Sweden', airport: 'Stockholm Arlanda Airport', code: 'ARN', privateJet: true },
    { city: 'Oslo', country: 'Norway', airport: 'Oslo Gardermoen Airport', code: 'OSL', privateJet: true },
    { city: 'Helsinki', country: 'Finland', airport: 'Helsinki-Vantaa Airport', code: 'HEL', privateJet: true },

    // EASTERN EUROPE
    { city: 'Prague', country: 'Czech Republic', airport: 'Vaclav Havel Airport Prague', code: 'PRG', privateJet: true },
    { city: 'Budapest', country: 'Hungary', airport: 'Budapest Ferenc Liszt Airport', code: 'BUD', privateJet: true },
    { city: 'Warsaw', country: 'Poland', airport: 'Warsaw Chopin Airport', code: 'WAW', privateJet: true },
    { city: 'Krakow', country: 'Poland', airport: 'Krakow John Paul II Airport', code: 'KRK', privateJet: true },
    { city: 'Bucharest', country: 'Romania', airport: 'Henri Coanda International', code: 'OTP', privateJet: true },

    // RUSSIA
    { city: 'Moscow', country: 'Russia', airport: 'Sheremetyevo International', code: 'SVO', privateJet: true },
    { city: 'Moscow', country: 'Russia', airport: 'Vnukovo International Airport', code: 'VKO', privateJet: true },
    { city: 'St Petersburg', country: 'Russia', airport: 'Pulkovo Airport', code: 'LED', privateJet: true },

    // UNITED STATES - EAST COAST
    { city: 'New York', country: 'USA', airport: 'Teterboro Airport', code: 'TEB', privateJet: true },
    { city: 'New York', country: 'USA', airport: 'JFK International Airport', code: 'JFK', privateJet: true },
    { city: 'New York', country: 'USA', airport: 'LaGuardia Airport', code: 'LGA', privateJet: true },
    { city: 'New York', country: 'USA', airport: 'Westchester County Airport', code: 'HPN', privateJet: true },
    { city: 'Boston', country: 'USA', airport: 'Logan International Airport', code: 'BOS', privateJet: true },
    { city: 'Boston', country: 'USA', airport: 'Hanscom Field', code: 'BED', privateJet: true },
    { city: 'Washington DC', country: 'USA', airport: 'Dulles International Airport', code: 'IAD', privateJet: true },
    { city: 'Washington DC', country: 'USA', airport: 'Reagan National Airport', code: 'DCA', privateJet: true },
    { city: 'Miami', country: 'USA', airport: 'Miami International Airport', code: 'MIA', privateJet: true },
    { city: 'Miami', country: 'USA', airport: 'Opa-locka Executive', code: 'OPF', privateJet: true },
    { city: 'Fort Lauderdale', country: 'USA', airport: 'Fort Lauderdale Executive', code: 'FXE', privateJet: true },
    { city: 'Atlanta', country: 'USA', airport: 'Hartsfield-Jackson Atlanta', code: 'ATL', privateJet: true },
    { city: 'Atlanta', country: 'USA', airport: 'DeKalb-Peachtree Airport', code: 'PDK', privateJet: true },
    { city: 'Philadelphia', country: 'USA', airport: 'Philadelphia International', code: 'PHL', privateJet: true },
    { city: 'Charlotte', country: 'USA', airport: 'Charlotte Douglas International', code: 'CLT', privateJet: true },

    // UNITED STATES - WEST COAST
    { city: 'Los Angeles', country: 'USA', airport: 'Van Nuys Airport', code: 'VNY', privateJet: true },
    { city: 'Los Angeles', country: 'USA', airport: 'LAX International', code: 'LAX', privateJet: true },
    { city: 'Los Angeles', country: 'USA', airport: 'Santa Monica Airport', code: 'SMO', privateJet: true },
    { city: 'San Francisco', country: 'USA', airport: 'San Francisco International', code: 'SFO', privateJet: true },
    { city: 'San Jose', country: 'USA', airport: 'San Jose International Airport', code: 'SJC', privateJet: true },
    { city: 'San Diego', country: 'USA', airport: 'San Diego International', code: 'SAN', privateJet: true },
    { city: 'Seattle', country: 'USA', airport: 'Seattle-Tacoma International', code: 'SEA', privateJet: true },
    { city: 'Seattle', country: 'USA', airport: 'Boeing Field', code: 'BFI', privateJet: true },
    { city: 'Portland', country: 'USA', airport: 'Portland International Airport', code: 'PDX', privateJet: true },

    // UNITED STATES - CENTRAL
    { city: 'Las Vegas', country: 'USA', airport: 'Henderson Executive Airport', code: 'HND', privateJet: true },
    { city: 'Las Vegas', country: 'USA', airport: 'McCarran International', code: 'LAS', privateJet: true },
    { city: 'Chicago', country: 'USA', airport: 'Chicago Midway Airport', code: 'MDW', privateJet: true },
    { city: 'Chicago', country: 'USA', airport: 'O\'Hare International Airport', code: 'ORD', privateJet: true },
    { city: 'Dallas', country: 'USA', airport: 'Dallas Love Field', code: 'DAL', privateJet: true },
    { city: 'Dallas', country: 'USA', airport: 'Dallas/Fort Worth International', code: 'DFW', privateJet: true },
    { city: 'Houston', country: 'USA', airport: 'George Bush Intercontinental', code: 'IAH', privateJet: true },
    { city: 'Houston', country: 'USA', airport: 'William P. Hobby Airport', code: 'HOU', privateJet: true },
    { city: 'Denver', country: 'USA', airport: 'Denver International Airport', code: 'DEN', privateJet: true },
    { city: 'Phoenix', country: 'USA', airport: 'Phoenix Sky Harbor International', code: 'PHX', privateJet: true },
    { city: 'Scottsdale', country: 'USA', airport: 'Scottsdale Airport', code: 'SCF', privateJet: true },

    // CANADA
    { city: 'Toronto', country: 'Canada', airport: 'Toronto Pearson International', code: 'YYZ', privateJet: true },
    { city: 'Toronto', country: 'Canada', airport: 'Billy Bishop Toronto City', code: 'YTZ', privateJet: true },
    { city: 'Vancouver', country: 'Canada', airport: 'Vancouver International', code: 'YVR', privateJet: true },
    { city: 'Montreal', country: 'Canada', airport: 'Montreal-Trudeau International', code: 'YUL', privateJet: true },
    { city: 'Calgary', country: 'Canada', airport: 'Calgary International Airport', code: 'YYC', privateJet: true },
    { city: 'Ottawa', country: 'Canada', airport: 'Ottawa Macdonald-Cartier', code: 'YOW', privateJet: true },

    // MEXICO & CARIBBEAN
    { city: 'Mexico City', country: 'Mexico', airport: 'Mexico City International', code: 'MEX', privateJet: true },
    { city: 'Cancun', country: 'Mexico', airport: 'Cancun International Airport', code: 'CUN', privateJet: true },
    { city: 'Cabo San Lucas', country: 'Mexico', airport: 'Los Cabos International', code: 'SJD', privateJet: true },
    { city: 'Nassau', country: 'Bahamas', airport: 'Lynden Pindling International', code: 'NAS', privateJet: true },
    { city: 'Turks and Caicos', country: 'Turks and Caicos', airport: 'Providenciales International', code: 'PLS', privateJet: true },
    { city: 'Barbados', country: 'Barbados', airport: 'Grantley Adams International', code: 'BGI', privateJet: true },

    // ASIA - EAST
    { city: 'Singapore', country: 'Singapore', airport: 'Singapore Changi Airport', code: 'SIN', privateJet: true },
    { city: 'Hong Kong', country: 'Hong Kong', airport: 'Hong Kong International', code: 'HKG', privateJet: true },
    { city: 'Tokyo', country: 'Japan', airport: 'Narita International Airport', code: 'NRT', privateJet: true },
    { city: 'Tokyo', country: 'Japan', airport: 'Haneda Airport', code: 'HND', privateJet: true },
    { city: 'Shanghai', country: 'China', airport: 'Pudong International Airport', code: 'PVG', privateJet: true },
    { city: 'Beijing', country: 'China', airport: 'Beijing Capital International', code: 'PEK', privateJet: true },
    { city: 'Seoul', country: 'South Korea', airport: 'Incheon International Airport', code: 'ICN', privateJet: true },
    { city: 'Taipei', country: 'Taiwan', airport: 'Taiwan Taoyuan International', code: 'TPE', privateJet: true },
    { city: 'Bangkok', country: 'Thailand', airport: 'Suvarnabhumi Airport', code: 'BKK', privateJet: true },
    { city: 'Kuala Lumpur', country: 'Malaysia', airport: 'Kuala Lumpur International', code: 'KUL', privateJet: true },

    // ASIA - SOUTH
    { city: 'Mumbai', country: 'India', airport: 'Chhatrapati Shivaji International', code: 'BOM', privateJet: true },
    { city: 'Delhi', country: 'India', airport: 'Indira Gandhi International', code: 'DEL', privateJet: true },
    { city: 'Bangalore', country: 'India', airport: 'Kempegowda International', code: 'BLR', privateJet: true },
    { city: 'Dubai', country: 'UAE', airport: 'Dubai World Central', code: 'DWC', privateJet: true },

    // AUSTRALIA & NEW ZEALAND
    { city: 'Sydney', country: 'Australia', airport: 'Sydney Kingsford Smith', code: 'SYD', privateJet: true },
    { city: 'Melbourne', country: 'Australia', airport: 'Melbourne Airport', code: 'MEL', privateJet: true },
    { city: 'Brisbane', country: 'Australia', airport: 'Brisbane Airport', code: 'BNE', privateJet: true },
    { city: 'Perth', country: 'Australia', airport: 'Perth Airport', code: 'PER', privateJet: true },
    { city: 'Auckland', country: 'New Zealand', airport: 'Auckland Airport', code: 'AKL', privateJet: true },

    // SOUTH AMERICA
    { city: 'Sao Paulo', country: 'Brazil', airport: 'Guarulhos International', code: 'GRU', privateJet: true },
    { city: 'Rio de Janeiro', country: 'Brazil', airport: 'Galeao International', code: 'GIG', privateJet: true },
    { city: 'Buenos Aires', country: 'Argentina', airport: 'Ezeiza International', code: 'EZE', privateJet: true },
    { city: 'Santiago', country: 'Chile', airport: 'Arturo Merino Benitez', code: 'SCL', privateJet: true },
    { city: 'Lima', country: 'Peru', airport: 'Jorge Chavez International', code: 'LIM', privateJet: true },
    { city: 'Bogota', country: 'Colombia', airport: 'El Dorado International', code: 'BOG', privateJet: true },

    // AFRICA
    { city: 'Johannesburg', country: 'South Africa', airport: 'OR Tambo International', code: 'JNB', privateJet: true },
    { city: 'Cape Town', country: 'South Africa', airport: 'Cape Town International', code: 'CPT', privateJet: true },
    { city: 'Nairobi', country: 'Kenya', airport: 'Jomo Kenyatta International', code: 'NBO', privateJet: true },
    { city: 'Casablanca', country: 'Morocco', airport: 'Mohammed V International', code: 'CMN', privateJet: true },
    { city: 'Marrakech', country: 'Morocco', airport: 'Marrakech Menara Airport', code: 'RAK', privateJet: true },
    { city: 'Lagos', country: 'Nigeria', airport: 'Murtala Muhammed International', code: 'LOS', privateJet: true }
];


// Expose dataset to the booking autocomplete system
if (typeof window !== 'undefined') {
    window.AIRPORTS_DATA = AIRPORTS_DATA;
}
