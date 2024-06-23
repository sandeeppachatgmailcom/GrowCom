import mongoD from "mongoose";
 

class MongoDB {
    constructor() {
        const link = "mongodb+srv://sandeeppachat:w6yGtOSj60IeUvXk@cluster0.s4hqvyg.mongodb.net/mong?retryWrites=true&w=majority";
      //  const link = 'mongodb://127.0.0.1:27017/mong'
        mongoD.connect(link)
            .then(() => {
                console.log("Connected to MongoDB");
            })
            .catch((error) => {
                console.error("Error connecting to MongoDB:", error);
            });
    }
}

export default MongoDB;

// ZjaTYjiSj6wni0Ts