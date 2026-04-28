function postContact(req, res) {
    try {
        const { name, message } = req.body;

        if (!name || !message) {
            return res.status(400).send("Name and message are required");
        }

        console.log(`New Message from ${name}: ${message}`);
        res.status(200).send("Message received successfully!");
    } catch(error) {
        console.log(error);
        res.status(500).send("Internal Server Error!");
    }
}

export default postContact;