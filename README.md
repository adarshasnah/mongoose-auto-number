# mongoose-auto-number

[![npm version](https://badge.fury.io/js/mongoose-auto-number.svg)](http://badge.fury.io/js/mongoose-auto-number)

This plugin can be used to auto increment any number field in a schema.

## Installation

```sh
$ npm install mongoose-auto-number
```

### Usage

Once you have the plugin installed it is very simple to use. Just get reference to it, initialize it by passing in your mongoose connection and pass autoNumber.plugin to the plugin() function on your schema.

> Note: You only need to initialize the mongoose once.

```javascript
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    autoNumber = require('mongoose-auto-number');
 
var connection = mongoose.createConnection("mongodb://localhost/dbname");
 
autoNumber.init(connection);
 
var itemSchema = new Schema({
    itemNo: {
        type: Number,
        autoIncrement: true    
    },
    name: String,
    price: Number
});
 
itemSchema.plugin(autoNumber.plugin, 'Item');

```