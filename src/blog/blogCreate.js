import fs from "fs";

function blogCreate(req, res) {
    try {
        const { title, content } = req.body;

        if (!title || !content) {
            return res.status(400).send("Title and content are required");
        }

        let posts = [];
        if (fs.existsSync("posts.json")) {
            posts = JSON.parse(fs.readFileSync("posts.json", "utf-8"));
        }

        const newPost = { id: Date.now(), title, content };
        posts.push(newPost);

        fs.writeFileSync("posts.json", JSON.stringify(posts, null, 2));
        res.redirect("/blog");
    } catch(error) {
        console.log(error);
        res.status(500).send("Internal Server Error!");
    }
}

export default blogCreate;