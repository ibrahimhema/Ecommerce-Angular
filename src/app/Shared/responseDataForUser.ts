export class responseDataForUser{
    constructor(
        public access_token:string,
        public userName:string,
        public role:string,
        public userId:string
        ){}
}