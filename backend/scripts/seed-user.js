const { connection } = require("../src/db/connection");
const users = require("../src/db/users/users");

(async function() {
  try {
    const res = await users.createUserWithAddress(
      { name: "Samuel Example", username: "sam", email: "sam@example.com", phone: "0800-111" },
      { street: "10 Main St", suite: "Suite 2", city: "Lagos", zipcode: "100001" }
    );
    console.log("Inserted user with ids:", res);
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
