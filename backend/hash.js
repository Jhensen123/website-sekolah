const bcrypt = require("bcrypt");

// 🔥 GANTI PASSWORD DI SINI
const password = "admin123";

const saltRounds = 10;

bcrypt.hash(password, saltRounds)
  .then(hash => {
    console.log("Password asli :", password);
    console.log("Hash bcrypt   :", hash);
  })
  .catch(err => {
    console.error("Error hashing:", err);
  });