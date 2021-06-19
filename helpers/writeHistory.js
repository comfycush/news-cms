const { History } = require('../models')

function writeHistory(id, newsTitle, updatedBy, method, statusBefore, statusAfter) {
  let description
  switch (method) {
    case 'create':
      description = `new news with id ${id} created`
      break
    case 'put':
      description = `news with id ${id} updated`
      break
    case 'patch':
      description = `news with id ${id} status has been updated from ${statusBefore} into ${statusAfter}`
      break
    case 'delete':
      description = `news with id ${id} permanently deleted`
    default:
      break;
  }

  History.create({
    newsTitle,
    description,
    updatedBy
  })
  .then(history => {
    return history
  })

}

module.exports = writeHistory