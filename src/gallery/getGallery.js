import fs from "fs";

function getGallery(req, res) {
    try {
        if (!fs.existsSync("public/images")) {
            fs.mkdirSync("public/images", { recursive: true });
        }
        
        const images = fs.readdirSync("public/images");
        res.render("gallery", { images });
    } catch(error) {
        console.log(error);
        res.status(500).send("Internal Server Error!");
    }
}

export default getGallery;