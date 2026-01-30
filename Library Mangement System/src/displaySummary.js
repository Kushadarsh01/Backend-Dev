import fs from "fs"
import calculateTotal from "./calculateTotal.js"
import applyDiscount from "./applyDiscount.js"

function displaySummary(memberId, lateFine) {
    try{
        if (
            !fs.existsSync("members.json") ||
            !fs.existsSync("borrowRecord.json") ||
            !fs.existsSync("books.json")
        ) {
            console.log("Required files missing.");
            return;
        }

        let members = JSON.parse(fs.readFileSync("members.json", "utf-8"));
        let borrowRecords = JSON.parse(fs.readFileSync("borrowRecord.json", "utf-8"));
        let books = JSON.parse(fs.readFileSync("books.json", "utf-8"));

        let member = members.find((value) => value.memberId === memberId);
        if (!member) {
            console.log("Member not found.");
            return;
        }

        console.log("\n");
        console.log("Library Borrow Summary");
        console.log("\n");
        console.log("Member Name:", member.name);
        console.log("Membership Type:", member.membershipType);
        console.log("Books Borrowed:");

        borrowRecords.forEach(record => {
            if (record.memberId === memberId && record.bookIds) {
                record.bookIds.forEach(borrowedBookId => {
                    let book = books.find((value) => value.bookId === borrowedBookId);
                    if (book) {
                        console.log(`- ${book.title} (Price: ${book.price})`);
                    }
                });
            }
        });

        let total = calculateTotal(memberId);
        let finalFine = applyDiscount(memberId, lateFine);

        console.log("\n");
        console.log("Total Book Value: ", total);
        console.log("Original Fine: ", lateFine);
        console.log("Late Fine After Discount: ", finalFine);
        console.log("Total Amount to be Paid: ", total + finalFine);
    }

    catch(error) {
        console.log("Error displaying Summary");
        console.log(error);
    }
    
}

export default displaySummary;