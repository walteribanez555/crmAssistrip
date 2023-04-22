#!/bin/bash

# Retrieve the IPv4 address of the computer
IP_ADDRESS=$(ipconfig | grep "IPv4 Address" | awk '{print $NF}')

# Start the development server on the IPv4 address
ng serve --host $IP_ADDRESS