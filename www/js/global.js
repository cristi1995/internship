function month(i){
	switch (i) {
        case 0:
        	return 'Ianuarie';
        case 1:
        	return 'Februarie';
        case 2:
        	return 'Martie';
        case 3: 
        	return 'Aprilie';
    	case 4:
    		return 'Mai';
		case 5:
			return 'Iunie';
		case 6:
			return 'Iulie';
		case 7:
			return 'August';
		case 8:
			return 'Septembrie';
		case 9:
			return 'Octombrie';
		case 10:
			return 'Noiembrie';
		case 11:
			return 'Decembrie'
        default:
        	return ' '
    }
}


function decodeEntities(input) {
	var y = document.createElement('textarea');
	y.innerHTML = input;
	return y.value;		
}	