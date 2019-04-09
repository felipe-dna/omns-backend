const Box = require('../models/Box');

class BoxController {

    // salva boxes no banco de dados
    async store(req, res) {
        const box = await Box.create(req.body)
        // const box = await Box.create({ title: req.body.title })

        return res.json(box)
    };

    // retorna os dados de uma box 
    async show(req, res) {
        const box = await Box.findById(req.params.id).populate({
            path: 'files', // nome da relação
            options: { sort: { created_at: -1 } } // ordenar de forma decrescente
        });

        return res.json(box);
    };
};


module.exports = new BoxController;