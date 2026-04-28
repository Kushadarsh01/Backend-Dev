import fs from "fs";

function deleteUser(req, res) {
    try {
        const { userId } = req.body;

        if (!userId) {
            return res.status(400).send("userId is required");
        }

        if (!fs.existsSync("users.json")) {
            return res.status(404).send("No user exists!");
        }

        const data = JSON.parse(fs.readFileSync("users.json", "utf-8"));
        const filteredData = data.filter((value) => value.userId !== userId);

        if (data.length === filteredData.length) {
            return res.status(404).send("User not found");
        }

        fs.writeFileSync("users.json", JSON.stringify(filteredData, null, 2));
        res.status(200).send("User deleted successfully");
    }
    catch(error) {
        console.log(error);
        res.status(500).send("Internal server error");
    }
}

export default deleteUser;