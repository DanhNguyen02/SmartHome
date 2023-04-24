const express = require("express");

const recordRoutes = express.Router();

const dbo = require("../db/conn");
const mqtt = require("../mqtt/conn");

const ObjectId = require("mongodb").ObjectId;
const recordControllers = require("../controllers/recordControllers");

recordRoutes.route("/temp").get(recordControllers.getTemp);
recordRoutes.route("/humi").get(recordControllers.getHumi);
recordRoutes.route("/light").get(recordControllers.getLight);
recordRoutes.route("/light").post(recordControllers.postLight);
recordRoutes.route("/fan").get(recordControllers.getFan);
recordRoutes.route("/fan").post(recordControllers.postFan);
recordRoutes.route("/rooms").get(recordControllers.getRooms);
recordRoutes.route("/room").post(recordControllers.postRoom);
recordRoutes.route("/room").put(recordControllers.putRoom);
recordRoutes.route("/room").delete(recordControllers.deleteRoom);
recordRoutes.route("/devices").get(recordControllers.getDevices);
recordRoutes.route("/device").post(recordControllers.postDevice);
recordRoutes.route("/device").put(recordControllers.putDevice);
recordRoutes.route("/device").delete(recordControllers.deleteDevice);
recordRoutes.route("/data").get(recordControllers.getData);
recordRoutes.route("/noti").get(recordControllers.getNoti);
recordRoutes.route("/noti").post(recordControllers.postNoti);
recordRoutes.route("/noti").put(recordControllers.putNoti);
recordRoutes.route("/noti").delete(recordControllers.deleteNoti);

/**
 * @swagger
 * tags:
 *   name: Temp
 *   description: API endpoints for get latest temperature data
 */

/**
 * @swagger
 * /api/temp:
 *   get:
 *     summary: Get the latest temperature data
 *     parameters:
 *       - in: query
 *         name: room
 *         description: Room for get temperature's data
 *         required: true
 *         type: string
 *     tags: [Temp]
 *     responses:
 *       200:
 *         description: The latest data of temperature
 *       404:
 *         description: Room not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * tags:
 *   name: Humi
 *   description: API endpoints for get latest humidity data
 */

/**
 * @swagger
 * /api/humi:
 *   get:
 *     summary: Get the latest humidity data
 *     parameters:
 *       - in: query
 *         name: room
 *         description: Room for get humidity's data
 *         required: true
 *         type: string
 *     tags: [Humi]
 *     responses:
 *       200:
 *         description: The latest data of humidity
 *       404:
 *         description: Room not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * tags:
 *   name: Light
 *   description: API endpoints for get latest light data
 */

/**
 * @swagger
 * /api/light:
 *   get:
 *     summary: Get the latest light data
 *     parameters:
 *       - in: query
 *         name: room
 *         description: Room for get light's data
 *         required: true
 *         type: string
 *     tags: [Light]
 *     responses:
 *       200:
 *         description: The latest data of light
 *       404:
 *         description: Room/Light not found
 *       500:
 *         description: Internal server error
 *   post:
 *     summary: Add light's data to adafruit server
 *     parameters:
 *       - in: body
 *         name: body
 *         description: Topic and data to send to adafruit server
 *         required: true
 *         schema:
 *          type: object
 *          properties:
 *            topic:
 *              type: string
 *            data:
 *              type: string
 *     tags: [Light]
 *     responses:
 *       200:
 *         description: Data has been add to adafruit server
 */

/**
 * @swagger
 * tags:
 *   name: Fan
 *   description: API endpoints for get latest fan data
 */

/**
 * @swagger
 * /api/fan:
 *   get:
 *     summary: Get the latest fan data
 *     parameters:
 *       - in: query
 *         name: room
 *         description: Room for get fan's data
 *         required: true
 *         type: string
 *     tags: [Fan]
 *     responses:
 *       200:
 *         description: The latest data of light
 *       404:
 *         description: Room not found
 *       500:
 *         description: Internal server error
 *   post:
 *     summary: Add fan's data to adafruit server
 *     parameters:
 *       - in: body
 *         name: body
 *         description: Topic and data to send to adafruit server
 *         required: true
 *         schema:
 *          type: object
 *          properties:
 *            topic:
 *              type: string
 *            data:
 *              type: string
 *     tags: [Fan]
 *     responses:
 *       200:
 *         description: Data has been add to adafruit server
 */

/**
 * @swagger
 * tags:
 *   name: Rooms
 *   description: API endpoints for get list of room
 */

/**
 * @swagger
 * /api/rooms:
 *   get:
 *     summary: Get a list of rooms
 *     tags: [Rooms]
 *     responses:
 *       200:
 *         description: A list of rooms
 */

/**
 * @swagger
 * tags:
 *   name: Room
 *   description: API endpoints for manage room
 */

/**
 * @swagger
 * /api/room:
 *   post:
 *     summary: Add new room
 *     requestBody:
 *         description: Room's data to add
 *         required: true
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  name:
 *                    type: string
 *                  desc:
 *                    type: string
 *     tags: [Room]
 *     responses:
 *       200:
 *         description: The latest data of light
 *       404:
 *         description: Room not found
 *       500:
 *         description: Internal server error
 *   put:
 *     summary: Update room
 *     parameters:
 *       - in: body
 *         name: body
 *         description: Room index and room's data to update
 *         required: true
 *         schema:
 *          type: object
 *          properties:
 *            room:
 *              type: string
 *            name:
 *              type: string
 *            desc:
 *              type: string
 *     tags: [Room]
 *     responses:
 *       200:
 *         description: Room has been updated
 *       404:
 *         description: Room not found
 *       500:
 *         description: Internal server error
 *   delete:
 *     summary: Delete room
 *     parameters:
 *       - in: body
 *         name: body
 *         description: Room index to delete
 *         required: true
 *         schema:
 *          type: object
 *          properties:
 *            room:
 *              type: string
 *     tags: [Room]
 *     responses:
 *       200:
 *         description: Room has been updated
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * tags:
 *   name: Devices
 *   description: API endpoints for get list of devices
 */

/**
 * @swagger
 * /api/devices:
 *   get:
 *     summary: Get a list of devices
 *     parameters:
 *       - in: query
 *         name: room
 *         description: Room for get devices
 *         required: true
 *         type: string
 *     tags: [Devices]
 *     responses:
 *       200:
 *         description: A list of devices
 */

/**
 * @swagger
 * tags:
 *   name: Device
 *   description: API endpoints for manage device
 */

/**
 * @swagger
 * /api/device:
 *   post:
 *     summary: Add new device to room
 *     parameters:
 *       - in: body
 *         name: body
 *         description: Room index and device's data to add
 *         required: true
 *         schema:
 *          type: object
 *          properties:
 *            room:
 *              type: string
 *            name:
 *              type: string
 *            feed:
 *              type: string
 *            type:
 *              type: string
 *            min:
 *              type: string
 *            max:
 *              type: string
 *     tags: [Device]
 *     responses:
 *       200:
 *         description: Device has been added
 *       404:
 *         description: Room not found
 *       500:
 *         description: Internal server error
 *   put:
 *     summary: Update device
 *     parameters:
 *       - in: body
 *         name: body
 *         description: Room index, device index and device's data to update
 *         required: true
 *         schema:
 *          type: object
 *          properties:
 *            room:
 *              type: string
 *            device:
 *              type: string
 *            name:
 *              type: string
 *            feed:
 *              type: string
 *            type:
 *              type: string
 *            min:
 *              type: string
 *            max:
 *              type: string
 *     tags: [Device]
 *     responses:
 *       200:
 *         description: Device has been updated
 *       404:
 *         description: Room/Device not found
 *       500:
 *         description: Internal server error
 *   delete:
 *     summary: Delete device
 *     parameters:
 *       - in: body
 *         name: body
 *         description: Room index and device index to delete
 *         required: true
 *         schema:
 *          type: object
 *          properties:
 *            room:
 *              type: string
 *            device:
 *              type: string
 *     tags: [Device]
 *     responses:
 *       200:
 *         description: Device has been deleted
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * tags:
 *   name: Data
 *   description: API endpoints for get list of data
 */

/**
 * @swagger
 * /api/data:
 *   get:
 *     summary: Get a list of data
 *     parameters:
 *       - in: query
 *         name: room
 *         description: Room of a device to get data
 *         required: true
 *         type: string
 *       - in: query
 *         name: device
 *         description: Device to get data
 *         required: true
 *         type: string
 *     tags: [Data]
 *     responses:
 *       200:
 *         description: A list of data
 *       404:
 *         description: Room/Device not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * tags:
 *   name: Notifications
 *   description: API endpoints for get list of notification
 */

/**
 * @swagger
 * /api/noti:
 *   get:
 *     summary: Get a list of notifications
 *     tags: [Notifications]
 *     responses:
 *       200:
 *         description: A list of notifications
 *       500:
 *         description: Internal server error
 *   post:
 *     summary: Add new notification
 *     parameters:
 *       - in: body
 *         name: body
 *         description: Room, device and data need to notice
 *         required: true
 *         schema:
 *          type: object
 *          properties:
 *            room:
 *              type: string
 *            device:
 *              type: string
 *            data:
 *              type: string
 *     tags: [Notifications]
 *     responses:
 *       200:
 *         description: Device has been added
 *       404:
 *         description: Room not found
 *       500:
 *         description: Internal server error
 *   put:
 *     summary: Update notification
 *     parameters:
 *       - in: body
 *         name: body
 *         description: Notification index to update
 *         required: true
 *         schema:
 *          type: object
 *          properties:
 *            noti:
 *              type: string
 *            status:
 *              type: string
 *     tags: [Notifications]
 *     responses:
 *       200:
 *         description: Device has been updated
 *       404:
 *         description: Room/Device not found
 *       500:
 *         description: Internal server error
 *   delete:
 *     summary: Delete notification
 *     parameters:
 *       - in: body
 *         name: body
 *         description: Notification index to delete
 *         required: true
 *         schema:
 *          type: object
 *          properties:
 *            noti:
 *              type: string
 *     tags: [Notifications]
 *     responses:
 *       200:
 *         description: Notification has been deleted
 *       500:
 *         description: Internal server error
 */


module.exports = recordRoutes;
