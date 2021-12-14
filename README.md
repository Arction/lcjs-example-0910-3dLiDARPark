# 3D LiDAR Park Visualization

![3D LiDAR Park Visualization](NiemeyerCopan.png)

This demo application belongs to the set of examples for LightningChart JS, data visualization library for JavaScript.

LightningChart JS is entirely GPU accelerated and performance optimized charting library for presenting massive amounts of data. It offers an easy way of creating sophisticated and interactive charts and adding them to your website or web application.

The demo can be used as an example or a seed project. Local execution requires the following steps:

- Make sure that relevant version of [Node.js](https://nodejs.org/en/download/) is installed
- Open the project folder in a terminal:

        npm install              # fetches dependencies
        npm start                # builds an application and starts the development server

- The application is available at *http://localhost:8080* in your browser, webpack-dev-server provides hot reload functionality.


## Description

This example shows visualization of a LiDAR scanned 3D object with LightningChart JS 3D Charts.

This is LiDAR data of a Niemeyer Edifício Copan park in Brasil with 1.437.912 points
 
LightningChart JS is suitable for really fast visualization of LiDAR data sets in range of tens of millions samples, with 3D points or 3D surface. This example shows the approach with points.

The LiDAR data points are classified in the source data set between buildings and vegetation, which allows us to separate them into different series. In this example, the building series is colored as solid white colour, while the vegetation is coloured with individual Red, Green and Blue values.

Lidar data from: [Philipp Urech](https://sketchfab.com/3d-models/parque-copan-ddfa8cf8aafa4d619e429d9e653ffe81) - Licensed under Creative Commons Attribute. 

## API Links

* [3D chart]
* [3D axis]
* [3D Point Cloud Series]
* [3D Point Series Types]
* [3D Point Style]


## Support

If you notice an error in the example code, please open an issue on [GitHub][0] repository of the entire example.

Official [API documentation][1] can be found on [Arction][2] website.

If the docs and other materials do not solve your problem as well as implementation help is needed, ask on [StackOverflow][3] (tagged lightningchart).

If you think you found a bug in the LightningChart JavaScript library, please contact support@arction.com.

Direct developer email support can be purchased through a [Support Plan][4] or by contacting sales@arction.com.

[0]: https://github.com/Arction/
[1]: https://www.arction.com/lightningchart-js-api-documentation/
[2]: https://www.arction.com
[3]: https://stackoverflow.com/questions/tagged/lightningchart
[4]: https://www.arction.com/support-services/

© Arction Ltd 2009-2020. All rights reserved.


[3D chart]: https://www.arction.com/lightningchart-js-api-documentation/v3.3.0/classes/chart3d.html
[3D axis]: https://www.arction.com/lightningchart-js-api-documentation/v3.3.0/classes/axis3d.html
[3D Point Cloud Series]: https://www.arction.com/lightningchart-js-api-documentation/v3.3.0/classes/pointcloudseries3d.html
[3D Point Series Types]: https://www.arction.com/lightningchart-js-api-documentation/v3.3.0/globals.html#pointseriestypes3d
[3D Point Style]: https://www.arction.com/lightningchart-js-api-documentation/v3.3.0/globals.html#pointstyle3d

