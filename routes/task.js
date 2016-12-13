const {Router} = require('express');
const router = new Router();

const get = require('./../models/task/methods/get');
const create = require('./../models/task/methods/create');
const edit = require('./../models/task/methods/edit');
const remove = require('./../models/task/methods/remove');

router.get('/', async (req, res, next) => {
    try {
        const tasks = await get(req.user._id, req.query);
        res.json(tasks);
    } catch(ex) {
        next(ex);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const tasks = await create(req.user._id, req.body);
        res.json(tasks);
    } catch(ex) {
        next(ex);
    }
});

router.put('/:id', async (req, res, next) => {
    try {
        const tasks = await edit(req.user._id, req.params.id, req.body);
        res.json(tasks);
    } catch(ex) {
        next(ex);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        await remove(req.user._id, req.params.id);
        res.json({
            ok: true
        });
    } catch(ex) {
        next(ex);
    }
});

module.exports = router;