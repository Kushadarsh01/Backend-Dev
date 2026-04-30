import fs from "fs";

function getBookById(req, res) {
    try {
        const {
            id
        } = req.params;

        if (!fs.existsSync("books.json")) {
            return res.status(404).send("No books found");
        }

        const data = JSON.parse(fs.readFileSync("books.json", "utf-8"));
        const isBook = data.find((value) => value.bookId == id);

        if (!isBook) {
            return res.status(404).send("Book not found");
        }

        res.status(200).json(isBook);
    }

    catch(error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
}

export default getBookById;