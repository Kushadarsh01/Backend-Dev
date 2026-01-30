import fs from "fs"

function applyDiscount(memberId, amount) {
    try {
        if (!fs.existsSync("members.json")) {
            return amount;
        }

        let members = JSON.parse(fs.readFileSync("members.json", "utf-8"));

        let member = members.find((value) => value.memberId === memberId);
        if (!member) {
            return amount;
        }

        let discount = 0;

        if (member.membershipType === "Normal") {
            discount = 5/100;
        } 
        else if (member.membershipType === "Gold") {
            discount = 15/100;
        }

        return amount - (amount * discount);
    }

    catch(error) {
        console.log("Error applying discount.");
        console.log(error);
    }
    
}

export default applyDiscount;