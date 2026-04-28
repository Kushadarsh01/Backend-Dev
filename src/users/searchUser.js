import fs from "fs";

function searchUser(req, res) {
    try {
        const { name } = req.query;

        if (!name) {
            return res.status(400).send("Name query parameter is required");
        }

        if (!fs.existsSync("users.json")) {
            return res.status(404).send("No user exists!");
        }

        const data = JSON.parse(fs.readFileSync("users.json", "utf-8"));
        let isUser = data.filter((value) => value.name.toLowerCase().includes(name.toLowerCase()));

        if (isUser.length === 0) {
            return res.status(404).send("User not found");
        }

        res.status(200).send(isUser);
    } catch(error) {
        console.log(error);
        res.status(500).send("Internal Server Error!");
    }
}

export default searchUser;