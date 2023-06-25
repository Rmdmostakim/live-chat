const controller = {};

controller.index = (req, res) => {
  res.render('Home');
};

module.exports = controller;