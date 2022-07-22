const jwt = require('jsonwebtoken')
const { findUserService } = require('../services/UserServices')
const { findOwnerService } = require('../services/OwnerService')

const auth = async (req, res, next) => {
  const { authorization } = req.headers
  let token
  if (authorization && authorization.startsWith('Bearer')) {
    token = authorization.split(' ')[1]
  }
  if (!token) {
    return res.status(403).send({ message: 'Auth Token missing' })
  }
  try {
    let decoded = jwt.verify(token, process.env.JWT_SECRET)
    let users = await findUserService(decoded.id)
    if (!users) {
      return res.status(403).send({ message: 'No users Found' })
    }
    req.user = users

    next()
    }
    if (ownerId) {
      let owner = await findOwnerService(ownerId)
      if (!owner) {
        return res.status(403).send({ message: "This email isn't registred" })
      }
      req.owner = owner
      next()
    }
  } catch (error) {
    console.log(error)
  }
}
module.exports = auth
