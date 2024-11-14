const express = require("express")
const router = express.Router()
const {handleGenerateNewShortURL,handleTotalClicks} = require("../controllers/user")


router.post("/",handleGenerateNewShortURL) // in this /url is prefixed

router.get("/analytics/:shortid" , handleTotalClicks)
module.exports = router