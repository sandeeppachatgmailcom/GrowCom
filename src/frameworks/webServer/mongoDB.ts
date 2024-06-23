import mongoD from "mongoose";
 

class MongoDB {
    constructor() {
        const link = "mongodb+srv://sandeeppachat:ZjaTYjiSj6wni0Ts@manGrow.ofsqurd.mongodb.net/mong?retryWrites=true&w=majority&appName=manGrow";
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