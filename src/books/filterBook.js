import fs from "fs";

function filterBook(req, res) {
    try {
        const {
            author,
            year,
            title,
            page = 1,
            limit = 10
        } = req.query;

        if (!fs.existsSync("books.json")) {
            return res.status(404).send("No books found");
        }

        const data = fs.readFileSync("books.json", "utf-8");
        let books = JSON.parse(data);

        if (author) {
            books = books.filter((value) => value.author.toLowerCase().includes(author.toLowerCase()));
        }

        if (year) {
            books = books.filter((value) => value.year == year);
        }

        if (title) {
            books = books.filter((value) => value.title.toLowerCase().includes(title.toLowerCase()));
        }

        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        books = books.slice(startIndex, endIndex);

        res.status(200).json(books);
    }

    catch(error) {
        console.log(error);
        res.status(500).send("Internal server error at filtering books.");
    }
}

export default filterBook;