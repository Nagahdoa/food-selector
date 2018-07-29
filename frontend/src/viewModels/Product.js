export default class Product {
    constructor(productInfo) {
        const {
            id,
            name,
            tpnb,
            image,
            price,
            unitprice,
            department,
            UnitOfSale,
            description,
            UnitQuantity,
            superDepartment,
            ContentsQuantity,
            ContentsMeasureType,
            AverageSellingUnitWeight,
        } = productInfo;

        this.id = id;
        this.name = name;
        this.tpnb = tpnb;
        this.image = image;
        this.price = price;
        this.unitprice = unitprice;
        this.department = department;
        this.unitOfSale = UnitOfSale;
        this.description = description;
        this.unitQuantity = UnitQuantity;
        this.superDepartment = superDepartment;
        this.contentsQuantity = ContentsQuantity;
        this.contentsMeasureType = ContentsMeasureType;
        this.averageSellingUnitWeight = AverageSellingUnitWeight;
    }
}
