import jwt from "jsonwebtoken";

export default (req, res, next) => {
    const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");
    console.log(`Token ${token}`);
    if (token) {
        try {
            console.log(token)
            const decoded = jwt.verify(token, "sercetkeyy");

            req.userId = decoded._id;
            next();
        } catch (error) {
            console.log(error);
            return res.status(403).json({
                message: "Нет доступа",
            });
        }
    } else {
        return res.status(403).json({
            message: "Нет доступа",
        });
    }
};
