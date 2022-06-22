const cron = require('cron');
const data = require('./data.js');
const Discord = require("discord.js");
const { importantDates } = require('./data.js');
const bot = new Discord.Client({intents: ["GUILDS", "GUILD_MESSAGES"]});

class Jobs {
  general
  planning
  lovepoints = data.lovepoints;

  constructor(general, planning){
    this.general = general;
    this.planning = planning;
  }
  
  /// JOBS ///
  

  // DAILY
  milestoneJob = new cron.CronJob(
    "0 8 * * *", // every day at 8am
    this.milestoneJobFunction,
    null, true,  'Asia/Tokyo'
  );
  importantDayJob = new cron.CronJob(
    "0 6 * * *", // every day at 6am
    this.importantDayJobFunction,
    null, true,  'Asia/Tokyo'
  );
  activityJob = new cron.CronJob(
    "0 12 * * *", // every day at 12pm
    this.activityJobFunction,
    null, true, 'Asia/Tokyo'
  );
  countDownJob = new cron.CronJob(
    "0 9 * * *", // every day at 9am
    this.countDownJobFunction,
    null, true,  'Asia/Tokyo'
  );
  save = new cron.CronJob(
    "0 */4 * * *", // every 4 hours
    this.saveFunction,
    null, true,  'Asia/Tokyo'
  );

  // MONTHLY
  showAllMilestones = new cron.CronJob(
    "0 0 1 * *",
    this.showAllMilestonesFunction,
    null, true,  'Asia/Tokyo'
  );
  lovePointsMonthly = new cron.CronJob(
    "0 0 1 * *",
    this.lovePointsMonthlyFunction,
    null, true, 'Asia/Tokyo'
  )



  /// METHODS FOR JOBS ///
  /// DAILY ///
  /*
    reset the number of months when it has increased
  */
  milestoneJobFunction(){
    let d1 = data.importantDates.JCAnniversary
    let d2 = new Date(); // now
    
    let months = (d2.getFullYear - d1.getFullYear()) * 12;
    months -= d1.getMonth();
    months += d2.getMonth();
    months = months <= 0 ? 0 : months;

    if (months > data.milestones.monthsTogether){
      data.milestones.monthsTogether = months;
    }
  }

  /*
    send congrats message if jason bday, cece bday, or anniversary
  */
  importantDayJobFunction(){
    let currDate = new Date();
    currDate = currDate.setTime(currDate.getTime() + 9 * 3.6 * Math.pow(10,6));
    
    if (currDate.getMonth() === importantDates.JasonBday.getMonth() 
        && currDate.getDay() === importantDates.JasonBday.getDay()){
      //// JASON BDAY /////
      general.send("Happy Birthday Jason!")
    }
      
    else if (currDate.getMonth() === importantDates.CeceBday.getMonth() 
             && currDate.getDay() === importantDates.CeceBday.getDay()){
      //// CECE BDAY /////
      general.send("Happy Birthday Cece! I love you so unbelievably much and all I want to is to be with you. You're the love of my life and I want to make you the happiest person in the world. - your boyfriend hihi");
    }
      
    else if (currDate.getMonth() === importantDates.JCAnniversary.getMonth() 
             && currDate.getDay() === importantDates.JCAnniversary.getDay()){
      //// ANNIVERSARY DAY /////
      general.send("CECE ITS OUR ANNIVERSARY! I know sometimes things get hard but you make me feel like I can accomplish anything. I feel like we make the best team and life has been a blessing to live every day when I have you. - your boyfriend hihi")
    }
      
    let halfAnniversaryDate = importantDates.JCAnniversary;
    halfAnniversaryDate.month -= 6;
    if (currDate.getMonth() === halfAnniversaryDate.getMonth() 
        && currDate.getDay() === halfAnniversaryDate.getDay()){
      //// HALF ANNIVERSARY DAY /////
      general.send("CECE ITS OUR HALF YEAR ANNIVERSARY! I love you so much and I can't wait for all of the amazing things we'll get to do together. - your boyfriend hihi")
    }
  }

  /*
    send todays scheduled activity
  */
  activityJobFunction(){
    general.send('Today\'s scheduled activity is:    ' + data.getTodaysActivity());
  }

  /*
    send days until next flight
  */
  countDownJobFunction(){
    let d2 = data.nextFlightDate;
    if (d2 != null){
      
      d1 = new Date(); // now
      d1 = d1.setTime(d1.getTime() + 9 * 3.6 * Math.pow(10,6));
      
      let days = Math.ceil((d2.getTime() - d1.getTime()) / (1000 * 3600 * 24));

      if (days >= 0){
        general.send("Number of days until you're reunited: " + days);
      }
    }
  }

  /*
    save data to json file
  */
  saveFunction(){
    data.save();
  }

  /// MONTHLY ///
  /*
    send all milestone progress/congratulations
  */
  showAllMilestonesFunction(){
    let s = "";
    for (const [key,value] of Object.entries(data.milestones)) {
      s += data.milestones[key].congratulate() + '\n';
    }
    general.send(s);
  }

  /*
    end the month and return the newest updated stats, cece and jason have 0 points
  */
  lovePointsMonthlyFunction(){
    this.lovepoints.monthOver();
    general.send('At the start of the new month we have:\n' + this.lovepoints.getAllStats());
  }



  /// TEST FUNCTION ///
  testFunction(){
    this.saveFunction();
    this.activityJobFunction();
    this.lovePointsMonthlyFunction();
    this.showAllMilestonesFunction();
    this.milestoneJobFunction();
    this.importantDayJobFunction();
    this.importantDayJobFunction();
  }
}
module.exports = new Jobs();