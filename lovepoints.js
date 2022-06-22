class LovePoints{
  cecePoints = 0;
  jasonPoints = 0;
  recordPointsInOneMonth = 0;
  totalPointsOverall = 0; 

  jasonPoint(){
    this.jasonPoints++;
  }
  cecePoint(){
    this.cecePoints++;
  }

  monthOver(){
    this.recordPointsInOneMonth = Math.max(
      this.recordPointsInOneMonth, this.jasonPoints + this.cecePoints
    );
    this.totalPointsOverall += this.jasonPoints + this.cecePoints;
    this.cecePoints = 0;
    this.jasonPoints = 0;
  }

  get getJasonPoints(){
    return this.jasonPoints;
  }
  get getCecePoints(){
    return this.cecePoints;
  }
  getThisMonthPoints(){
    return this.jasonPoints + this.cecePoints;
  }
  getAllStats(){
    let s = `
      This month's points: ${this.getThisMonthPoints()}
        Jason: ${this.jasonPoints}
        Cece:  ${this.cecePoints}

      Total Points Overall: ${this.totalPointsOverall}
      Record for one month points: ${this.recordPointsInOneMonth}
        `


      return s;
  }
}

module.exports = new LovePoints();