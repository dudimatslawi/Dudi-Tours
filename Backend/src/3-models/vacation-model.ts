import { UploadedFile } from "express-fileupload";
import Joi from "joi";
import { ValidationError } from "./client-errors";
export class VacationModel {
    id: number;
    destination: string;
    description: string;
    startDate: string;
    endDate: string;
    price: number;
    image: UploadedFile;
    imageUrl: string;
    isLiked: number;
    likesCount: number;

    public constructor(vacation: VacationModel) {
        this.id = vacation.id;
        this.destination = vacation.destination;
        this.description = vacation.description;
        this.startDate = vacation.startDate;
        this.endDate = vacation.endDate;
        this.price = vacation.price;
        this.image = vacation.image;
        this.imageUrl = vacation.imageUrl;
        this.isLiked = vacation.isLiked;
        this.likesCount = vacation.likesCount;
    }
    // validation schema to insert vacation:
    private static insertValidationSchema = Joi.object({
        id: Joi.number().forbidden(),
        destination: Joi.string().required().min(2).max(50),
        description: Joi.string().required().min(30).max(1500),
        startDate: Joi.date().required(),
        endDate: Joi.date().required(),
        price: Joi.number().required().min(100).max(9999.99),
        image: Joi.object().required(),
        imageUrl: Joi.string().optional().max(200),
        isLiked: Joi.number().forbidden().integer().min(0).max(1),
        likesCount: Joi.number().forbidden().integer()
    })

    // validation schema to update vacation:
    private static updateValidationSchema = Joi.object({
        id: Joi.number().required().min(1).integer(),
        destination: Joi.string().required().min(2).max(50),
        description: Joi.string().required().min(30).max(1500),
        startDate: Joi.date().required(),
        endDate: Joi.date().required(),
        price: Joi.number().required().min(100).max(9999.99),
        image: Joi.object().optional(),
        imageUrl: Joi.string().optional().max(200),
        isLiked: Joi.number().forbidden().integer().min(0).max(1),
        likesCount: Joi.number().forbidden().integer()
    })

    public validateInsert(): void {
        // checking current object against the schema:
        const result = VacationModel.insertValidationSchema.validate(this);
        if (result.error) throw new ValidationError(result.error.message);
    };

    public validateUpdate(): void {
        // checking current object against the schema:
        const result = VacationModel.updateValidationSchema.validate(this);
        if (result.error) throw new ValidationError(result.error.message)
    }

}