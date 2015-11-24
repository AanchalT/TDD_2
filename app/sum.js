module.exports=function(number){
	if(isNaN(number))
		return 0;
	var sumOfDigits=0;
	var remainder;
	while(number>0){
		sumOfDigits = sumOfDigits + (number%10);
		number = Math.floor(number/10);
		}
	return sumOfDigits;
}