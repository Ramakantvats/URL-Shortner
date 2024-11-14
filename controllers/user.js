const UserModel = require("../models/user");
const shortID = require("shortid")
async function handleGenerateNewShortURL (req,res){
    const shortid = shortID()
    const body = req.body
    if(!body.url){return res.status(400).json({msg:"No url found"})}

   await UserModel.create({
        shortId : shortid,
        redirectURL : body.url,
        visitHistory :[],
    })
    return res.render("url-shortner",{
        id:shortid,
        url: body.url
    })
}

async function handleTotalClicks(req,res){
    const shortId = req.params.shortid
    const result = await UserModel.findOne({shortId})

    return res.json({totalClick:result.visitHistory.length,
        analytics:result.visitHistory
    })
}

module.exports = {handleGenerateNewShortURL,
    handleTotalClicks
}