// CITY NAMES
var city1 = "Phoenix";
var city2 = "Paris";
var city3 = "";

// URLs
var urlCurrent1 = "http://api.apixu.com/v1/current.json?key=bfb9a2adb25e460db10191447162511&q="+city1;
var urlCurrent2 = "http://api.apixu.com/v1/current.json?key=bfb9a2adb25e460db10191447162511&q="+city2;
// urlCurrent3 found in get3rdCityData()

var urlForecast1 = "http://api.apixu.com/v1/forecast.json?key=bfb9a2adb25e460db10191447162511&q="+city1;
var urlForecast2 = "http://api.apixu.com/v1/forecast.json?key=bfb9a2adb25e460db10191447162511&q="+city2;
var urlForecast3 = "http://api.apixu.com/v1/forecast.json?key=bfb9a2adb25e460db10191447162511&q="+city3;

// REQUEST OBJS
var request1 = new XMLHttpRequest();
var request2 = new XMLHttpRequest();
var request3 = new XMLHttpRequest();
var request4 = new XMLHttpRequest();
var request5 = new XMLHttpRequest();
var request6 = new XMLHttpRequest();

// FLAGS
var firstCityReady = false;
var secondCityReady = false;
var isThirdCitySelected = false;

// OBJS
var city1current = {};
var city2current = {};
var city3current = {};

var city1forecast = {};
var city2forecast = {};
var city3forecast = {};

var diff1 = {};
var diff2 = {};
var diff3 = {};

// GLOBAL VARS
var time1 = 0;
var time2 = 0;
var time3 = 0;
var temp1 = 0;
var temp2 = 0;
var temp3 = 0;
var feels1 = 0;
var feels2 = 0;
var feels3 = 0;
var hum1 = 0;
var hum2 = 0;
var hum3 = 0;
var wind1 = 0;
var wind2 = 0;
var wind3 = 0;


window.onload=init;

/*
*   App startup
*/
function init(){
    var buttonElement1 = document.getElementById("selection");
    buttonElement1.onchange=preget3rdCityData;  //listen for click on selection button
    var buttonElement2 = document.getElementById("refresh");
    buttonElement2.onclick=refreshTableAndDashboard;  //listen for click on refresh button
    
    var buttonElement3 = document.getElementById("forecastCity1");
    buttonElement3.onclick=get1stCityForecast;  //listen for click on forecastCity1 button
    var buttonElement4 = document.getElementById("forecastCity2");
    buttonElement4.onclick=get2ndCityForecast;  //listen for click on forecastCity2 button
    var buttonElement5 = document.getElementById("forecastCity3");
    buttonElement5.onclick=get3rdCityForecast;  //listen for click on forecastCity3 button
    var buttonElement6 = document.getElementById("closebtn");
    buttonElement6.onclick=resetAlert;  //listen for click on close alert button    
    get1stCityData(false);
    get2ndCityData(false);
}

// get1stCityData
// make url request for first city current data
function get1stCityData(refresh){
    request1.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var city1json = JSON.parse(this.responseText);
            var result = typeof(city1json.error);
            if ((result==='undefined')){
                city1current.name = city1json.location.name;
                city1current.temp = city1json.current.temp_f;
                city1current.feelsLikeTemp = city1json.current.feelslike_f;
                city1current.hum = city1json.current.humidity;
                city1current.wind = city1json.current.wind_mph;
                city1current.lastUpdated = city1json.current.last_updated;
                city1current.epoch = city1json.location.localtime_epoch;
                city1current.condition = city1json.current.condition.text;
                city1current.date = getRegularDate(city1current.lastUpdated);
                firstCityReady = true;
            }
            else{
                city1current.name = "";
                city1current.temp = "";
                city1current.feelsLikeTemp = "";
                city1current.hum = "";
                city1current.wind = "";
                city1current.lastUpdated = "";
                city1current.epoch = "";
                city1current.condition = "";
                city1current.date = city1json.error.message;
                firstCityReady = true;
            }
            displayCityRowData(refresh,city1current,city1json,0); //display city #1 (Phoenix) weather data in row 0
         }
        if ((this.readyState == 4) && (this.status >399) && (this.status < 500)) {
            city1current.name = "";
            city1current.temp = "";
            city1current.feelsLikeTemp = "";
            city1current.hum = "";
            city1current.wind = "";
            city1current.lastUpdated = "";
            city1current.epoch = "";
            city1current.condition = "";
            city1current.date = "That didn't seem to work.";
            firstCityReady = true;
            displayCityRowData(refresh,city1current,city1json,0); //display city #1 (Phoenix) weather data in row 0            
        }
        if ((this.readyState == 4) && (this.status >499) && (this.status < 600)) {
            city1current.name = "";
            city1current.temp = "";
            city1current.feelsLikeTemp = "";
            city1current.hum = "";
            city1current.wind = "";
            city1current.lastUpdated = "";
            city1current.epoch = "";
            city1current.condition = "";
            city1current.date = "Network error: server is not available.";
            firstCityReady = true;
            displayCityRowData(refresh,city1current,city1json,0); //display city #1 (Phoenix) weather data in row 0            
        }

    };
    request1.open("GET", urlCurrent1, true);
    request1.send();
}

// get2ndCityData
// make url request for second city current data
function get2ndCityData(refresh){
    request2.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var city2json = JSON.parse(this.responseText);
            var result = typeof(city2json.error);
            if ((result==='undefined')){
                city2current.name = city2json.location.name;
                city2current.temp = city2json.current.temp_f;
                city2current.feelsLikeTemp = city2json.current.feelslike_f;
                city2current.hum = city2json.current.humidity;
                city2current.wind = city2json.current.wind_mph;
                city2current.lastUpdated = city2json.current.last_updated;
                city2current.epoch = city2json.current.last_updated_epoch;
                city2current.condition = city2json.current.condition.text;
                city2current.date = getRegularDate(city2current.lastUpdated);
                secondCityReady = true;
            }
            else{
                city2current.name = "";
                city2current.temp = "";
                city2current.feelsLikeTemp = "";
                city2current.hum = "";
                city2current.wind = "";
                city2current.lastUpdated = "";
                city2current.epoch = "";
                city2current.condition = "";
                city2current.date = city2json.error.message;
                secondCityReady = true;
            }
            displayCityRowData(refresh,city2current,city2json,1);  //display city #2 (Paris) weather data in row 1
        }
        if ((this.readyState == 4) && (this.status >399) && (this.status < 500)) {
            city2current.name = "";
            city2current.temp = "";
            city2current.feelsLikeTemp = "";
            city2current.hum = "";
            city2current.wind = "";
            city2current.lastUpdated = "";
            city2current.epoch = "";
            city2current.condition = "";
            city2current.date = "That didn't seem to work.";
            secondCityReady = true;
            displayCityRowData(refresh,city2current,city2json,1); //display city #1 (Phoenix) weather data in row 0            
        }
        if ((this.readyState == 4) && (this.status >499) && (this.status < 600)) {
            city2current.name = "";
            city2current.temp = "";
            city2current.feelsLikeTemp = "";
            city2current.hum = "";
            city2current.wind = "";
            city2current.lastUpdated = "";
            city2current.epoch = "";
            city2current.condition = "";
            city2current.date = "Network error: server is not available.";
            secondCityReady = true;
            displayCityRowData(refresh,city2current,city2json,1); //display city #1 (Phoenix) weather data in row 0            
        }

    };
    request2.open("GET", urlCurrent2, true);
    request2.send();
}

function preget3rdCityData(){
    get3rdCityData(false);
}

// get3rdCityData
// make url request for third city current data
function get3rdCityData(refresh){
    var sel = document.getElementById('selection');
    city3 = sel.value;
    var urlCurrent3 = "http://api.apixu.com/v1/current.json?key=bfb9a2adb25e460db10191447162511&q="+city3;

    if (city3 != ''){                   //city was selected from drop down for city #3
        isThirdCitySelected = true;
        request3.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var city3json = JSON.parse(this.responseText);
                var result = typeof(city3json.error);
                if ((result==='undefined')){
                    city3current.name = city3json.location.name;
                    city3current.temp = city3json.current.temp_f;
                    city3current.feelsLikeTemp = city3json.current.feelslike_f;
                    city3current.hum = city3json.current.humidity;
                    city3current.wind = city3json.current.wind_mph;
                    city3current.lastUpdated = city3json.current.last_updated;
                    city3current.epoch = city3json.current.last_updated_epoch;
                    city3current.condition = city3json.current.condition.text;
                    city3current.date = getRegularDate(city3current.lastUpdated);
                }
                else{
                    city3current.name = "";
                    city3current.temp = "";
                    city3current.feelsLikeTemp = "";
                    city3current.hum = "";
                    city3current.wind = "";
                    city3current.lastUpdated = "";
                    city3current.epoch = "";
                    city3current.condition = "";
                    city3current.date = city3json.error.message;
                }

                displayCityRowData(refresh,city3current,city3json,2);  //display city #3 (user selected city) weather data in row 2
            }
            if ((this.readyState == 4) && (this.status >399) && (this.status < 500)) {
                city3current.name = "";
                city3current.temp = "";
                city3current.feelsLikeTemp = "";
                city3current.hum = "";
                city3current.wind = "";
                city3current.lastUpdated = "";
                city3current.epoch = "";
                city3current.condition = "";
                city3current.date = "That didn't seem to work.";
                displayCityRowData(refresh,city3current,city3json,2); //display city #1 (Phoenix) weather data in row 0            
            }
            if ((this.readyState == 4) && (this.status >499) && (this.status < 600)) {
                city3current.name = "";
                city3current.temp = "";
                city3current.feelsLikeTemp = "";
                city3current.hum = "";
                city3current.wind = "";
                city3current.lastUpdated = "";
                city3current.epoch = "";
                city3current.condition = "";
                city3current.date = "Network error: server is not available.";
                displayCityRowData(refresh,city3current,city3json,2); //display city #1 (Phoenix) weather data in row 0            
        }

        };
    request3.open("GET", urlCurrent3, true);
    request3.send();       
    }
    if (city3 == ''){                   //no city was selected from drop down for city #3 (default)
        isThirdCitySelected = false;
        //clearCityDisplay(2);
        document.getElementById("r2time").innerHTML = '';
        document.getElementById("r2temp").innerHTML = '';
        document.getElementById("feelsLikeTemp2").innerHTML = '';
        document.getElementById("r2hum").innerHTML = '';
        document.getElementById("r2wind").innerHTML = '';
        document.getElementById("r2cond").innerHTML = '';
    }
}

// displayCityRowData
// displays current weather for requesting city
// updates dashboard
function displayCityRowData(refresh,set,cityData,row) {
    if (!(refresh)){
        row = row.toString();
        document.getElementById("r"+row+"time").innerHTML = set.date;
        if (set.temp!="")
            document.getElementById("r"+row+"temp").innerHTML = set.temp + " &degF";
        if (set.feelsLikeTemp!="")
            document.getElementById("feelsLikeTemp"+row).innerHTML = '<i>Feels like: </i>' +  set.feelsLikeTemp + " &degF";
        if (set.hum!="")
            document.getElementById("r"+row+"hum").innerHTML = set.hum + "%";
        if (set.wind!="")
            document.getElementById("r"+row+"wind").innerHTML = set.wind + " mph";
        if (set.condition!="")
            document.getElementById("r"+row+"cond").innerHTML = set.condition;
        getDashboard();        
    }
    else {
        if (city1current.epoch!="") 
            diff1.timeDiff = city1current.epoch-time1;
        else
            diff1.timeDiff = "";

        if (city2current.epoch!="") 
            diff2.timeDiff = city2current.epoch-time2;
        else
            diff2.timeDiff = "";

        if (city3current.epoch!="") 
            diff3.timeDiff = city3current.epoch-time3;
        else
            diff3.timeDiff = "";

       if (city1current.temp!="")
           diff1.tempDiff = city1current.temp-temp1;
        else
            diff1.tempDiff = "";
        
       if (city2current.temp!="")
            diff2.tempDiff = city2current.temp-temp2;
        else
            diff2.tempDiff = "";

       if (city3current.temp!="")
           diff3.tempDiff = city3current.temp-temp3;
        else
            diff3.tempDiff = "";
        
        diff1.tempFeelsDiff = city1current.feelsLikeTemp-temp1;
        diff2.tempFeelsDiff = city2current.feelsLikeTemp-temp2;
        diff3.tempFeelsDiff = city3current.feelsLikeTemp-temp3;
        
        if (city1current.hum!="")
            diff1.humDiff = city1current.hum-hum1;
        else
            diff1.humDiff="";
        
        if (city2current.hum!="")
            diff2.humDiff = city2current.hum-hum2;
        else
            diff2.humDiff="";

        if (city3current.hum!="")
            diff3.humDiff = city3current.hum-hum3;
                else
            diff2.humDiff="";

        
        if (city1current.wind!="")
            diff1.windDiff = city1current.wind-wind1;
        else
            diff1.windDiff="";
        
        if (city2current.wind!="")
            diff2.windDiff = city2current.wind-wind2;
        else
            diff2.windDiff="";

        if (city3current.wind!="")
            diff3.windDiff = city3current.wind-wind3;
        else
            diff3.windDiff="";
        
        if (row =="0")
            displayRefreshData(diff1, set,cityData,row);
        if (row =="1")
            displayRefreshData(diff2, set,cityData,row);
        if (row =="2")
            displayRefreshData(diff3, set,cityData,row);
    }

}

// displayRefreshData
// updates table display with refreshed data
function displayRefreshData(diffSet, set, cityData, row) {
    //display legend
    document.getElementById("legend").innerHTML = "<img src='.\\images\\uparrow.png'></img>= increase     <img src='.\\images\\downarrow.png'></img>= decrease     <img src='.\\images\\nochange.png'></img>= no change"
        //transform epoch seconds to minute:seconds format
        var sec =  Math.abs(diffSet.timeDiff) % 60; 
        var mod =  Math.abs(diffSet.timeDiff) - sec;
        var min = mod / 60;
        if ((sec>=0)&&(sec<10)){
            var seconds = "0"+sec.toString();
        }
        else{
            var seconds = sec.toString();
        }
        if (diffSet.timeDiff<0)
            min = "-"+min.toString();

    // refresh last updated time column
    var timedf = diffSet.timeDiff;
    if (!(timedf==="")){
        document.getElementById("r"+row+"time").innerHTML = "<span style='font-size:13px'>"+set.date+"</span><br/><span style='font-size:13px;color:blue'><sup>(elapsed epoch time "+min+":"+seconds+")</sup></span>";
    }
    else{
        document.getElementById("r"+row+"time").innerHTML = "<span style='font-size:13px'>"+set.date+"</span>";
    }
    var tempdf = diffSet.tempDiff;
    if (!(tempdf==="")){        
        // determine temperature difference
        if (diffSet.tempDiff>0)
            var tempIndicator = "<img src='.\\images\\uparrow.png'></img>";
        if (diffSet.tempDiff<0)
            var tempIndicator = "<img src='.\\images\\downarrow.png'></img>";      
        if (diffSet.tempDiff==0)
            var tempIndicator = "<img src='.\\images\\nochange.png'></img>";  

        // refresh temperature column
            document.getElementById("r"+row+"temp").innerHTML = set.temp + " &degF  "+tempIndicator;

        // determine feels like temperature difference
        if (diffSet.tempFeelsDiff>0)
            var feelsIndicator = "<img src='.\\images\\uparrow.png'></img>";
        if (diffSet.tempFeelsDiff<0)
            var feelsIndicator = "<img src='.\\images\\downarrow.png'></img>";
        if (diffSet.tempFeelsDiff==0)
            var feelsIndicator = "<img src='.\\images\\downarrow.png'></img>";

        // refresh feels like temp inside temperature column
            document.getElementById("feelsLikeTemp"+row).innerHTML = '<i>Feels like: </i>' +  set.feelsLikeTemp + " &degF" +feelsIndicator;
    }
    
    // determine humidity difference
    var humdf = diffSet.humDiff;
    if (!(humdf==="")){
        if (diffSet.humDiff>0)
            var humIndicator = "<img src='.\\images\\uparrow.png'></img>";
        if (diffSet.humDiff<0)
            var humIndicator = "<img src='.\\images\\downarrow.png'></img>";      
        if (diffSet.humDiff==0)
            var humIndicator = "<img src='.\\images\\nochange.png'></img>";

        // refresh humidity column
        document.getElementById("r"+row+"hum").innerHTML = set.hum + "%  "+humIndicator;
    }
    else{
        document.getElementById("r"+row+"hum").innerHTML = "";
    }    
        
    // determine wind speed difference
    var windf = diffSet.windDiff;
    if (!(windf==="")){
        if (diffSet.windDiff>0)
            var windIndicator = "<img src='.\\images\\uparrow.png'></img>";
        if (diffSet.windDiff<0)
            var windIndicator = "<img src='.\\images\\downarrow.png'></img>";      
        if (diffSet.windDiff==0)
            var windIndicator = "<img src='.\\images\\nochange.png'></img>";    
        document.getElementById("r"+row+"wind").innerHTML = set.wind + " mph  "+windIndicator;
        document.getElementById("r"+row+"cond").innerHTML = set.condition;
    }
        
    getDashboard();      
}

// clearCityDisplay
// clears city display(table display and forecast display) when no third city is chosen
// updates dashboard data to reflect no third city chosen
function clearCityDisplay(row) {
    document.getElementById("r"+row+"time").innerHTML = '';
    document.getElementById("r"+row+"temp").innerHTML = '';
    document.getElementById("feelsLikeTemp"+row).innerHTML = '';
    document.getElementById("r"+row+"hum").innerHTML = '';
    document.getElementById("r"+row+"wind").innerHTML = '';
    document.getElementById("r"+row+"cond").innerHTML = '';
    document.getElementById("tomorrowDay").innerHTML = '';
    document.getElementById("tomorrowNight").innerHTML = '';
    getDashboard();
}

// getDashboard
// displays average temp, hottest temp, and nicest city
function getDashboard() {
    // all 3 cities have data
    if ((firstCityReady)&&(secondCityReady)&&(isThirdCitySelected)){
        displayAvgTemp(city1current.temp,city2current.temp,city3current.temp);
        displayHottestCity(city1current.temp,city2current.temp,city3current.temp);
        displayNicestWeather();
    }
    
    // only city 1 and city 2 have data
    if ((firstCityReady)&&(secondCityReady)&&(!(isThirdCitySelected))){
        displayAvgTemp(city1current.temp,city2current.temp,0);
        displayHottestCity(city1current.temp,city2current.temp,"");
        displayNicestWeather();    
    }
    
    // only city 1 has data
    if ((firstCityReady)&&(!(secondCityReady))){

        displayAvgTemp(city1current.temp,0,0);
        displayHottestCity(city1current.temp,"","");
        displayNicestWeather();
    }
    
    // only city 2 has data
    if ((secondCityReady)&&(!(firstCityReady))){
        displayAvgTemp(0,city2current.temp,0);
        displayHottestCity(0,city2current.temp,0);
        displayNicestWeather();
    }
}

// displayAvgTemp
// displays the average temperature of cities that have data
function displayAvgTemp(flag1, flag2, flag3) {
    var flags = [flag1, flag2, flag3];
    var temps = [];
    var averageTemperature;
    
    var j=0;
    for (var i = 0; i < flags.length; i++){
        if ((flags[i]!=0) && (flags[i] != "")){
            temps[j] = flags[i];
            j++;
        }
    }
    
    if (temps.length>0){
        var sumOfTemps = 0;
        for (var j = 0; j < temps.length; j++){
            sumOfTemps = sumOfTemps + temps[j];
        }

        averageTemperature = ((sumOfTemps)/temps.length).toFixed(1);

        // display average temperature
        document.getElementById("avg").innerHTML = '&nbsp;' + averageTemperature.toString() + " &degF";
    }
    else{
        document.getElementById("avg").innerHTML = "";
    }
}

// displayHottestCity
// displays the city with the hottest temperature of cities that have data
function displayHottestCity(flag1, flag2, flag3) {
    var flags = [flag1, flag2, flag3];
    var hotCity = [];
        
    flags.sort(function(a,b){return b-a}); // hottest temp is at index 0
    var str0 = document.getElementById("r0temp").innerHTML;
    var str1 = document.getElementById("r1temp").innerHTML;
    var str2 = document.getElementById("r2temp").innerHTML;
    
    if (str0!=""){
        var isIn = str0.search(flags[0]);
    
        if (isIn>-1)
            hotCity.push(" "+city1current.name);
    }
    
    if (str1!=""){
        isIn = str1.search(flags[0]);
        if (isIn>-1)
            hotCity.push(" "+city2current.name); 
    }
    
    if (str2!=""){
        isIn = str2.search(flags[0]);
        if (isIn>-1)
            hotCity.push(' '+city3current.name);
    }
    
    if (hotCity.length>0){
        document.getElementById("hot").innerHTML = hotCity.toString();
    }
    else{
        document.getElementById("hot").innerHTML = "";
    }
}

// displayNicestWeather
// calculated by delta from ideal values then deltas are scaled and summed.
// (delta temp is scaled by 3x, delta humidity is scaled by 1.5x, delta windspeed is scaled by 1x)
// city with the nicest weather has the lowest sum
// displays the city with the nicest weather of the cities that have data
function displayNicestWeather() {
    var idealTemp = 75;
    var idealHumidity = 45;
    var idealWindSpeed = 5;
    var cityByRanks = [];
    var nicestCity = "";
    
    //determine city 1 Ranking
    var city1TempResult = idealTemp - city1current.temp;
    if (city1TempResult<0)
        city1TempResult = city1TempResult * -1;
    var city1HumidityResult = idealHumidity - city1current.hum;
    if (city1HumidityResult<0)
        city1HumidityResult = city1HumidityResult * -1;
    var city1WindSpeedResult = idealWindSpeed - city1current.wind;
    if (city1WindSpeedResult<0)
        city1WindSpeedResult = city1WindSpeedResult * -1;
    var city1Rank = 3 * city1TempResult + 1.5 * city1HumidityResult + city1WindSpeedResult;
    if (!isNaN(city1Rank)){
        cityByRanks.push(city1Rank);
    }
  
    //determine city 2 Ranking
    var city2TempResult = idealTemp - city2current.temp;
    if (city2TempResult<0)
        city2TempResult = city2TempResult * -1;
    var city2HumidityResult = idealHumidity - city2current.hum;
    if (city2HumidityResult<0)
        city2HumidityResult = city2HumidityResult * -1;
    var city2WindSpeedResult = idealWindSpeed - city2current.wind;
    if (city2WindSpeedResult<0)
        city2WindSpeedResult = city2WindSpeedResult * -1;
    var city2Rank = 3 * city2TempResult + 1.5 * city2HumidityResult + city2WindSpeedResult;
    if (!isNaN(city2Rank)){
        cityByRanks.push(city2Rank);
    }
   
    //determine city 3 Ranking
    var city3TempResult = idealTemp - city3current.temp;
    if (city3TempResult<0)
        city3TempResult = city3TempResult * -1;
    var city3HumidityResult = idealHumidity - city3current.hum;
    if (city3HumidityResult<0)
        city3HumidityResult = city3HumidityResult * -1;
    var city3WindSpeedResult = idealWindSpeed - city3current.wind;
    if (city3WindSpeedResult<0)
        city3WindSpeedResult = city3WindSpeedResult * -1;
    var city3Rank = 3 * city3TempResult + 1.5 * city3HumidityResult + city3WindSpeedResult;
    if (!isNaN(city3Rank)){
        cityByRanks.push(city3Rank);
    }
    cityByRanks.sort(function(a,b){return b-a}); // sorts cityByRanks array starting with any NaN, then highest to lowest
                                                 // city with the highest ranking is at last position in cityByRanks array
    //Find which city the highest ranking belongs to
    var topRanking = cityByRanks[cityByRanks.length-1];
    if (city1Rank==topRanking)
        nicestCity = " " + city1current.name;
    if (city2Rank==topRanking)
        nicestCity = " " + city2current.name;
    if (city3Rank==topRanking)
        nicestCity = " " + city3current.name;
    
    document.getElementById("nice").innerHTML = nicestCity;
}

// getRegularDate
// takes last_updated JSON value and converts to mm/dd/yy hh:mm format
// returns string ready for display
function getRegularDate(yymmdd){
    var temp = yymmdd.split('-');
    var time = temp[2].split(' ');
    var mmddyy =temp[1]+"/"+time[0]+"/"+temp[0]+'&nbsp;'+'&nbsp;'+time[1];
    return mmddyy;
}

// get1stCityForecast
// make url request for first city forecast data
function get1stCityForecast (){
    request4.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var city1json = JSON.parse(this.responseText);
            var result = typeof(city1json.error);
            if ((result === 'undefined')){
                city1forecast.name = city1json.location.name;
                city1forecast.dayText = city1json.forecast.forecastday["0"].hour["15"].condition.text;
                city1forecast.dayTemp = city1json.forecast.forecastday["0"].hour["15"].temp_f;
                city1forecast.dayFeelTemp = city1json.forecast.forecastday["0"].hour["15"].feelslike_f;
                city1forecast.daysymbol = city1json.forecast.forecastday["0"].hour["15"].condition.icon;
                city1forecast.dayHum = city1json.forecast.forecastday["0"].hour["15"].humidity;
                city1forecast.dayWind = city1json.forecast.forecastday["0"].hour["15"].wind_mph;
            
                city1forecast.nightText = city1json.forecast.forecastday["0"].hour["23"].condition.text;
                city1forecast.nightTemp = city1json.forecast.forecastday["0"].hour["23"].temp_f;
                city1forecast.nightFeelTemp = city1json.forecast.forecastday["0"].hour["23"].feelslike_f;
                city1forecast.nightsymbol = city1json.forecast.forecastday["0"].hour["23"].condition.icon;
                city1forecast.nightHum = city1json.forecast.forecastday["0"].hour["23"].humidity;
                city1forecast.nightWind = city1json.forecast.forecastday["0"].hour["23"].wind_mph;
            
                city1forecast.midnight = city1json.forecast.forecastday["0"].hour["0"].temp_f;
                city1forecast.a = city1json.forecast.forecastday["0"].hour["0"].temp_f;
                city1forecast.b = city1json.forecast.forecastday["0"].hour["1"].temp_f;
                city1forecast.c = city1json.forecast.forecastday["0"].hour["2"].temp_f;
                city1forecast.d = city1json.forecast.forecastday["0"].hour["3"].temp_f;
                city1forecast.e = city1json.forecast.forecastday["0"].hour["4"].temp_f;
                city1forecast.f = city1json.forecast.forecastday["0"].hour["5"].temp_f;
                city1forecast.g = city1json.forecast.forecastday["0"].hour["6"].temp_f;
                city1forecast.h = city1json.forecast.forecastday["0"].hour["7"].temp_f;
                city1forecast.i = city1json.forecast.forecastday["0"].hour["8"].temp_f;
                city1forecast.j = city1json.forecast.forecastday["0"].hour["9"].temp_f;
                city1forecast.k = city1json.forecast.forecastday["0"].hour["10"].temp_f;
                city1forecast.noon = city1json.forecast.forecastday["0"].hour["11"].temp_f;
                city1forecast.l = city1json.forecast.forecastday["0"].hour["12"].temp_f;
                city1forecast.m = city1json.forecast.forecastday["0"].hour["13"].temp_f;
                city1forecast.n = city1json.forecast.forecastday["0"].hour["14"].temp_f;
                city1forecast.o = city1json.forecast.forecastday["0"].hour["15"].temp_f;
                city1forecast.p = city1json.forecast.forecastday["0"].hour["16"].temp_f;
                city1forecast.q = city1json.forecast.forecastday["0"].hour["17"].temp_f;
                city1forecast.r = city1json.forecast.forecastday["0"].hour["18"].temp_f;
                city1forecast.s = city1json.forecast.forecastday["0"].hour["19"].temp_f;
                city1forecast.t = city1json.forecast.forecastday["0"].hour["20"].temp_f;
                city1forecast.u = city1json.forecast.forecastday["0"].hour["21"].temp_f;
                city1forecast.v = city1json.forecast.forecastday["0"].hour["22"].temp_f;
            
                displayforecast(city1forecast);
            }
            
            if (result != 'undefined'){
                clearCityDisplay(0);
                document.getElementById("r0time").innerHTML=city1json.error.message;
                document.getElementById("tomorrowDay").innerHTML = '<img src=".\\images\\error.jpg">'; 
                document.getElementById("tomorrowNight").innerHTML = '<img src=".\\images\\error.jpg">'; 
            }
        }
        if ((this.readyState == 4) && (this.status >399) && (this.status < 500)) {
            clearCityDisplay(0);
            document.getElementById("r0time").innerHTML = "That didn't seem to work.";
            document.getElementById("tomorrowDay").innerHTML = '<img src=".\\images\\error.jpg">'; 
            document.getElementById("tomorrowNight").innerHTML = '<img src=".\\images\\error.jpg">';
        }
            
        if ((this.readyState == 4) && (this.status >499) && (this.status < 600)) {
            clearCityDisplay(0);
            document.getElementById("r0time").innerHTML = "Network Error: Server not available.";
            document.getElementById("tomorrowDay").innerHTML = '<img src=".\\images\\error.jpg">'; 
            document.getElementById("tomorrowNight").innerHTML = '<img src=".\\images\\error.jpg">';
        }
        
    }
    request4.open("GET",  urlForecast1, true);
    request4.send();
}

// get2ndCityForecast
// make url request for first city forecast data
function get2ndCityForecast (){
    request5.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var city2json = JSON.parse(this.responseText);
            var result = typeof(city2json.error);
            if ((result === 'undefined')){
                city2forecast.name = city2json.location.name;
                city2forecast.dayText = city2json.forecast.forecastday["0"].hour["15"].condition.text;
                city2forecast.dayTemp = city2json.forecast.forecastday["0"].hour["15"].temp_f;
                city2forecast.dayFeelTemp = city2json.forecast.forecastday["0"].hour["15"].feelslike_f;
                city2forecast.daysymbol = city2json.forecast.forecastday["0"].hour["15"].condition.icon;
                city2forecast.dayHum = city2json.forecast.forecastday["0"].hour["15"].humidity;
                city2forecast.dayWind = city2json.forecast.forecastday["0"].hour["15"].wind_mph;
            
                city2forecast.nightText = city2json.forecast.forecastday["0"].hour["23"].condition.text;
                city2forecast.nightTemp = city2json.forecast.forecastday["0"].hour["23"].temp_f;
                city2forecast.nightFeelTemp = city2json.forecast.forecastday["0"].hour["23"].feelslike_f;
                city2forecast.nightsymbol = city2json.forecast.forecastday["0"].hour["23"].condition.icon;
                city2forecast.nightHum = city2json.forecast.forecastday["0"].hour["23"].humidity;
                city2forecast.nightWind = city2json.forecast.forecastday["0"].hour["23"].wind_mph;

                city2forecast.midnight = city2json.forecast.forecastday["0"].hour["0"].temp_f;
                city2forecast.a = city2json.forecast.forecastday["0"].hour["0"].temp_f;
                city2forecast.b = city2json.forecast.forecastday["0"].hour["1"].temp_f;
                city2forecast.c = city2json.forecast.forecastday["0"].hour["2"].temp_f;
                city2forecast.d = city2json.forecast.forecastday["0"].hour["3"].temp_f;
                city2forecast.e = city2json.forecast.forecastday["0"].hour["4"].temp_f;
                city2forecast.f = city2json.forecast.forecastday["0"].hour["5"].temp_f;
                city2forecast.g = city2json.forecast.forecastday["0"].hour["6"].temp_f;
                city2forecast.h = city2json.forecast.forecastday["0"].hour["7"].temp_f;
                city2forecast.i = city2json.forecast.forecastday["0"].hour["8"].temp_f;
                city2forecast.j = city2json.forecast.forecastday["0"].hour["9"].temp_f;
                city2forecast.k = city2json.forecast.forecastday["0"].hour["10"].temp_f;
                city2forecast.noon = city2json.forecast.forecastday["0"].hour["11"].temp_f;
                city2forecast.l = city2json.forecast.forecastday["0"].hour["12"].temp_f;
                city2forecast.m = city2json.forecast.forecastday["0"].hour["13"].temp_f;
                city2forecast.n = city2json.forecast.forecastday["0"].hour["14"].temp_f;
                city2forecast.o = city2json.forecast.forecastday["0"].hour["15"].temp_f;
                city2forecast.p = city2json.forecast.forecastday["0"].hour["16"].temp_f;
                city2forecast.q = city2json.forecast.forecastday["0"].hour["17"].temp_f;
                city2forecast.r = city2json.forecast.forecastday["0"].hour["18"].temp_f;
                city2forecast.s = city2json.forecast.forecastday["0"].hour["19"].temp_f;
                city2forecast.t = city2json.forecast.forecastday["0"].hour["20"].temp_f;
                city2forecast.u = city2json.forecast.forecastday["0"].hour["21"].temp_f;
                city2forecast.v = city2json.forecast.forecastday["0"].hour["22"].temp_f;
            
                displayforecast(city2forecast);
            }
            
            if (result != 'undefined'){
                clearCityDisplay(1);
                document.getElementById("r1time").innerHTML=city2json.error.message;
                document.getElementById("tomorrowDay").innerHTML = '<img src=".\\images\\error.jpg">'; 
                document.getElementById("tomorrowNight").innerHTML = '<img src=".\\images\\error.jpg">'; 
            }
        }
        if ((this.readyState == 4) && (this.status >399) && (this.status < 500)) {
            clearCityDisplay(1);
            document.getElementById("r1time").innerHTML = "That didn't seem to work.";
            document.getElementById("tomorrowDay").innerHTML = '<img src=".\\images\\error.jpg">'; 
            document.getElementById("tomorrowNight").innerHTML = '<img src=".\\images\\error.jpg">';
        }
        if ((this.readyState == 4) && (this.status >499) && (this.status < 600)) {
            clearCityDisplay(1);
            document.getElementById("r1time").innerHTML = "Network Error: Server not available.";
            document.getElementById("tomorrowDay").innerHTML = '<img src=".\\images\\error.jpg">'; 
            document.getElementById("tomorrowNight").innerHTML = '<img src=".\\images\\error.jpg">';
        }
    };
request5.open("GET", urlForecast2, true);
request5.send();
}

// get3rdCityForecast
// make url request for first city forecast data
function get3rdCityForecast (){
    if (city3!=""){
        request6.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var city3json = JSON.parse(this.responseText);
                var result = typeof(city3json.error);
                if ((result === 'undefined')){
                    city3forecast.name = city3json.location.name;
                    city3forecast.dayText = city3json.forecast.forecastday["0"].hour["15"].condition.text;
                    city3forecast.dayTemp = city3json.forecast.forecastday["0"].hour["15"].temp_f;
                    city3forecast.dayFeelTemp = city3json.forecast.forecastday["0"].hour["15"].feelslike_f;
                    city3forecast.daysymbol = city3json.forecast.forecastday["0"].hour["15"].condition.icon;
                    city3forecast.dayHum = city3json.forecast.forecastday["0"].hour["15"].humidity;
                    city3forecast.dayWind = city3json.forecast.forecastday["0"].hour["15"].wind_mph;
            
                    city3forecast.nightText = city3json.forecast.forecastday["0"].hour["23"].condition.text;
                    city3forecast.nightTemp = city3json.forecast.forecastday["0"].hour["23"].temp_f;
                    city3forecast.nightFeelTemp = city3json.forecast.forecastday["0"].hour["23"].feelslike_f;
                    city3forecast.nightsymbol = city3json.forecast.forecastday["0"].hour["23"].condition.icon;
                    city3forecast.nightHum = city3json.forecast.forecastday["0"].hour["23"].humidity;
                    city3forecast.nightWind = city3json.forecast.forecastday["0"].hour["23"].wind_mph;
                
                    city3forecast.midnight = city3json.forecast.forecastday["0"].hour["0"].temp_f;
                    city3forecast.a = city3json.forecast.forecastday["0"].hour["0"].temp_f;
                    city3forecast.b = city3json.forecast.forecastday["0"].hour["1"].temp_f;
                    city3forecast.c = city3json.forecast.forecastday["0"].hour["2"].temp_f;
                    city3forecast.d = city3json.forecast.forecastday["0"].hour["3"].temp_f;
                    city3forecast.e = city3json.forecast.forecastday["0"].hour["4"].temp_f;
                    city3forecast.f = city3json.forecast.forecastday["0"].hour["5"].temp_f;
                    city3forecast.g = city3json.forecast.forecastday["0"].hour["6"].temp_f;
                    city3forecast.h = city3json.forecast.forecastday["0"].hour["7"].temp_f;
                    city3forecast.i = city3json.forecast.forecastday["0"].hour["8"].temp_f;
                    city3forecast.j = city3json.forecast.forecastday["0"].hour["9"].temp_f;
                    city3forecast.k = city3json.forecast.forecastday["0"].hour["10"].temp_f;
                    city3forecast.noon = city3json.forecast.forecastday["0"].hour["11"].temp_f;
                    city3forecast.l = city3json.forecast.forecastday["0"].hour["12"].temp_f;
                    city3forecast.m = city3json.forecast.forecastday["0"].hour["13"].temp_f;
                    city3forecast.n = city3json.forecast.forecastday["0"].hour["14"].temp_f;
                    city3forecast.o = city3json.forecast.forecastday["0"].hour["15"].temp_f;
                    city3forecast.p = city3json.forecast.forecastday["0"].hour["16"].temp_f;
                    city3forecast.q = city3json.forecast.forecastday["0"].hour["17"].temp_f;
                    city3forecast.r = city3json.forecast.forecastday["0"].hour["18"].temp_f;
                    city3forecast.s = city3json.forecast.forecastday["0"].hour["19"].temp_f;
                    city3forecast.t = city3json.forecast.forecastday["0"].hour["20"].temp_f;
                    city3forecast.u = city3json.forecast.forecastday["0"].hour["21"].temp_f;
                    city3forecast.v = city3json.forecast.forecastday["0"].hour["22"].temp_f;
                    
                    displayforecast(city3forecast);
                }
                
                if (result != 'undefined'){
                    clearCityDisplay(2);
                    document.getElementById("r2time").innerHTML=city3json.error.message;
                    document.getElementById("tomorrowDay").innerHTML = '<img src=".\\images\\error.jpg">'; 
                    document.getElementById("tomorrowNight").innerHTML = '<img src=".\\images\\error.jpg">'; 
                }
            }
            if ((this.readyState == 4) && (this.status >399) && (this.status < 500)) {
                clearCityDisplay(2);
                document.getElementById("r2time").innerHTML = "That didn't seem to work.";
                document.getElementById("tomorrowDay").innerHTML = '<img src=".\\images\\error.jpg">'; 
                document.getElementById("tomorrowNight").innerHTML = '<img src=".\\images\\error.jpg">';
            }

            if ((this.readyState == 4) && (this.status >499) && (this.status < 600)) {
                clearCityDisplay(2);
                document.getElementById("r2time").innerHTML = "Network Error: Server not available.";
                document.getElementById("tomorrowDay").innerHTML = '<img src=".\\images\\error.jpg">'; 
                document.getElementById("tomorrowNight").innerHTML = '<img src=".\\images\\error.jpg">';
            }
                    
        };
        request6.open("GET",  "http://api.apixu.com/v1/forecast.json?key=bfb9a2adb25e460db10191447162511&q="+city3, true);
        request6.send();
    }
    if (city3==""){
        document.getElementById("alert").removeAttribute("class");
    }
}

// resetAlert
// resets the alert
function resetAlert(){
            document.getElementById("alert").setAttribute("class","show");
}

// displayforecast
// displays forecasted weather for requesting city
function displayforecast(set){
    // display day time forecast
    document.getElementById("tomorrowDay").innerHTML = '<p><span style="color:aqua"><b>Tomorrow Day Time</b></span><br><b>'+set.dayText+'</b><br><span class="forecastTemp" style="font-size: 2.1em; font-family: Maven Pro, sans-serif;">'+set.dayTemp+' &deg</span>F&nbsp;&nbsp;<img class="icon" src="http:'+set.daysymbol+'" style="width:30px;height:30px;"><br><b>'+set.name+'</b><br><span style="color:#7FFF00"><b>Feels like: </b></span><span class="forecastTemp" style="font-size: 1.4em; font-family: Maven Pro, sans-serif;">'+set.dayFeelTemp+' &deg</span>F<br><span style="color:yellow"><b>Humidity: </b></span><span  style="font-size: 1.4em; font-family: Maven Pro, sans-serif;">'+set.dayHum+'%</span><br><span style="color:hotpink"><b>Wind Speed: </b></span><span  style="font-size: 1.4em; font-family: Maven Pro, sans-serif;">'+set.dayWind+'</span> mph</p>';
    
    //display night time forecast
    document.getElementById("tomorrowNight").innerHTML = '<p><span style="color:aqua"><b>Tomorrow Night Time</b></span><br><b>'+set.nightText+'</b><br><span class="forecastTemp" style="font-size: 2.1em; font-family: Maven Pro, sans-serif;">'+set.nightTemp+' &deg</span>F&nbsp;&nbsp;<img class="icon" src="http:'+set.nightsymbol+'" style="width:30px;height:30px;"><br><b>'+set.name+'</b><br><span style="color:#7FFF00"><b>Feels like: </b></span><span class="forecastTemp" style="font-size: 1.4em; font-family: Maven Pro, sans-serif;">'+set.nightFeelTemp+' &deg</span>F<br><span style="color:yellow"><b>Humidity: </b></span><span  style="font-size: 1.4em; font-family: Maven Pro, sans-serif;">'+set.nightHum+'%</span><br><span style="color:hotpink"><b>Wind Speed: </b></span><span  style="font-size: 1.4em; font-family: Maven Pro, sans-serif;">'+set.nightWind+'</span> mph</p>';  

    drawGraph(set); 
}

// refreshTableAndDashboard
// capture current city data for all cities for use upon refresh
function refreshTableAndDashboard(){
    //capture previous formated date string before refresh is performed
    diff1.oldDate = city1current.date;
    diff2.oldDate = city2current.date;
    diff3.oldDate = city3current.date;
    
    //capture previous time data before refresh is performed
    time1 = city1current.epoch;
    time2 = city2current.epoch;
    time3 = city3current.epoch;
    
    //capture previous temp data before refresh is performed
    temp1 = city1current.temp;
    temp2 = city2current.temp;
    temp3 = city3current.temp;
    
    feels1 = city1current.feelsLikeTemp;
    feels2 = city2current.feelsLikeTemp;
    feels3 = city3current.feelsLikeTemp;
    
    //capture previous humidity data before refresh is performed
    hum1 = city1current.hum;
    hum2 = city2current.hum;
    hum3 = city3current.hum;
    
    //capture previous wind data before refresh is performed
    wind1 = city1current.wind;
    wind2 = city2current.wind;
    wind3 = city3current.wind;
    
    get1stCityData(true);
    get2ndCityData(true);
    get3rdCityData(true);
}

// drawGraph
// draws graph on valid forecast click
function drawGraph(set){
    var backgroundImage = ".\\images\\blue_sky.jpg";
    var myCanvas = document.getElementById('cvs');
    RGraph.ObjectRegistry.Clear();

    var line = new RGraph.Line({
        id: 'cvs',
        data: [set.midnight,set.a,set.b,set.c,set.d,set.e,set.f,set.g,
                set.h,set.i,set.j,set.k,set.noon,set.l,set.m,set.n,set.o,
                set.p,set.q,set.r,set.s,set.t,set.u,set.v],
        options: {
            backgroundImage: backgroundImage,
            textAccessible: true,
            backdrop: true,
            backdropSize: 8,
            backdropAlpha: 0.3,
            shadow: true,
            shadowColor: 'rgba(255,255,0,0.8)',
            shadowBlur:6,
            ylabelsCount:7,
            gutterBottom:60,
            titleYaxis:"*F",
            textAccessible: false,
            gutterLeft:50,
            colors: ['#FF1493'],
            textSize: 10,
            textColor: 'rgba(255,255,255,1.0)',
            titleColor:'rgba(255,255,255,1.0)',
            textFont: 'Segoe UI',
            title: "Tomorrow's forecast for "+set.name,
            labels:['12:00am','2:00am','4:00am','6:00am','8:00am','10:00am',
                    '12:00pm','2:00pm','4:00pm','6:00pm','8:00pm','10:00pm','12:00am'],
            textAngle:70,
            spline: true,
        }
    }).unfoldFromCenterTrace()
}
//end of file













