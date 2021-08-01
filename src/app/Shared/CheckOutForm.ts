import { CartProduct } from "./CartProduct";

export class CheckOutForm {
    constructor(
        public Id:number,
        public User_Id:string,
        public Address: string,
        public Total_Price:number,
        public Payment_Id:number,
        public Products:CartProduct[],
        public Status:string,
        
    ){}
}