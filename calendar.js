(function(){
"use strict";

    ///The formula: N = d + 2m + [3(m+1)/5] + y + [y/4] - [y/100] + [y/400] + 2

    var dateObj =  new Date(); // dateObj contains the current month in number form
    
    var dayObj = {
    currentDay:  dateObj.getDate(),
    };
    
    //create a month object; monthObj should have .name and .daysInMonth defined
    var monthObj = {
    
        currentMonth: dateObj.getMonth() + 1, // In getMonth() January === 0. To stay sane I add 1

        //getName: goes through the if statements and returns a string of the name of the current month
        getName: function(currentMonthNumber)
        {
            if (currentMonthNumber === 1)  {return "January"}
            if (currentMonthNumber === 2)  {return "February"}
            if (currentMonthNumber === 3)  {return "March"}
            if (currentMonthNumber === 4)  {return "April"}
            if (currentMonthNumber === 5)  {return "May"}
            if (currentMonthNumber === 6)  {return "June"}
            if (currentMonthNumber === 7)  {return "July"}
            if (currentMonthNumber === 8)  {return "August"}
            if (currentMonthNumber === 9)  {return "September"}
            if (currentMonthNumber === 10) {return "October"}
            if (currentMonthNumber === 11) {return "November"}
            if (currentMonthNumber === 12) {return "December"}
        },

       //getDaysInMonth: returns the amount of days in the current month
        getDaysInMonth: function()
        {
            var year = dateObj.getFullYear();
            
            if (this.currentMonth === 1 || this.currentMonth === 3 || this.currentMonth === 5 || this.currentMonth === 7 || this.currentMonth === 8 || this.currentMonth === 10 || this.currentMonth === 12){
                return 31;
            } else if (this.currentMonth === 2) {
                /// Is it a leap year?
                /// Leap years are divisible by 4 but not by 100, unless they are also divisible by 400.
                /// E.g., 2000 is divisible by 4 (maybe it is), and by 100 (maybe it isn't), but also by 400 (yes it is); so it is a leap year.
                if (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)) {
                    return 29;
                } else {
                    return 28;
                }
            } else {return 30; }
        }
    };

    //create calendar object
    var calendar = {

        currentYear: dateObj.getFullYear(),
        
        init: function(){
            var b             = document.getElementById("myBody"),
                monthTitle    = document.getElementById("monthTitle"),
                table         = document.createElement("table"),
                day           = 1,
                calArr        = [[],[],[],[],[],[],[]];
                
            //table.setAttribute('border', '1');   
            monthTitle.textContent = monthObj.getName(monthObj.currentMonth);
            b.appendChild(table);

            //Loops through and creates a 6x7 table for maximum amount of weeks
            for (var i = 0; i < 6; ++i){
                var currentWeekRow = document.createElement("tr");
                table.appendChild(currentWeekRow);
                for (var j = 0; j < 7; ++j){
                    var dayCell  = document.createElement("td");
                    calArr[i][j] = dayCell;
                    currentWeekRow.appendChild(calArr[i][j]); 
                }
            }
        }        
    };
    
/***** Calculates the current day of the week after %ing the result by 7. if Janurary or February add 12 to the month and subtract the year by 1.
********* Saturday === 0, Sunday === 1, Monday === 2, Tuesday === 3, Wednesday === 4, Thursday === 5, Friday === 6********

    var N = null,
        d = dayObj.currentDay,
        m = monthObj.currentMonth,
        y = calendar.currentYear;
        
    N = d + (2*m) + Math.floor((3*(m+1)/5)) + y + Math.floor((y/4)) - Math.floor((y/100)) + Math.floor((y/400)) + 2;
    
   console.log(N%7);
*******/

    calendar.init();
}());