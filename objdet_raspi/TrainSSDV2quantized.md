## download quantized model
Google provides several quantized object detection models in their detection model zoo. This tutorial will use the SSD-MobileNet-V2-Quantized-COCO model. Download the model here. Note: TensorFlow Lite does NOT support RCNN models such as Faster-RCNN! It only supports SSD models.


## download the fruit dataset
run script to generate xml for label
```sh
/home/svd/Documents/Work/NUS-MComp/AY1920Sem2/IS-Pervasive-Comp/Project/generate_xml.py
```

label used:
1. apple
2. cauliflower
3. eggplant
4. orange
5. strawberry
```py
    if row_label == 'apple':
        return 1
    elif row_label == 'cauliflower':
        return 2
    elif row_label == 'eggplant':
        return 3
    elif row_label == 'orange':
        return 4
    elif row_label == 'strawberry':
        return 5
```

## xml to csv
```py
+        xml_df.to_csv('data/FruitVeg_5class_{}_labels.csv'.format(directory), index=None)
```

## tf record
```sh
python3 generate_tfrecord.py --csv_input=data/FruitVeg_5class_train_labels.csv --image_dir=images/train --output_path=data/FruitVeg_5class_train.record
python3 generate_tfrecord.py --csv_input=data/FruitVeg_5class_test_labels.csv --image_dir=images/test --output_path=data/FruitVeg_5class_test.record

Successfully created the TFRecords: /home/svd/Documents/Work/NUS-SOC/SpineAI_with_Zhulei_Dec2019_obj_det_Feb2020v/research/object_detection/data/FruitVeg_5class_train.record
Successfully created the TFRecords: /home/svd/Documents/Work/NUS-SOC/SpineAI_with_Zhulei_Dec2019_obj_det_Feb2020v/research/object_detection/data/FruitVeg_5class_test.record
```

## set up images and model
```sh
wget http://download.tensorflow.org/models/object_detection/ssd_mobilenet_v2_quantized_300x300_coco_2019_01_03.tar.gz
```


## lablmap pbtxt
```text
item {
  name: "apple"
  id: 1
  display_name: "apple"
}
item {
  name: "cauliflower"
  id: 2
  display_name: "cauliflower"
}
item {
  name: "eggplant"
  id: 3
  display_name: "eggplant"
}
item {
  name: "orange"
  id: 4
  display_name: "orange"
}
item {
  name: "strawberry"
  id: 5
  display_name: "strawberry"
}
```

## train
```sh
 # PRE_TRAINED_MODEL_CONFIG="faster_rcnn_resnet101_coco_baseON_2018_07_13.config"
-PRE_TRAINED_MODEL_CONFIG="faster_rcnn_nas_coco_baseON_2018_07_13.config"
+# PRE_TRAINED_MODEL_CONFIG="faster_rcnn_nas_coco_baseON_2018_07_13.config"
+PRE_TRAINED_MODEL_CONFIG="ssd_mobilenet_v2_quantized_300x300_coco.config"

 python3 legacy/train.py \
   --logtostderr \

...
INFO:tensorflow:global step 1: loss = 29.7537 (37.870 sec/step)
I0401 21:09:10.339675 140248558810880 learning.py:507] global step 1: loss = 29.7537 (37.870 sec/step)
INFO:tensorflow:global step 2: loss = 24.6722 (1.668 sec/step)
I0401 21:09:12.448707 140248558810880 learning.py:507] global step 2: loss = 24.6722 (1.668 sec/step)
INFO:tensorflow:global step 3: loss = 22.3479 (1.667 sec/step)
I0401 21:09:14.117211 140248558810880 learning.py:507] global step 3: loss = 22.3479 (1.667 sec/step)
INFO:tensorflow:global step 4: loss = 20.1398 (1.629 sec/step)
I0401 21:09:15.747045 140248558810880 learning.py:507] global step 4: loss = 20.1398 (1.629 sec/step)
INFO:tensorflow:global step 5: loss = 18.3091 (1.645 sec/step)
I0401 21:09:17.393589 140248558810880 learning.py:507] global step 5: loss = 18.3091 (1.645 sec/step)
...
I0401 21:32:15.126441 140248558810880 learning.py:507] global step 827: loss = 0.4295 (1.669 sec/step)
INFO:tensorflow:global step 828: loss = 0.4020 (1.648 sec/step)
I0401 21:32:16.775001 140248558810880 learning.py:507] global step 828: loss = 0.4020 (1.648 sec/step)
INFO:tensorflow:global step 829: loss = 0.3980 (1.652 sec/step)
I0401 21:32:18.428433 140248558810880 learning.py:507] global step 829: loss = 0.3980 (1.652 sec/step)
INFO:tensorflow:global step 830: loss = 0.4018 (1.684 sec/step)
```

## export inference graph
```sh
-rw-r--r-- 1 kaiyuan ncr 18837057 Apr  1 21:28 model.ckpt-694.meta
-rw-r--r-- 1 kaiyuan ncr      173 Apr  1 21:28 checkpoint
-rw-r--r-- 1 kaiyuan ncr    68787 Apr  1 21:28 model.ckpt-694.index
-rw-r--r-- 1 kaiyuan ncr 74975648 Apr  1 21:28 model.ckpt-694.data-00000-of-000
 # path to pipeline config file
-PIPELINE_CONFIG_PATH="faster_rcnn_nas_coco_baseON_2018_07_13.config"
+PIPELINE_CONFIG_PATH="ssd_mobilenet_v2_quantized_300x300_coco.config"
 # path to model.ckpt
-TRAINED_CKPT_PREFIX="training/model.ckpt-1885"
+TRAINED_CKPT_PREFIX="training/model.ckpt-694"
 # path to folder that will be used for export
-EXPORT_DIR="Sag_4grade_v2_NAS_mar282020_graph"
+EXPORT_DIR="FruitVeg_5class_apr012020_graph"
...
INFO:tensorflow:SavedModel written to: FruitVeg_5class_apr012020_graph/saved_model/saved_model.pb
I0401 21:39:23.272804 139779501557504 builder_impl.py:421] SavedModel written to: FruitVeg_5class_apr012020_graph/saved_model/saved_model.pb
INFO:tensorflow:Writing pipeline config file to FruitVeg_5class_apr012020_graph/pipeline.config
I0401 21:39:23.308564 139779501557504 config_util.py:190] Writing pipeline config file to FruitVeg_5class_apr012020_graph/pipeline.config
...
(base) kaiyuan@ncrs:~/SpineAI_with_Zhulei_Dec2019_obj_det/research/object_detection$ ls -lt FruitVeg_5class_apr012020_graph/
total 39860
-rw-r--r-- 1 kaiyuan ncr     4138 Apr  1 21:39 pipeline.config
drwxr-xr-x 3 kaiyuan ncr     4096 Apr  1 21:39 saved_model
-rw-r--r-- 1 kaiyuan ncr 19725252 Apr  1 21:39 frozen_inference_graph.pb
-rw-r--r-- 1 kaiyuan ncr  2188403 Apr  1 21:39 model.ckpt.meta
-rw-r--r-- 1 kaiyuan ncr       77 Apr  1 21:39 checkpoint
-rw-r--r-- 1 kaiyuan ncr    23543 Apr  1 21:39 model.ckpt.index
-rw-r--r-- 1 kaiyuan ncr 18857216 Apr  1 21:39 model.ckpt.data-00000-of-00001
```

## preview on test
```sh
+MODEL_NAME = 'FruitVeg_5class_apr012020_graph'
+PATH_TO_LABELS = os.path.join('training', 'fruitveg_5class.pbtxt')
+NUM_CLASSES = 5
+    results_dir = os.path.join(script_dir, 'FruitVeg5class-results-apr012020/')
```

```sh
1.14.0
>>>>    Hostname:  panda8

CWD:  /hdd1/kaiyuan/SpineAI_with_Zhulei_Dec2019_obj_det/research/object_detection

category_index:  {1: {'id': 1, 'name': 'apple'}, 2: {'id': 2, 'name': 'cauliflower'}, 3: {'id': 3, 'name': 'eggplant'}, 4: {'id': 4, 'name': 'orange'}, 5: {'id': 5, 'name': 'strawberry'}}
current dir:  /hdd1/kaiyuan/SpineAI_with_Zhulei_Dec2019_obj_det/research/object_detection

Test images:  ['images/test/apple_apricot_nectarine_peach_peach(flat)_pomegranate_pear_plum.jpg', 'images/test/apple_pear.jpg', 'images/test/strawberries4.jpg']

Num test images:  3
process:  0 images/test/apple_apricot_nectarine_peach_peach(flat)_pomegranate_pear_plum.jpg
...
```

## the performance is not good...
## also the steps to convert graph.pb to tflite_graphpb is very troublesome...

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
