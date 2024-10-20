export function checkIdParam(req, res, next) {
    if (!req.params.id) {
        return res.status(400).json({ error: 'ID parameter is required' });
    }
    next();
}
