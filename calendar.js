var dateObj      = new Date(),
    currentDay   = dateObj.getDate(),
    currentMonth = dateObj.getMonth() + 1,
    currentYear  = dateObj.getFullYear(),
    daysInMonth;

if (currentMonth === 1 || currentMonth === 3 || currentMonth === 5 || currentMonth === 7 || currentMonth === 8 || currentMonth === 10 || currentMonth === 12) {
    daysInMonth = 31;
} else if (currentMonth === 2) {
    daysInMonth = 28;
} else {daysInMonth = 30;
    }

//var div = document.getElementById("1");
var body = document.getElementsByTagName('body');
var table = document.createElement("table");

table.setAttribute('border', '1');

//div.appendChild(table);
body.appendChild(table);

alert(currentMonth);
alert("there are " + daysInMonth + " days in the month");

if (currentDay === 1 || currentDay === 21 || currentDay === 31) {
    alert("Today is the: " + currentDay + "st");
} else if (currentDay === 2 || currentDay === 22) {
    alert("Today is the: " + currentDay + "nd");
} else {alert("Today is the: " + currentDay + "th");
    }