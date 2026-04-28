import fs from "fs";

function blogList(req, res) {
    try {
        let posts = [];
        if (fs.existsSync("posts.json")) {
            posts = JSON.parse(fs.readFileSync("posts.json", "utf-8"));
        }
        res.render("blog", { posts });
    } catch(error) {
        console.log(error);
        res.status(500).send("Internal Server Error!");
    }
}

export default blogList;