import { Brand } from "./Brand";
import { Rating } from "./Rating";
import { Sub_Category } from "./Sub_Category";
import { WishList } from "./wishList";

export class Product {
    constructor(
        public Name: string,
        public Id: number,
        public Photo: any,
        public Price: number,
        public Desc: string,
        public Quantity: number,
        public Offer_Price: number,
        public Sell_Count: number,
        public RatingAvg: number,
        public Brand_Name: string,
        public Created_at: Date | null,
        public Vendor_User_id: string,
        public Sub_Cat_Id: number,
        public Brand_Id: number,
        public Vendor_Name: string,
        public Ratings: Rating[],
        public Sub_Category: Sub_Category,
        public wishLists: WishList,
        public Brand: Brand
    ){}
}
