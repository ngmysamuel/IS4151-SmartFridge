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
## Important Ideas
use sqlite3
INSERT and SELECT from table of Items
INSERT INTO items schema apple 5

can take snapshots of the fridge and read objects and send to RESTapi

single personal fridge

can us GPIO with rapsi

- the minimal threshold for accuracy is 0.5, TF official example use 40% (https://github.com/tensorflow/examples/blob/master/lite/examples/object_detection/raspberry_pi/detect_picamera.py)
- image based command:
$ python3 TFLite_detection_image.py --modeldir=coco_ssd_mobilenet_v1_1.0_quant_2018_06_29/

use as a funtion call:
os.getcwd()
Out[4]: '/home/pi/Documents/tflite1'

from TFLite_detection_image import predict_fridge_snapshot

predict_fridge_snapshot()