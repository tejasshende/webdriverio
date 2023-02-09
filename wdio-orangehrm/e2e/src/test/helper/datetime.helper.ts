
import moment from "moment"

/**
 * @param inpStartDate 
 * @param inpEndDate 
 * @returns this function will return the dates between the given date range
 */
function getDateRange(inpStartDate:string, inpEndDate:string) {
    try {
        var dateArray = [];
        var startDate = moment(new Date(inpStartDate)).format('YYYY-MM-DD')
        var endDate = moment(new Date(inpEndDate)).format('YYYY-MM-DD')
        if(startDate > endDate){
            throw new Error("Invalid Item date range. Start date can not be greter than end date");
        }else{
            while (moment(new Date(startDate)).format('YYYY-MM-DD') <= moment(new Date(endDate)).format('YYYY-MM-DD')) {
                dateArray.push(moment(startDate,moment.ISO_8601).format('DD-MMM-YYYY'))
                startDate = moment(startDate,moment.ISO_8601).add(1, 'days').format().toString();
            }
        }

        console.log(`Date range is ${dateArray}`);
        

    } catch (err) {
        console.log(err);
    }
    //  returning the date array
    return dateArray
}

/**
 * @returns this function will return current UTC date in YYYYMMDD HH:MM:SS format 
 */
function getUTCCurrentDateTime(){

    let date = new Date();
    return date.getUTCFullYear() +""+ (date.getUTCMonth()+1) +""+ date.getUTCDate() + " " + date.getUTCHours() + ":" + date.getUTCMinutes() + ":" + date.getUTCSeconds();
    
}

/**
 * @returns this function will return local date and time, the format is YYYY-MM-DDTHH:MM:SS.000Z
*/
function getCurrentLocalDateTime () {
    return new Date()
}

/**
 * @param inputDate 
 * @param inputDateFormat 
 * @param expectedDateFormat 
 * @returns this function will convert date in user input format 
 */
function convertInputDate(inputDate:string,inputDateFormat:string,expectedDateFormat:string) {
    // var date = moment('01-01-2022', 'DD-MM-YYYY').format('YYYYMMDD');
    return moment(inputDate, inputDateFormat).format(expectedDateFormat);    
}

/**
 * @param inputEpochtime 
 * @returns this function will return human readable timestamp from given epoch time
 */
function getHumanReadableTimestampfromEPOCH(inputEpochtime: string){
    return new Date(inputEpochtime)
}

export default { getDateRange, getUTCCurrentDateTime, getCurrentLocalDateTime, convertInputDate, getHumanReadableTimestampfromEPOCH }