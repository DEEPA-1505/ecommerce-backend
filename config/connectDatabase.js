// const mongoose = require('mongoose');



// const connectDatabase = () => {
//     mongoose.connect(process.env.DB_URL).then((con) => {
//         console.log('MongoDB connected to host: '+con.connection.host)
//     })

// };

// module.exports = connectDatabase;

const mongoose = require('mongoose');

const connectDatabase = async () => {
  try {
    const con = await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB connected to host: ' + con.connection.host);
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  }
};

module.exports = connectDatabase;