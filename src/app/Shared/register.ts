export class Register{
    constructor(
        public FirstName:string,
        public LastName:string,
        public Username:string,
        public Photo:File | null,
        public Email:string,
        public PasswordHash:string,
        public ConfirmPassword:string,
        public Role:string,
        public Address: string
        ) {}
}
