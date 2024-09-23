import { Request, Response } from 'express';
import { CrisisService } from '../services/crisis.service';
import { CreateCrisisDto, UpdateCrisisDto } from '../dtos/crisis.dto';
import multer from 'multer';
import sharp from 'sharp';

// Multer storage and file filter setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Invalid image file'));
  }
};

const upload = multer({ storage, fileFilter, limits: { fileSize: 2 * 1024 * 1024 } }); // 2MB max size

export class CrisisController {
  private crisisService: CrisisService;

  constructor() {
    this.crisisService = new CrisisService(); // Instantiate CrisisService
  }

  // List all approved crises
  async listCrises(req: Request, res: Response) {
    try {
      const crises = await this.crisisService.getAllCrises();
      return res.status(200).json(crises);
    } catch (error) {
      return res.status(500).json({ message: (error as Error).message });
    }
  }

  // Create a crisis with an optional image
  createCrisis = [
    upload.single('image'), // Handle image upload
    async (req: Request, res: Response) => {
      try {
        const crisisData: CreateCrisisDto = req.body;

        if (req.file) {
          const imagePath = `uploads/compressed-${req.file.filename}`;

          // Resize and compress the image using Sharp
          await sharp(req.file.path)
            .resize(800)
            .jpeg({ quality: 80 })
            .toFile(imagePath);

          // Include image URL in crisis data
          crisisData.imageUrl = imagePath;
        }

        const createdCrisis = await this.crisisService.createCrisis(crisisData);
        return res.status(201).json({
          message: 'Crisis created successfully. Pending approval from admin.',
          crisis: createdCrisis,
        });
      } catch (error) {
        return res.status(400).json({ message: (error as Error).message });
      }
    },
  ];
  
  // Admin can update a crisis
  async updateCrisis(req: Request, res: Response) {
    try {
      const crisisId = parseInt(req.params.id, 10);
      const crisisData: UpdateCrisisDto = req.body;
      const updatedCrisis = await this.crisisService.updateCrisis(crisisId, crisisData);
      return res.status(200).json({
        message: 'Crisis updated successfully',
        crisis: updatedCrisis,
      });
    } catch (error) {
      return res.status(404).json({ message: (error as Error).message });
    }
  }

  // Admin can delete a crisis
  async deleteCrisis(req: Request, res: Response) {
    try {
      const crisisId = parseInt(req.params.id, 10);
      await this.crisisService.deleteCrisis(crisisId);
      return res.status(204).send();
    } catch (error) {
      return res.status(404).json({ message: (error as Error).message });
    }
  }
}
