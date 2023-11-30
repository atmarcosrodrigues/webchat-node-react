const mongoose = require("mongoose");

const mongooseConnect = () => {
  mongoose
    .connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("DB Connetion Successfull");
    })
    .catch((err) => {
      console.log(err.message);
    });
};

const mongooseCloseConnection = () => {
  mongoose.connection.close();
};

module.exports = {
  mongooseConnect,
  mongooseCloseConnection,
};
