module.exports = class timeSpan {
    /**
     * Creates a timespan
     *
     * @param {number} milliseconds Timespan in milliseconds
     */
    constructor(milliseconds) {
        this.time = milliseconds
    }

    /**
     * Returns the total amount of seconds
     * 
     * @returns {number} Total amount of seconds
     */
    getSeconds(){
        return Math.floor(this.time / 1000)
    }

    /**
     * Adds a specified amount of seconds to the object's time
     * 
     * @param {number} seconds the amount of seconds that will be added
     */
     addSeconds(seconds){
        this.time += (seconds*1000)
    }

    /**
     * Removes a specified amount of seconds from the object's time
     * 
     * @param {number} seconds the amount of seconds that will be removed
     */
     removeSeconds(seconds){
        this.time -= (seconds*1000)
    }

    /**
     * Returns the total amount of minutes
     * 
     * @returns {number} Total amount of minutes
     */
     getMinutes(){
        return Math.floor(this.time / 60000)
    }

    /**
     * Adds a specified amount of minutes to the object's time
     * 
     * @param {number} minutes the amount of minutes that will be added
     */
     addMinutes(minutes){
        this.time += (minutes*60000)
    }

    /**
     * Removes a specified amount of minutes from the object's time
     * 
     * @param {number} minutes the amount of minutes that will be removed
     */
     removeMinutes(minutes){
        this.time -= (minutes*60000)
    }

    /**
     * Returns the total amount of hours
     * 
     * @returns {number} Total amount of hours
     */
     getHours(){
        return Math.floor(this.time / 3600000)
    }

    /**
     * Adds a specified amount of hours to the object's time
     * 
     * @param {number} hours the amount of hours that will be added
     */
     addHours(hours){
        this.time += (hours*3600000)
    }

    /**
     * Removes a specified amount of hours from the object's time
     * 
     * @param {number} hours the amount of hours that will be removed
     */
     removeHours(hours){
        this.time -= (hours*3600000)
    }

    /**
     * Returns the total amount of days
     * 
     * @returns {number} Total amount of days
     */
     getDays(){
        return Math.floor(this.time / 86400000)
    }

    /**
     * Adds a specified amount of days to the object's time
     * 
     * @param {number} days the amount of days that will be added
     */
     addDays(days){
        this.time += (days*3600000)
    }

    /**
     * Removes a specified amount of days from the object's time
     * 
     * @param {number} days the amount of days that will be removed
     */
     removeDays(days){
        this.time -= (days*3600000)
    }

    /**
     * Returns the total amount of weeks
     * 
     * @returns {number} Total amount of weeks
     */
     getWeeks(){
        return Math.floor(this.time / 604800000)
    }

    /**
     * Returns the total amount of years
     * 
     * @returns {number} Total amount of years
     */
     getYears(){
        return Math.floor(this.time / 31557600000)
    }

    /**
     * Returns the total time in seconds, minutes, hours, days and years
     * 
     * @returns {object} Detailed time
     */
    getDetailedTime(){
        let fullTime = this.time

        let years = this.getYears()
        this.time -= years * 31557600000
        let days = this.getDays()
        this.time -= days * 86400000
        let hours = this.getHours()
        this.time -= hours * 3600000
        let minutes = this.getMinutes()
        this.time -= minutes * 60000
        let seconds = this.getSeconds()
        this.time -= seconds * 1000

        this.time = fullTime
        return {"seconds": seconds, "minutes": minutes, "hours": hours, "days": days, "years": years}
    }

    /**
     * Returns the total time in seconds, minutes, hours, days and years (but beautified)
     * 
     * @returns {string} Beautified time
     */
     getBeautifiedTime(){
        let detailedTime = this.getDetailedTime()

        let result = ""
        if(detailedTime.years !== 0){
            result += detailedTime.years + "y | "
        }
        if(detailedTime.days !== 0){
            result += detailedTime.days + "d | "
        }
        if(detailedTime.hours !== 0){
            result += detailedTime.hours + "h | "
        }
        if(detailedTime.minutes !== 0){
            result += detailedTime.minutes + "m | "
        }
        if(detailedTime.seconds !== 0){
            result += detailedTime.seconds + "s | "
        }

        result = result.substring(0, result.length - 3)
        return result
    }

    /**
     * Returns the total time in a suitable unit
     * 
     * @returns {object} timespan in a suitable time unit
     */
    getSuitableTime(){
        // less than a minute => return seconds
        if (this.time / 1000 < 60){
            return {unit: "second", unit_short: "secs", unit_shortest: "s", amount_fixed: parseFloat((this.time/1000).toFixed(2)), amount_round: Math.round(this.time/1000), amount_exact: this.time/1000}
        }

        // less than an hour => return minutes
        if (this.time / 60000 < 60){
            return {unit: "minute", unit_short: "mins", unit_shortest: "m", amount_fixed: parseFloat((this.time/60000).toFixed(2)), amount_round: Math.round(this.time/60000), amount_exact: this.time/60000}
        }

        // less than a day => return hours
        if (this.time / 3600000 < 24){
            return {unit: "hour", unit_short: "hrs", unit_shortest: "h", amount_fixed: parseFloat((this.time/3600000).toFixed(2)), amount_round: Math.round(this.time/3600000), amount_exact: this.time/3600000}
        }

        // less than a year => return days
        if (this.time / 86400000 < 365.25){
            return {unit: "day", unit_short: "days", unit_shortest: "d", amount_fixed: parseFloat((this.time/86400000).toFixed(2)), amount_round: Math.round(this.time/86400000), amount_exact: this.time/86400000}
        }
        
        // return years
        return {unit: "year", unit_short: "yrs", unit_shortest: "y", amount_fixed: parseFloat((this.time/31557600000).toFixed(2)), amount_round: Math.round(this.time/31557600000), amount_exact: this.time/31557600000}
    }

    /**
     * Returns the current midnight timestamp based on the unix-time of the object's milliseconds
     * 
     * @returns {number} current midnight timestamp of the specified day
     */
    getCurrentMidnightStamp(){
        let d = new Date(this.time)
        d.setHours(0, 0, 0, 0)
        return + d
    }

    /**
     * Returns the next midnight timestamp based on the unix-time of the object's milliseconds
     * 
     * @returns {number} midnight timestamp of the day after the specified day
     */
     getNextMidnightStamp(){
        let d = new Date(this.time)
        d.setHours(24, 0, 0, 0)
        return + d
    }
}