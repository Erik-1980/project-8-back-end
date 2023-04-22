const express = require("express");
const app = express();
const port = 5000;
const cors = require('cors');

const authRoutes = require("./routes/authRoute");
const cartRoutes = require("./routes/cartRoute");
const productRoutes = require("./routes/productRoute");
const userRoutes = require("./routes/userRoute");


app.use(express.json());
app.use(cors());

app.use("/auth", authRoutes);
app.use("/cart", cartRoutes);
app.use("/product", productRoutes);
app.use("/user", userRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(port, () => console.log(`Server listening on port ${port}!`));