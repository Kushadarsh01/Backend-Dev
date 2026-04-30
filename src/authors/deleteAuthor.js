import fs from "fs";

function deleteAuthor(req, res) {
    try {
        const {
            id
        } = req.params;

        if (!fs.existsSync("authors.json")) {
            return res.status(404).send("No authors found");
        }

        const data = JSON.parse(fs.readFileSync("authors.json", "utf-8"));
        const filteredData = data.filter((value) => value.authorId != id);

        if (data.length === filteredData.length) {
            return res.status(404).send("Author not found");
        }

        fs.writeFileSync("authors.json", JSON.stringify(filteredData, null, 2));
        res.status(200).send("Author deleted sucessfully.");
    }

    catch(error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
}

export default deleteAuthor;