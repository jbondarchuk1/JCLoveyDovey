class Milestone{
  name = "";
  count = 0;
  congrats = "Congratulations! You have _"
  
  constructor(name, count, congrats){
    this.name = name;
    this.count = count;
    this.congrats = congrats;
  }

  incrementMilestoneByOne(){
    this.count++;
  }
  
  incrementMilestone(amount){
    this.count += amount;
  }

  congratulate(){
    let newCongrats = this.congrats.replace("_",this.count);
    return newCongrats;
  }

  toObj(){
    return {
      name: this.name,
      count: this.count,
      congrats: this.congrats
    }
  }
}

module.exports = Milestone