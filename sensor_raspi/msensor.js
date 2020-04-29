serial.onDataReceived(serial.delimiters(Delimiters.NewLine), function () {
    data = serial.readLine()
    if (data == "handshake") {
        if (state == 0) {
            state = 1
            handshakeStartTime = input.runningTime()
        }
    } else if (data.includes('cmd:')) {
        if (state == 2) {
            if (data.includes('cmd:sensor=')) {
                state = 3
                commandStartTime = input.runningTime()
            }
        }
    }
})

function randomWait() {
    randomWaitPeriod = Math.randomRange(100, 500)
    basic.pause(randomWaitPeriod)
}

function checkDoorStatus() {
	if (distance <= 5) {
		pins.digitalWritePin(DigitalPin.P0, 0)
		basic.showNumber(0)
		door_open = 0
	} else {
		pins.digitalWritePin(DigitalPin.P0, 1)
		basic.showNumber(1)
		door_open = 1
	}
	if (current_door != door_open) {
		current_door = door_open
		serial.writeLine("door=" + current_door)	
	}
}

let state = 0
let commandStartTime = 0
let handshakeStartTime = 0
let data = ""
let microbitDevices: string[] = []
let sensorValues: string[] = []
let buffer: string[] = []
let randomWaitPeriod = 0
let distance = 0
let door_open = 0
let current_door = 0

/* if you want to check the distance value, connect the 4digit LED display to P2 and P16 on grove shield and add this two-lines: */
let display: grove.TM1637 = null
display = grove.createDisplay(DigitalPin.P2, DigitalPin.P16)

basic.showIcon(IconNames.Yes)

basic.forever(() => {
	
	basic.showNumber(state)
	
	distance = grove.measureInCentimeters(DigitalPin.P1)
    
	/* if you want to check the distance value, add this line: */
	display.show(distance)
    
	if (state == 1) {
        if (input.runningTime() - handshakeStartTime > 10 * 1000) {
            state = 2
            serial.writeLine("enrol=" + control.deviceName())
        }
    } else if (state == 3) {
        if (input.runningTime() - commandStartTime > 10 * 1000) {
            checkDoorStatus()
			randomWait() 
			serial.writeLine("temp=" + input.temperature())
            state = 2
        }
    } else if (state == 2) {
		checkDoorStatus()	
    }

    basic.pause(100)
})
