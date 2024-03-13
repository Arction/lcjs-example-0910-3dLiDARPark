/*
 * LightningChart JS example showcasing visualization of a LiDAR scanned park
 */
// Import LightningChartJS
const lcjs = require('@arction/lcjs')

// Extract required parts from LightningChartJS.
const {
    lightningChart,
    PointSeriesTypes3D,
    PointStyle3D,
    ColorRGBA,
    SolidFill,
    IndividualPointFill,
    AxisTickStrategies,
    emptyLine,
    emptyFill,
    Themes,
} = lcjs

// Create 3D chart
const chart = lightningChart()
    .Chart3D({
        theme: Themes[new URLSearchParams(window.location.search).get('theme') || 'darkGold'] || undefined
    })
    .setTitle(`LiDAR Point Cloud`)

const legend = chart.addLegendBox()

// Setup static axis intervals.
chart
    .getDefaultAxisX()
    .setTickStrategy(AxisTickStrategies.Numeric, (ticks) =>
        ticks
            .setMajorTickStyle((major) => major.setLabelFillStyle(emptyFill))
            .setMinorTickStyle((minor) => minor.setLabelFillStyle(emptyFill)),
    )
    .setStrokeStyle(emptyLine)
    .setInterval({ start: -11000, end: 19000 })
chart
    .getDefaultAxisY()
    .setTickStrategy(AxisTickStrategies.Numeric, (ticks) =>
        ticks
            .setMajorTickStyle((major) => major.setLabelFillStyle(emptyFill))
            .setMinorTickStyle((minor) => minor.setLabelFillStyle(emptyFill)),
    )
    .setStrokeStyle(emptyLine)
    .setInterval({ start: -5, end: 8500 })
chart
    .getDefaultAxisZ()
    .setTickStrategy(AxisTickStrategies.Numeric, (ticks) =>
        ticks
            .setMajorTickStyle((major) => major.setLabelFillStyle(emptyFill))
            .setMinorTickStyle((minor) => minor.setLabelFillStyle(emptyFill)),
    )
    .setStrokeStyle(emptyLine)
    .setInterval({ start: -14000, end: 12500 })

let totalPointsCount = 0

const loadBinaryLidarFile = async (assetName, isColored) => {
    // Load LiDAR data as custom formatted binary file (contains total number of data points + each point X, Y, Z, R, G, B values)
    const result = await fetch(document.head.baseURI + `examples/assets/0910/${assetName}`)
    const blob = await result.blob()
    const arrayBuffer = await blob.arrayBuffer()
    // Read number of points as first Uint32 value.
    let arrayBufferBytePos = 0
    const pointsCount = new Uint32Array(arrayBuffer.slice(arrayBufferBytePos, arrayBufferBytePos + 4))[0]
    arrayBufferBytePos += 4
    // Read binary data into XYZRGB points.
    const dataPoints = new Array(pointsCount).fill(0).map((_) => ({}))
    // X values in order.
    const xValuesByteLength = pointsCount * 2
    const xValues = new Int16Array(arrayBuffer.slice(arrayBufferBytePos, arrayBufferBytePos + xValuesByteLength))
    arrayBufferBytePos += xValuesByteLength
    xValues.forEach((x, i) => (dataPoints[i].x = x))
    // Y values in order.
    const yValuesByteLength = pointsCount * 2
    const yValues = new Int16Array(arrayBuffer.slice(arrayBufferBytePos, arrayBufferBytePos + yValuesByteLength))
    arrayBufferBytePos += yValuesByteLength
    yValues.forEach((y, i) => (dataPoints[i].y = y))
    // Z values in order.
    const zValuesByteLength = pointsCount * 2
    const zValues = new Int16Array(arrayBuffer.slice(arrayBufferBytePos, arrayBufferBytePos + zValuesByteLength))
    arrayBufferBytePos += zValuesByteLength
    zValues.forEach((z, i) => (dataPoints[i].z = z))

    if (isColored) {
        // R values in order.
        const rValuesByteLength = pointsCount * 1
        const rValues = new Uint8Array(arrayBuffer.slice(arrayBufferBytePos, arrayBufferBytePos + rValuesByteLength))
        arrayBufferBytePos += rValuesByteLength
        // G values in order.
        const gValuesByteLength = pointsCount * 1
        const gValues = new Uint8Array(arrayBuffer.slice(arrayBufferBytePos, arrayBufferBytePos + rValuesByteLength))
        arrayBufferBytePos += gValuesByteLength
        // B values in order.
        const bValuesByteLength = pointsCount * 1
        const bValues = new Uint8Array(arrayBuffer.slice(arrayBufferBytePos, arrayBufferBytePos + rValuesByteLength))
        arrayBufferBytePos += bValuesByteLength

        rValues.forEach((r, i) => {
            dataPoints[i].color = ColorRGBA(r, gValues[i], bValues[i])
        })
    }

    // Add Point Series with lidar point cloud data.
    const series = chart
        .addPointSeries({
            type: PointSeriesTypes3D.Pixelated,
            individualPointColorEnabled: isColored,
        })
        .add(dataPoints)

    totalPointsCount += pointsCount
    chart.setTitle(`LiDAR Point Cloud | ${totalPointsCount} data points`)

    return series
}

loadBinaryLidarFile('buildings.bin', false).then((series) => {
    series.setName('Buildings').setPointStyle(
        new PointStyle3D.Pixelated({
            size: 1,
            fillStyle: new SolidFill({ color: ColorRGBA(220, 220, 220) }),
        }),
    )

    legend.add(series)
})

loadBinaryLidarFile('green.bin', true).then((series) => {
    series.setName('Vegetation').setPointStyle(
        new PointStyle3D.Pixelated({
            size: 1,
            fillStyle: new IndividualPointFill(),
        }),
    )

    legend.add(series)
})
