"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrisisController = void 0;
const crisis_service_1 = require("../services/crisis.service");
const multer_1 = __importDefault(require("multer"));
const sharp_1 = __importDefault(require("sharp"));
// Multer storage and file filter setup
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    }
    else {
        cb(new Error('Invalid image file'));
    }
};
const upload = (0, multer_1.default)({ storage, fileFilter, limits: { fileSize: 2 * 1024 * 1024 } }); // 2MB max size
class CrisisController {
    constructor() {
        // Create a crisis with an optional image
        this.createCrisis = [
            upload.single('image'), // Handle image upload
            (req, res) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const crisisData = req.body;
                    if (req.file) {
                        const imagePath = `uploads/compressed-${req.file.filename}`;
                        // Resize and compress the image using Sharp
                        yield (0, sharp_1.default)(req.file.path)
                            .resize(800)
                            .jpeg({ quality: 80 })
                            .toFile(imagePath);
                        // Include image URL in crisis data
                        crisisData.imageUrl = imagePath;
                    }
                    const createdCrisis = yield this.crisisService.createCrisis(crisisData);
                    return res.status(201).json({
                        message: 'Crisis created successfully. Pending approval from admin.',
                        crisis: createdCrisis,
                    });
                }
                catch (error) {
                    return res.status(400).json({ message: error.message });
                }
            })
        ];
        this.crisisService = new crisis_service_1.CrisisService(); // Instantiate CrisisService
    }
    // List all approved crises
    listCrises(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const crises = yield this.crisisService.getAllCrises();
                return res.status(200).json(crises);
            }
            catch (error) {
                return res.status(500).json({ message: error.message });
            }
        });
    }
    // Admin can update a crisis
    updateCrisis(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const crisisId = parseInt(req.params.id, 10);
                const crisisData = req.body;
                const updatedCrisis = yield this.crisisService.updateCrisis(crisisId, crisisData);
                return res.status(200).json({
                    message: 'Crisis updated successfully',
                    crisis: updatedCrisis,
                });
            }
            catch (error) {
                return res.status(404).json({ message: error.message });
            }
        });
    }
    // Admin can delete a crisis
    deleteCrisis(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const crisisId = parseInt(req.params.id, 10);
                yield this.crisisService.deleteCrisis(crisisId);
                return res.status(204).send();
            }
            catch (error) {
                return res.status(404).json({ message: error.message });
            }
        });
    }
}
exports.CrisisController = CrisisController;
