import {
	IReviewCreateRequest,
	IReviewGetAllRequest,
	IReviewGetAllResponse,
	IReviewResponse,
	IReviewUpdateRequest,
} from "../types/IReview";
import { inject, injectable } from "tsyringe";
import { BaseController } from "./BaseController";
import { ReviewService } from "../services/ReviewService";
import { IGenericDeleteResponse } from "../types/shared/IBaseResponse";

@injectable()
export class ReviewController extends BaseController<
	ReviewService,
	IReviewGetAllRequest,
	IReviewGetAllResponse,
	IReviewResponse,
	IReviewCreateRequest,
	IReviewResponse,
	IReviewUpdateRequest,
	IReviewResponse,
	IGenericDeleteResponse
> {
	constructor(@inject("ReviewService") reviewService: ReviewService) {
		super(reviewService);
	}
}
