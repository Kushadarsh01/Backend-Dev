import fs from "fs";

function filterBook(req, res) {
    try {
        const {
            author,
            year
        } = req.query;

        if (!fs.existsSync("books.json")) {
            return res.status(404).send("No books found!");
        }

        const data = fs.readFileSync("books.json", "utf-8");
        let books = JSON.parse(data);

        if (author) {
            books = books.filter((value) => value.author.toLowerCase() === author.toLowerCase());
        }

        if (year) {
            books = books.filter((value) => value.year === year);
        }

        res.status(200).json(books);
    }
    catch(error) {
        console.log(error);
        res.status(500).send("Internal server error at filtering books.");
    }
}

export default filterBook;