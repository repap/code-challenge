const booksAndAlbusReducer = (accum, curr) => {
  accum.responses.push(curr.response)
  accum.data = [...accum.data, ...curr.data]

  return accum
}

const sortByProperty = prop => (a, b) => 
  a[prop] >= b[prop] ? true : false

const sortByTitle = sortByProperty('title')

const reduceBooksAndAlbums = reducer => data =>
  data.reduce(reducer, { responses: [], data: [] })

const sortBooksAndAlbums = sorter => data => ({ 
  responses: {...data.responses }, 
  data: {...data.data.sort(sorter)}
})

module.exports = {
  reduceBooksAndAlbums,
  sortBooksAndAlbums,
  sortByTitle,
  booksAndAlbusReducer,
}