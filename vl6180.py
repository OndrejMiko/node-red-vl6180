#!/usr/bin/python3

# SPDX-FileCopyrightText: 2018 Tony DiCola for Adafruit Industries
# SPDX-License-Identifier: MIT

# Demo of reading the range and lux from the VL6180x distance sensor and
# printing it every second.

import time
import sys

import board
import busio

import adafruit_vl6180x

# Set default values
address = 0x29
offset = 0

# Get arguments from command line
if len(sys.argv) > 1:
   address = int(sys.argv[1])
   ofsset = int(sys.argv[2])

# Create I2C bus.
i2c = busio.I2C(board.SCL, board.SDA)

# Create sensor instance.
sensor = adafruit_vl6180x.VL6180X(i2c,address,offset)
# You can add an offset to distance measurements here (e.g. calibration)
# Swapping for the following would add a +10 millimeter offset to measurements:
# sensor = adafruit_vl6180x.VL6180X(i2c, offset=10)

# Main loop prints the range and lux every second:

print(sensor.range)
sys.exit(0)
