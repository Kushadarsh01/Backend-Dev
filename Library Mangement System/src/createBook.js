import fs from 'fs'

function createBook(bookId, title, author, price) {
    try {
        let books = [];
        let ob = {
            bookId,
            title,
            author,
            price
        }
        if(fs.existsSync("books.json")) {
            let data = JSON.parse(fs.readFileSync("books.json", "utf-8"));
            let isbook = data.some((value) => value.title === title);
            if (isbook){
                return "book exists"
            }
            books = data;
        }
        books.push(ob);
        fs.writeFileSync("books.json", JSON.stringify(books, null, 2));
        console.log("Book added to database sucessfully");
    }
    catch(error) {
        console.log("Error creating books");
        console.log(error);
    }
}

export default createBook;