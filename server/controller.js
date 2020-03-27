const bcrypt = require('bcrypt')

module.exports = {
    register: async(req, res) => {
         const {username, password} = req.body
         const db = req.app.get('db')

            let salt = bcrypt.genSaltSync(10);
            let hash = bcrypt.hashSync(password, salt)
        console.log(username)

         let newUser = await db.register_user([username, hash])
         console.log(newUser)
        req.session.user = newUser[0]
        console.log(req.session.user)
         res.status(201).send(req.session.user)
    }
}