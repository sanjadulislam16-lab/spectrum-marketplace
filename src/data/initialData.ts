import { Product, ColorPreset, Coupon, Order } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  // 1. Electronics
  {
    id: 'prod-elec-1',
    title: 'Aura Studio Wireless ANC Headphones',
    subtitle: 'Spatial audio with custom 40mm beryllium drivers',
    description: 'Immerse yourself in acoustic precision. Engineered with hybrid active noise cancellation, custom tuned diaphragms, and 45-hour ultra battery life. Supports LDAC, AAC, and lossless wired audio.',
    category: 'electronics',
    price: 249.00,
    compareAtPrice: 299.00,
    rating: 4.9,
    reviewCount: 328,
    stock: 45,
    featured: true,
    onSale: true,
    colors: [
      { name: 'Midnight Obsidian', hex: '#0F172A', previewImage: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=80', inStock: true },
      { name: 'Champagne Sand', hex: '#E5D5C5', previewImage: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=1000&q=80', inStock: true },
      { name: 'Cobalt Azure', hex: '#2563EB', previewImage: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1000&q=80', inStock: true },
      { name: 'Alpine Sage', hex: '#4D7C0F', previewImage: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=1000&q=80', inStock: true }
    ],
    tags: ['wireless', 'noise-cancelling', 'audiophile', 'bluetooth 5.3', 'spatial-audio'],
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=1000&q=80'
    ],
    specs: [
      { label: 'Driver Size', value: '40mm Custom Beryllium' },
      { label: 'Battery Life', value: 'Up to 45 hours (ANC on)' },
      { label: 'Connectivity', value: 'Bluetooth 5.3 + 3.5mm AUX' },
      { label: 'Weight', value: '254g' },
      { label: 'Fast Charge', value: '10 min for 5 hours playback' }
    ],
    seller: {
      id: 'seller-soundwave',
      name: 'Acoustic Labs Pro',
      rating: 4.95,
      salesCount: 1420,
      verified: true
    },
    createdAt: '2026-06-10T12:00:00Z',
    reviews: [
      {
        id: 'rev-1',
        author: 'Marcus Vance',
        rating: 5,
        date: '2026-07-28',
        comment: 'The noise cancellation is shockingly good on flights. Soundstage is wide and punchy.',
        verifiedPurchase: true
      },
      {
        id: 'rev-2',
        author: 'Elena Rostova',
        rating: 5,
        date: '2026-08-01',
        comment: 'The Champagne Sand color is breathtaking in person. Comfortable for 8-hour editing sessions.',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'prod-elec-2',
    title: 'Luminary Horizon Smartwatch Gen 4',
    subtitle: 'Ultra-thin titanium chassis with AMOLED sapphire glass',
    description: 'Engineered for seamless wellness tracking, cellular calling, dynamic ECG monitoring, and multi-band GPS with 14-day battery reserve.',
    category: 'electronics',
    price: 320.00,
    compareAtPrice: 380.00,
    rating: 4.8,
    reviewCount: 215,
    stock: 28,
    featured: true,
    colors: [
      { name: 'Space Slate', hex: '#334155', previewImage: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1000&q=80', inStock: true },
      { name: 'Rose Quartz', hex: '#FB7185', previewImage: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=1000&q=80', inStock: true },
      { name: 'Lunar Silver', hex: '#CBD5E1', previewImage: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=1000&q=80', inStock: true }
    ],
    sizes: ['40mm', '44mm', '48mm Pro'],
    tags: ['smartwatch', 'fitness', 'titanium', 'ecg', 'gps'],
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=1000&q=80'
    ],
    specs: [
      { label: 'Case Material', value: 'Aerospace Grade 5 Titanium' },
      { label: 'Display', value: '1.43" AMOLED 1000 nits' },
      { label: 'Water Resistance', value: '50m (5 ATM)' },
      { label: 'Sensors', value: 'ECG, SpO2, Sleep, Skin Temp' }
    ],
    seller: {
      id: 'seller-luminary',
      name: 'Luminary Wearables',
      rating: 4.88,
      salesCount: 890,
      verified: true
    },
    createdAt: '2026-05-18T10:00:00Z',
    reviews: [
      {
        id: 'rev-3',
        author: 'David Chen',
        rating: 5,
        date: '2026-07-14',
        comment: 'Battery genuinely lasts 12-14 days on a single charge. Titanium bezel feels ultra premium.',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'prod-elec-3',
    title: 'Keyforge Studio Wireless Mechanical Keyboard',
    subtitle: 'Hot-swappable gasket mount with RGB underglow',
    description: 'Crafted with CNC machined aluminum, pre-lubed linear switches, sound dampening PORON foam, and triple-mode wireless connectivity.',
    category: 'electronics',
    price: 159.00,
    compareAtPrice: 189.00,
    rating: 4.95,
    reviewCount: 412,
    stock: 52,
    colors: [
      { name: 'Carbon Black', hex: '#18181B', previewImage: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1000&q=80', inStock: true },
      { name: 'Matcha Milk', hex: '#84CC16', previewImage: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=1000&q=80', inStock: true },
      { name: 'Retro Cream', hex: '#FEF3C7', previewImage: 'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=1000&q=80', inStock: true }
    ],
    tags: ['keyboard', 'mechanical', 'custom', 'rgb', 'wireless'],
    images: [
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=1000&q=80'
    ],
    specs: [
      { label: 'Layout', value: '75% Compact (82 Keys)' },
      { label: 'Switch Type', value: 'Gateron Oil King / Custom Linear' },
      { label: 'Mounting', value: 'Gasket Structure with Flex Cuts' },
      { label: 'Keycaps', value: 'Double-shot PBT Cherry Profile' }
    ],
    seller: {
      id: 'seller-keyforge',
      name: 'Keyforge Collective',
      rating: 4.98,
      salesCount: 2310,
      verified: true
    },
    createdAt: '2026-06-01T08:30:00Z',
    reviews: [
      {
        id: 'rev-4',
        author: 'Sophie Taylor',
        rating: 5,
        date: '2026-07-22',
        comment: 'Thocky sound profile out of the box with zero modding needed! Best keyboard purchase.',
        verifiedPurchase: true
      }
    ]
  },

  // 2. Fashion & Apparel
  {
    id: 'prod-fash-1',
    title: 'Monochrome Heavyweight Oversized Hoodie',
    subtitle: '500 GSM French Terry organic cotton with relaxed drop-shoulder',
    description: 'Designed for daily architectural styling. Pre-shrunk French Terry with double-layered hood, hidden side seam pockets, and ribbed cuffs that maintain their form.',
    category: 'fashion',
    price: 88.00,
    compareAtPrice: 110.00,
    rating: 4.85,
    reviewCount: 540,
    stock: 80,
    featured: true,
    colors: [
      { name: 'Pitch Black', hex: '#09090B', previewImage: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1000&q=80', inStock: true },
      { name: 'Oatmeal Heather', hex: '#E2E8F0', previewImage: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1000&q=80', inStock: true },
      { name: 'Clay Terracotta', hex: '#C2410C', previewImage: 'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=1000&q=80', inStock: true },
      { name: 'Forest Moss', hex: '#166534', previewImage: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=1000&q=80', inStock: true }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    tags: ['hoodie', 'organic-cotton', 'streetwear', 'heavyweight', 'minimalist'],
    images: [
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=1000&q=80'
    ],
    specs: [
      { label: 'Fabric', value: '100% GOTS Certified Organic Cotton' },
      { label: 'Weight', value: '500 GSM French Terry' },
      { label: 'Fit', value: 'Boxy / Oversized' },
      { label: 'Care', value: 'Machine wash cold, hang dry' }
    ],
    seller: {
      id: 'seller-atelier',
      name: 'Atelier Minimal',
      rating: 4.92,
      salesCount: 3890,
      verified: true
    },
    createdAt: '2026-04-12T14:15:00Z',
    reviews: [
      {
        id: 'rev-5',
        author: 'Julian Reed',
        rating: 5,
        date: '2026-07-19',
        comment: 'The weight of this hoodie is incredible. The hood stands up properly without flopping down.',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'prod-fash-2',
    title: 'Strata Minimalist Leather Weekender Bag',
    subtitle: 'Full-grain Italian vegetable tanned leather with brass hardware',
    description: 'The ultimate travel companion. Thoughtfully compartmentalized with a dedicated shoe sleeve, padded 16-inch laptop pocket, and water-resistant lining.',
    category: 'fashion',
    price: 265.00,
    compareAtPrice: 320.00,
    rating: 4.9,
    reviewCount: 167,
    stock: 22,
    colors: [
      { name: 'Espresso Brown', hex: '#451A03', previewImage: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=80', inStock: true },
      { name: 'Caramel Tan', hex: '#D97706', previewImage: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=80', inStock: true },
      { name: 'Onyx Black', hex: '#18181B', previewImage: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1000&q=80', inStock: true }
    ],
    tags: ['leather', 'travel', 'weekender', 'italian-leather', 'duffle'],
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1000&q=80'
    ],
    specs: [
      { label: 'Leather Type', value: 'Full-Grain Italian Vachetta' },
      { label: 'Capacity', value: '42 Liters (Airline Carry-on approved)' },
      { label: 'Laptop Sleeve', value: 'Fits up to 16" MacBook Pro' },
      { label: 'Hardware', value: 'Antiqued Solid Brass YKK Zippers' }
    ],
    seller: {
      id: 'seller-strata',
      name: 'Strata Leatherworks',
      rating: 4.96,
      salesCount: 650,
      verified: true
    },
    createdAt: '2026-03-05T09:00:00Z',
    reviews: [
      {
        id: 'rev-6',
        author: 'Catherine Meyer',
        rating: 5,
        date: '2026-06-25',
        comment: 'Smells phenomenal, leather patinas beautifully after just 3 weeks of usage.',
        verifiedPurchase: true
      }
    ]
  },

  // 3. Home & Living
  {
    id: 'prod-home-1',
    title: 'Solstice Sculptural Ceramic Table Lamp',
    subtitle: 'Hand-thrown stoneware with dimmable warm ambient LED',
    description: 'A fusion of organic brutalism and warm illumination. Handcrafted by master ceramicists with subtle matte texturing and a warm 2700K diffusion dome.',
    category: 'home',
    price: 135.00,
    compareAtPrice: 165.00,
    rating: 4.88,
    reviewCount: 194,
    stock: 35,
    featured: true,
    colors: [
      { name: 'Terracotta Warm', hex: '#EA580C', previewImage: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1000&q=80', inStock: true },
      { name: 'Chalk White', hex: '#F8FAFC', previewImage: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1000&q=80', inStock: true },
      { name: 'Charcoal Basalt', hex: '#334155', previewImage: 'https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&w=1000&q=80', inStock: true }
    ],
    tags: ['lighting', 'ceramics', 'sculptural', 'handmade', 'interior'],
    images: [
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&w=1000&q=80'
    ],
    specs: [
      { label: 'Material', value: 'Natural Earthenware & Brass Dial' },
      { label: 'Color Temp', value: '2200K - 3000K Stepless Dimming' },
      { label: 'Dimensions', value: '32cm H x 20cm W' },
      { label: 'Cord Length', value: '2.0m Braided Textile Cord' }
    ],
    seller: {
      id: 'seller-solstice',
      name: 'Solstice Living Studio',
      rating: 4.9,
      salesCount: 1120,
      verified: true
    },
    createdAt: '2026-05-02T16:20:00Z',
    reviews: [
      {
        id: 'rev-7',
        author: 'Liam Henderson',
        rating: 5,
        date: '2026-08-04',
        comment: 'Transformative accent piece on my credenza. The warm glow makes my living room so cozy.',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'prod-home-2',
    title: 'AeroBarista Precision Thermal Coffee Brewer',
    subtitle: 'Double-walled borosilicate glass with stainless micro-filter',
    description: 'Precision pour-over brewing system engineered for optimal extraction curve and flavor preservation. Ergonomic silicone thermal collar and flow control spout.',
    category: 'home',
    price: 68.00,
    compareAtPrice: 85.00,
    rating: 4.75,
    reviewCount: 308,
    stock: 64,
    colors: [
      { name: 'Matte Amber', hex: '#B45309', previewImage: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1000&q=80', inStock: true },
      { name: 'Smoked Smoke', hex: '#475569', previewImage: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1000&q=80', inStock: true },
      { name: 'Crystal Clear', hex: '#E0F2FE', previewImage: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=1000&q=80', inStock: true }
    ],
    tags: ['coffee', 'kitchen', 'pour-over', 'barista', 'borosilicate'],
    images: [
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=1000&q=80'
    ],
    specs: [
      { label: 'Volume', value: '800ml (3-4 Cups)' },
      { label: 'Glass Type', value: 'High Shock Borosilicate' },
      { label: 'Filter', value: 'Ultra-fine 316 Stainless Mesh (No paper waste)' }
    ],
    seller: {
      id: 'seller-aerobarista',
      name: 'Brew Craft Works',
      rating: 4.85,
      salesCount: 4200,
      verified: true
    },
    createdAt: '2026-02-14T11:00:00Z',
    reviews: [
      {
        id: 'rev-8',
        author: 'Amanda Ruiz',
        rating: 5,
        date: '2026-07-10',
        comment: 'No bitter sediment, clean cups every single morning.',
        verifiedPurchase: true
      }
    ]
  },

  // 4. Beauty & Skincare
  {
    id: 'prod-beauty-1',
    title: 'Lumière Hydration Botanical Face Elixir',
    subtitle: 'Cold-pressed Marula, Blue Tansy & 2% Hyaluronic Complex',
    description: 'A restorative, non-comedogenic active facial oil that locks in deep cellular moisture, calms redness, and imparts a luminous, velvety radiance.',
    category: 'beauty',
    price: 54.00,
    compareAtPrice: 65.00,
    rating: 4.94,
    reviewCount: 480,
    stock: 90,
    featured: true,
    colors: [
      { name: 'Tansy Indigo', hex: '#4F46E5', previewImage: 'https://images.unsplash.com/photo-1608248597359-00f074d3202e?auto=format&fit=crop&w=1000&q=80', inStock: true },
      { name: 'Golden Marula', hex: '#EAB308', previewImage: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1000&q=80', inStock: true },
      { name: 'Rose Petal', hex: '#F43F5E', previewImage: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=1000&q=80', inStock: true }
    ],
    sizes: ['30ml / 1.0 fl oz', '50ml / 1.7 fl oz'],
    tags: ['skincare', 'botanical', 'face-oil', 'clean-beauty', 'vegan'],
    images: [
      'https://images.unsplash.com/photo-1608248597359-00f074d3202e?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=1000&q=80'
    ],
    specs: [
      { label: 'Key Actives', value: 'Blue Tansy, Marula Oil, Squalane, HA' },
      { label: 'Skin Type', value: 'All skin types including sensitive' },
      { label: 'Ethics', value: '100% Cruelty-Free & Vegan' }
    ],
    seller: {
      id: 'seller-lumiere',
      name: 'Lumière Botanicals',
      rating: 4.97,
      salesCount: 5120,
      verified: true
    },
    createdAt: '2026-06-20T10:00:00Z',
    reviews: [
      {
        id: 'rev-9',
        author: 'Chloe Dupont',
        rating: 5,
        date: '2026-08-08',
        comment: 'Holy grail oil. Waking up with glass skin. Absorbs quickly without greasy residue.',
        verifiedPurchase: true
      }
    ]
  },

  // 5. Sports & Fitness
  {
    id: 'prod-sport-1',
    title: 'Kinetix Alignment Eco-Grip Yoga Mat',
    subtitle: 'High-density natural tree rubber with laser-etched alignment guides',
    description: 'Engineered for joint protection and maximum non-slip traction under sweaty conditions. 5mm cushioning with antimicrobial closed-cell surface.',
    category: 'sports',
    price: 78.00,
    compareAtPrice: 95.00,
    rating: 4.82,
    reviewCount: 178,
    stock: 40,
    colors: [
      { name: 'Sage Eucalyptus', hex: '#15803D', previewImage: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?auto=format&fit=crop&w=1000&q=80', inStock: true },
      { name: 'Deep Teal Navy', hex: '#0F766E', previewImage: 'https://images.unsplash.com/photo-1592432678016-e910b452f9a2?auto=format&fit=crop&w=1000&q=80', inStock: true },
      { name: 'Dusk Violet', hex: '#7E22CE', previewImage: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1000&q=80', inStock: true }
    ],
    tags: ['yoga', 'fitness', 'eco-friendly', 'non-slip', 'pilates'],
    images: [
      'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1592432678016-e910b452f9a2?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1000&q=80'
    ],
    specs: [
      { label: 'Dimensions', value: '185cm x 68cm x 5mm' },
      { label: 'Material', value: '100% Biodegradable Natural Tree Rubber' },
      { label: 'Weight', value: '2.8 kg (Stable floor grip)' }
    ],
    seller: {
      id: 'seller-kinetix',
      name: 'Kinetix Activewear',
      rating: 4.86,
      salesCount: 1650,
      verified: true
    },
    createdAt: '2026-03-30T13:40:00Z',
    reviews: [
      {
        id: 'rev-10',
        author: 'Rachel Adams',
        rating: 5,
        date: '2026-07-29',
        comment: 'Finally a mat where my hands don’t slide during hot yoga! The laser guides are so helpful.',
        verifiedPurchase: true
      }
    ]
  },

  // 6. Digital & Creative Goods
  {
    id: 'prod-dig-1',
    title: 'Apex UI Master Design System & Figma Token Suite',
    subtitle: 'Over 1,200+ responsive components with full WCAG color codes',
    description: 'A comprehensive, enterprise-ready UI design system for Figma and React. Built with fluid variables, automatic dark mode sync, and 24 curated aesthetic color schemes with precise HEX swatches.',
    category: 'digital',
    price: 49.00,
    compareAtPrice: 99.00,
    rating: 4.98,
    reviewCount: 620,
    stock: 999,
    featured: true,
    colors: [
      { name: 'Neon Cyber Blue', hex: '#06B6D4', previewImage: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1000&q=80', inStock: true },
      { name: 'Electric Violet', hex: '#8B5CF6', previewImage: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1000&q=80', inStock: true },
      { name: 'Minimal Mono', hex: '#27272A', previewImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80', inStock: true }
    ],
    tags: ['digital', 'figma', 'design-system', 'react', 'tokens'],
    images: [
      'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80'
    ],
    specs: [
      { label: 'Format', value: 'Figma File (.fig) + React Tailwind Package' },
      { label: 'Components', value: '1,200+ Auto Layout 5.0 Components' },
      { label: 'Updates', value: 'Lifetime Free Version Upgrades' }
    ],
    seller: {
      id: 'seller-apexlabs',
      name: 'Apex Design Labs',
      rating: 4.99,
      salesCount: 8400,
      verified: true
    },
    createdAt: '2026-07-01T15:00:00Z',
    reviews: [
      {
        id: 'rev-11',
        author: 'Alexander Bell',
        rating: 5,
        date: '2026-08-11',
        comment: 'Saved our team at least 3 months of UI build time. The color token variables are incredible.',
        verifiedPurchase: true
      }
    ]
  },

  // 7. Art & Collectibles
  {
    id: 'prod-art-1',
    title: 'Prism Geometry Original Giclée Canvas Print',
    subtitle: 'Limited run of 150 prints on archival cotton rag paper',
    description: 'Vibrant geometric abstractions exploring chromatic spectrums and optical illusions. Printed using 12-color archival pigment inks guaranteed to resist fading for 100+ years.',
    category: 'art',
    price: 115.00,
    compareAtPrice: 140.00,
    rating: 4.92,
    reviewCount: 92,
    stock: 18,
    colors: [
      { name: 'Sunset Gradient', hex: '#F97316', previewImage: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1000&q=80', inStock: true },
      { name: 'Neon Cyberpunk', hex: '#EC4899', previewImage: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1000&q=80', inStock: true },
      { name: 'Monochrome Wave', hex: '#475569', previewImage: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1000&q=80', inStock: true }
    ],
    sizes: ['18x24 in', '24x36 in', '30x40 in (Framed)'],
    tags: ['art', 'print', 'limited-edition', 'giclee', 'contemporary'],
    images: [
      'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1000&q=80'
    ],
    specs: [
      { label: 'Paper', value: '310 GSM Hahnemühle German Etching' },
      { label: 'Edition', value: 'Hand-signed & numbered by Artist' },
      { label: 'Framing', value: 'Solid matte black FSC certified ash wood' }
    ],
    seller: {
      id: 'seller-chromastudio',
      name: 'Chroma Modern Fine Arts',
      rating: 4.95,
      salesCount: 430,
      verified: true
    },
    createdAt: '2026-06-18T11:20:00Z',
    reviews: [
      {
        id: 'rev-12',
        author: 'Nadia Thorne',
        rating: 5,
        date: '2026-07-30',
        comment: 'The vibrancy of the pigments is unreal. Framed beautifully and delivered in a protective wooden crate.',
        verifiedPurchase: true
      }
    ]
  }
];

export const INITIAL_COLOR_PRESETS: ColorPreset[] = [
  {
    id: 'preset-nordic',
    name: 'Nordic Minimalist',
    description: 'Clean, serene neutrals inspired by Scandinavian architectural simplicity.',
    colors: [
      { name: 'Snow Chalk', hex: '#F8FAFC' },
      { name: 'Mist Slate', hex: '#94A3B8' },
      { name: 'Nordic Charcoal', hex: '#1E293B' },
      { name: 'Pale Sage', hex: '#84CC16' }
    ]
  },
  {
    id: 'preset-cyberpunk',
    name: 'Cyberpunk Neon',
    description: 'High-contrast luminescent frequencies with electric saturation.',
    colors: [
      { name: 'Neon Cyan', hex: '#06B6D4' },
      { name: 'Laser Magenta', hex: '#EC4899' },
      { name: 'Electric Violet', hex: '#8B5CF6' },
      { name: 'Void Black', hex: '#09090B' }
    ]
  },
  {
    id: 'preset-terracotta',
    name: 'Earthy Terracotta & Amber',
    description: 'Warm, organic clay and sun-drenched desert tones.',
    colors: [
      { name: 'Burnt Terracotta', hex: '#C2410C' },
      { name: 'Amber Caramel', hex: '#D97706' },
      { name: 'Warm Cream', hex: '#FEF3C7' },
      { name: 'Deep Espresso', hex: '#451A03' }
    ]
  },
  {
    id: 'preset-botanical',
    name: 'Botanical Emerald & Sage',
    description: 'Lush, soothing nature-inspired hues that invoke tranquil vitality.',
    colors: [
      { name: 'Forest Moss', hex: '#166534' },
      { name: 'Olive Green', hex: '#4D7C0F' },
      { name: 'Sage Mist', hex: '#86EFAC' },
      { name: 'Deep Pine', hex: '#064E3B' }
    ]
  },
  {
    id: 'preset-midnight',
    name: 'Midnight & Royal Gold',
    description: 'Opulent, sophisticated luxury contrasting dark sapphire with warm metallic gold.',
    colors: [
      { name: 'Obsidian Midnight', hex: '#0F172A' },
      { name: 'Royal Sapphire', hex: '#2563EB' },
      { name: 'Champagne Gold', hex: '#EAB308' },
      { name: 'Pure Platinum', hex: '#E2E8F0' }
    ]
  }
];

export const INITIAL_COUPONS: Coupon[] = [
  {
    code: 'SPECTRUM15',
    discountPercent: 15,
    minSpend: 50,
    active: true,
    description: '15% off orders over $50'
  },
  {
    code: 'COLOR20',
    discountPercent: 20,
    minSpend: 100,
    active: true,
    description: '20% off orders over $100'
  },
  {
    code: 'FREESHIP',
    discountAmount: 15,
    minSpend: 40,
    active: true,
    description: 'Free expedited shipping on $40+'
  },
  {
    code: 'WELCOME10',
    discountPercent: 10,
    minSpend: 0,
    active: true,
    description: '10% off your first purchase'
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-10492',
    orderNumber: 'SPC-94821',
    date: '2026-08-14T09:30:00Z',
    items: [
      {
        id: 'prod-elec-1-#0F172A',
        product: INITIAL_PRODUCTS[0],
        selectedColor: INITIAL_PRODUCTS[0].colors[0],
        quantity: 1
      },
      {
        id: 'prod-fash-1-#09090B-L',
        product: INITIAL_PRODUCTS[3],
        selectedColor: INITIAL_PRODUCTS[3].colors[0],
        selectedSize: 'L',
        quantity: 2
      }
    ],
    subtotal: 425.00,
    discount: 63.75,
    shippingFee: 0,
    tax: 28.90,
    totalAmount: 390.15,
    shippingAddress: {
      fullName: 'Alexander Vance',
      email: 'alex.vance@example.com',
      phone: '+1 (555) 234-5678',
      addressLine1: '742 Evergreen Boulevard, Suite 4B',
      city: 'San Francisco',
      state: 'CA',
      postalCode: '94107',
      country: 'United States'
    },
    paymentMethod: 'card',
    paymentDetails: {
      last4: '4242',
      brand: 'Visa'
    },
    status: 'shipped',
    trackingNumber: 'TRK-88219401-US',
    carrier: 'FedEx Express',
    estimatedDelivery: '2026-08-17',
    trackingUpdates: [
      { step: 'Order Placed', date: 'Aug 14, 09:30 AM', completed: true, description: 'Order confirmed and payment verified' },
      { step: 'Processing & Quality Check', date: 'Aug 14, 01:15 PM', completed: true, description: 'Items gathered, color checked, packaged in custom eco-box' },
      { step: 'Shipped from Hub', date: 'Aug 15, 06:40 AM', completed: true, description: 'Departed sorting facility (Oakland, CA)' },
      { step: 'Out for Delivery', date: 'Aug 17, 08:00 AM', completed: false, description: 'Courier will arrive between 10am-2pm' },
      { step: 'Delivered', date: 'Pending', completed: false, description: 'Package handed to recipient' }
    ]
  },
  {
    id: 'ord-10491',
    orderNumber: 'SPC-94820',
    date: '2026-08-12T16:45:00Z',
    items: [
      {
        id: 'prod-home-1-#EA580C',
        product: INITIAL_PRODUCTS[5],
        selectedColor: INITIAL_PRODUCTS[5].colors[0],
        quantity: 1
      }
    ],
    subtotal: 135.00,
    discount: 13.50,
    shippingFee: 0,
    tax: 9.72,
    totalAmount: 131.22,
    shippingAddress: {
      fullName: 'Samantha Sterling',
      email: 'sam.sterling@example.com',
      phone: '+1 (555) 876-5432',
      addressLine1: '120 Mercer Street, Loft 3',
      city: 'New York',
      state: 'NY',
      postalCode: '10012',
      country: 'United States'
    },
    paymentMethod: 'apple_pay',
    status: 'delivered',
    trackingNumber: 'TRK-77123904-US',
    carrier: 'UPS Ground',
    estimatedDelivery: '2026-08-14',
    trackingUpdates: [
      { step: 'Order Placed', date: 'Aug 12, 04:45 PM', completed: true, description: 'Order confirmed' },
      { step: 'Processing', date: 'Aug 12, 06:00 PM', completed: true, description: 'Packaged with care' },
      { step: 'Shipped', date: 'Aug 13, 08:00 AM', completed: true, description: 'In transit to NY' },
      { step: 'Out for Delivery', date: 'Aug 14, 09:15 AM', completed: true, description: 'On courier vehicle' },
      { step: 'Delivered', date: 'Aug 14, 02:30 PM', completed: true, description: 'Delivered to front porch' }
    ]
  }
];
