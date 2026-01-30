import fs from "fs"

function createBorrowRecord(memberId, bookId) {
    try{
        let records = [];
        let ob = {
            memberId,
            bookIds: [bookId]
        };

        if (fs.existsSync("borrowRecord.json")) {
            let data = JSON.parse(fs.readFileSync("borrowRecord.json", "utf-8"));
            let isRecord = data.find((value) => value.memberId === memberId);
            if (isRecord) {
                isRecord.bookIds.push(bookId);
                fs.writeFileSync("borrowRecord.json", JSON.stringify(data, null, 2));
                return "New borrowed bookId added to existing record.";
            }
            records = data;
        }

        records.push(ob);
        fs.writeFileSync("borrowRecord.json", JSON.stringify(records, null, 2));
        console.log("Borrow record saved to database successfully.");
    }

    catch(error) {
        console.log("Error creating borrow record.");
        console.log(error);
    }
}

export default createBorrowRecord;