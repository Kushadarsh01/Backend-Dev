import fs from "fs";

function updateAuthor(req, res) {
    try {
        const {
            id
        } = req.params;

        const {
            name,
            country
        } = req.body;

        if (!fs.existsSync("authors.json")) {
            return res.status(404).send("No authors found");
        }

        const data = JSON.parse(fs.readFileSync("authors.json", "utf-8"));
        const authorIndex = data.findIndex((value) => value.authorId == id);

        if (authorIndex === -1) {
            return res.status(404).send("Author not found");
        }

        if (name) data[authorIndex].name = name;
        if (country) data[authorIndex].country = country;

        fs.writeFileSync("authors.json", JSON.stringify(data, null, 2));
        res.status(200).send("Author updated sucessfully.");
    }

    catch(error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
}

export default updateAuthor;