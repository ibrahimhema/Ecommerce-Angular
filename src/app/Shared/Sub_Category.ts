
export class Sub_Category{
    constructor(
        public Name: string,
        public Cat_Id: number,
        public Photo: string,
        public Parent_Id?: number
    ){}
}
