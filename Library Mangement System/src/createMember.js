import fs from 'fs'

function createMember(memberId, name, membershipType) {
    try {
        let members = [];
        let ob = {
            memberId,
            name,
            membershipType
        }
        if(fs.existsSync("members.json")) {
            let data = JSON.parse(fs.readFileSync("members.JSON", "utf-8"));
            let isMember = data.some((value) => value.name === name);
            if (isMember) {
                return "Member exists"
            }
            members = data;
        }
        members.push(ob);
        fs.writeFileSync("members.json", JSON.stringify(members, null, 2));
        console.log("Member added to database sucessfully");
    }
    catch(error) {
        console.log("Error creating member");
        console.log(error);
    }
}

export default createMember;