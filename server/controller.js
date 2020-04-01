const bcrypt = require('bcrypt')

module.exports = {
    register: async(req, res) => {
         const {username, password} = req.body
         const db = req.app.get('db')

            let salt = bcrypt.genSaltSync(10);
            let hash = bcrypt.hashSync(password, salt)
            // console.log(hash)
        // console.log(username)

         let newUser = await db.register_user(username, hash)
        //  console.log(newUser[0])
        req.session.user = newUser[0]
        // console.log(req.session.user)
         res.status(201).send(req.session.user)
    },
    login: async(req, res) => {
        const {username, password} = req.body
        const db = req.app.get('db')

        let user = await db.check_user(username)
        // console.log(user)
        if(!user[0]){
            res.status(401).send('User not found')
        }

        const authenticated = bcrypt.compareSync(password, user[0].password)
        if(!authenticated){
            res.status(401).send('Wrong password')
        }

        delete user[0].password;
        req.session.user = user[0]
        res.status(202).send(req.session.user);
    },
    getPosts: async(req, res) => {
        const {searchVal, userPosts} = req.body
        const id = req.params
        console.log(id, searchVal, userPosts)
        const db = req.app.get('db')

        // let posts = await db.get_user_posts()
        if(userPosts && searchVal){
            let searchUserPost = await db.get_user_title(searchVal)
           return res.status(200).send(searchUserPost)
        } else if (!userPosts && !searchVal){
            let getAllUser = await db.get_user_id(+id)
            return res.status(200).send(getAllUser)
        } else if (!userPosts && searchVal){
            let searchPost = await db.post_title(searchVal, id)
            return res.status(200).send(searchPost)
        } else {
            let getAll = await db.get_user_posts()
            return req.status(200).send(getAll)
        }
    }
}