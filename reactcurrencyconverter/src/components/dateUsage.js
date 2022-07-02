
export function calculateNewStartDate (yearOffset,monthOffset,dayOffset){
  let currentDate = new Date();
  let newStartDate = new Date(currentDate.getFullYear() - yearOffset, currentDate.getMonth() - monthOffset, currentDate.getDate() - dayOffset) 
  let newDate = checkAndAdd0toOneDigitDate(newStartDate.getFullYear()) + '-'
    + checkAndAdd0toOneDigitDate(newStartDate.getMonth() + 1) + '-'
    + checkAndAdd0toOneDigitDate(newStartDate.getDate());
  return(newDate)
}

function checkAndAdd0toOneDigitDate (date){
  if (('' + date).length <= 1){
    date = "0" + date
  }
  return(date)
}