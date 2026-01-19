import express from 'express';

const router = express.Router();

router.route('/auth').get((req, res) => res.send('LOGIN PAGE'));

export default router;
