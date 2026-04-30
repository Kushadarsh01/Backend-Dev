import fs from "fs";

function getAuthorById(req, res) {
    try {
        const {
            id
        } = req.params;

        if (!fs.existsSync("authors.json")) {
            return res.status(404).send("No authors found");
        }

        const data = JSON.parse(fs.readFileSync("authors.json", "utf-8"));
        const isAuthor = data.find((value) => value.authorId == id);

        if (!isAuthor) {
            return res.status(404).send("Author not found");
        }

        res.status(200).json(isAuthor);
    }

    catch(error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
}

export default getAuthorById;