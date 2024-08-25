const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());



app.get("/bfhl", (req, res) => {
  res.status(200).json({
    operation_code: 1,
  });
});

app.post("/bfhl", (req, res) => {
  const { data } = req.body;

  if (!data || !Array.isArray(data)) {
    return res.status(400).json({
      is_success: false,
      message: "Invalid input format",
    });
  }

  let numbers = [];
  let alphabets = [];
  let highestLowercaseAlphabet = "";

  data.forEach((item) => {
    if (!isNaN(item)) {
      numbers.push(item);
    } else if (typeof item === "string" && item.length === 1) {
      alphabets.push(item);
      if (item >= "a" && item <= "z" && item > highestLowercaseAlphabet) {
        highestLowercaseAlphabet = item;
      }
    }
  });

  res.status(200).json({
    is_success: true,
    user_id: "Mayank_Manoj_Gupta_19012002", // Replace with actual logic to generate user ID
    email: "mayankmanoj.gupta2021@vitstudent.ac.in", // Replace with actual email
    roll_number: "21BCE5800", // Replace with actual roll number
    numbers: numbers,
    alphabets: alphabets,
    highest_lowercase_alphabet: highestLowercaseAlphabet
      ? [highestLowercaseAlphabet]
      : [],
  });
});

// default route
app.get("/",(req,res)=>{
    return res.json({
        success:true, 
        message:"BFHL Server is up and running..."
    });
})


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});