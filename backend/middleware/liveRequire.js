export const requireLiveField = (req, res, next) => {
    const { status, live } = req.body;

    if (status === true && !live) {
        return res.status(400).json({ message: "Live field is required when status is true" });
    }

    next(); // Proceed if validation passes
};
