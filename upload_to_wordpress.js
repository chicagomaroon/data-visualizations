#!/usr/bin/node
require('dotenv').config();

const args = require('minimist')(process.argv.slice(2));
const fs = require('fs');
const data = JSON.parse(fs.readFileSync(`${args.a}/meta_data.json`, 'utf8'));
const WPAPI = require('wpapi');

const wp = new WPAPI({
    endpoint: 'https://chicagomaroon.com/wp-json',
    username: process.env.CHICAGO_MAROON_USER_NAME,
    password: process.env.CHICAGO_MAROON_PASSWORD
});

wp.media()
    .file(`${args.a}/${args.b}`)
    .create({
        caption: data.caption,
        title: data.title,
        description: data.description,
        media_type: 'file',
        mime_type: 'text/html'
    })
    .then((media_item) => {
        console.log(
            `Your visualization file, ${args.b}, has been uploaded successfully as media item: ${media_item.id}`
        );
    })
    .catch((err) => {
        console.log(err);
    });
