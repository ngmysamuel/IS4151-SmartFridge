#!/bin/bash

# from https://raspberrypi.stackexchange.com/a/68473

# force sync time for raspi 3
sudo timedatectl set-ntp True
# check time date status
timedatectl status
date
