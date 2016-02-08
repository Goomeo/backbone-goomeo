'use strict';

var Backbone        = require('backbone'),
    basicFunctions  = require('./base');

require('backbone.subroute');

var Router = Backbone.SubRoute.extend({

});

module.exports = Router.extend(basicFunctions);
