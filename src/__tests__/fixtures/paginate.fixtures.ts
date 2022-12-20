const getPaginateResult = (docs: Array<unknown>) => {
  return {
    docs,
    totalDocs: docs.length,
    offset: 0,
    limit: 10,
    totalPages: 1,
    page: 1,
    pagingCounter: 1,
    hasPrevPage: false,
    hasNextPage: false,
    prevPage: null,
    nextPage: null
  }
}

export default { getPaginateResult }
