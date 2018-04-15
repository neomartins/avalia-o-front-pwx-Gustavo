import Moment from 'moment';

const format_date = 'YYYY-MM-DD';

export function parseDateString(str) {
	var date = '';
	if(typeof str === 'string'){
		  date = Moment(str).format(format_date);
	    return date;
	} else if (str !== null && typeof str === 'object'){
		var dateString = str.year+'-'+(str.month+1)+'-'+str.dayOfMonth+', '+str.hourOfDay+':'+str.minute+':'+str.second;
		   date = Moment(dateString).format(format_date);
		return date;
	}else{
		date = Moment(str).format(format_date);
		return date;
	}
}

export function getSystemDateByFormat(format){
	var date = new Date();
	var formattedDate = Moment(date).format(format);
	return formattedDate;
}


