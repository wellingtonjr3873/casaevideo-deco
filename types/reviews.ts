export interface Review {
  ReviewId: number;
  Rating: number;
  Review: string;
  Date: string;
  Likes: number;
  Dislikes: number;
  CustomFields: CustomField[];
  User: User;
  Product: Product;
  ReferenceOrder: unknown;
  CustomerPhotos?: string[];
  ReviewTitle: unknown;
  BoughtProduct: boolean;
  Origin: unknown;
  StoreComments: unknown[];
  CustomerVideos: unknown[];
}

export interface Element {
  IdProduct: string;
  YourviewsIdProduct: number;
  Rating: number;
  TotalRatings: number;
  ReviewBattle: ReviewBattle;
  Filters: Filter[];
  Reviews: Review[];
  RatingHistogram: RatingHistogram;
  FieldSummary: FieldSummary;
  Recommend: Recommend;
  Keywords: Keywords;
}

export interface ReviewBattle {
  BestReview: Review;
  WorstReview: Review;
  HasResults: boolean;
}

export interface CustomField {
  Name: string;
  Values: string[];
}

export interface User {
  YourviewsUserId: number;
  Name: string;
  Email: string;
  CPF: unknown;
  City: string;
  State: string;
  ZipCode: unknown;
  IPAddress: unknown;
  UserId: string;
  ExhibitionName: string;
  Avatar: unknown;
  Phone: unknown;
}

export interface Product {
  IdProductExternal: unknown;
  YourviewsProductId: number;
  ProductId: string;
  Name: string;
  Url: string;
  Image: string;
  IsActive: boolean;
  Value: number;
  Category: unknown;
  Brand: unknown;
  Sku: unknown;
  Courier: unknown;
  TrackingNumber: unknown;
  ProductDeliveryDate: string;
  IsProductDelivered: boolean;
  IsProductCancelled: boolean;
}

export interface Filter {
  Name: string;
  FilterId: number;
  FilterValues: FilterValue[];
}

export interface FilterValue {
  FilterValueId: number;
  Count: number;
  Name: string;
  ValueAsInt: number;
}

export interface RatingHistogram {
  RatingList: RatingList[];
}

export interface RatingList {
  Rate: number;
  Total: number;
  TotalReviews: number;
  PercentRating: number;
}

export interface FieldSummary {
  FieldList: unknown[];
}

export interface Recommend {
  TotalReviews: number;
  Recommend: number;
  DontRecommend: number;
  RecommendPercent: number;
}

export interface Keywords {
  HasResults: boolean;
  KeywordList: KeywordList[];
}

export interface KeywordList {
  Keyword: string;
  Rating: number;
  Count: number;
}

export interface Pagination {
  PageCount: number;
  TotalItemCount: number;
  PageNumber: number;
  PageSize: number;
  HasPreviousPage: boolean;
  HasNextPage: boolean;
  IsFirstPage: boolean;
  IsLastPage: boolean;
  FirstItemOnPage: number;
  LastItemOnPage: number;
}

export interface ReviewResponse {
  HasErrors: boolean;
  Element: Element;
  ErrorList: unknown[];
  Total: number;
  CurrentPage: number;
  Pagination: Pagination;
}

export interface ReviewListResponse {
  HasErrors: boolean;
  Element: Pick<Element, "IdProduct" | "Rating" | "TotalRatings">[];
  ErrorList: unknown[];
  Total: number;
  CurrentPage: number;
  Pagination: Pagination;
}

export interface LikedElement {
  ReviewId: number;
  Like: boolean;
  UserIP: string;
  TotalLikes: number;
  TotalDislikes: number;
}

export interface ReviewLikedResponse {
  HasErrors: boolean;
  Element: LikedElement;
  ErrorList: unknown[];
  Total: number;
  CurrentPage: number;
}
