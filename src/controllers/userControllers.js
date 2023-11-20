export const logoutUserC = (req, res) => {
  req.session.destroy();
  res.redirect("/login");
};
