import fs from "fs";

function createUser(req, res) {
    try {
        const {
            name
        } = req.body;

        if (!name) {
            return res.status(400).send("Name is required");
        }

        let user = [];

        if(fs.existsSync("users.json")) {
            const data = JSON.parse(fs.readFileSync("users.json", "utf-8"));
            const isUser = data.find((value) => value.name === name);

            if(isUser) {
                return res.status(409).send("User already exists!");
            }
            user = data;
        }

        const newUser = {
            userId: Date.now(),
            name
        }

        user.push(newUser);

        fs.writeFileSync("users.json", JSON.stringify(user, null, 2));
        res.status(201).send("User created successfully");
    }

    catch(error) {
        console.log(error);
        res.status(500).send("Internal server error");
    }
}

export default createUser;