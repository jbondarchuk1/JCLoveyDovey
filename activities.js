
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

class Activities{
  activities = "Games Movies Cooking Naughty DeepTalks Games Random".split(" ");
  daysOfTheWeek = "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" ");

  // JS object that acts like a set, containing all of the potential things we could do.
  potentialActivities = new Set(this.activities);

  addToActivitiesList(item){
    this.potentialActivities.add(item);
  }

  getRandomActivity(){
    let vals = this.potentialActivities.values();
    let l = vals.length;
    let idx = getRandomInt(l-1);
    return vals[idx];
  }
  getAllPotentialActivities(){
    return Array.from(this.potentialActivities.values()).join(', ');
  }
  removePotentialActivity(item){
    if (this.potentialActivities.has(item)){
      this.potentialActivities.delete(item);
    }
  }

  toString(){
    console.log(this.daysOfTheWeek);
    console.log(this.activities);
    let s = '';
    for (let i = 0; i < this.daysOfTheWeek.length; i++){
      s+= this.daysOfTheWeek[i] + ': \t' + this.activities[i] + '\n'; 
    }
    return s;
  }
  getActivities(){
    return this.activities;
  }

  getTodaysActivity = () => {
    let today = new Date();
    today.setTime(today.getTime() + 9 * 3.6 * Math.pow(10,6));
    let activity = this.activities[today.getDay()];
    if (activity === 'Random' || activity == 'random'){
      return this.getRandomActivity();
    }
    return activity;
  }
  
  getActivityByDay = (day) => {
    for (i = 0; i < this.daysOfTheWeek.length; i++){
      if (day === this.daysOfTheWeek[i]){
        return this.activities[i];
      }
    }
    console.log("Cannot find activity.")
    return;
  }

  getDayByIndex(index){
    if (index < this.daysOfTheWeek.length){
      return this.daysOfTheWeek[index];
    }
    console.log("Index too large");
  }

  getIndexByDay(day){
    for(let i = 0; i < this.daysOfTheWeek.length; i++){
      if (this.daysOfTheWeek[i] == day) return i;
    }
    console.log("Day not found: " + day);
  }

  changeActivityByDay(day, newActivity){
    if (typeof day === 'number'){
      if (day <= this.daysOfTheWeek.length && day >= 0){
        this.daysOfTheWeek[day] = newActivity;
      }
    }
      
    else if (typeof day === 'string'){
      let index = this.getIndexByDay(day);
      if (index <= this.daysOfTheWeek.length && index >= 0){
        this.activities[index] = newActivity;
      }
    }
    if (!this.potentialActivities.has(newActivity)){
      this.addToActivitiesList(newActivity);
    }
  }
}

module.exports = new Activities();