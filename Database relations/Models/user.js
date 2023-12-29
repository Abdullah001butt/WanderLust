const mongoose = require("mongoose");
const { Schema } = require("mongoose");

main()
  .then(() => console.log("connection was succesful"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/relationDemo");
}

const userSchema = new Schema({
  username: String,
  address: [
    {
      _id: false,
      location: String,
      city: String,
    },
  ],
});

const User = mongoose.model("User", userSchema);

const addUsers = async () => {
  let user1 = new User({
    username: "sherlockholam",
    addresses: [
      {
        location: "221B Baker Street",
        city: "London",
      },
    ],
  });

  user1.address.push({ location: "P32 Wallstreet", city: "London" });
  let result = await user1.save();
  console.log(result);
};

addUsers();
