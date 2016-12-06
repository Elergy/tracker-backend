const {Router} = require('express');
const router = new Router();

const create = require('./../models/project/methods/create');
const getAll = require('./../models/project/methods/get-all');
const getInfo = require('./../models/project/methods/get-info');
const edit = require('./../models/project/methods/edit');
const remove = require('./../models/project/methods/remove');
const addParticipant = require('./../models/project/methods/add-participant');
const editParticipant = require('./../models/project/methods/edit-participant');
const removeParticipant = require('./../models/project/methods/remove-participant');

router.get('/', async (req, res, next) => {
    try {
        const projects = await getAll(req.user._id);
        res.json(projects);
    } catch(ex) {
        next(ex);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const project = await create(req.user._id, req.body);
        res.json(project);
    } catch(ex) {
        next(ex);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const project = await getInfo(req.user._id, req.params.id);
        res.json(project);
    } catch(ex) {
        next(ex);
    }
});

router.put('/:id', async (req, res, next) => {
    try {
        const project = await edit(req.user._id, req.params.id, req.body);
        res.json(project);
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

router.post('/:id/participant', async (req, res, next) => {
    try {
        const project = await addParticipant(req.user._id, req.params.id, req.body);
        res.json(project);
    } catch(ex) {
        next(ex);
    }
});

router.put('/:id/participant/:participant_id', async (req, res, next) => {
    try {
        const project = await editParticipant(req.user._id, req.params.id, req.params.participant_id, req.body);
        res.json(project);
    } catch(ex) {
        next(ex);
    }
});

router.delete('/:id/participant/:participant_id', async (req, res, next) => {
    try {
        const project = await removeParticipant(req.user._id, req.params.id, req.params.participant_id);
        res.json(project);
    } catch(ex) {
        next(ex);
    }
});

module.exports = router;