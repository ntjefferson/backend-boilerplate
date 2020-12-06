const checkForEmptyValues = (array) => {
  const noneEmpty = array.every((item) => (item !== '' && item !== null));
  if (!noneEmpty) {
    const err = new Error('Missing required field(s).');
    err.status = 400;
    throw err;
  }
};

module.exports = {
  checkForEmptyValues,
};
