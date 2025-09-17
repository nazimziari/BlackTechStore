console.log("🚀 Script starting...");

// This will help us find the .env.local file
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env.local') });

const { MongoClient } = require('mongodb');

const sampleProducts = [
  // ... (The sampleProducts array is the same as before, no need to copy it again if you have it)
  // If the file is empty, copy the array from our previous messages.
  {
    name: 'PC Gamer "Shadow"',
    description: 'Un PC gamer puissant, reconditionné pour des performances maximales en 1440p. Idéal pour les jeux AAA.',
    price: 160000,
    category: 'PCs',
    type: 'gamer',
    condition: 'Comme neuf',
    images: ['/images/gaming-pc.png'],
    stock: 3,
    isOnPromotion: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'HP EliteBook 840 G5',
    description: 'Un ultrabook professionnel, parfait pour le travail de bureau et la navigation. Léger et fiable.',
    price: 65000,
    category: 'PCs',
    type: 'burautique',
    condition: 'Bon',
    images: ['/images/hp-elitebook.png'],
    stock: 8,
    isOnPromotion: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Clavier Mécanique Keychron K2',
    description: 'Clavier mécanique sans fil, format 75%. Idéal pour le gaming et la productivité.',
    price: 12000,
    category: 'Accessories',
    condition: 'Execellent',
    images: ['/images/keychron-k2.png'],
    stock: 15,
    isOnPromotion: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Écran Dell 24" Full HD',
    description: "Moniteur de bureau avec une excellente colorimétrie. L'écran a une petite égratignure non visible une fois allumé.",
    price: 15000,
    category: 'Accessories',
    condition: 'fonctionelle avec default',
    images: ['/images/dell-monitor.png'],
    stock: 7,
    isOnPromotion: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  }
];

async function seedDB() {
  const uri = process.env.MONGODB_URI;

  // New check to see if the environment variable was loaded
  if (!uri) {
    console.error("❌ Error: MONGODB_URI not found.");
    console.error("Please ensure you have a .env.local file in the root directory with the MONGODB_URI variable.");
    process.exit(1);
  }
  
  // Let's log the URI to be sure it's correct (partially hidden for security)
  console.log(`🔍 Connecting to database URI: ${uri.substring(0, 25)}...`);

  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("✅ Connected to database successfully!");

    const database = client.db();
    const productsCollection = database.collection('products');

    console.log("🔥 Deleting existing products...");
    const deleteResult = await productsCollection.deleteMany({});
    console.log(`   - Deleted ${deleteResult.deletedCount} products.`);

    console.log("🌱 Inserting new sample products...");
    const insertResult = await productsCollection.insertMany(sampleProducts);
    console.log(`✅ Successfully inserted ${insertResult.insertedCount} products.`);

  } catch (err) {
    // This will now catch and print ANY connection or insertion error
    console.error("❌ DATABASE ERROR:", err);
  } finally {
    await client.close();
    console.log("👋 Database connection closed.");
  }
}

// Call the function
seedDB();