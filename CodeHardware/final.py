from yolobit import *
button_a.on_pressed = None
button_b.on_pressed = None
button_a.on_pressed_ab = button_b.on_pressed_ab = -1
from aiot_lcd1602 import LCD1602
from mqtt import *
from machine import RTC
import ntptime
import time
from event_manager import *
from machine import Pin, SoftI2C
from aiot_dht20 import DHT20
from aiot_rgbled import RGBLed
from aiot_ir_receiver import *

aiot_lcd1602 = LCD1602()

event_manager.reset()

def on_event_timer_callback_k_h_a_p_i():
  global info, GI_E1_BB_9C, CURRENT, PASS, PH_C3_9AT, STATUS, MinTemp, TempStatus, MaxTemp, MinLux, LuxStatus, Hour_On, Min_On, TimeStatus, MaxLux, Hour_Off, Min_Off
  aiot_lcd1602.move_to(13, 1)
  aiot_lcd1602.putstr(' ')
  time.sleep_ms(1000)
  aiot_lcd1602.move_to(13, 1)
  aiot_lcd1602.putstr(':')
  time.sleep_ms(1000)

event_manager.add_timer_event(2000, on_event_timer_callback_k_h_a_p_i)

aiot_dht20 = DHT20(SoftI2C(scl=Pin(22), sda=Pin(21)))

def on_event_timer_callback_e_Y_m_J_M():
  global info, GI_E1_BB_9C, CURRENT, PASS, PH_C3_9AT, STATUS, MinTemp, TempStatus, MaxTemp, MinLux, LuxStatus, Hour_On, Min_On, TimeStatus, MaxLux, Hour_Off, Min_Off
  aiot_dht20.read_dht20()
  aiot_lcd1602.move_to(0, 0)
  aiot_lcd1602.putstr((str(aiot_dht20.dht20_temperature()) + str("'C ")))
  aiot_lcd1602.move_to(7, 0)
  aiot_lcd1602.putstr((str(aiot_dht20.dht20_humidity()) + '% '))
  aiot_lcd1602.move_to(13, 0)
  aiot_lcd1602.putstr((str(round(translate((pin2.read_analog()), 0, 4095, 0, 100))) + '%'))
  aiot_lcd1602.move_to(0, 1)
  aiot_lcd1602.putstr((str('%0*d' % (2, RTC().datetime()[2])) + '/'))
  aiot_lcd1602.move_to(3, 1)
  aiot_lcd1602.putstr((str('%0*d' % (2, RTC().datetime()[1])) + '/'))
  aiot_lcd1602.move_to(6, 1)
  aiot_lcd1602.putstr((str('%0*d' % (2, RTC().datetime()[0])) + ''))
  aiot_lcd1602.move_to(11, 1)
  aiot_lcd1602.putstr((str('%0*d' % (2, RTC().datetime()[4]))))
  aiot_lcd1602.move_to(14, 1)
  aiot_lcd1602.putstr((str('%0*d' % (2, RTC().datetime()[5]))))
  mqtt.publish('yolo-temp', (aiot_dht20.dht20_temperature()))
  mqtt.publish('yolo-humi', (aiot_dht20.dht20_humidity()))
  mqtt.publish('yolo-lux', (round(translate((pin2.read_analog()), 0, 4095, 0, 100))))

event_manager.add_timer_event(30000, on_event_timer_callback_e_Y_m_J_M)

tiny_rgb = RGBLed(pin0.pin, 4)

def on_mqtt_message_receive_callback__yolo_led_(info):
  global GI_E1_BB_9C, CURRENT, PASS, PH_C3_9AT, STATUS, MinTemp, TempStatus, MaxTemp, MinLux, LuxStatus, Hour_On, Min_On, TimeStatus, MaxLux, Hour_Off, Min_Off
  if info == '1':
    tiny_rgb.show(0, hex_to_rgb('#ff0000'))
    mqtt.publish('yolo-history', 'Light On')
  else:
    tiny_rgb.show(0, hex_to_rgb('#000000'))
    mqtt.publish('yolo-history', 'Light Off')

def on_mqtt_message_receive_callback__yolo_fan_(info):
  global GI_E1_BB_9C, CURRENT, PASS, PH_C3_9AT, STATUS, MinTemp, TempStatus, MaxTemp, MinLux, LuxStatus, Hour_On, Min_On, TimeStatus, MaxLux, Hour_Off, Min_Off
  pin10.write_analog(round(translate((int(info)), 0, 100, 0, 1023)))
  mqtt.publish('yolo-history', ('Fan on with: ' + str(info)))

def on_mqtt_message_receive_callback__yolo_door_(info):
  global GI_E1_BB_9C, CURRENT, PASS, PH_C3_9AT, STATUS, MinTemp, TempStatus, MaxTemp, MinLux, LuxStatus, Hour_On, Min_On, TimeStatus, MaxLux, Hour_Off, Min_Off
  pin4.servo_write((int(info)))
  mqtt.publish('yolo-history', (''.join([str(x) for x in ['Open door with: ', info, ' do']])))

def on_mqtt_message_receive_callback__yolo_value_(info):
  global GI_E1_BB_9C, CURRENT, PASS, PH_C3_9AT, STATUS, MinTemp, TempStatus, MaxTemp, MinLux, LuxStatus, Hour_On, Min_On, TimeStatus, MaxLux, Hour_Off, Min_Off
  if info[ : int(info.find(' ') + 1)].rstrip() == 'temp':
    TempStatus = 0
    MinTemp = int((info[int((info.find(' ') + 1) - 1) : int(info.rfind(' ') + 1)].strip()))
    MaxTemp = int((info[int((info.rfind(' ') + 1) - 1) : ].lstrip()))
    mqtt.publish('yolo-history', (''.join([str(x2) for x2 in ['Temp range: From ', MinTemp, ' to ', MaxTemp]])))
  if info[ : int(info.find(' ') + 1)].rstrip() == 'lux':
    LuxStatus = 0
    MinLux = int((info[int((info.find(' ') + 1) - 1) : int(info.rfind(' ') + 1)].strip()))
    MaxLux = int((info[int((info.rfind(' ') + 1) - 1) : ].lstrip()))
    mqtt.publish('yolo-history', (''.join([str(x3) for x3 in ['Lux range: From ', MinLux, ' to ', MaxLux]])))
  if info[ : int(info.find(' ') + 1)].rstrip() == 'timeon':
    Hour_On = int((info[int((info.find(' ') + 1) - 1) : int(info.rfind(' ') + 1)].strip()))
    Min_On = int((info[int((info.rfind(' ') + 1) - 1) : ].lstrip()))
    mqtt.publish('yolo-history', (''.join([str(x4) for x4 in ['Set time led on: ', Hour_On, ':', Min_On]])))
  if info[ : int(info.find(' ') + 1)].rstrip() == 'timeoff':
    Hour_Off = int((info[int((info.find(' ') + 1) - 1) : int(info.rfind(' ') + 1)].strip()))
    Min_Off = int((info[int((info.rfind(' ') + 1) - 1) : ].lstrip()))
    mqtt.publish('yolo-history', (''.join([str(x5) for x5 in ['Set time led off: ', Hour_Off, ':', Min_Off]])))

def on_mqtt_message_receive_callback__yolo_key_(info):
  global GI_E1_BB_9C, CURRENT, PASS, PH_C3_9AT, STATUS, MinTemp, TempStatus, MaxTemp, MinLux, LuxStatus, Hour_On, Min_On, TimeStatus, MaxLux, Hour_Off, Min_Off
  if info == '0':
    if STATUS == 0:
      CURRENT = str(CURRENT) + '0'
    else:
      PASS = str(PASS) + '0'
  if info == '1':
    if STATUS == 0:
      CURRENT = str(CURRENT) + '1'
    else:
      PASS = str(PASS) + '1'
  if info == '2':
    if STATUS == 0:
      CURRENT = str(CURRENT) + '2'
    else:
      PASS = str(PASS) + '2'
  if info == '3':
    if STATUS == 0:
      CURRENT = str(CURRENT) + '3'
    else:
      PASS = str(PASS) + '3'
  if info == '4':
    if STATUS == 0:
      CURRENT = str(CURRENT) + '4'
    else:
      PASS = str(PASS) + '4'
  if info == '5':
    if STATUS == 0:
      CURRENT = str(CURRENT) + '5'
    else:
      PASS = str(PASS) + '5'
  if info == '6':
    if STATUS == 0:
      CURRENT = str(CURRENT) + '6'
    else:
      PASS = str(PASS) + '6'
  if info == '7':
    if STATUS == 0:
      CURRENT = str(CURRENT) + '7'
    else:
      PASS = str(PASS) + '7'
  if info == '8':
    if STATUS == 0:
      CURRENT = str(CURRENT) + '8'
    else:
      PASS = str(PASS) + '8'
  if info == '9':
    if STATUS == 0:
      CURRENT = str(CURRENT) + '9'
    else:
      PASS = str(PASS) + '9'
  if info == '#':
    if CURRENT == PASS:
      pin4.servo_write(90)
      mqtt.publish('yolo-history', 'Login Success')
    else:
      pin4.servo_write(0)
      mqtt.publish('yolo-history', (str(CURRENT) + ' :is not the pass'))
    CURRENT = ''
  if info == '*':
    if CURRENT == PASS:
      mqtt.publish('yolo-history', 'Change Pass')
      PASS = ''
      STATUS = 1
    else:
      if STATUS == 1:
        STATUS = 0
        mqtt.publish('yolo-history', 'Change Success')
    CURRENT = ''

# Mô tả hàm này...
def SendToAdaf():
  global info, GI_E1_BB_9C, CURRENT, PASS, PH_C3_9AT, STATUS, MinTemp, TempStatus, MaxTemp, MinLux, LuxStatus, Hour_On, Min_On, TimeStatus, MaxLux, Hour_Off, Min_Off, aiot_lcd1602, aiot_dht20, aiot_ir_rx, tiny_rgb
  mqtt.on_receive_message('yolo-led', on_mqtt_message_receive_callback__yolo_led_)
  mqtt.on_receive_message('yolo-fan', on_mqtt_message_receive_callback__yolo_fan_)
  mqtt.on_receive_message('yolo-door', on_mqtt_message_receive_callback__yolo_door_)
  mqtt.on_receive_message('yolo-value', on_mqtt_message_receive_callback__yolo_value_)
  mqtt.on_receive_message('yolo-key', on_mqtt_message_receive_callback__yolo_key_)

def on_event_timer_callback_O_R_g_r_p():
  global info, GI_E1_BB_9C, CURRENT, PASS, PH_C3_9AT, STATUS, MinTemp, TempStatus, MaxTemp, MinLux, LuxStatus, Hour_On, Min_On, TimeStatus, MaxLux, Hour_Off, Min_Off
  if STATUS == 0:
    CheckPass()
  else:
    ChangePass()

event_manager.add_timer_event(100, on_event_timer_callback_O_R_g_r_p)

aiot_ir_rx = IR_RX(Pin(pin1.pin, Pin.IN)); aiot_ir_rx.start();

# Mô tả hàm này...
def CheckPass():
  global info, GI_E1_BB_9C, CURRENT, PASS, PH_C3_9AT, STATUS, MinTemp, TempStatus, MaxTemp, MinLux, LuxStatus, Hour_On, Min_On, TimeStatus, MaxLux, Hour_Off, Min_Off, aiot_lcd1602, aiot_dht20, aiot_ir_rx, tiny_rgb
  if aiot_ir_rx.get_code() == IR_REMOTE_0:
    CURRENT = str(CURRENT) + '0'
  if aiot_ir_rx.get_code() == IR_REMOTE_1:
    CURRENT = str(CURRENT) + '1'
  if aiot_ir_rx.get_code() == IR_REMOTE_2:
    CURRENT = str(CURRENT) + '2'
  if aiot_ir_rx.get_code() == IR_REMOTE_3:
    CURRENT = str(CURRENT) + '3'
  if aiot_ir_rx.get_code() == IR_REMOTE_4:
    CURRENT = str(CURRENT) + '4'
  if aiot_ir_rx.get_code() == IR_REMOTE_5:
    CURRENT = str(CURRENT) + '5'
  if aiot_ir_rx.get_code() == IR_REMOTE_6:
    CURRENT = str(CURRENT) + '6'
  if aiot_ir_rx.get_code() == IR_REMOTE_7:
    CURRENT = str(CURRENT) + '7'
  if aiot_ir_rx.get_code() == IR_REMOTE_8:
    CURRENT = str(CURRENT) + '8'
  if aiot_ir_rx.get_code() == IR_REMOTE_9:
    CURRENT = str(CURRENT) + '9'
  if aiot_ir_rx.get_code() == IR_REMOTE_F:
    if CURRENT == str(PASS) + str(PASS):
      mqtt.publish('yolo-history', 'Change Pass')
      PASS = ''
      STATUS = 1
      CURRENT = ''
    else:
      if CURRENT == PASS:
        pin4.servo_write(90)
        mqtt.publish('yolo-history', 'Correct Pass')
        CURRENT = ''
      else:
        pin4.servo_write(0)
        mqtt.publish('yolo-history', (str(CURRENT) + ' is not the pass'))
        CURRENT = ''
  aiot_ir_rx.clear_code()

# Mô tả hàm này...
def ChangePass():
  global info, GI_E1_BB_9C, CURRENT, PASS, PH_C3_9AT, STATUS, MinTemp, TempStatus, MaxTemp, MinLux, LuxStatus, Hour_On, Min_On, TimeStatus, MaxLux, Hour_Off, Min_Off, aiot_lcd1602, aiot_dht20, aiot_ir_rx, tiny_rgb
  if aiot_ir_rx.get_code() == IR_REMOTE_0:
    PASS = str(PASS) + '0'
  if aiot_ir_rx.get_code() == IR_REMOTE_1:
    PASS = str(PASS) + '1'
  if aiot_ir_rx.get_code() == IR_REMOTE_2:
    PASS = str(PASS) + '2'
  if aiot_ir_rx.get_code() == IR_REMOTE_3:
    PASS = str(PASS) + '3'
  if aiot_ir_rx.get_code() == IR_REMOTE_4:
    PASS = str(PASS) + '4'
  if aiot_ir_rx.get_code() == IR_REMOTE_5:
    PASS = str(PASS) + '5'
  if aiot_ir_rx.get_code() == IR_REMOTE_6:
    PASS = str(PASS) + '6'
  if aiot_ir_rx.get_code() == IR_REMOTE_7:
    PASS = str(PASS) + '7'
  if aiot_ir_rx.get_code() == IR_REMOTE_8:
    PASS = str(PASS) + '8'
  if aiot_ir_rx.get_code() == IR_REMOTE_9:
    PASS = str(PASS) + '9'
  if aiot_ir_rx.get_code() == IR_REMOTE_F:
    STATUS = 0
    CURRENT = ''
    display.scroll('Done')
    mqtt.publish('yolo-history', 'Change Success')

def on_event_timer_callback_S_U_t_a_B():
  global info, GI_E1_BB_9C, CURRENT, PASS, PH_C3_9AT, STATUS, MinTemp, TempStatus, MaxTemp, MinLux, LuxStatus, Hour_On, Min_On, TimeStatus, MaxLux, Hour_Off, Min_Off
  if (aiot_dht20.dht20_temperature()) < MinTemp and TempStatus == 0:
    mqtt.publish('yolo-fan', '0')
    mqtt.publish('yolo-history', 'Temperature is too low ')
    TempStatus = 1
  if (aiot_dht20.dht20_temperature()) > MaxTemp and TempStatus == 0:
    mqtt.publish('yolo-fan', '100')
    mqtt.publish('yolo-history', 'Temperature is too high')
    TempStatus = 1
  if (round(translate((pin2.read_analog()), 0, 4095, 0, 100))) < MinLux and LuxStatus == 0:
    mqtt.publish('yolo-led', '1')
    mqtt.publish('yolo-history', 'Lux is too low ')
    LuxStatus = 1
  if (round(translate((pin2.read_analog()), 0, 4095, 0, 100))) > MaxLux and LuxStatus == 0:
    mqtt.publish('yolo-led', '0')
    mqtt.publish('yolo-history', 'Lux is too high ')
    LuxStatus = 1
  if (round(translate((pin2.read_analog()), 0, 4095, 0, 100))) > MinLux and (round(translate((pin2.read_analog()), 0, 4095, 0, 100))) < MaxLux:
    if LuxStatus == 1:
      LuxStatus = 0
  if (aiot_dht20.dht20_temperature()) > MinTemp and (aiot_dht20.dht20_temperature()) < MaxTemp:
    if TempStatus == 1:
      TempStatus = 0

event_manager.add_timer_event(2000, on_event_timer_callback_S_U_t_a_B)

def on_event_timer_callback_V_c_o_X_x():
  global info, GI_E1_BB_9C, CURRENT, PASS, PH_C3_9AT, STATUS, MinTemp, TempStatus, MaxTemp, MinLux, LuxStatus, Hour_On, Min_On, TimeStatus, MaxLux, Hour_Off, Min_Off
  GI_E1_BB_9C = int(('%0*d' % (2, RTC().datetime()[4])))
  PH_C3_9AT = int(('%0*d' % (2, RTC().datetime()[5])))
  if GI_E1_BB_9C == Hour_On and PH_C3_9AT == Min_On:
    if TimeStatus == 0:
      mqtt.publish('yolo-history', 'Da toi gio hen ')
      mqtt.publish('yolo-led', '1')
      TimeStatus = 1
  if GI_E1_BB_9C == Hour_Off and PH_C3_9AT == Min_Off:
    if TimeStatus == 1:
      mqtt.publish('yolo-history', 'Da toi gio hen ')
      mqtt.publish('yolo-led', '0')
      TimeStatus = 0

event_manager.add_timer_event(10000, on_event_timer_callback_V_c_o_X_x)

if True:
  display.scroll('Ready')
  aiot_lcd1602.move_to(0, 0)
  aiot_lcd1602.putstr('Hello')
  mqtt.connect_wifi('iPhoneafme-', '12345678')
  mqtt.connect_broker(server='io.adafruit.com', port=1883, username='haiche198', password='aio_YTtd27tK1Pda4ImujkBxMpEt5npX')
  ntptime.settime()
  (year, month, mday, week_of_year, hour, minute, second, milisecond) = RTC().datetime()
  RTC().init((year, month, mday, week_of_year, hour+7, minute, second, milisecond))
  aiot_lcd1602.clear()
  CURRENT = ''
  PASS = '36'
  STATUS = 0
  MinTemp = 20
  MaxTemp = 40
  MinLux = 5
  MaxLux = 60
  TempStatus = 0
  LuxStatus = 0
  Hour_On = 18
  Min_On = 0
  Hour_Off = 6
  Min_Off = 0
  TimeStatus = 0
  SendToAdaf()

while True:
  event_manager.run()
  mqtt.check_message()
  time.sleep_ms(1000)
