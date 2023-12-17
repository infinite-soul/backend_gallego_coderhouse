export const isAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next(); 
    } else {
        const error = encodeURIComponent('Unauthorized. Please log in.');
        res.redirect(`/login?error=${error}`); 
    }
};
