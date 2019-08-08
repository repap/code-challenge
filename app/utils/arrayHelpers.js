const sortByProperty = prop => (a, b) => a[prop] >= b[prop] ? true : false

module.exports = {
  sortByProperty, 
}