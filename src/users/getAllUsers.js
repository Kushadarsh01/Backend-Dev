import fs from "fs";

function getAllUsers(req, res) {
    try {
        if (!fs.existsSync("users.json")) {
            return res.status(404).send("No users exist!");
        }

        const data = JSON.parse(fs.readFileSync("users.json", "utf-8"));
        res.status(200).send(data);
    }
    catch(error) {
        console.log(error);
        res.status(500).send("Internal Server Error!");
    }
}

export default getAllUsers;