import fs from "fs";

function getAuthor(req, res) {
    try {
        if (!fs.existsSync("authors.json")) {
            return res.status(404).send("No authors found");
        }

        const data = fs.readFileSync("authors.json", "utf-8");
        const authors = JSON.parse(data);

        res.status(200).json(authors);
    }

    catch(error) {
        console.log(error);
        res.status(500).send("Internal server error.");
    }
}

export default getAuthor;