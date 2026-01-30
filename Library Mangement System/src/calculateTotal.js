import fs from "fs"

function calculateTotal(memberId) {
    try{
        if (!fs.existsSync("borrowRecord.json") || !fs.existsSync("books.json")) {
            return 0;
        }

        let borrowData = JSON.parse(fs.readFileSync("borrowRecord.json", "utf-8"));
        let books = JSON.parse(fs.readFileSync("books.json", "utf-8"));

        let total = 0;
        borrowData.forEach(record => {
            if (record.memberId === memberId && record.bookIds) {
                record.bookIds.forEach(borrowedBookId => {
                    let book = books.find((value) => value.bookId === borrowedBookId);
                    if (book) {
                        total += Number(book.price);
                    }
                });
            }
        });

        return total;
    }

    catch(error) {
        console.log("Error calculating total");
        console.log(error);
    }
    
}

export default calculateTotal;