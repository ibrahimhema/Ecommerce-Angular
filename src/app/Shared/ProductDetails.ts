import { Brand } from "./Brand";
import { Rating2 } from "./Rating2";
import { RatingDetailsForProduct } from "./RatingDetailsForProduct";
import { Product } from "./Product";

export class ProductDetails {
    constructor(
        public Name: string,
        public Id: number,
        public Photo: string,
        public Price: number,
        public Desc: string,
        public Quantity: number,
        public Offer_Price: number,
        public Sell_Count: number,
        //public RatingAvg: number,
       // public Brand_Name: string,
        public Created_at: Date,
        public Vendor_User_id: string,
        public Sub_Cat_Id: number,
        public Brand_Id: number,
        public Vendor_Name: string,
        public RatingDetail: RatingDetailsForProduct,
        public Ratings: Rating2[],
        public RelatedProducts: Product[]
    ){}
}