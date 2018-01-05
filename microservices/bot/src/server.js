require('babel/register');
const http = require('http');

try {
    const fs = require('fs');
    const token = process.env.SLACK_TOKEN;
    const Bot = require('./bot/bot');
    const bot = new Bot(token);
    
    bot.login();

    http.createServer(function(req, res) {
        res.end('Hi there, Lets get started');
    }).listen(8080);

} catch(error) {
    console.log('Retry');
    return;
}
