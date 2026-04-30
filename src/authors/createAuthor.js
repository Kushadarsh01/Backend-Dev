import fs from "fs";

function createAuthor(req, res) {
    try {
        const {
            name,
            country
        } = req.body;

        if (!name || !country) {
            return res.status(400).send("Name and country are required");
        }
        
        let author = [];

        if (fs.existsSync("authors.json")) {
            const data = JSON.parse(fs.readFileSync("authors.json", "utf-8"));
            const isAuthor = data.find((value) => value.name === name);

            if(isAuthor) {
                return res.status(409).send("Author already exists");
            }

            author = data;
        }

        const newAuthor = {
            authorId: Date.now(),
            name,
            country
        }

        author.push(newAuthor);
        fs.writeFileSync("authors.json", JSON.stringify(author, null, 2));
        res.status(200).send("Author added sucessfully.");
    }

    catch(error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
}

export default createAuthor;