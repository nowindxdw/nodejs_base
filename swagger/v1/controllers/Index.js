'use strict';

var url = require('url');

var Index = require('./IndexService');

module.exports.getIndex = function getIndex (req, res, next) {
  Index.getIndex(req.swagger.params, req, res, next);
};
