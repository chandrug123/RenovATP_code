// Google Sheets API integration
// Documentation: https://developers.google.com/sheets/api/reference/rest

const SHEETS_API_KEY = import.meta.env.VITE_GOOGLE_SHEETS_API_KEY || '';
const SERVICES_SHEET_ID = import.meta.env.VITE_SERVICES_SHEET_ID || '';
const ENQUIRIES_SHEET_ID = import.meta.env.VITE_ENQUIRIES_SHEET_ID || '';

export interface ServiceCategory {
  id: string;
  title: string;
  image: string;
  services: string[];
  popular?: boolean;
}

// Fetch services from Google Sheets
export const fetchServicesFromSheets = async (): Promise<ServiceCategory[]> => {
  if (!SHEETS_API_KEY || !SERVICES_SHEET_ID) {
    console.warn('Google Sheets API not configured, using local data');
    return getLocalServices();
  }

  try {
    const range = 'Services!A2:E'; // Assuming: ID | Title | Image | Services (comma-separated) | Popular
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SERVICES_SHEET_ID}/values/${range}?key=${SHEETS_API_KEY}`;
    
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch services');
    
    const data = await response.json();
    
    return data.values?.map((row: string[]) => ({
      id: row[0] || '',
      title: row[1] || '',
      image: row[2] || '',
      services: row[3]?.split(',').map(s => s.trim()) || [],
      popular: row[4]?.toLowerCase() === 'true'
    })) || getLocalServices();
  } catch (error) {
    console.error('Error fetching services from Google Sheets:', error);
    return getLocalServices();
  }
};

// Save enquiry to Google Sheets
export const saveEnquiryToSheets = async (enquiry: {
  name: string;
  phone: string;
  email: string;
  services: string[];
  timestamp: string;
}): Promise<boolean> => {
  if (!SHEETS_API_KEY || !ENQUIRIES_SHEET_ID) {
    console.warn('Google Sheets API not configured for enquiries');
    return false;
  }

  try {
    const values = [[
      enquiry.timestamp,
      enquiry.name,
      enquiry.phone,
      enquiry.email,
      enquiry.services.join(', ')
    ]];

    const range = 'Enquiries!A:E';
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${ENQUIRIES_SHEET_ID}/values/${range}:append?valueInputOption=RAW&key=${SHEETS_API_KEY}`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ values })
    });

    if (!response.ok) throw new Error('Failed to save enquiry');
    return true;
  } catch (error) {
    console.error('Error saving enquiry to Google Sheets:', error);
    return false;
  }
};

// Local fallback data
const getLocalServices = (): ServiceCategory[] => {
  return [
    {
      id: "civil-works",
      title: "Civil Works",
      image: "/src/assets/service-civil.jpg",
      services: [
        "Flooring",
        "House Renovation",
        "Bathroom Renovation",
        "Cement Works",
        "Welding & Iron Planning",
        "Plastola & Iron Fittings",
      ],
      popular: true
    },
    {
      id: "tiles-granite",
      title: "Tiles & Granite",
      image: "/src/assets/service-tiles.jpg",
      services: [
        "Tiles Installation",
        "Granite Work",
        "Tile Changing",
        "Granite Polish",
      ],
    },
    {
      id: "painting",
      title: "Painting",
      image: "/src/assets/service-painting.jpg",
      services: [
        "Wall & Ceiling Painting",
        "Damp Proof Paint",
        "Coating & Polish",
        "Royal Play & Touch-ups",
      ],
      popular: true
    },
    {
      id: "carpentry",
      title: "Carpentry",
      image: "/src/assets/service-carpentry.jpg",
      services: [
        "Cupboard Works",
        "Door & Window Fitting",
        "Kitchen Cabinets",
        "Wall Partitions",
      ],
    },
    {
      id: "electrical",
      title: "Electrical",
      image: "/src/assets/service-electrical.jpg",
      services: [
        "House Wiring",
        "Switch & Socket Installation",
        "Electrical Repairs",
        "AC & Fan Installation",
      ],
    },
    {
      id: "plumbing",
      title: "Plumbing",
      image: "/src/assets/service-plumbing.jpg",
      services: [
        "Pipeline Installation",
        "Tap & Faucet Repair",
        "Drainage Works",
        "Bathroom Fitting",
      ],
    },
    {
      id: "other-services",
      title: "Other Services",
      image: "/src/assets/service-other.jpg",
      services: [
        "House Cleaning",
        "Gardening",
        "Chimney Hole Work",
        "Sump & Tank Cleaning",
      ],
    },
  ];
};
