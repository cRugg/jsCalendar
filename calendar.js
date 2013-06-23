(function(){
"use strict";

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
        getDaysInMonth: function(c)
        {
            var year = c.displayedYear;
            
            if (c.displayedMonth === 1 || c.displayedMonth === 3 || c.displayedMonth === 5 || c.displayedMonth === 7 || c.displayedMonth === 8 || c.displayedMonth === 10 || c.displayedMonth === 12){
                return 31;
            } else if (c.displayedMonth === 2) {
                /// Is it a leap year?
                /// Leap years are divisible by 4 but not by 100, unless they are also divisible by 400.
                /// E.g., 2000 is divisible by 4 (maybe it is), and by 100 (maybe it isn't), but also by 400 (yes it is); so it is a leap year.
                if (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)) {
                    return 29;
                } else {
                    return 28;
                }
            } else {return 30; }
        },
        
        getFirstDayOfMonth: function(month, year)
        {
            var N = null,
                d = 1,
                m = month,
                y = year;
            
            //January and February will only work if they are the 13th or 14th month of the previous year.
            if (m === 1){
                m = 13;
                y -= 1;
            } else if (m === 2){
                m = 14;
                y -= 1;
            }
            
            N = d + (2*m) + Math.floor((3*(m+1)/5)) + y + Math.floor((y/4)) - Math.floor((y/100)) + Math.floor((y/400)) + 2;
            
            //Sunday is now 0, Mon === 1, ect. Saturday === 6; Makes the setDates function cleaner
            if (N%7 === 0){
                N = 6;
                return N;
            } else {
                return N%7 - 1;
            }
        }
    };

    //create calendar object
    var calendar = {

        currentYear:    dateObj.getFullYear(),
        calArr:         [[],[],[],[],[],[],[]],
        displayedMonth: monthObj.currentMonth,
        displayedYear:  dateObj.getFullYear(),

        monthAndYearContainer: document.getElementById("monthAndYearContainer"),
        
        init: function()
        {
            var b     = document.getElementById("myBody"),
                table = document.createElement("table");
           
            this.monthAndYearContainer.textContent = monthObj.getName(monthObj.currentMonth) + " " + this.currentYear;
            b.appendChild(table);

            //Loops through and creates a 6x7 table for maximum amount of weeks
            for (var i = 0; i < 6; ++i){
                var currentWeekRow = document.createElement("tr");
                table.appendChild(currentWeekRow);
                for (var j = 0; j < 7; ++j){
                    var dayCell = document.createElement("td");
                    this.calArr[i][j] = dayCell;
                    currentWeekRow.appendChild(this.calArr[i][j]); 
                }
            }
        },
        
        setDates: function(month, year, c)
        {
            var startDay = monthObj.getFirstDayOfMonth(month, year),
                day      = 1;
            c.monthAndYearContainer.textContent = monthObj.getName(month) + " " + this.displayedYear;
            
            //clear the previous months dates
            for(var i = 0; i < 6; ++i){
                for(var j = 0; j < 7; ++j){
                    c.calArr[i][j].textContent = null;
                }
            }
   
            for (var i = 0; i < 6; ++i){
                for (var j = 0; j < 7; ++j){
                    if (i === 0 && j === 0){
                        j = startDay;
                        c.calArr[i][j].textContent = day;
                        ++day;
                    } else if (day <= monthObj.getDaysInMonth(this)){
                        c.calArr[i][j].textContent = day;
                        ++day;
                    }
                }
            }
        }    
    };
    
    var prevDiv = document.getElementById("prevArrow"),
        nextDiv = document.getElementById("nextArrow");
    //Is there a better place / way to do the onclick stuff?
    prevDiv.onclick = function(){
        if (calendar.displayedMonth === 1){
            calendar.displayedMonth = 12;
            calendar.displayedYear -= 1; 
        }else {
           calendar.displayedMonth -= 1;
        }
        calendar.setDates(calendar.displayedMonth, calendar.displayedYear, calendar);
    };
    
    nextDiv.onclick = function(){
        if (calendar.displayedMonth === 12){
            calendar.displayedMonth = 1;
            calendar.displayedYear += 1;
        }else {
            calendar.displayedMonth += 1;
        }
        calendar.setDates(calendar.displayedMonth, calendar.displayedYear, calendar);
    };

    calendar.init();
    calendar.setDates(monthObj.currentMonth, calendar.currentYear, calendar);
}());