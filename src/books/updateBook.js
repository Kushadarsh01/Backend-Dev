import fs from "fs";

function updateBook(req, res) {
    try {
        const {
            id
        } = req.params;

        const {
            title,
            author,
            year
        } = req.body;

        if (!fs.existsSync("books.json")) {
            return res.status(404).send("No books found");
        }

        const data = JSON.parse(fs.readFileSync("books.json", "utf-8"));
        const bookIndex = data.findIndex((value) => value.bookId == id);

        if (bookIndex === -1) {
            return res.status(404).send("Book not found");
        }

        if (title) data[bookIndex].title = title;
        if (author) data[bookIndex].author = author;
        if (year) data[bookIndex].year = year;

        fs.writeFileSync("books.json", JSON.stringify(data, null, 2));
        res.status(200).send("Book updated sucessfully.");
    }

    catch(error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
}

export default updateBook;