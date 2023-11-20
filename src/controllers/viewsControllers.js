import { getUserByID } from "../daos/mongodb/userDao.js";

const renderView = (view) => async (req, res, next) => {
  try {
    res.render(view);
  } catch (error) {
    console.error('Error al renderizar la vista:', error.message);
    next(error);
  }
};

export const register = renderView("register");
export const errorRegister = renderView("errorRegister");
export const login = renderView("login");
export const errorLogin = renderView("errorLogin");

export const current = async (req, res, next) => {
  try {
    if (req.session && req.session.passport && req.session.passport.user) {
      const user = await getUserByID(req.session.passport.user);
      if (user) {
        res.render("current", { user: user.toObject() });
      } else {
        console.error('Usuario no encontrado');
        res.render("login");
      }
    } else {
      console.log('Sesión no iniciada');
      res.render("login");
    }
  } catch (error) {
    console.error('Error al obtener el usuario actual:', error.message);
    next(error);
  }
};

