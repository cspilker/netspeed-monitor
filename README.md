# netspeed-monitor
MEVN-Based project to track network speed to a database. The collected data can be viewed through a web-frontend.

![Netspeed Monitor Preview](https://github.com/cspilker/netspeed-monitor/blob/master/image.png?raw=true)

# How it works
The Node.js express server performs a speedtest in regular intervals of time and writes the result to the mongo database. It also offers APIs for the frontend to get data from the database and additional information on the internet connection (e.g. active devices, current ping, ..). 
The information can be viewed on the frontend and be displayed in a line chart.

