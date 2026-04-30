import fs from "fs";

function deleteBook(req, res) {
    try {
        const {
            id
        } = req.params;

        if (!fs.existsSync("books.json")) {
            return res.status(404).send("No books found");
        }

        const data = JSON.parse(fs.readFileSync("books.json", "utf-8"));
        const filteredData = data.filter((value) => value.bookId != id);

        if (data.length === filteredData.length) {
            return res.status(404).send("Book not found");
        }

        fs.writeFileSync("books.json", JSON.stringify(filteredData, null, 2));
        res.status(200).send("Book deleted sucessfully.");
    }

    catch(error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
}

export default deleteBook;