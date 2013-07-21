(function(){
"use strict";

    var dateObj = new Date(); // dateObj contains the current month in number form
    
    var model = {
        currentDay:   dateObj.getDate(),
        currentMonth: dateObj.getMonth() + 1, // In getMonth() January === 0. To stay sane I add 1
        currentYear:  dateObj.getFullYear(),
        
        calArr: [[],[],[],[],[],[]],
    
        displayedMonth: dateObj.getMonth() + 1,
        displayedYear:  dateObj.getFullYear(),  

        selectedCell:      null,
        newlySelectedCell: null,
        selectedRow:       null,
        selectedColumn:    null,
        
        prevMonth: function()
        {
            if (model.displayedMonth === 1){
                model.displayedMonth = 12;
                model.displayedYear -= 1; 
            }else {
               model.displayedMonth -= 1;
            }
            view.setDates(model.displayedMonth, model.displayedYear);
        },
        
        nextMonth: function()
        {
            if (model.displayedMonth === 12){
                model.displayedMonth = 1;
                model.displayedYear += 1; 
            }else {
               model.displayedMonth += 1;
            }
            view.setDates(model.displayedMonth, model.displayedYear);
        },

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
        
        getDaysInMonth: function()
        {
            var year = model.displayedYear;
            
            if (model.displayedMonth === 1 || model.displayedMonth === 3 || model.displayedMonth === 5 || model.displayedMonth === 7 || model.displayedMonth === 8 || model.displayedMonth === 10 || model.displayedMonth === 12){
                return 31;
            } else if (model.displayedMonth === 2) {
                /// Is it a leap year?
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
        },
        
        selectCurrentDay: function()
        {
            for(var i = 0; i < 6; ++i){
                for(var j = 0; j < 7; ++j){
                    if (parseInt(model.calArr[i][j].textContent) === model.currentDay){
                        model.newlySelectedCell = model.calArr[i][j];
                        model.selectedCell = model.calArr[i][j];
                        model.selectedRow = i;
                        model.selectedColumn = j;
                        view.highlightSelectedDay();
                    }
                }
            }
        },

        leftArrowPressed: function()
        {
            if (model.selectedColumn === 0){
                model.selectedColumn = 7;
                model.newlySelectedCell = model.calArr[model.selectedRow][model.selectedColumn -= 1];
                view.highlightSelectedDay();
            }else{
                model.newlySelectedCell = model.calArr[model.selectedRow][model.selectedColumn -= 1];
                view.highlightSelectedDay();
            }
        },
        
        upArrowPressed: function()
        {
            if (model.selectedRow === 0){
                model.selectedRow = 6;
                model.newlySelectedCell = model.calArr[model.selectedRow -= 1][model.selectedColumn];
                view.highlightSelectedDay();
            }else{
                model.newlySelectedCell = model.calArr[model.selectedRow -= 1][model.selectedColumn];
                view.highlightSelectedDay();
            }
        },
        
        downArrowPressed: function()
        {
           if (model.selectedRow === 5){
                //selectedRow is -1 so that it will be 0 in the array
                model.selectedRow = -1;
                model.newlySelectedCell = model.calArr[model.selectedRow += 1][model.selectedColumn];
                view.highlightSelectedDay();
            }else{
                model.newlySelectedCell = model.calArr[model.selectedRow += 1][model.selectedColumn];
                view.highlightSelectedDay();
            }
        },
        
        rightArrowPressed: function()
        {
            if (model.selectedColumn === 6){
                //selectedColumn is -1 so that it will be 0 in the array
                model.selectedColumn = -1;
                model.newlySelectedCell = model.calArr[model.selectedRow][model.selectedColumn += 1];
                view.highlightSelectedDay();
            }else{
                model.newlySelectedCell = model.calArr[model.selectedRow][model.selectedColumn += 1];
                view.highlightSelectedDay();
            }
        },
        spacebarPressed: function(){
            model.selectedCell.className = "";
            model.selectCurrentDay();
        }
    };

    var view = {
        monthAndYearContainer: document.getElementById("monthAndYearContainer"),
        b:                     document.getElementById("myBody"),
        table:                 document.getElementById("calendarTable"),
            
        createTable: function()
        {
            //Loops through and creates a 6x7 table for maximum amount of weeks and puts the td elements into the calArr[][]
            for (var i = 0; i < 6; ++i){
                var currentWeekRow = document.createElement("tr");
                this.table.appendChild(currentWeekRow);
                for (var j = 0; j < 7; ++j){
                    var dayCell = document.createElement("td");
                    dayCell.addEventListener("mousedown", controller.handleClick, false);
                    model.calArr[i][j] = dayCell;
                    currentWeekRow.appendChild(model.calArr[i][j]); 
                }
            }
        },
            
        setDates: function(month, year)
        {
            var startDay = model.getFirstDayOfMonth(month, year),
                day      = 1;
                
            this.monthAndYearContainer.textContent = model.getName(month) + " " + year;
            
            //clear the previous months dates
            for(var i = 0; i < 6; ++i){
                for(var j = 0; j < 7; ++j){
                    model.calArr[i][j].textContent = null;
                }
            }
   
            for (var i = 0; i < 6; ++i){
                for (var j = 0; j < 7; ++j){
                    if (i === 0 && j === 0){
                        //this makes it so the loop starts on the correct day of the week;
                        j = startDay;
                        model.calArr[i][j].textContent = day;
                        ++day;
                    } else if (day <= model.getDaysInMonth(model)){
                        model.calArr[i][j].textContent = day;
                        ++day;
                    }
                }
            }
        },
        
        highlightSelectedDay: function()
        {
            model.selectedCell.className = "";
            model.selectedCell = model.newlySelectedCell;
            model.selectedCell.className = "selected";
        }
    };
    
    var controller = {
        prevDiv: document.getElementById("prevArrow"),
        nextDiv: document.getElementById("nextArrow"),
        submitButton: document.getElementById("submitButton"),
        body: document.getElementById("myBody"),
        
        init: function()
        {
            view.createTable();
            view.setDates(model.currentMonth, model.currentYear);
            
            model.selectCurrentDay();
            
            this.body.addEventListener("keydown", controller.handleArrowKeys, false);

            this.prevDiv.addEventListener("click", model.prevMonth, false);
            this.nextDiv.addEventListener("click", model.nextMonth, false);
            this.submitButton.addEventListener("click", controller.handleSubmit, false);
        },
        handleSubmit: function()
        {
            model.displayedMonth = parseInt(document.monthYearForm.month.value);
            model.displayedYear  = parseInt(document.monthYearForm.year.value)
            view.setDates(parseInt(document.monthYearForm.month.value), parseInt(document.monthYearForm.year.value));
        },
        
        handleClick: function()
        {
            model.newlySelectedCell = this;
            model.selectedColumn = model.newlySelectedCell.cellIndex;
            model.selectedRow = model.newlySelectedCell.parentNode.rowIndex;
            model.updateCSS();
        },
        
        handleArrowKeys: function(e)
        {
            //left
            if (e.keyCode === 37){
                model.leftArrowPressed();
            }
            //up
            if (e.keyCode === 38){
                model.upArrowPressed();
            }
            //down
            if (e.keyCode === 40){
                model.downArrowPressed();
            }
            //right
            if (e.keyCode === 39){
                model.rightArrowPressed();
            }
            //space
            if (e.keyCode === 32){
                model.spacebarPressed();
            }
        }
        
    };  
    controller.init();  
}());