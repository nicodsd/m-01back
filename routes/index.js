import express from 'express';
import categoryRouter from './categories.js';
import foodRouter from './foods.js'
import conectedEndpoint from '../middlewares/conectedEndpoints.js';

const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { 
    title: "MENUS" ,
    subtitle: "BASE DE DATOS"
  });
});

router.use("/categories", conectedEndpoint, categoryRouter)
router.use("/foods", conectedEndpoint, foodRouter)


export default router
