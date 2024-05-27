import { connect } from "mongoose";

const dbConnection = () => {
  connect(process.env.DB_URL)
    .then(() => console.log("Database is connected"))
    .catch((error) => console.log(error));
};

export default dbConnection;
