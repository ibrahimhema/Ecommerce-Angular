export class Rating {
    constructor(
        public Rate: number,
        public Comment: string,
        public Created_at: Date,
        public User_Id: string,
        public Product_Id: number
    ){}
}