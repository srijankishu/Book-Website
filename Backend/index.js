const express = require('express');
const mongoose = require('mongoose'); // Import mongoose
const app = express();
const port = 4002;

const URI = 'mongodb+srv://srijan123:Srijan%401234@cluster0.le5bi.mongodb.net/bookstore?retryWrites=true&w=majority&appName=Cluster0';

async function connectToDB() {
  try {
    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.log("Error", error);
  }
}

// Call the function to connect to the database
connectToDB();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
