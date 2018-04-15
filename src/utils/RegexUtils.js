export function validateHour24Format(hour) {
	if(hour==null || hour == undefined){
		return true;
	}
	hour = hour.replace( /^\D+/g, '');
    hour = hour.replace( '_', '');
    if(hour == ''){
    	return true;
    }
	var regex  = new RegExp('^([0-2]|[0-1][0-9]|2[0-3])$');

    return regex.test(hour);
}

export function validateMinutes(minutes) {
	if(minutes==null || minutes == undefined){
		return true;
	}
	minutes = minutes.replace( /^\D+/g, '');
    minutes = minutes.replace( '_', '');
    if(minutes == ''){
    	return true;
    }
	var regex  = new RegExp('^([0-5]|[0-5][0-9])$');
    
    return regex.test(minutes);
}

export function validateHoursAndMinutes24Format(time){
   var res = time.split(':');
   var hours = res[0].replace( /^\D+/g, '');
   hours = hours.replace( '_', '');

   var minutes = res[1].replace( /^\D+/g, '');
   minutes = minutes.replace( '_', '');

   return validateHour24Format(hours) && validateMinutes(minutes);    
}

export function validateYYYY_MM_DD_HH_mm(time){
	var regex = new RegExp('^((0[1-9]|[12]\d|3[01]))[-\/]((0[1-9]|1[012]))[-\/]((\d{4})[ ]([0-2]|[0-1][0-9]|2[0-3])[:]([0-5]|[0-5][0-9]))$');
	return regex.test(time);
}