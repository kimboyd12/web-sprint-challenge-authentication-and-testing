const router = require('express').Router();
const bcrypt = require("bcryptjs")
const Users = require("./auth-model")

router.post('/register', async (req, res, next) => {
  try {
    const { username, password} = req.body
    const user = await Users.findBy({ username }).first()

    if (user) {
      return res.status(409).json({
        message: "Username is already taken"
      })
    }

    const newUser = await Users.add({
      username,
      password: await bcrypt.hash(password, 14)
    })

    res.status(201).json(newUser)

  } catch(err) {  
      next(err)
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body
    const user = await Users.findBy({ username }).first()

    if (!user) {
      return res.status(401).json({
        message: "Your credentials are invalid"
      })
    }

    const passwordValid = await bcrypt.compare(password, user.password)

    if (!passwordValid) {
      return res.status(401).json({
        message: "Your credentials are invalid"
      })
    }

    req.session.user = user
    
    res.json({
      message: `Welcome ${user.username}!`
    })

  } catch(err) {
    next(err)
  }
});

module.exports = router;
