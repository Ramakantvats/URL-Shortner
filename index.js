const express = require("express")
const Router = require("./routes/user")
const connectMongodb = require("./connections")
const User = require("./models/user") 
const path = require("path")
const app = express()
app.use(express.json()) // using to extract body coming from the fronted as input
app.use(express.urlencoded({extended:false}))
const PORT = 8001

app.set("view engine" , "ejs" )
app.set("views" , path.resolve("./views"))

app.use(express.static(path.resolve("./views")))
// app.use(express.static(path.join(__dirname,"views")))
// app.use("./style.css" , express.static(path.join(__dirname,"views" , "style.css")))

// Creating routes(middlewares)

// This line tells Express to use the Router object (imported from routes/user.js) as middleware. It means that any routes defined within Router will be prefixed with /url.
//Note- app.use("/url", Router):-

app.get("/",(req,res)=>{
    return res.render("url-shortner")
})

// This is for creating short-URL
app.use("/url" , Router) 

// Creating route to redirect on the original url
app.get("/:shortid" , async(req,res)=>{ //Note-> we are using app.get instead of app.use because app.use doesn't pass the query parameters to further routes
    const shortId = req.params.shortid
    console.log(shortId) // ADiKjkUOC
    const entry = await User.findOneAndUpdate(
        {shortId},

        {$push:{ //$push: This is a MongoDB update operator. It is used to add (or "push") a new item to an existing array field in a document. If the array field doesn't exist, MongoDB will create it.
            visitHistory:{
                timestamp:Date.now()
            },
    },
}
)
try{
    console.log(entry.redirectURL)
    res.redirect(entry.redirectURL)
}catch(error){
    return res.json({msg:"Your shortid is wrong! Plz fill right shortID"})
}
})

// Making connection
connectMongodb("mongodb://127.0.0.1:27017/short-ID").then(()=>{
    console.log("MongoDB connected")
}).catch((err)=>console.log(err))


// request will listen on this port
app.listen(PORT,()=>{
    console.log("Server started at port " , PORT)
})
