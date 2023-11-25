export const isAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next(); // Usuario autenticado, permite continuar
    } else {
        const errorMessage = encodeURIComponent('Unauthorized. Please log in.');
        res.redirect(`/login?error=${errorMessage}`); // Redirige a la página de inicio de sesión con mensaje de error
    }
};
