const errorHandler = (err, req, res, next) => {
  if (err) {
    const errorMessage = {
      messages: []
    }
    switch (err.name) {
      case "SequelizeValidationError":
        errorMessage.messages = err.errors.map(err => err.message)
        res.status(400).json(errorMessage)
        break
      case "SequelizeConstraintError":
        errorMessage.messages = err.errors.map(err => err.message)
        res.status(400).json(errorMessage)
        break
      case "SequelizeUniqueConstraintError":
        errorMessage.messages = err.errors.map(err => err.message)
        res.status(400).json(errorMessage)
        break
      case "ResourceNotFound":
        errorMessage.messages.push("Not found.")
        res.status(404).json(errorMessage)
        break
      //case "axiosError":
      //break
      case "AuthError":
        errorMessage.messages.push("Invalid email / password")
        res.status(401).json(errorMessage)
        break
      default:
        console.log('ini errror-nya:', err)
        errorMessage.messages.push("Internal server error.")
        res.status(500).json(errorMessage)
        break
    }
  }
}

module.exports = errorHandler
