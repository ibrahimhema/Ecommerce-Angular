export class SubCategory{
    constructor(
        public Id:number,
        public Name: string,
        public Cat_Id: number,
        public Photo: string,
        public ParentSubCategoryName:string,
        public Main_CategoryName:string,
        public imageFile: File|null ,
        public Parent_Id?: number
    ){}
}