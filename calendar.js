(function(){

   


    var calendar = {
    
    
    
        dateObj:     new Date(),
        currentDay:  dateObj.getDate(),
        month:       calendar.monthCreator.createMonth(),
        currentYear: dateObj.getFullYear(),
        daysInMonth:,
        day = 1,
        i = 0,
        j = 0,
        currentMonthName: ;
    
    
    monthCreator: function createMonth(){
            
            var month = {
            
                currentMonth: dateObj.getMonth() + 1, // In getMonth() January === 0, to stay sane I add 1 here
                
                name: getName(),
                
                getName: function(){
                    if (currentMonth === 1)  {return "January"};
                    if (currentMonth === 2)  {return "February"};
                    if (currentMonth === 3)  {return "March"};
                    if (currentMonth === 4)  {return "April"};
                    if (currentMonth === 5)  {return "May"};
                    if (currentMonth === 6)  {return "June"};
                    if (currentMonth === 7)  {return "July"};
                    if (currentMonth === 8)  {return "August"};
                    if (currentMonth === 9)  {return "September"};
                    if (currentMonth === 10) {return "October"};
                    if (currentMonth === 11) {return "November"};
                    if (currentMonth === 12) {return "December"};
                },
                
                dayInMonth: getDaysInMonth(),
                
                function getDaysInMonth(){
                    if (currentMonth === 1 || currentMonth === 3 || currentMonth === 5 || currentMonth === 7 || currentMonth === 8 || currentMonth === 10 || currentMonth === 12) {
                        return 31;
                    } else if (currentMonth === 2) {
                       return = 28;
                    } else {return = 30; }
                }
            }
            return new month;
        }
        
        
        
       
        if (currentMonth === 1 || currentMonth === 3 || currentMonth === 5 || currentMonth === 7 || currentMonth === 8 || currentMonth === 10 || currentMonth === 12) {
            daysInMonth = 31;
        } else if (currentMonth === 2) {
            daysInMonth = 28;
        } else {daysInMonth = 30; }

        var b             = document.getElementById("myBody"),
            monthTitle    = document.createElement("h1"),
            monthTextNode = document.createTextNode(currentMonthName),        
            table         = document.createElement("table");

        table.setAttribute('border', '1');   
        monthTitle.appendChild(monthTextNode);
        b.appendChild(monthTitle);
        b.appendChild(table);

        for (i = 0; i < 4; ++i){
            var currentWeekRow = document.createElement("tr");
            table.appendChild(currentWeekRow);

            if (currentMonth === 1 || currentMonth === 3 || currentMonth === 5 || currentMonth === 7 || currentMonth === 8 || currentMonth === 10 || currentMonth === 12){
                for (j = 0; j <= 7; ++j){
                    var dayCell     = document.createElement("td"),
                        dayTextNode = document.createTextNode(day);

                    ++day;
                    dayCell.appendChild(dayTextNode);
                    currentWeekRow.appendChild(dayCell); 
                }
            } else if (currentMonth === 2){
                for (j = 0; j <= 7; ++j){
                    if (day <= 28){
                        var dayCell     = document.createElement("td");
                        var dayTextNode = document.createTextNode(day);
                        ++day;
                        dayCell.appendChild(dayTextNode);
                        currentWeekRow.appendChild(dayCell);
                    }
                }
            } else {
                for (j = 0; j <= 7; ++j){
                    if (day <= 30){
                        var dayCell     = document.createElement("td");
                        var dayTextNode = document.createTextNode(day);
                        ++day;
                        dayCell.appendChild(dayTextNode);
                        currentWeekRow.appendChild(dayCell); 
                    }
                }
            }
        }
    };
}());