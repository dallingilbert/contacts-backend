const getNames = (req, res, next) => {
  console.log('Getting names\n');
  res.send('Dallin Gilbert');
};

module.exports = { getNames };
