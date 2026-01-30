import createBook from "./src/createBook.js";
import createMember from "./src/createMember.js";
import createBorrowRecord from "./src/borrowRecord.js";
import displaySummary from "./src/displaySummary.js";


createBook("B-01", "book-1", "author-1", "200");
createBook("B-02", "book-2", "author-2", "250");
createBook("B-03", "book-3", "author-3", "500");

createMember("M-01", "Adarsh", "Gold");
createMember("M-02", "Reshu", "Normal");

createBorrowRecord("M-01", "B-01"); 
createBorrowRecord("M-01", "B-03");
createBorrowRecord("M-02", "B-01"); 
createBorrowRecord("M-01", "B-02"); 
createBorrowRecord("M-02", "B-02");

displaySummary("M-01", "100");
displaySummary("M-02", "200");