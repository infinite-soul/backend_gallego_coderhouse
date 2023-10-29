export const register = async (req, res, next) => {
  try {
    res.render("register");
  } catch (error) {
    next(error.message);
  }
};

export const errorRegister = async (req, res, next) => {
  try {
    res.render("errorRegister");
  } catch (error) {
    next(error.message);
  }
};

export const login = async (req, res, next) => {
  try {
    res.render("login");
  } catch (error) {
    next(error.message);
  }
};

export const errorLogin = async (req, res, next) => {
  try {
    res.render("errorLogin");
  } catch (error) {
    next(error.message);
  }
};
