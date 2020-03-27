const bcrypt = require('bcrypt')

module.exports = {
    register: async(req, res) => {
         const {username, password} = req.body
         const db = req.app.get('db')

            let salt = bcrypt.genSaltSync(10);
            let hash = bcrypt.hashSync(password, salt)


         let user = db.register_user([username, hash])
    }
}