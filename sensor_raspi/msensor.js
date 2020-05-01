let state: number = 0
let doorOpen: number = 0 //DEFAULT FALSE (0)
let currentDoorStatus: number = 0
let data = ""

//Sensor Data
let distanceFromDoor: number = 0 //ULTRASONIC SENSOR
let display: grove.TM1637 = null
display = grove.createDisplay(DigitalPin.P2, DigitalPin.P16)

function writeToSerial(message: string) {
    serial.writeLine(message)
}

serial.onDataReceived(serial.delimiters(Delimiters.NewLine), function () {
    data = serial.readLine()

    if (data == "handshake") {
        state = 1
        writeToSerial("enrol=" + control.deviceName())
    }
    if (state == 1) {
        if (data.includes("sensor=temp")) {
            writeToSerial("temp=" + input.temperature())
        }
        if (data.includes("sensor=door")) {
            writeToSerial("door=" + doorOpen)
        }
    }
})

basic.forever(function () {
    basic.showNumber(state)

    distanceFromDoor = grove.measureInCentimeters(DigitalPin.P1)
    display.show(distanceFromDoor)

    if (state == 1) {
        if (distanceFromDoor <= 5) {
            doorOpen = 0
            pins.digitalWritePin(DigitalPin.P0, 0) //LED OFF
        } else {
            doorOpen = 1
            pins.digitalWritePin(DigitalPin.P0, 1) //LED ON
        }

        if (doorOpen != currentDoorStatus) {
            writeToSerial("door=" + doorOpen)
            currentDoorStatus = doorOpen
        }
    }

})