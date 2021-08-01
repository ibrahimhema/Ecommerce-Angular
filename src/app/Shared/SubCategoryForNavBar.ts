export class SubCategoryForVanBar{
    constructor(
        public Id:number,
        public Name:string,
        public Photo:string,
        public Children:SubCategoryForVanBar[]
        ){}
}