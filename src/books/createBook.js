import fs from "fs";

function createBook(req, res) {
    try {
        const {
            title,
            author,
            year
        } = req.body;

        if (!title || !author || !year) {
            return res.status(400).send("Title, author and year are required!");
        }
        
        let book = [];

        if (fs.existsSync("books.json")) {
            const data = JSON.parse(fs.readFileSync("books.json", "utf-8"));
            const isBook = data.find((value) => value.title === title && value.author === author);

            if(isBook) {
                return res.status(409).send("Book already exists");
            }

            book = data;
        }

        const newBook = {
            bookId: Date.now(),
            title,
            author,
            year
        }

        book.push(newBook);
        fs.writeFileSync("books.json", JSON.stringify(book, null, 2));
        res.status(200).send("Book added sucessfully.");
    }

    catch(error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
}

export default createBook;