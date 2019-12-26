const isAdmin = () => {
  return (req, res, next) => {
    if (req.user && req.user.email === 'cgerace8@gmail.com') {
      next()
    } else {
      res.status(403).send('Permission Denied')
    }
  }
}

module.exports = isAdmin
