import fs from "fs";

function blogView(req, res) {
    try {
        const { id } = req.params;
        
        if (!fs.existsSync("posts.json")) {
            return res.status(404).render("404");
        }

        const posts = JSON.parse(fs.readFileSync("posts.json", "utf-8"));
        const post = posts.find((p) => p.id == id);

        if (!post) {
            return res.status(404).render("404");
        }

        res.render("post", { post });
    } catch(error) {
        console.log(error);
        res.status(500).send("Internal Server Error!");
    }
}

export default blogView;