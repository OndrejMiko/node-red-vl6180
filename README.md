# Node-RED VL6180

VL6180X is a Time-of-Flight (ToF) ranging sensor.  It is produced by STMicroelectronics: [https://www.st.com/en/imaging-and-photonics-solutions/vl6180x.html](https://www.st.com/en/imaging-and-photonics-solutions/vl6180x.html)

The carriers for the sensor can be found here:

1. [Adafruit](https://www.adafruit.com/product/3316)
1. [AliExpress](https://www.aliexpress.com/item/1005002921398466.html)

This package contains a Node-RED Node interface for interacting and retrieving the range distance with the VL6180X sensor.

## Raspberry PI I2C interface

Communicating to the sensor is done over I2C.
I2C must be enabled on the Raspberry PI.
See the [Raspberry Pi SPI and I2C Tutorial](https://learn.sparkfun.com/tutorials/raspberry-pi-spi-and-i2c-tutorial) for instructions on how to enable I2C.

**Connection on Raspberry PI**:

Raspberry PI --> VL6180X
* **SDA (GPIO 2)** --> **SDA**
* **SCL (GPIO 3)** --> **SCL**
* **GND** --> **GND**
* **VIN** --> **3.3V**

## Prerequisites
Its based on [Adafruit VL6180X  Python library](https://learn.adafruit.com/adafruit-vl6180x-time-of-flight-micro-lidar-distance-sensor-breakout/python-circuitpython) so you need to install it.

```bash
sudo pip3 install adafruit-circuitpython-vl6180x
```

## Installation
```bash
npm install node-red-vl6180
```


## Node-RED VL6180 Node

The Node-RED VL6180 Node has a few parameters that must be configured:

1. **Bus Address**: This is the address of the VL6180.  The VL6180 has an address of 41 (0x29) by default.
2. **Offset**: This is the offset from the distance to the target.  The default is **0**.
1. **Name**: (optional)


Outputs a `msg.payload` with a number representing the range in mm.

Value `255` is out of range  

## Implementation Notes

* The distance in mm is returned as part of the payload.
* Only doing minimal init and running in "default mode" which is good to about 1200 mm.