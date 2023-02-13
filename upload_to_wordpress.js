#!/usr/bin/node
require('dotenv').config();

const argv = require('minimist')(process.argv.slice(2));
const WPAPI = require("wpapi");

const wp = new WPAPI({
    endpoint: 'https://chicagomaroon.com/wp-json',
    username: process.env.CHICAGO_MAROON_USER_NAME,
    password: process.env.CHICAGO_MAROON_PASSWORD
});

wp.media()
  .file(`${argv.a}/${argv.b}`)
  .create()
  .then(r => {
    // Your media is now uploaded: let's associate it with a post
    //console.log(r)
})

