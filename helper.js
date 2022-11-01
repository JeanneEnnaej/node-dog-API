exports.success = (message, data) => {
  return { message,data }
}

exports.getUniqueId = (dogs) => {
  const dogsIds = dogs.map(dog => dog.id)
  const maxId = dogsIds.reduce((a,b) => Math.max(a,b))
  const uniqueId = maxId + 1

  return uniqueId
}
