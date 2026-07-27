const mongoose = require('mongoose');

const MONGO_URI = 'mongodb+srv://daniyalr358_db_user:Danial12345@e-commerce.dgllpdo.mongodb.net/sovereign-store?retryWrites=true&w=majority&appName=E-Commerce';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { 
    type: String, 
    required: true, 
    enum: ['Apparel', 'Accessories', 'Audio', 'Electronics', 'Home & Kitchen'] 
  },
  image: { type: String, required: true },
  countInStock: { type: Number, required: true, default: 10 }
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

const seedProducts = [
  // Retained Working Products
  {
    name: 'Lunar Flow Runner',
    category: 'Apparel',
    description: 'Breathable knit runner with responsive cushioning for everyday motion.',
    price: 129,
    countInStock: 15,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Apex Trail Boot',
    category: 'Apparel',
    description: 'Rugged waterproof boot designed for rugged terrains and outdoor treks.',
    price: 210,
    countInStock: 10,
    image: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Velvet Evening Slip-On',
    category: 'Apparel',
    description: 'Luxurious velvet loafers featuring subtle satin trim.',
    price: 145,
    countInStock: 12,
    image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Urban Canvas Sneaker',
    category: 'Apparel',
    description: 'Minimalist low-top canvas shoe with reinforced vulcanized rubber sole.',
    price: 85,
    countInStock: 20,
    image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Velocity Cross-Trainer',
    category: 'Apparel',
    description: 'High-stability athletic trainers built for intense workouts.',
    price: 135,
    countInStock: 14,
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Heritage Suede Chelsea Boot',
    category: 'Apparel',
    description: 'Classic elastic-gored ankle boots in supple brushed suede.',
    price: 175,
    countInStock: 9,
    image: 'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Cloud Step Slides',
    category: 'Apparel',
    description: 'Ultra-cushioned ergonomic pool slides for post-workout recovery.',
    price: 45,
    countInStock: 25,
    image: 'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Aurora Knit Jacket',
    category: 'Apparel',
    description: 'Soft structural knit jacket with a refined silhouette and clean lines.',
    price: 148,
    countInStock: 10,
    image: 'https://images.unsplash.com/photo-1495105787522-5334e3ffa0ef?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Cashmere Blend Turtleneck',
    category: 'Apparel',
    description: 'Warm, lightweight cashmere blend sweater tailored for sharp layering.',
    price: 160,
    countInStock: 12,
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Tailored Wool Overcoat',
    category: 'Apparel',
    description: 'Double-breasted Italian wool blend coat designed for cold weather sophistication.',
    price: 299,
    countInStock: 5,
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Essential Organic Cotton Tee',
    category: 'Apparel',
    description: 'Heavyweight organic cotton crewneck tee with a structured drape.',
    price: 40,
    countInStock: 30,
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Pleated Linen Trousers',
    category: 'Apparel',
    description: 'Breathable relaxed-fit trousers made from pure European linen.',
    price: 110,
    countInStock: 11,
    image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Raw Selvedge Denim Jeans',
    category: 'Apparel',
    description: 'Unwashed rigid Japanese selvedge denim built to mold to your wear.',
    price: 155,
    countInStock: 15,
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Merino Wool Cardigan',
    category: 'Apparel',
    description: 'Fine-gauge merino wool button-down cardigan with horn buttons.',
    price: 130,
    countInStock: 8,
    image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Waterproof Utility Parka',
    category: 'Apparel',
    description: 'Functional hooded parka featuring deep utility pockets and sealed seams.',
    price: 240,
    countInStock: 7,
    image: 'https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Solstice Travel Tote',
    category: 'Accessories',
    description: 'Structured leather-trimmed tote with generous interior storage and compartments.',
    price: 116,
    countInStock: 10,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Chronos Minimalist Watch',
    category: 'Accessories',
    description: 'Stainless steel case with sapphire crystal glass and genuine leather strap.',
    price: 195,
    countInStock: 12,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Obsidian Wayfarer Sunglasses',
    category: 'Accessories',
    description: 'Handmade acetate frames with polarized UV400 gradient lenses.',
    price: 125,
    countInStock: 18,
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Bifold Leather Wallet',
    category: 'Accessories',
    description: 'Slim vegetable-tanned leather wallet with RFID-blocking technology.',
    price: 65,
    countInStock: 22,
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Silk Geometric Pocket Square',
    category: 'Accessories',
    description: '100% pure Italian silk pocket square featuring a modern geometric print.',
    price: 45,
    countInStock: 15,
    image: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Nomad Leather Backpack',
    category: 'Accessories',
    description: 'Full-grain leather backpack with a padded laptop compartment for daily travel.',
    price: 260,
    countInStock: 6,
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Cashmere Winter Scarf',
    category: 'Accessories',
    description: 'Supremely soft fringed winter scarf woven from pure Mongolian cashmere.',
    price: 90,
    countInStock: 14,
    image: 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Aether Wireless ANC Headphones',
    category: 'Audio',
    description: 'High-fidelity active noise-canceling headphones with 40-hour battery life.',
    price: 299,
    countInStock: 10,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Smart Fitness Tracker',
    category: 'Electronics',
    description: 'Track your heart rate, sleep metrics, and daily activity steps effortlessly.',
    price: 99,
    countInStock: 25,
    image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Pulse Pro Portable Speaker',
    category: 'Audio',
    description: 'Compact waterproof bluetooth speaker delivering deep bass and 360 sound.',
    price: 130,
    countInStock: 12,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Mechanical Gaming Keyboard',
    category: 'Electronics',
    description: 'RGB backlit mechanical keyboard featuring tactile switches and customizable macros.',
    price: 140,
    countInStock: 15,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80'
  },

  // Replacement Products (Without Executive Metal Desk Lamp)
  {
    name: 'Studio Monitor Speakers',
    category: 'Audio',
    description: 'High-clarity desktop studio monitors with balanced acoustic response.',
    price: 220,
    countInStock: 8,
    image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Ergonomic Vertical Mouse',
    category: 'Electronics',
    description: 'Advanced wireless ergonomic mouse designed to reduce wrist strain during long sessions.',
    price: 59,
    countInStock: 19,
    image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Vintage Brass Desk Clock',
    category: 'Home & Kitchen',
    description: 'Classic analog timepiece crafted from polished solid brass.',
    price: 50,
    countInStock: 12,
    image: 'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Ultra HD Webcam 4K',
    category: 'Electronics',
    description: 'Crystal-clear high-definition web camera with built-in dual noise-canceling mics.',
    price: 110,
    countInStock: 15,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Handcrafted Ceramic Mug Set',
    category: 'Home & Kitchen',
    description: 'Set of two artisan glazed ceramic coffee mugs for your morning brew.',
    price: 35,
    countInStock: 25,
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Active Noise-Canceling Earbuds',
    category: 'Audio',
    description: 'True wireless earbuds featuring immersive sound profiles and transparency mode.',
    price: 169,
    countInStock: 16,
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Minimalist Leather Desk Mat',
    category: 'Accessories',
    description: 'Protective full-grain leather desk pad for a smooth mouse glide and clean workspace.',
    price: 55,
    countInStock: 20,
    image: 'https://images.unsplash.com/photo-1616440347437-b1c73416efc2?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Smart Ambient Light Bar',
    category: 'Home & Kitchen',
    description: 'Syncable RGB LED light bars designed to enhance entertainment and desk setups.',
    price: 85,
    countInStock: 11,
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Type-C Multi-Port Hub',
    category: 'Electronics',
    description: 'All-in-one aluminum USB-C adapter featuring 4K HDMI, USB 3.0, and Power Delivery.',
    price: 65,
    countInStock: 22,
    image: 'https://images.unsplash.com/photo-1544652478-6653e09f18a2?auto=format&fit=crop&w=600&q=80'
  }
];

async function seedDB() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB Atlas successfully...');

    await Product.deleteMany({});
    console.log('Cleared existing products.');

    await Product.insertMany(seedProducts);
    console.log(`Successfully seeded ${seedProducts.length} products into Sovereign Store!`);

    mongoose.connection.close();
  } catch (err) {
    console.error('Error seeding database:', err);
    mongoose.connection.close();
  }
}

seedDB();