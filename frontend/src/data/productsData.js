const productsData = [

  // ─── BOOKS (1-3) ─────────────────────────────────────────────────
  {
    id: 1,
    title: "Graph Theory Textbook Bundle",
    price: 450,
    category: "Books",
    badge: "Books",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80",
    description: "Complete Graph Theory textbook bundle covering trees, graphs, algorithms, coloring and network flows. Ideal for CS and Math students. All books in good condition with minimal markings.",
    postedDate: "3 days ago", condition: "Good", pages: 740, author: "Narsingh Deo",
    brand: undefined, warranty: undefined, processor: undefined, ram: undefined, storage: undefined, battery: undefined,
    name: "Arjun Sharma", contact: "9812345670", email: "arjun.sharma@college.edu", location: "Hostel A, Room 101"
  },
  {
    id: 2,
    title: "Advanced Calculus Edition",
    price: 620,
    category: "Books",
    badge: "Books",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80",
    description: "Complete advanced calculus textbook covering limits, derivatives, integrals and series. Perfect for engineering and math students. Minor highlights on a few pages, otherwise excellent condition.",
    postedDate: "2 days ago", condition: "Like New", pages: 850, author: "James Stewart",
    brand: undefined, warranty: undefined, processor: undefined, ram: undefined, storage: undefined, battery: undefined,
    name: "Priya Patel", contact: "9823456781", email: "priya.patel@college.edu", location: "Hostel B, Room 204"
  },
  {
    id: 3,
    title: "Physics Fundamentals Hardcover",
    price: 550,
    category: "Books",
    badge: "Books",
    image: "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?auto=format&fit=crop&w=800&q=80",
    description: "University Physics by Young & Freedman - hardcover edition. Covers mechanics, thermodynamics, waves, optics and modern physics. All pages intact, no writing inside.",
    postedDate: "1 week ago", condition: "Good", pages: 1600, author: "Young & Freedman",
    brand: undefined, warranty: undefined, processor: undefined, ram: undefined, storage: undefined, battery: undefined,
    name: "Rahul Mehta", contact: "9834567892", email: "rahul.mehta@college.edu", location: "Hostel C, Room 312"
  },

  // ─── NOTES (4-6) ─────────────────────────────────────────────────
  {
    id: 4,
    title: "Organic Chemistry Notes Pack",
    price: 299,
    category: "Notes",
    badge: "Notes",
    image: "https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?auto=format&fit=crop&w=800&q=80",
    description: "Comprehensive organic chemistry notes covering all reaction mechanisms, named reactions, stereochemistry, and synthesis routes. Color-coded and very neatly written. Topper notes.",
    postedDate: "1 day ago", condition: "Good",
    pages: undefined, author: undefined, processor: undefined, ram: undefined, storage: undefined, battery: undefined, brand: undefined, warranty: undefined,
    name: "Sneha Gupta", contact: "9845678903", email: "sneha.gupta@college.edu", location: "Hostel D, Room 408"
  },
  {
    id: 5,
    title: "Calculus Lecture Notes",
    price: 249,
    category: "Notes",
    badge: "Notes",
    image: "https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?auto=format&fit=crop&w=800&q=80",
    description: "Semester-wise calculus lecture notes covering differential calculus, integral calculus, multivariable calculus and differential equations. Includes solved examples and shortcut methods.",
    postedDate: "3 days ago", condition: "Good",
    pages: undefined, author: undefined, processor: undefined, ram: undefined, storage: undefined, battery: undefined, brand: undefined, warranty: undefined,
    name: "Vikram Singh", contact: "9856789014", email: "vikram.singh@college.edu", location: "Hostel E, Room 502"
  },
  {
    id: 6,
    title: "Biology Study Guide Complete",
    price: 349,
    category: "Notes",
    badge: "Notes",
    image: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&w=800&q=80",
    description: "Complete biology study guide covering cell biology, genetics, ecology, human physiology and evolution. Diagrams with labels included. Excellent for exam revision.",
    postedDate: "5 days ago", condition: "Good",
    pages: undefined, author: undefined, processor: undefined, ram: undefined, storage: undefined, battery: undefined, brand: undefined, warranty: undefined,
    name: "Ananya Reddy", contact: "9867890125", email: "ananya.reddy@college.edu", location: "Hostel A, Room 215"
  },

  // ─── GADGETS (7-9) ───────────────────────────────────────────────
  {
    id: 7,
    title: "Noise Cancelling Headphones",
    price: 3499,
    category: "Gadgets",
    badge: "Gadgets",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
    description: "Sony WH-1000XM4 style noise cancelling headphones. Industry-leading ANC technology, 30-hour battery life, premium sound quality. Perfect for studying in noisy environments. Used 6 months.",
    postedDate: "2 days ago", condition: "Like New",
    battery: "30 hours", brand: "Sony", warranty: "6 months remaining",
    pages: undefined, author: undefined, processor: undefined, ram: undefined, storage: undefined,
    name: "Karan Joshi", contact: "9878901236", email: "karan.joshi@college.edu", location: "Hostel B, Room 317"
  },
  {
    id: 8,
    title: "Gaming Laptop Charger",
    price: 1899,
    category: "Gadgets",
    badge: "Gadgets",
    image: "https://images.unsplash.com/photo-1601524909162-ae8725290836?auto=format&fit=crop&w=800&q=80",
    description: "Original 180W gaming laptop charger compatible with ASUS ROG, MSI, Lenovo Legion. Barrel connector. Perfect working condition, no fraying. Selling as upgraded to USB-C charger.",
    postedDate: "4 days ago", condition: "Good",
    brand: "ASUS", warranty: undefined,
    pages: undefined, author: undefined, processor: undefined, ram: undefined, storage: undefined, battery: undefined,
    name: "Rohan Malik", contact: "9889012347", email: "rohan.malik@college.edu", location: "Hostel C, Room 421"
  },
  {
    id: 9,
    title: "Bluetooth Portable Speaker",
    price: 2199,
    category: "Gadgets",
    badge: "Gadgets",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=800&q=80",
    description: "JBL Flip 5 portable Bluetooth speaker. Waterproof, powerful bass, 12-hour battery life. Great sound for room parties, outdoor use and study sessions. All buttons working perfectly.",
    postedDate: "3 days ago", condition: "Good",
    battery: "12 hours", brand: "JBL", warranty: undefined,
    pages: undefined, author: undefined, processor: undefined, ram: undefined, storage: undefined,
    name: "Divya Nair", contact: "9890123458", email: "divya.nair@college.edu", location: "Hostel D, Room 109"
  },

  // ─── ELECTRONICS (10-12) ─────────────────────────────────────────
  {
    id: 10,
    title: "USB-C Hub 7-in-1",
    price: 5499,
    category: "Electronics",
    badge: "Electronics",
    image: "https://images.unsplash.com/photo-1625842268584-8f3296236761?auto=format&fit=crop&w=800&q=80",
    description: "7-in-1 USB-C Hub with HDMI 4K, 3x USB 3.0, SD card reader, microSD card reader and 100W PD charging. Essential accessory for MacBook and modern laptop users.",
    postedDate: "2 days ago", condition: "Like New",
    brand: "Anker", warranty: "3 months remaining",
    pages: undefined, author: undefined, processor: undefined, ram: undefined, storage: undefined, battery: undefined,
    name: "Amit Kumar", contact: "9801234569", email: "amit.kumar@college.edu", location: "Hostel E, Room 233"
  },
  {
    id: 11,
    title: "Wireless Charging Pad",
    price: 5999,
    category: "Electronics",
    badge: "Electronics",
    image: "https://images.unsplash.com/photo-1622556498246-755f44ca76f3?auto=format&fit=crop&w=800&q=80",
    description: "15W fast wireless charging pad compatible with iPhone, Samsung and all Qi-enabled devices. Slim design, LED indicator, non-slip surface. Includes adapter. Works perfectly.",
    postedDate: "5 days ago", condition: "Like New",
    brand: "Belkin", warranty: undefined,
    pages: undefined, author: undefined, processor: undefined, ram: undefined, storage: undefined, battery: undefined,
    name: "Pooja Sharma", contact: "9812345680", email: "pooja.sharma@college.edu", location: "Hostel A, Room 330"
  },
  {
    id: 12,
    title: "LED Desk Lamp Pro",
    price: 6499,
    category: "Electronics",
    badge: "Electronics",
    image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&q=80",
    description: "Smart LED desk lamp with touch control, 5 brightness levels, 3 color temperatures and USB charging port. Eye-care technology, flexible arm. Perfect for night study sessions in hostel.",
    postedDate: "1 week ago", condition: "Like New",
    battery: "USB powered", brand: undefined, warranty: undefined,
    pages: undefined, author: undefined, processor: undefined, ram: undefined, storage: undefined,
    name: "Nikhil Verma", contact: "9823456791", email: "nikhil.verma@college.edu", location: "Hostel B, Room 112"
  },

  // ─── LAPTOPS (13-15) ─────────────────────────────────────────────
  {
    id: 13,
    title: "MacBook Air M1 2021",
    price: 72999,
    category: "Laptops",
    badge: "Laptops",
    image: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=800&q=80",
    description: "MacBook Air M1 2021, 8GB RAM, 256GB SSD in Space Gray. Battery health 91%. Fanless, silent operation, incredible performance. Comes with original MagSafe charger and box. No scratches.",
    postedDate: "1 day ago", condition: "Like New",
    processor: "Apple M1", ram: "8GB Unified", storage: "256GB SSD", battery: "Battery health 91%", brand: "Apple", warranty: "4 months remaining",
    pages: undefined, author: undefined,
    name: "Sakshi Agarwal", contact: "9834567902", email: "sakshi.agarwal@college.edu", location: "Hostel C, Room 207"
  },
  {
    id: 14,
    title: "Dell XPS 13 Ultrabook",
    price: 65999,
    category: "Laptops",
    badge: "Laptops",
    image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80",
    description: "Dell XPS 13 with InfinityEdge display. 11th Gen Intel i7, 16GB RAM, 512GB SSD. Compact and powerful. Barely used, all ports working. Comes with original Dell charger and sleeve bag.",
    postedDate: "3 days ago", condition: "Like New",
    processor: "Intel Core i7 11th Gen", ram: "16GB", storage: "512GB SSD", battery: "6-8 hours", brand: "Dell", warranty: "5 months remaining",
    pages: undefined, author: undefined,
    name: "Tushar Bhatia", contact: "9845678013", email: "tushar.bhatia@college.edu", location: "Hostel D, Room 405"
  },
  {
    id: 15,
    title: "Gaming Laptop ASUS ROG",
    price: 98999,
    category: "Laptops",
    badge: "Laptops",
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80",
    description: "ASUS ROG Strix G15 gaming laptop. RTX 3060, Ryzen 7 5800H, 16GB RAM, 512GB SSD, 144Hz display. RGB keyboard. Perfect for gaming and heavy design work. Original charger and bag included.",
    postedDate: "2 days ago", condition: "Good",
    processor: "AMD Ryzen 7 5800H", ram: "16GB DDR4", storage: "512GB NVMe SSD", battery: "3-4 hours (gaming)", brand: "ASUS ROG", warranty: "8 months remaining",
    pages: undefined, author: undefined,
    name: "Deepak Yadav", contact: "9856789124", email: "deepak.yadav@college.edu", location: "Hostel E, Room 318"
  },

  // ─── PHONES (16-18) ──────────────────────────────────────────────
  {
    id: 16,
    title: "iPhone 14 Pro Space Black",
    price: 64999,
    category: "Phones",
    badge: "Phones",
    image: "https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?auto=format&fit=crop&w=800&q=80",
    description: "iPhone 14 Pro in Space Black, 128GB. Battery health 89%. Dynamic Island, 48MP ProRAW camera, Always-On display. Screen protector applied from day 1. Comes with box and cable. No scratches.",
    postedDate: "2 days ago", condition: "Like New",
    processor: "Apple A16 Bionic", ram: "6GB", storage: "128GB", battery: "Battery health 89%", brand: "Apple", warranty: "2 months remaining",
    pages: undefined, author: undefined,
    name: "Riya Kapoor", contact: "9867890235", email: "riya.kapoor@college.edu", location: "Hostel A, Room 120"
  },
  {
    id: 17,
    title: "Samsung Galaxy S22 Ultra",
    price: 54999,
    category: "Phones",
    badge: "Phones",
    image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=800&q=80",
    description: "Samsung Galaxy S22 Ultra 256GB in Phantom Black. Built-in S Pen, 108MP camera, 5000mAh battery. Excellent display with 120Hz. Comes with original box, charger and S Pen.",
    postedDate: "4 days ago", condition: "Like New",
    processor: "Exynos 2200", ram: "12GB", storage: "256GB", battery: "5000 mAh", brand: "Samsung", warranty: "3 months remaining",
    pages: undefined, author: undefined,
    name: "Aakash Patel", contact: "9878901346", email: "aakash.patel@college.edu", location: "Hostel B, Room 226"
  },
  {
    id: 18,
    title: "Google Pixel 7 Pro",
    price: 49999,
    category: "Phones",
    badge: "Phones",
    image: "https://images.unsplash.com/photo-1598327105854-c8674faddf79?auto=format&fit=crop&w=800&q=80",
    description: "Google Pixel 7 Pro 128GB in Snow White. Best-in-class computational photography, 5 years of OS updates, Tensor G2 chip. Pure Android experience. Minor scratch on back, screen flawless.",
    postedDate: "6 days ago", condition: "Good",
    processor: "Google Tensor G2", ram: "12GB", storage: "128GB", battery: "5000 mAh", brand: "Google", warranty: undefined,
    pages: undefined, author: undefined,
    name: "Shruti Mishra", contact: "9889012457", email: "shruti.mishra@college.edu", location: "Hostel C, Room 314"
  },

  // ─── ACCESSORIES (19-21) ─────────────────────────────────────────
  {
    id: 19,
    title: "Premium Phone Case",
    price: 799,
    category: "Accessories",
    badge: "Accessories",
    image: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&w=800&q=80",
    description: "Premium leather phone case compatible with iPhone 14/13/12 and Samsung Galaxy S22/S21. MagSafe compatible. Raised edges for camera protection.",
    postedDate: "1 day ago", condition: "New",
    pages: undefined, author: undefined, processor: undefined, ram: undefined, storage: undefined, battery: undefined, brand: undefined, warranty: undefined,
    name: "Meera Krishnan", contact: "9890123568", email: "meera.krishnan@college.edu", location: "Hostel D, Room 411"
  },
  {
    id: 20,
    title: "Laptop Stand Aluminum",
    price: 2499,
    category: "Accessories",
    badge: "Accessories",
    image: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?auto=format&fit=crop&w=800&q=80",
    description: "Adjustable aluminum laptop stand with 6 height settings. Compatible with MacBook, laptops up to 17 inch, tablets. Foldable and portable. Improves posture during long study sessions.",
    postedDate: "3 days ago", condition: "Like New",
    brand: "Nulaxy", warranty: undefined,
    pages: undefined, author: undefined, processor: undefined, ram: undefined, storage: undefined, battery: undefined,
    name: "Rohan Malik", contact: "9801234679", email: "rohan.malik@college.edu", location: "Hostel D, Room 502"
  },
  {
    id: 21,
    title: "Wireless Mouse Ergonomic",
    price: 1799,
    category: "Accessories",
    badge: "Accessories",
    image: "https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=800&q=80",
    description: "Logitech M510 wireless ergonomic mouse. 2.4GHz connection, USB nano receiver. Comfortable right-hand design, 24-month battery life. Works on any surface. Used for 4 months, works perfectly.",
    postedDate: "5 days ago", condition: "Good",
    battery: "24 months", brand: "Logitech", warranty: undefined,
    pages: undefined, author: undefined, processor: undefined, ram: undefined, storage: undefined,
    name: "Siddharth Rao", contact: "9812345790", email: "siddharth.rao@college.edu", location: "Hostel E, Room 115"
  },

  // ─── STATIONERY (22-24) ──────────────────────────────────────────
  {
    id: 22,
    title: "Premium Notebook Set",
    price: 499,
    category: "Stationery",
    badge: "Stationery",
    image: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&w=800&q=80",
    description: "Set of 5 premium A4 notebooks with 200 pages each. Thick 90gsm paper, no bleed-through. Hardcover design. Perfect for college notes, journaling and project work. Brand new, unused.",
    postedDate: "2 days ago", condition: "New",
    pages: undefined, author: undefined, processor: undefined, ram: undefined, storage: undefined, battery: undefined, brand: undefined, warranty: undefined,
    name: "Varun Kapoor", contact: "9823456901", email: "varun.kapoor@college.edu", location: "Hostel A, Room 418"
  },
  {
    id: 23,
    title: "Gel Pen Collection 20-pack",
    price: 349,
    category: "Stationery",
    badge: "Stationery",
    image: "https://images.unsplash.com/photo-1585336261022-680e295ce3fe?auto=format&fit=crop&w=800&q=80",
    description: "Pack of 20 smooth-writing gel pens in 10 different colors. 0.5mm tip, quick-dry ink, comfortable grip. Great for color-coded notes, art and assignments.",
    postedDate: "4 days ago", condition: "New",
    pages: undefined, author: undefined, processor: undefined, ram: undefined, storage: undefined, battery: undefined, brand: undefined, warranty: undefined,
    name: "Raj Thakur", contact: "9834568012", email: "raj.thakur@college.edu", location: "Hostel B, Room 222"
  },
  {
    id: 24,
    title: "Highlighter Marker Set",
    price: 299,
    category: "Stationery",
    badge: "Stationery",
    image: "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=800&q=80",
    description: "Set of 8 pastel and neon highlighters in different colors. Chisel tip for both fine lines and broad highlighting. Long-lasting ink. Ideal for marking important study material.",
    postedDate: "1 day ago", condition: "New",
    pages: undefined, author: undefined, processor: undefined, ram: undefined, storage: undefined, battery: undefined, brand: undefined, warranty: undefined,
    name: "Ishika Bansal", contact: "9845679123", email: "ishika.bansal@college.edu", location: "Hostel C, Room 308"
  },

  // ─── BAGS (25-27) ────────────────────────────────────────────────
  {
    id: 25,
    title: "College Backpack Water-Resistant",
    price: 2999,
    category: "Bags",
    badge: "Bags",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80",
    description: "Large 40L water-resistant college backpack with dedicated 15.6 inch laptop compartment, multiple pockets, USB charging port and padded shoulder straps.",
    postedDate: "3 days ago", condition: "Good",
    brand: "Wildcraft", warranty: undefined,
    pages: undefined, author: undefined, processor: undefined, ram: undefined, storage: undefined, battery: undefined,
    name: "Harshit Jain", contact: "9856790234", email: "harshit.jain@college.edu", location: "Hostel D, Room 116"
  },
  {
    id: 26,
    title: "Laptop Messenger Bag",
    price: 2499,
    category: "Bags",
    badge: "Bags",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80",
    description: "Canvas laptop messenger bag fits 14-inch laptops. Multiple compartments for books, charger, accessories. Adjustable strap, magnetic clasp. Perfect for daily college commute.",
    postedDate: "5 days ago", condition: "Like New",
    pages: undefined, author: undefined, processor: undefined, ram: undefined, storage: undefined, battery: undefined, brand: undefined, warranty: undefined,
    name: "Tanvi Desai", contact: "9867891345", email: "tanvi.desai@college.edu", location: "Hostel E, Room 224"
  },
  {
    id: 27,
    title: "Travel Duffle Bag",
    price: 1999,
    category: "Bags",
    badge: "Bags",
    image: "https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?auto=format&fit=crop&w=800&q=80",
    description: "60L travel duffle bag with shoe compartment and multiple pockets. Durable polyester, strong zippers, detachable shoulder strap. Perfect for weekend trips and semester travel.",
    postedDate: "2 days ago", condition: "Like New",
    brand: "American Tourister", warranty: undefined,
    pages: undefined, author: undefined, processor: undefined, ram: undefined, storage: undefined, battery: undefined,
    name: "Mohit Saxena", contact: "9878902456", email: "mohit.saxena@college.edu", location: "Hostel A, Room 321"
  },

  // ─── CALCULATORS (28-30) ─────────────────────────────────────────
  {
    id: 28,
    title: "Scientific Calculator Casio",
    price: 1299,
    category: "Calculators",
    badge: "Calculators",
    image: "https://images.unsplash.com/photo-1564939558297-fc396f18e5c7?auto=format&fit=crop&w=800&q=80",
    description: "Casio FX-991EX ClassWiz scientific calculator. 552 functions, matrix calculations, statistics, complex numbers and equation solving. Battery is new. Must-have for engineering students.",
    postedDate: "2 days ago", condition: "Good",
    battery: "AAA battery (new)", brand: "Casio", warranty: undefined,
    pages: undefined, author: undefined, processor: undefined, ram: undefined, storage: undefined,
    name: "Gaurav Tiwari", contact: "9889013567", email: "gaurav.tiwari@college.edu", location: "Hostel B, Room 419"
  },
  {
    id: 29,
    title: "Graphing Calculator TI-84",
    price: 7999,
    category: "Calculators",
    badge: "Calculators",
    image: "https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?auto=format&fit=crop&w=800&q=80",
    description: "Texas Instruments TI-84 Plus CE graphing calculator. Color display, rechargeable battery, preloaded apps. Approved for SAT, ACT and AP exams. Comes with charging cable and protective cover.",
    postedDate: "4 days ago", condition: "Good",
    battery: "Rechargeable", brand: "Texas Instruments", warranty: undefined,
    pages: undefined, author: undefined, processor: undefined, ram: undefined, storage: undefined,
    name: "Naveen Kumar", contact: "9890124678", email: "naveen.kumar@college.edu", location: "Hostel C, Room 113"
  },
  {
    id: 30,
    title: "Basic Calculator HP 10s",
    price: 899,
    category: "Calculators",
    badge: "Calculators",
    image: "https://images.unsplash.com/photo-1587145820266-a5951ee6f620?auto=format&fit=crop&w=800&q=80",
    description: "HP 10s+ scientific calculator. 240 built-in functions, two-line display, solar powered with backup battery. Lightweight and perfect for commerce and basic science students.",
    postedDate: "1 week ago", condition: "Good",
    battery: "Solar + battery", brand: "HP", warranty: undefined,
    pages: undefined, author: undefined, processor: undefined, ram: undefined, storage: undefined,
    name: "Lavanya Iyer", contact: "9801235789", email: "lavanya.iyer@college.edu", location: "Hostel D, Room 209"
  },

  // ─── LAB EQUIPMENT (31-33) ───────────────────────────────────────
  {
    id: 31,
    title: "Microscope Compound 1000x",
    price: 9999,
    category: "Lab Equipment",
    badge: "Lab Equipment",
    image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=800&q=80",
    description: "Compound microscope with 40x-1000x magnification. 4 objective lenses, binocular eyepiece, built-in LED illumination. Comes with blank slides, cover slips and immersion oil.",
    postedDate: "3 days ago", condition: "Good",
    pages: undefined, author: undefined, processor: undefined, ram: undefined, storage: undefined, battery: undefined, brand: undefined, warranty: undefined,
    name: "Arjun Sharma", contact: "9812345670", email: "arjun.sharma@college.edu", location: "Hostel A, Room 101"
  },
  {
    id: 32,
    title: "Digital Scale 0.01g Precision",
    price: 2799,
    category: "Lab Equipment",
    badge: "Lab Equipment",
    image: "https://images.unsplash.com/photo-1614935151651-0bea6508db6b?auto=format&fit=crop&w=800&q=80",
    description: "Digital precision scale with 0.01g accuracy, 500g capacity. 6 weighing units, tare function, stainless steel platform. Perfect for chemistry labs.",
    postedDate: "5 days ago", condition: "Like New",
    battery: "AAA batteries", brand: undefined, warranty: undefined,
    pages: undefined, author: undefined, processor: undefined, ram: undefined, storage: undefined,
    name: "Priya Patel", contact: "9823456781", email: "priya.patel@college.edu", location: "Hostel B, Room 204"
  },
  {
    id: 33,
    title: "Chemistry Lab Glass Set",
    price: 3499,
    category: "Lab Equipment",
    badge: "Lab Equipment",
    image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=800&q=80",
    description: "Complete borosilicate glass lab set: 3 beakers, 2 conical flasks, 1 round bottom flask, 3 test tubes, 1 burette and measuring cylinder. All pieces intact, no chips.",
    postedDate: "1 week ago", condition: "Good",
    pages: undefined, author: undefined, processor: undefined, ram: undefined, storage: undefined, battery: undefined, brand: undefined, warranty: undefined,
    name: "Rahul Mehta", contact: "9834567892", email: "rahul.mehta@college.edu", location: "Hostel C, Room 312"
  },

  // ─── SPORTS (34-36) ──────────────────────────────────────────────
  {
    id: 34,
    title: "Professional Football",
    price: 1799,
    category: "Sports",
    badge: "Sports",
    image: "https://images.unsplash.com/photo-1553778263-73a83bab9b0c?auto=format&fit=crop&w=800&q=80",
    description: "Nike Merlin match ball, size 5. Used for one semester of college football. Good grip, holds air perfectly. Ideal for friendly matches and practice sessions on the college ground.",
    postedDate: "2 days ago", condition: "Good",
    brand: "Nike", warranty: undefined,
    pages: undefined, author: undefined, processor: undefined, ram: undefined, storage: undefined, battery: undefined,
    name: "Sneha Gupta", contact: "9845678903", email: "sneha.gupta@college.edu", location: "Hostel D, Room 408"
  },
  {
    id: 35,
    title: "Badminton Racket Set",
    price: 2499,
    category: "Sports",
    badge: "Sports",
    image: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=800&q=80",
    description: "Yonex badminton racket set - 2 rackets, 3 shuttlecocks and a carry bag. Lightweight graphite rackets, perfect for beginners and intermediate players. Used for one year, strings still tight.",
    postedDate: "4 days ago", condition: "Good",
    brand: "Yonex", warranty: undefined,
    pages: undefined, author: undefined, processor: undefined, ram: undefined, storage: undefined, battery: undefined,
    name: "Vikram Singh", contact: "9856789014", email: "vikram.singh@college.edu", location: "Hostel E, Room 502"
  },
  {
    id: 36,
    title: "Cricket Bat English Willow",
    price: 4999,
    category: "Sports",
    badge: "Sports",
    image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=800&q=80",
    description: "SG Sunny Tonny English Willow cricket bat, grade 2. Full size (size 6), well-oiled and ready to play. Bat handle grip replaced recently. Slight usage marks on edges, sweet spot intact.",
    postedDate: "6 days ago", condition: "Good",
    brand: "SG", warranty: undefined,
    pages: undefined, author: undefined, processor: undefined, ram: undefined, storage: undefined, battery: undefined,
    name: "Ananya Reddy", contact: "9867890125", email: "ananya.reddy@college.edu", location: "Hostel A, Room 215"
  },

  // ─── FASHION (37-39) ─────────────────────────────────────────────
  {
    id: 37,
    title: "College T-Shirt Pack 3",
    price: 1299,
    category: "Fashion",
    badge: "Fashion",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80",
    description: "Pack of 3 comfortable 100% cotton t-shirts in different colors. Perfect for casual campus wear. Worn only 3-4 times each, washed carefully. No fade, no damage. Sizes M and L available.",
    postedDate: "1 week ago", condition: "New",
    pages: undefined, author: undefined, processor: undefined, ram: undefined, storage: undefined, battery: undefined, brand: undefined, warranty: undefined,
    name: "Karan Joshi", contact: "9878901236", email: "karan.joshi@college.edu", location: "Hostel B, Room 317"
  },
  {
    id: 38,
    title: "Casual Jacket Denim",
    price: 2999,
    category: "Fashion",
    badge: "Fashion",
    image: "https://images.unsplash.com/photo-1544642899-f0d6e5f6ed6f?auto=format&fit=crop&w=800&q=80",
    description: "Classic blue denim jacket, size M. Perfect layering piece for college. Light wash, button front, chest pockets. Worn a handful of times, in excellent condition. Great for campus style.",
    postedDate: "3 days ago", condition: "Like New",
    brand: "H&M", warranty: undefined,
    pages: undefined, author: undefined, processor: undefined, ram: undefined, storage: undefined, battery: undefined,
    name: "Rohan Malik", contact: "9889012347", email: "rohan.malik@college.edu", location: "Hostel C, Room 421"
  },
  {
    id: 39,
    title: "Formal Shirt Premium Cotton",
    price: 1899,
    category: "Fashion",
    badge: "Fashion",
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80",
    description: "Premium cotton formal shirt in white and light blue. Size 40 (M). Worn only for college presentations and interviews. Dry cleaned. Perfect for placements, viva and formal events.",
    postedDate: "5 days ago", condition: "Like New",
    brand: "Van Heusen", warranty: undefined,
    pages: undefined, author: undefined, processor: undefined, ram: undefined, storage: undefined, battery: undefined,
    name: "Divya Nair", contact: "9890123458", email: "divya.nair@college.edu", location: "Hostel D, Room 109"
  },

  // ─── HOSTEL ITEMS (40-42) ────────────────────────────────────────
  {
    id: 40,
    title: "Twin XL Bed Sheet Set",
    price: 1199,
    category: "Hostel Items",
    badge: "Hostel Items",
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=800&q=80",
    description: "Set of 2 microfiber Twin XL bed sheets + 2 pillow covers. 300 thread count, soft and breathable. Washed and in excellent condition. Light blue and grey color.",
    postedDate: "2 days ago", condition: "Good",
    pages: undefined, author: undefined, processor: undefined, ram: undefined, storage: undefined, battery: undefined, brand: undefined, warranty: undefined,
    name: "Amit Kumar", contact: "9801234569", email: "amit.kumar@college.edu", location: "Hostel E, Room 233"
  },
  {
    id: 41,
    title: "Microfiber Pillow Memory Foam",
    price: 999,
    category: "Hostel Items",
    badge: "Hostel Items",
    image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=800&q=80",
    description: "Memory foam microfiber pillow with removable and washable cover. Medium-firm support, great for side and back sleepers. Used for 6 months, washed and sanitized.",
    postedDate: "4 days ago", condition: "Good",
    pages: undefined, author: undefined, processor: undefined, ram: undefined, storage: undefined, battery: undefined, brand: undefined, warranty: undefined,
    name: "Pooja Sharma", contact: "9812345680", email: "pooja.sharma@college.edu", location: "Hostel A, Room 330"
  },
  {
    id: 42,
    title: "Electric Kettle 1.5L Fast",
    price: 1499,
    category: "Hostel Items",
    badge: "Hostel Items",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800&q=80",
    description: "1500W electric kettle, 1.5L capacity. Boils water in under 3 minutes. Automatic shut-off, boil-dry protection, 360 degree swivel base. Great for making maggi, tea, coffee in hostel room.",
    postedDate: "1 day ago", condition: "Like New",
    brand: "Philips", warranty: "1 year remaining",
    pages: undefined, author: undefined, processor: undefined, ram: undefined, storage: undefined, battery: undefined,
    name: "Nikhil Verma", contact: "9823456791", email: "nikhil.verma@college.edu", location: "Hostel B, Room 112"
  },

  // ─── FURNITURE (43-45) ───────────────────────────────────────────
  {
    id: 43,
    title: "Ergonomic Study Chair",
    price: 8999,
    category: "Furniture",
    badge: "Furniture",
    image: "https://images.unsplash.com/photo-1589384267710-7a170981ca78?auto=format&fit=crop&w=800&q=80",
    description: "Adjustable ergonomic study chair with lumbar support, armrests and mesh back. Height adjustable, 360 degree swivel. Perfect for long study sessions. Used for 1 year, all mechanisms work.",
    postedDate: "3 days ago", condition: "Good",
    brand: "Green Soul", warranty: undefined,
    pages: undefined, author: undefined, processor: undefined, ram: undefined, storage: undefined, battery: undefined,
    name: "Sakshi Agarwal", contact: "9834567902", email: "sakshi.agarwal@college.edu", location: "Hostel C, Room 207"
  },
  {
    id: 44,
    title: "Folding Study Desk",
    price: 5999,
    category: "Furniture",
    badge: "Furniture",
    image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=800&q=80",
    description: "Compact folding study desk, 100x50cm tabletop, folds flat for storage. Steel frame, MDF top, scratch-resistant surface. Perfect for hostel rooms. Easy to assemble and disassemble.",
    postedDate: "5 days ago", condition: "Good",
    pages: undefined, author: undefined, processor: undefined, ram: undefined, storage: undefined, battery: undefined, brand: undefined, warranty: undefined,
    name: "Tushar Bhatia", contact: "9845678013", email: "tushar.bhatia@college.edu", location: "Hostel D, Room 405"
  },
  {
    id: 45,
    title: "Compact Bookshelf 4-Tier",
    price: 4499,
    category: "Furniture",
    badge: "Furniture",
    image: "https://images.unsplash.com/photo-1594620302200-9a762244a156?auto=format&fit=crop&w=800&q=80",
    description: "4-tier compact wooden bookshelf, 120cm tall. Fits perfectly in hostel rooms. Holds 80-100 books plus decorative items. Sturdy and stable. Disassembles easily for transport.",
    postedDate: "1 week ago", condition: "Good",
    pages: undefined, author: undefined, processor: undefined, ram: undefined, storage: undefined, battery: undefined, brand: undefined, warranty: undefined,
    name: "Deepak Yadav", contact: "9856789124", email: "deepak.yadav@college.edu", location: "Hostel E, Room 318"
  },

  // ─── CYCLES (46-48) ──────────────────────────────────────────────
  {
    id: 46,
    title: "Mountain Bike 21-Speed",
    price: 18999,
    category: "Cycles",
    badge: "Cycles",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80",
    description: "Hercules Roadeo A50 21-speed mountain bike. 26-inch wheels, front suspension fork, disc brakes. Serviced last month, all gears shifting smoothly. Chain and tyres in excellent condition.",
    postedDate: "2 days ago", condition: "Good",
    brand: "Hercules", warranty: undefined,
    pages: undefined, author: undefined, processor: undefined, ram: undefined, storage: undefined, battery: undefined,
    name: "Riya Kapoor", contact: "9867890235", email: "riya.kapoor@college.edu", location: "Hostel A, Room 120"
  },
  {
    id: 47,
    title: "Road Bike 10-Speed",
    price: 15999,
    category: "Cycles",
    badge: "Cycles",
    image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=800&q=80",
    description: "Firefox Road Runner Pro 10-speed road bike. Lightweight alloy frame, 700c wheels, drop handlebars. Great for commuting around campus. Used for 1.5 years, in working condition. Helmet included.",
    postedDate: "4 days ago", condition: "Good",
    brand: "Firefox", warranty: undefined,
    pages: undefined, author: undefined, processor: undefined, ram: undefined, storage: undefined, battery: undefined,
    name: "Aakash Patel", contact: "9878901346", email: "aakash.patel@college.edu", location: "Hostel B, Room 226"
  },
  {
    id: 48,
    title: "Commuter Bike Single Speed",
    price: 10999,
    category: "Cycles",
    badge: "Cycles",
    image: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?auto=format&fit=crop&w=800&q=80",
    description: "Single-speed urban commuter bike. Lightweight, simple to maintain. V-brakes, padded saddle, rear carrier for bags. Perfect for daily campus rides. Newly greased chain and inflated tyres.",
    postedDate: "6 days ago", condition: "Good",
    brand: "BSA", warranty: undefined,
    pages: undefined, author: undefined, processor: undefined, ram: undefined, storage: undefined, battery: undefined,
    name: "Shruti Mishra", contact: "9889012457", email: "shruti.mishra@college.edu", location: "Hostel C, Room 314"
  },

  // ─── PROJECTS (49-51) ────────────────────────────────────────────
  {
    id: 49,
    title: "Arduino Starter Kit",
    price: 3499,
    category: "Projects",
    badge: "Projects",
    image: "https://images.unsplash.com/photo-1553406830-ef2513450d76?auto=format&fit=crop&w=800&q=80",
    description: "Complete Arduino Uno starter kit with 30+ components: LEDs, resistors, capacitors, sensors, servo motor, LCD display, breadboard and jumper wires. Used for 1 project.",
    postedDate: "3 days ago", condition: "Like New",
    brand: "Arduino", warranty: undefined,
    pages: undefined, author: undefined, processor: undefined, ram: undefined, storage: undefined, battery: undefined,
    name: "Meera Krishnan", contact: "9890123568", email: "meera.krishnan@college.edu", location: "Hostel D, Room 411"
  },
  {
    id: 50,
    title: "Raspberry Pi 4 Kit",
    price: 5999,
    category: "Projects",
    badge: "Projects",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    description: "Raspberry Pi 4 Model B (4GB RAM) complete kit with official case, 32GB SD card preloaded with Raspberry Pi OS, power adapter, micro HDMI to HDMI cable and heatsinks.",
    postedDate: "1 day ago", condition: "Like New",
    processor: "Broadcom BCM2711", ram: "4GB", storage: "32GB SD card", battery: undefined, brand: "Raspberry Pi", warranty: undefined,
    pages: undefined, author: undefined,
    name: "Rohan Malik", contact: "9801234679", email: "rohan.malik@college.edu", location: "Hostel D, Room 502"
  },
  {
    id: 51,
    title: "Electronics Component Bundle",
    price: 2799,
    category: "Projects",
    badge: "Projects",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    description: "Large electronics component bundle: 200+ resistors, 50+ capacitors, 20+ transistors, various ICs, diodes, LEDs. Neatly organized in labeled compartment box.",
    postedDate: "5 days ago", condition: "Good",
    pages: undefined, author: undefined, processor: undefined, ram: undefined, storage: undefined, battery: undefined, brand: undefined, warranty: undefined,
    name: "Siddharth Rao", contact: "9812345790", email: "siddharth.rao@college.edu", location: "Hostel E, Room 115"
  },

  // ─── CODING RESOURCES (52-54) ────────────────────────────────────
  {
    id: 52,
    title: "Coding Course Certificate Bundle",
    price: 2999,
    category: "Coding Resources",
    badge: "Coding Resources",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80",
    description: "Bundle of 5 Udemy course login credentials (DSA, Web Dev, Python, SQL, React). All courses lifetime access, includes certificate of completion.",
    postedDate: "2 days ago", condition: "New",
    pages: undefined, author: undefined, processor: undefined, ram: undefined, storage: undefined, battery: undefined, brand: undefined, warranty: undefined,
    name: "Varun Kapoor", contact: "9823456901", email: "varun.kapoor@college.edu", location: "Hostel A, Room 418"
  },
  {
    id: 53,
    title: "Web Development Course Access",
    price: 3499,
    category: "Coding Resources",
    badge: "Coding Resources",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
    description: "Full-stack web development course access. 65+ hours covering HTML, CSS, JavaScript, React, Node.js, MongoDB and deployment. Includes projects, exercises and lifetime access.",
    postedDate: "4 days ago", condition: "New",
    pages: undefined, author: undefined, processor: undefined, ram: undefined, storage: undefined, battery: undefined, brand: undefined, warranty: undefined,
    name: "Raj Thakur", contact: "9834568012", email: "raj.thakur@college.edu", location: "Hostel B, Room 222"
  },
  {
    id: 54,
    title: "Python Programming Guide",
    price: 1999,
    category: "Coding Resources",
    badge: "Coding Resources",
    image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=800&q=80",
    description: "Python Crash Course by Eric Matthes - physical book. Covers Python basics to advanced projects. Excellent for beginners. Clean copy, no markings.",
    postedDate: "1 week ago", condition: "Like New",
    pages: 544, author: "Eric Matthes",
    processor: undefined, ram: undefined, storage: undefined, battery: undefined, brand: undefined, warranty: undefined,
    name: "Ishika Bansal", contact: "9845679123", email: "ishika.bansal@college.edu", location: "Hostel C, Room 308"
  },

  // ─── TUITION (55-57) ─────────────────────────────────────────────
  {
    id: 55,
    title: "Math Tuition Monthly Package",
    price: 4999,
    category: "Tuition",
    badge: "Tuition",
    image: "https://images.unsplash.com/photo-1509869175650-a1d97972541a?auto=format&fit=crop&w=800&q=80",
    description: "Monthly mathematics tuition by GATE qualified student. Covers Calculus, Linear Algebra, Probability and Discrete Math. 3 sessions per week, 1 hour each. Online and offline available.",
    postedDate: "1 day ago", condition: "New",
    pages: undefined, author: undefined, processor: undefined, ram: undefined, storage: undefined, battery: undefined, brand: undefined, warranty: undefined,
    name: "Harshit Jain", contact: "9856790234", email: "harshit.jain@college.edu", location: "Hostel D, Room 116"
  },
  {
    id: 56,
    title: "Physics Tutoring Sessions",
    price: 3999,
    category: "Tuition",
    badge: "Tuition",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80",
    description: "Physics tutoring by final year engineering student. Covers Mechanics, Electromagnetism, Optics and Modern Physics. Concept-focused teaching with lots of practice problems. 12 sessions per month.",
    postedDate: "3 days ago", condition: "New",
    pages: undefined, author: undefined, processor: undefined, ram: undefined, storage: undefined, battery: undefined, brand: undefined, warranty: undefined,
    name: "Tanvi Desai", contact: "9867891345", email: "tanvi.desai@college.edu", location: "Hostel E, Room 224"
  },
  {
    id: 57,
    title: "Chemistry Lab Assistance",
    price: 4499,
    category: "Tuition",
    badge: "Tuition",
    image: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&w=800&q=80",
    description: "Chemistry lab practical assistance and theory tuition. Covers inorganic, organic and physical chemistry. Lab record writing help also available. Monthly package.",
    postedDate: "5 days ago", condition: "New",
    pages: undefined, author: undefined, processor: undefined, ram: undefined, storage: undefined, battery: undefined, brand: undefined, warranty: undefined,
    name: "Mohit Saxena", contact: "9878902456", email: "mohit.saxena@college.edu", location: "Hostel A, Room 321"
  },

  // ─── SERVICES (58-60) ────────────────────────────────────────────
  {
    id: 58,
    title: "Assignment Writing Service",
    price: 2499,
    category: "Services",
    badge: "Services",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=80",
    description: "Professional assignment writing help for engineering, management and science subjects. Proper formatting, references and plagiarism-free content. Delivered on time.",
    postedDate: "2 days ago", condition: "New",
    pages: undefined, author: undefined, processor: undefined, ram: undefined, storage: undefined, battery: undefined, brand: undefined, warranty: undefined,
    name: "Gaurav Tiwari", contact: "9889013567", email: "gaurav.tiwari@college.edu", location: "Hostel B, Room 419"
  },
  {
    id: 59,
    title: "Project Guidance Service",
    price: 1999,
    category: "Services",
    badge: "Services",
    image: "https://images.unsplash.com/photo-1531538606174-0f90ff5dce83?auto=format&fit=crop&w=800&q=80",
    description: "End-to-end final year project guidance. Topic selection, literature review, implementation support, report writing and presentation preparation. CS/IT and Electronics domains.",
    postedDate: "4 days ago", condition: "New",
    pages: undefined, author: undefined, processor: undefined, ram: undefined, storage: undefined, battery: undefined, brand: undefined, warranty: undefined,
    name: "Naveen Kumar", contact: "9890124678", email: "naveen.kumar@college.edu", location: "Hostel C, Room 113"
  },
  {
    id: 60,
    title: "Notes Typing Service",
    price: 1499,
    category: "Services",
    badge: "Services",
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800&q=80",
    description: "Handwritten notes to digital PDF typing service. Neat formatting with headings, diagrams redone in clean format. Fast turnaround within 24-48 hours. Per subject pricing.",
    postedDate: "1 week ago", condition: "New",
    pages: undefined, author: undefined, processor: undefined, ram: undefined, storage: undefined, battery: undefined, brand: undefined, warranty: undefined,
    name: "Lavanya Iyer", contact: "9801235789", email: "lavanya.iyer@college.edu", location: "Hostel D, Room 209"
  },

  // ─── OTHERS (61-63) ──────────────────────────────────────────────
  {
    id: 61,
    title: "Vintage Watch Collector Item",
    price: 4999,
    category: "Others",
    badge: "Others",
    image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=800&q=80",
    description: "Vintage HMT mechanical wrist watch, self-winding. Keeps accurate time. Original leather strap, recently serviced. A rare collector piece in excellent working condition.",
    postedDate: "3 days ago", condition: "Good",
    brand: "HMT", warranty: undefined,
    pages: undefined, author: undefined, processor: undefined, ram: undefined, storage: undefined, battery: undefined,
    name: "Arjun Sharma", contact: "9812345670", email: "arjun.sharma@college.edu", location: "Hostel A, Room 101"
  },
  {
    id: 62,
    title: "Bluetooth Speaker Vintage",
    price: 2999,
    category: "Others",
    badge: "Others",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=800&q=80",
    description: "Retro design Bluetooth speaker with modern internals. Rich warm sound, 10-hour battery, FM radio, AUX and USB playback. Great conversation piece for hostel room. Works perfectly.",
    postedDate: "5 days ago", condition: "Good",
    battery: "10 hours", brand: undefined, warranty: undefined,
    pages: undefined, author: undefined, processor: undefined, ram: undefined, storage: undefined,
    name: "Priya Patel", contact: "9823456781", email: "priya.patel@college.edu", location: "Hostel B, Room 204"
  },
  {
    id: 63,
    title: "Portable Power Bank 50000mah",
    price: 3499,
    category: "Others",
    badge: "Others",
    image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?auto=format&fit=crop&w=800&q=80",
    description: "High-capacity 50000mAh power bank with 3 USB outputs and 1 Type-C port. Can charge laptop, phone and tablet simultaneously. Built-in LED flashlight.",
    postedDate: "1 day ago", condition: "Like New",
    battery: "50000 mAh", brand: undefined, warranty: undefined,
    pages: undefined, author: undefined, processor: undefined, ram: undefined, storage: undefined,
    name: "Rahul Mehta", contact: "9834567892", email: "rahul.mehta@college.edu", location: "Hostel C, Room 312"
  }

];

export default productsData;