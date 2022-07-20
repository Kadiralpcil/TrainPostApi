const express = require('express');
const expressValidator = require('express-validator');

const { postResReservation } = require('../reservation');
const { ValidationControl } = require('../middlewares');

const router = express.Router();

router.post('',
  express.json(),
  [
    expressValidator.body('Tren').exists()
    .withMessage('Tren boş bırakılmış veya girilmemiş'),

    expressValidator.body('Tren.Vagonlar').exists().
    withMessage('Vagonlar boş bırakılmış veya girilmemiş.'),

    expressValidator.body('Tren.Vagonlar.*.Ad').exists().
    withMessage('Vagon Ad boş bırakılmış veya girilmemiş.'),

    expressValidator.body('Tren.Vagonlar.*.Kapasite').exists()
    .withMessage('Vagon Kapasite boş bırakılmış veya girilmemiş.'),

    expressValidator.body('Tren.Vagonlar.*.DoluKoltukAdet').exists()
    .withMessage('Vagon DoluKoltukAdet boş bırakılmış veya girilmemiş.'),

    expressValidator.body('Tren.RezervasyonYapilacakKisiSayisi').exists()
    .withMessage('RezervasyonYapilacakKisi boş bırakılmış veya girilmemiş.'),

    expressValidator.body('Tren.KisilerFarkliVagonlaraYerlestirilebilir').exists()
    .withMessage('KisilerFarkliVagonlaraYerlestirilebilir boş bırakılmış veya girilmemiş.'),

    ValidationControl
  ],
  postResReservation
);

module.exports = router;
