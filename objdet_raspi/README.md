# script to test the object detection with the camera connected
python3 TFLite_detection_webcam.py --modeldir=./coco_ssd_mobilenet_v1_1.0_quant_2018_06_29

# enable the camera for opencv automatically
sudo modprobe bcm2835-v4l2

# check the date sync
bash raspi_sync_datetime.sh

# install pkgs
bash get_pi_requirements.sh
bash get_objdet_raspi_requirements.sh

# Set up:
1. sudo modprobe bcm2835-v4l2
2. python3 objdet_raspi_TF.py
3. python3 objdet_raspi_flask.py

# objects deteced:
# reuse the labels in mscoco label map pbtxt
```text
item {
  name: "/m/09qck"
  id: 52
  display_name: "banana"
}
item {
  name: "/m/014j1m"
  id: 53
  display_name: "apple"
}
item {
  name: "/m/0l515"
  id: 54
  display_name: "sandwich"
}
item {
  name: "/m/0cyhj_"
  id: 55
  display_name: "orange"
}
item {
  name: "/m/0hkxq"
  id: 56
  display_name: "broccoli"
}
item {
  name: "/m/0fj52s"
  id: 57
  display_name: "carrot"
}
item {
  name: "/m/01b9xk"
  id: 58
  display_name: "hot dog"
}
item {
  name: "/m/0663v"
  id: 59
  display_name: "pizza"
}
item {
  name: "/m/0jy4k"
  id: 60
  display_name: "donut"
}
item {
  name: "/m/0fszt"
  id: 61
  display_name: "cake"
}
```