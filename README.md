# Building a Slack Tic Tac Toe Bot on Hasura

This tutorial consists of a simple slack bot which can help increase the productivity of team by engaging them in a small game of tic tac toe,
this can help developers to take a small refreshing break and also an opportunity to know each other.

This bot has some special emoticons to play with too, just need to use special keywords like boys, girls or food with normal start process.

## Demo
 ![normal](./screenshots/screenshot1.png) --|-- ![home-scren-scroll](./screenshots/screenshot2.png)

## Pre-requisites

* [NodeJS](https://nodejs.org)

* [hasura CLI](https://docs.hasura.io/0.15/manual/install-hasura-cli.html)

## Getting the bot running

### Create a new slack bot integration

* Navigate to https://my.slack.com/services/new/bot
* Choose a bot user name and click on **'+ Add bot integration’**.

![Fb app screen](https://raw.githubusercontent.com/jaisontj/hasura-fb-bot/master/assets/tutorial_fb_app_screen.png "fb app screen")

* Copy the API Token from the page, it will be used later.

![Fb app screen2](https://raw.githubusercontent.com/jaisontj/hasura-fb-bot/master/assets/tutorial_fb_app_screen2.png "fb app screen2")



### Getting the Hasura project

```sh
$ hasura quickstart dvk/slack-tic-tac-bot
$ cd slack-tic-tac-bot
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
USER MS NAME     STATUS      INTERNAL-URL              EXTERNAL-URL
bot              Running     bot.cassava35-user:80     https://bot.cassava35.hasura-app.io

HASURA MS NAME     STATUS      INTERNAL-URL                            EXTERNAL-URL
postgres           Running     postgres.cassava35-hasura:5432          
session-redis      Running     session-redis.cassava35-hasura:6379     
sshd               Running                                             
auth               Running     auth.cassava35-hasura:80                http://auth.cassava35.hasura-app.io
gateway            Running                                             
le-agent           Running                                             
platform-sync      Running                                             
data               Running     data.cassava35-hasura:80                http://data.cassava35.hasura-app.io
filestore          Running     filestore.cassava35-hasura:80           http://filestore.cassava35.hasura-app.io
notify             Running     notify.cassava35-hasura:80              http://notify.cassava35.hasura-app.io

```

Find the EXTERNAL-URL for the service named `bot`(in this case -> https://bot.cassava.hasura-app.io).

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

Congratulations you have succesfully deployed the slack tic tac toe bot, now whenever you need to take a small break just remember this slack bot and play a small game of tic tac toe with your frien :)

Divyanshu Kumar
## Support

If you happen to get stuck anywhere, feel free to mail me at divyanshukumarg@gmail.com. Also, if you find a bug or an issue, you can raise an issue [here](https://github.com/dvkcool/slack-tic-tac-toe-bot)
