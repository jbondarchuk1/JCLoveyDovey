const Milestone = require("./milestone.js");
const LovePoints = require('./lovepoints.js');
const Activities = require('./activities.js');
const fs = require("fs");

class Data{
  /// STATIC GLOBAL ///
  channels = { "GeneralVoice": '985167868587036706', "generalText": '985167868587036705', "nsfwText": '985459348832665691', "planningText": '985460218106355712'
             , "devText": "989151708561178694"}

  commands = fs.readFileSync('./commands.txt').toString();

  
  /// MILESTONES ///
  milestones = {
    monthsTogether : new Milestone("Months Together",5, "Congratulations! Cece and Jason, you have been together for _ months!"),
    moviesWatched: new Milestone("Movies Watched", 3, "Congratulations! Cece and Jason, you have watched _ movies together!"),
    gameNightsPlayed: new Milestone("Game Nights Played", 0, "Congratulations! Cece and Jason, you have played _ game nights together!"),
    mealsShared: new Milestone("Meals Shared", 0, "Congratulations! Cece and Jason, you have shared or cooked _ meals together!"),
  }
  

  

  /// NONSTATIC GLOBAL ///
  lovepoints = LovePoints;
  activities = Activities;
  

  importantDates = {
    CeceBday : new Date(2022,6,20),
    JasonBday : new Date(2022,8,8),
    JCAnniversary : new Date(2022,1,22)
  }

  // mm-dd-yyyy
  nextFlightDate

  setNextFlightDate(stringFlight){
    // if (typeof(stringFlight) == 'Date') this.nextFlightDate = stringFlight;
    if (typeof(stringFlight) == 'string'){
      stringFlight = stringFlight.replace(/\s/g, '');
      stringFlight = stringFlight.split('-');
      
      try{
        stringFlight.forEach(s => s = parseInt(s));
        console.log(stringFlight);
        this.nextFlightDate = new Date(stringFlight[2],stringFlight[0] - 1,stringFlight[1]);
      }catch(message){
        console.error(message);
      }
    }
  }




  /// GLOBAL METHODS ///

  toObj(){
    return {
      lovepoints: this.lovepoints,
      channels: this.channels,
      // commands: this.commands,
      milestones: this.milestones,
      activities: this.activities,
      nextFlightDate: this.nextFlightDate
    }
  }

  toString(){
    return JSON.stringify(this.toObj());
  }

  save(){
    console.log("saving");
    // try{
    //   fs.rm('./data.json', err => {
    //   if (err)
    //     console.log(err);
    //   });
    // }catch(err){
    //   console.log('err');
    // }

    fs.writeFile('./data.json', JSON.stringify(this.toObj()), err => {
          if (err) {
            console.error(err);
          }// file written successfully
        });
  }
  
  load(obj){
    this.lovepoints = obj['lovepoints'];
    this.channels = obj['channels'];
    //this.commands = obj['commands'];
    this.milestones = obj['milestones'];
    this.activities = obj['activities'];
    this.nextFlightDate = obj['nextFlightDate'];
  }
}

module.exports = new Data();
