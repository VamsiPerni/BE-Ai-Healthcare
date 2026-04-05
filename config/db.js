const mongoose = require("mongoose");

mongoose
    .connect(process.env.MONGO_DB_URL, {
        dbName: "aarogyaai",
    })
    .then(() => {
        console.log("--------🟢 DB CONNECTED---------");
    })
    .catch((err) => {
        console.log("\n-------🔴 DB Connection Error------\n");
        console.log(err.message);
        console.log("--------------------------------");
        process.exit(1);
    });
