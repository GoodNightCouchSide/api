"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = require("http-status");
const Event_1 = __importDefault(require("../models/Event"));
const createEvent = (req, res, next) => {
    const { name } = req.body;
    const event = new Event_1.default({
        name
    });
    return event
        .save()
        .then((event) => res.status(http_status_1.CREATED).json({ event }))
        .catch((error) => res.status(500).json({ error }));
};
const getEvent = (req, res, next) => {
    const eventId = req.params.eventId;
    return Event_1.default.findById(eventId)
        .then((event) => (event ? res.status(http_status_1.OK).json({ event }) : res.status(http_status_1.NOT_FOUND).json({ message: 'Not found' })))
        .catch((error) => res.status(500).json({ error }));
};
const getAllEvents = (req, res, next) => {
    return Event_1.default.find()
        .then((events) => res.status(http_status_1.OK).json({ events }))
        .catch((error) => res.status(500).json({ error }));
};
const updateEvent = (req, res, next) => {
    const eventId = req.params.eventId;
    return Event_1.default.findById(eventId)
        .then((event) => {
        if (!event)
            return res.status(http_status_1.NOT_FOUND).json({ message: 'Not found' });
        event.set(req.body);
        event
            .save()
            .then((event) => res.status(http_status_1.OK).json({ event }))
            .catch((error) => res.status(500).json({ error }));
    })
        .catch((error) => res.status(500).json({ error }));
};
const deleteEvent = (req, res, next) => {
    const eventId = req.params.eventId;
    return Event_1.default.findByIdAndDelete(eventId)
        .then((event) => (event ? res.status(http_status_1.NO_CONTENT).send() : res.status(http_status_1.NOT_FOUND).json({ message: 'Not found' })))
        .catch((error) => res.status(500).json({ error }));
};
exports.default = { createEvent, getEvent, getAllEvents, updateEvent, deleteEvent };
