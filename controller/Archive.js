const Model = require('../models/Archive')

exports.addArchive = async (req,res) =>{
    try {

        const archive = await Model.create(req.body);
        res.status(201).json({
            success: true,
            archive
        });

    } catch (err) {
        res.send(err.message)
    }
}

exports.getArchive = async (req,res) =>{
    try {

        const archive = await Model.find();
        res.status(201).json({
            success: true,
            archive
        });
    } catch (err) {
        res.send(err.message)
    }
}