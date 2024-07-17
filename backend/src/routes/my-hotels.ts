import express from "express";
import { Request, Response } from "express";
import multer from "multer";
import cloudinary from "cloudinary";
import Hotel from "../models/hotel";

import verifyToken from "../middleware/auth";
import { body } from "express-validator";
import { HotelType } from "../shared/types";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits:{
        fileSize: 5 * 1024 * 1024,  //5 MB
    },
});

// api/my-hotels
router.post(
    "/", 
    verifyToken, 
    [
      body("name").notEmpty().withMessage("Name is required"),
      body("contact").notEmpty().isNumeric().withMessage("Contact is required"),
      body("city").notEmpty().withMessage("City is required"),
      body("country").notEmpty().withMessage("Country is required"),
      body("description").notEmpty().withMessage("Description is required"),
      body("pricePerNight").notEmpty().isNumeric().withMessage("Price per night is required"),
      body("facilities").notEmpty().isArray().withMessage("Facilities are required"),
      body("adultCount").notEmpty().isNumeric().withMessage("Adult Count are required"),
      body("childCount").notEmpty().isNumeric().withMessage("Chjild Count are required"),
      body("starRating").notEmpty().isNumeric().withMessage("Star Rating is required"),
    ], 
    upload.array("imageFiles", 6), 
    async (req: Request, res: Response) => {
   try {
    const imageFiles = req.files as Express.Multer.File[];
    const newHotel: HotelType = req.body;


    // upload image to cloudinary
        const uploadPromises = imageFiles.map(async(image)=>{
        const b64 = Buffer.from(image.buffer).toString("base64");
        let dataURI= "data:" + image.mimetype + ";base64," + b64;
        const res = await cloudinary.v2.uploader.upload(dataURI);
        return res.url;
    });
    const imageUrls = await Promise.all(uploadPromises);
    
    // if upload succesfull add url of image in hotel
        newHotel.imageUrls = imageUrls;
        newHotel.lastUpdated = new Date();
        newHotel.userId = req.userId;

    // save hotel updated in db
        const hotel = new Hotel(newHotel);
        await hotel.save();

    // return 201 status
        res.status(201).send(hotel);

    } catch (e) {
        console.log("error creating hotel: ", e);
        res.status(500).json({ message: "Something went wrong" });
   }
});

router.get("/", verifyToken, async (req: Request, res: Response) => {
   
    try {
        const hotels = await Hotel.find({userId: req.userId});
        res.json(hotels);
        
    } catch (error) {
      res.status(500).json({ message: "Error fetching hotels"});
    }
});

export default router;