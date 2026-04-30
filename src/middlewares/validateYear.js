function validateYear(req, res, next) {
    const {
        year
    } = req.body;

    if (year) {
        const yearNum = parseInt(year);
        const currentYear = new Date().getFullYear();

        if (isNaN(yearNum) || yearNum < 800 || yearNum > currentYear) {
            return res.status(400).send("Invalid year provided");
        }
    }

    next();
}

export default validateYear;