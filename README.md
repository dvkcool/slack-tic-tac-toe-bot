# Building a Slack Tic Tac Toe Bot on Hasura

This tutorial consists of a simple slack bot which can help increase the productivity of team by engaging them in a small game of tic tac toe,
this can help developers to take a small refreshing break and also an opportunity to know each other.

This bot has some special emoticons to play with too, just need to use special keywords like boys, girls or food with normal start process.

## Demo
 ![food](https://github.com/dvkcool/slack-tic-tac-toe-bot/blob/master/demo/game2.gif?raw=true)

Click [here](https://github.com/dvkcool/slack-tic-tac-toe-bot/demo/game2.gif?raw=true) if the GIF doesn't load here. 
## Pre-requisites

* [NodeJS](https://nodejs.org)

* [hasura CLI](https://docs.hasura.io/0.15/manual/install-hasura-cli.html)

## Getting the bot running

### Create a new slack bot integration

* Navigate to https://my.slack.com/services/new/bot
* Choose a bot user name and click on **'+ Add bot integration’**.

![Bot creation](https://github.com/dvkcool/slack-tic-tac-toe-bot/blob/master/demo/bot-name.png?raw=true)

* Copy the API Token from the page, it will be used later.

![Bot API screen](https://github.com/dvkcool/slack-tic-tac-toe-bot/blob/master/demo/bot-api-key.png?raw=true)



### Getting the Hasura project

```sh
$ hasura quickstart dvk/slack-tic-tac
$ cd slack-tic-tac
# Add Slack API key to hasura secrets. 
hasura secrets update SLACK_BOT_TOKEN.key  <Your Bot API KEY>
# Deploy
$ git add . && git commit -m "Deployment commit"
$ git push hasura master
```

After the `git push` completes:

```sh
$ hasura microservice list
```

You will get an output like so:

```sh
USER MS NAME     STATUS      INTERNAL-URL       EXTERNAL-URL         
bot              Running     bot.default:80     http://bot.arbitrary58.hasura-app.io

HASURA MS NAME     STATUS      INTERNAL-URL                  EXTERNAL-URL
filestore          Running     filestore.hasura:80           http://filestore.arbitrary58.hasura-app.io
le-agent           Running                                   
sshd               Running                                   
platform-sync      Running                                   
session-redis      Running     session-redis.hasura:6379     
gateway            Running                                   
notify             Running     notify.hasura:80              http://notify.arbitrary58.hasura-app.io
postgres           Running     postgres.hasura:5432          
auth               Running     auth.hasura:80                http://auth.arbitrary58.hasura-app.io
data               Running     data.hasura:80                http://data.arbitrary58.hasura-app.io


```

Find the EXTERNAL-URL for the service named `bot`(in this case -> https://bot.arbitary58.hasura-app.io).

### Adding bot to your groups/DM
Just type @botname to invite the bot to the channel or DM,
Then type
```sh
#to start a normal game
@botname start 
#to start a game with custom emoji for boys
@botname start boys 
#to start a game with custom emoji for girls
@botname start girls
#to start a game with food emojis
@botname start food.
```
Then just follow on screen instructions(just you and your friend has to type yes to join a game')

Just a demo of how to start a normal game
![normal](https://github.com/dvkcool/slack-tic-tac-toe-bot/blob/master/demo/game1.gif?raw=true)
Click [here](https://github.com/dvkcool/slack-tic-tac-toe-bot/demo/game1.gif) if the GIF doesn't load here. 


### To quit a game in between
Just type  'quit' to abandon game.
![quit](https://github.com/dvkcool/slack-tic-tac-toe-bot/blob/master/demo/gamequit.png?raw=true)


Congratulations you have succesfully deployed the slack tic tac toe bot, now whenever you need to take a small break just remember this slack bot and play a small game of tic tac toe with your frien :)

Divyanshu Kumar
## Support

If you happen to get stuck anywhere, feel free to mail me at divyanshukumarg@gmail.com. Also, if you find a bug or an issue, you can raise an issue [here](https://github.com/dvkcool/slack-tic-tac-toe-bot)
