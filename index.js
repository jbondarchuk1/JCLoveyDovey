const data = require('./data.js');
const jobs = require('./jobs.js');
const lovepoints = data.lovepoints;

/// REQUIRES ///
const Discord = require("discord.js");
const bot = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });
const keepAlive = require("./server.js");
const alexaURL = process.env['token'];
const axios = require('axios');
const cron = require('cron');
// -- end Requires -- //



/// Helper ///
function loadLastSave() {
  dataObj = require('fs').readFileSync('./data.json');
  data.load(JSON.parse(dataObj));
}

function sendGET(s) {
  axios.get(s)
    .then(res => {
      console.log(`statusCode: ${res.status}`);
      console.log(res);
    })
    .catch(error => {
      console.error(error);
    });
}


/// Keep The Bot Alive ///
keepAlive();


bot.on('ready', client => {
  console.log("bot is running");

  /// Initialize Jobs channels ///
  general = client.channels.cache.get(data.channels["generalText"]);
  planning = client.channels.cache.get(data.channels["planningText"]);
  dev = client.channels.cache.get(data.channels["devText"]);

  try{
    loadLastSave();
    dev.send(data.toString());
  }
  catch(err){
    console.log(err);
  }

  

  /// TEST JOBS ///
  // jobs.testFunction();
  // data.save();
})



/// Bot Message Handling ///
bot.on("messageCreate", message => {
  if (message.author.id != "985174282252455999") {
    let content = message.content.split(" ");
    let increment = 1;

    switch (content[0]) {

      /// DOCUMENTATION ///
      case "/checkcommands":
        message.reply(data.commands);
        break;

      /// ATTENTION ///
      case "/ceceusepoke":
        sendGET(process.env.alexaAccessJSON);
        message.reply("Spamming Jason rq");
        break;
      case "/jasonusepoke":
        // **not implemented yet**
        break;


      /// MILESTONES ///
      // MOVIES
      case "/moviesup":
        try {
          if (content.length > 2) {
            increment = parseInt(content[1]);
          }
        } catch (err) {
          console.error(err);
        }
        data.milestones.moviesWatched.count += increment;
        message.reply('Movies watched now at: ' + data.milestones.moviesWatched.count);
        data.save();
        break;
      case "/setmovies":
        try {
          data.milestones.moviesWatched.count = parseInt(content[1]);
          message.reply('Movies watched now at: ' + data.milestones.moviesWatched.count);
        } catch (error) {
          console.error(error);
        }
        break;

      // GAMES
      case "/gamesup":
        try {
          if (content.length > 2) {
            increment = parseInt(content[1]);
          }
        } catch (err) {
          console.error(err);
        }
        data.milestones.gameNightsPlayed.count += increment;
        message.reply('Games played now at: ' + data.milestones.gameNightsPlayed.count);
        data.save();
        break;
      case "/setgames":
        try {
          data.milestones.gameNightsPlayed.count = parseInt(content[1]);
          message.reply('Games played now at: ' + data.milestones.gameNightsPlayed.count);
        } catch (error) {
          console.error(error);
        }
        break;

      // MEALS
      case "/mealsup":
        try {
          if (content.length > 2) {
            increment = parseInt(content[1]);
          }
        } catch (err) {
          console.error(err);
        }
        data.milestones.mealsShared.count += increment;
        message.reply('Meals shared now at: ' + data.milestones.mealsShared.count);
        data.save();
        break;
      case "/setmeals":
        try {
          data.milestones.mealsShared.count = parseInt(content[1]);
          message.reply('Games played now at: ' + data.milestones.mealsShared.count);
        } catch (error) {
          console.error(error);
        }
        break;

      /// FLIGHT ///
      case "/setnextflight":
        data.setNextFlightDate(content[1]);
        message.reply('Next flight set to: ' + String(data.nextFlightDate));
        data.save();
        break;

      /// LOVEPOINTS ///
      case "/pointtocece":
        lovepoints.cecePoint();
        message.reply('Cece now has: ' + lovepoints.getCecePoints + ' points');
        data.save();
        break;
      case "/pointtojason":
        lovepoints.jasonPoint();
        message.reply('Jason now has: ' + lovepoints.getJasonPoints + ' points');
        data.save();
        break;
      case "/getallpoints":
        message.reply(lovepoints.getAllStats());
        break;


      /// ACTIVITIES ///
      case "/setactivityday":
        let idx = data.activities.getIndexByDay(content[1]);
        if (idx > -1) {
          data.activities.changeActivityByDay(content[1], content[2]);
          message.reply(data.activities.toString());
        }
        data.save();
        break;
      case "/gettodaysactivity":
        message.reply(data.activities.getTodaysActivity())
        break;
      case '/getweekactivities':
        message.reply(data.activities.toString());
        break;
      case '/removepotentialactivity':
        data.activities.removePotentialActivity(content[1]);
        message.reply(data.activities.getAllPotentialActivities());
        data.save();
        break;
      case '/addpotentialactivity':
        data.activities.addToActivitiesList(content[1]);
        message.reply(data.activities.getAllPotentialActivities());
        data.save();
        break;
      case '/getallpotentialactivities':
        message.reply(data.activities.getAllPotentialActivities());
        break;


      /// ADMINSTRATIVE /// 
      case '/loaddata':
        loadLastSave();
        message.reply('Data has been loaded\n\n' + data.toString());
        break;
      case '/savedata':
        data.save();
        message.reply('Data has been saved\n\n' + data.toString());
        break;
      case '/showdata':
        message.reply('Data\n\n' + data.toString());
        break;
      
      case '/checktime':
        let time = new Date();
        let myTime = new Date();
        myTime.setTime(myTime.getTime() + 9 * 3.6 * Math.pow(10,6));
        
        message.reply(`
          Javascript Time: ${time}
          My Time: ${myTime}
          `);
        
        break;
      default:
        break;
    }



  }
})


/// Token call to access the bot ///
bot.login(process.env.token1);

