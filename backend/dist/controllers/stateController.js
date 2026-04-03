"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateState = exports.deleteState = exports.getStateByName = exports.createState = exports.deleteAllStates = exports.getStates = void 0;
const state_1 = __importDefault(require("../models/state"));
const errorHandler_1 = require("../middleware/errorHandler");
exports.getStates = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const [states, total] = await Promise.all([
        state_1.default.find().sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
        state_1.default.countDocuments()
    ]);
    res.json({
        data: states,
        pagination: {
            page,
            limit,
            total,
            pages: Math.ceil(total / limit),
            hasNext: page < Math.ceil(total / limit),
            hasPrev: page > 1
        }
    });
});
exports.deleteAllStates = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    if (req.query.confirm !== 'true') {
        res.status(400).json({
            success: false,
            error: "Add ?confirm=true to delete all states"
        });
        return;
    }
    const result = await state_1.default.deleteMany();
    res.json({ success: true, message: `Deleted ${result.deletedCount} states` });
});
exports.createState = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const { stateID, stateName, stateDesc, ImagesData } = req.body;
    const newState = await state_1.default.create({
        stateID,
        stateName,
        stateDesc,
        ImagesData,
    });
    res.status(201).json({ success: true, data: newState });
});
exports.getStateByName = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const { stateName } = req.params;
    const state = await state_1.default.findOne({ stateID: stateName });
    if (!state) {
        res.status(404).json({ success: false, error: "State not found" });
        return;
    }
    res.json({ success: true, data: state });
});
exports.deleteState = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const { stateName } = req.params;
    const deletedItem = await state_1.default.findOneAndDelete({ stateID: stateName });
    if (!deletedItem) {
        res.status(404).json({ success: false, message: "State not found" });
        return;
    }
    res.json({ success: true, message: "State deleted successfully" });
});
exports.updateState = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const { stateID } = req.params;
    const { detail, detailImages } = req.body;
    const updatedState = await state_1.default.findOneAndUpdate({ stateID }, { $set: { detail, detailImages } }, { new: true, runValidators: true });
    if (!updatedState) {
        res.status(404).json({ success: false, error: "State not found" });
        return;
    }
    res.json({ success: true, data: updatedState });
});
//# sourceMappingURL=stateController.js.map