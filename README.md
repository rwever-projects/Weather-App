# Weather-App
#### Author: Rudi Wever
http://www.public.asu.edu/~rwever/
## Using AJAX to access REST-like API
#### Languages: HTML5, CSS, JavaScript, AJAX

![Weather-App screenshot](https://github.com/rwever-projects/Weather-App/blob/master/weatherAppScreenshot.png)

### Objective:
Implement an AJAX call to www.apixu.com (Weather API).
By using the retrieved JSON data, parse and display data.

This project features:
- AJAX calls
- DOM manipulations
- Custom algorithms for determining the nicest weather conditions
- Usage of JSON data structures
- Implementation of client-side charting library to display hourly forecast

First 2 rows of table data display fixed cities.
Third row of table data allows user to pick from 5 pre-selected cities.

Dashboard data (displayed above table data) shows:
- The average temperature for current data shown in table
- The hottest temperature for current data shown in table
- The city with the nicest weather from the current data shown in table

'Forecast' buttons are allow the user to display forecast snapshots for day and night-time forecasts for the following day, as well as display an hourly forecast chart.

'Refresh' button causes the data values for the entire table to be updated.  Visual indicators are also displayed to show changes in temperature, humidity, and windspeed.  Delta time from previous data is also shown.
