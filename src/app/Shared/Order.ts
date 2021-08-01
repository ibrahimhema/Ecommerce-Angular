

export class Order {
    constructor(
        public Id: number,
        public Status: string,
        public Total_Price: number,
        public Address: string,
        public Created_at: Date,
        public User_Id: string,
        public Payment_Id: number,
        public UserName: string,
        public Payment: string
        
    ){}
}
