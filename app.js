const mongoose = require("mongoose");
const validator = require("validator");


mongoose.connect("mongodb://localhost:27017/Drsudhir").then(()=> console.log("connection successfull...")).catch((err) => console.log(err));

const playlistSchema = new mongoose.Schema({
    name:{
        type:String,
        required : true,
        unique: true,
    },
    ctype:{
        type: String,
        required : true,
        lowercase:true,
        enum:["frontend","backend", "database"]

    },
    videos:{
        type:Number,
        validation(value){
            if(value < 0){
                throw new Error("vidos count should be greater than 0");
            }
        }

    } ,
    author:String,
    email:{
        type: String,
        required: true,
        unigue: true,
        validator(value){
            if(validator.isEmail(value)){
                throw new Error("Email is invalid");
            }
        }
    },
    active:Boolean,
    date:{
        type:Date,
        default: Date.now
    }
})

// CURD
//collection creation
const Playlist = new mongoose.model("Playlist",playlistSchema);
// Create document or insert

const createDocument = async () => {
    try{
        const jsPlaylist = new Playlist({
            name: "Node Js",
            ctype: "backend",
            videos: 50,
            author: "CoderArtist",
            active: true
        })
        const mongoplaylist = new Playlist({
            name: "Node Js",
            ctype: "backend",
            videos: 50,
            author: "CoderArtist",
            active: true
        })
        // reactPlaylist.save()
        // for storing one document
        // const result = await reactPlaylist.save();
        // console.log(result);
        // for storing more than one document
        const result = await Playlist.insertMany([jsPlaylist,mongoplaylist])

    }catch(err){
        console.log(err);
    }
    

}

// createDocument();

// to read
// const getDocument = async () =>{
//     // const result = await Playlist.find();
//     // const result = await Playlist.find({ctype: {$gte :50}})
//     // .select({name:1})
//     // .limit(1);
//     // console.log(result)
//     const result = await Playlist.find({$and : [{ctype:"backend"}, {author:"CoderArtist"}]})
//     .select({name:1})
//     .countDocuments();
//     console.log(result);
// }

// getDocument();


// update the document
// const updateDocument = async (id) =>{
//     // const result = await Playlist.updateOne({_id : id},{
//     const result = await Playlist.findByIdAndUpdate({_id : id},{
//         $set : {
//             name : "javaAdru"
//         }
//     },{
//         new:true
//     });

//     console.log(result)
// }

// updateDocument("640c721094d08de64f4167d6")

// delete the document 
const deleteDocument = async (id) =>{
    // const result = await Playlist.deleteOne({_id : id});
    const result = await Playlist.findByIdAndDelete({_id : id});
    console.log(result);

}

deleteDocument("640c69c27482b3473a98ea56")