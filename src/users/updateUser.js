import fs from "fs";

function updateUser(req, res) {
    try {
        const { userId, newName } = req.body;

        if (!userId || !newName) {
            return res.status(400).send("userId and newName are required");
        }

        if (!fs.existsSync("users.json")) {
            return res.status(404).send("No user exists!");
        }

        const data = JSON.parse(fs.readFileSync("users.json", "utf-8"));
        const userIndex = data.findIndex((value) => value.userId === userId);

        if (userIndex === -1) {
            return res.status(404).send("User not found");
        }

        data[userIndex].name = newName;

        fs.writeFileSync("users.json", JSON.stringify(data, null, 2));
        res.status(200).send("User updated successfully");
    }
    catch(error) {
        console.log(error);
        res.status(500).send("Internal server error");
    }
}

export default updateUser;