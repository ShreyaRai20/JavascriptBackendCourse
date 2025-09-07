const { Router } = 'express';
const { healthcheck } = require("../controllers/healthcheck.controller.js")

const healthcheckrouter = Router();

healthcheckrouter.route('/').get(healthcheck);

modules.exports =  healthcheckrouter