"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const Event_1 = __importDefault(require("../controllers/Event"));
const router = express_1.default.Router();
router.route('/').post(Event_1.default.createEvent).get(Event_1.default.getAllEvents);
router.route('/:eventId').get(Event_1.default.getEvent).patch(Event_1.default.updateEvent).delete(Event_1.default.deleteEvent);
module.exports = router;
