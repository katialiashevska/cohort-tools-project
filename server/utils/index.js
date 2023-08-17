function getQuery(cohort) {
  const query = {};
  if (cohort) {
    const regexpCohort = new RegExp(cohort);
    query.cohort = regexpCohort;
  }
}

module.exports = getQuery;
