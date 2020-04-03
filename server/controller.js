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
        // console.log('query', req.query)
        const {search, post} = req.query
        const {id} = req.params
        // console.log(id, searchVal, newPost)
        const db = req.app.get('db')
        let newPost = post === 'true' ? true : false
        // let posts = await db.get_user_posts()
        if(newPost && search){
            let searchUserPost = await db.get_user_title(search)
           return res.status(200).send(searchUserPost)
        } else if (!newPost && !search){
            let getAllUser = await db.get_user_id(+id)
            return res.status(200).send(getAllUser)
        } else if (!newPost && search){
            let searchPost = await db.post_title(search, +id)
            return res.status(200).send(searchPost)
        } else {
            let getAll = await db.get_user_posts()
            // console.log(getAll)
            return res.status(200).send(getAll)
        }
    },
    getPost: async(req, res) => {
        const {id} = req.params
        // console.log(id, req.params)
        const db = req.app.get('db')
        let getUser = await db.get_single_user(id)
        // console.log('password', getUser[0].password)
        // console.log(getUser)
        res.status(200).send(getUser)
    },
    createPost: (req, res) => {
        const {id} = req.params
        const {title, imageUrl, content} = req.body
        const db = req.app.get('db')
        db.create_post(id, title, imageUrl, content) 
        res.status(200).send('Created')
    },
    deletePost: async(req, res) => {
        const {id} = req.params
        console.log(req.params)
        const db = req.app.get('db')
        let deleted = db.delete(id)
        console.log(deleted)
        res.status(200).send(deleted)
    }
}