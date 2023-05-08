const { authSecret } = require('../.env')
const jwt = require('jwt-simple')
const bcrypt = require('bcrypt-nodejs')

module.exports = app => {
    const signin = async (req, res ) => {
        if(!req.body.email || !req.body.password){
            return res.status(400).send('Dados incompletos')
        }

        //só user o AWAIT dentro de uma função ASYNC
        const user = await app.db('users')
                .where({email: req.body.email})
                .first()
    }
}