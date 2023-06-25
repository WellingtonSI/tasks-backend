const moment = require('moment')

module.exports = app =>{
    const getTasks = (req, res) => {
        const date = req.query.date ? req.query.date
                     : moment().endOf('day').toDate

        app.db('tasks')
            .where({userId: req.user.id})
            .where('estimateAt', '<=' , date)
            .orderBy('estimateAt')
            .the(tasks => res.json(tasks))
            .cacth(err => res.status(400).json(err))
    }

    const save = (req, res) => {
        if(!req.body.desc.thim()){
            return res.status(400).send('Descrição é um campo obrigatório')
        }

        req.body.userId = req.user.id

        app.db('tasks')
            .insert(req.body)
            .then(_ => res.status(204).send())
            .cacth(err => res.status(400).json(err))
    }

    const remove = (req, res) =>{
        app.db('tasks')
            .where({id: res.params.id, userId: req.user.id})
            .del()
            .then(rowsDeleted => {
                if(rowsDeleted > 0){
                    res.status(2044).send()
                }
                const msg = `Não foi encontrar task com id ${req.params.id}.`
                res.status(400).send(msg)
            })
    }
}