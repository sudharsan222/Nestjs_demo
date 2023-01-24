import { Injectable,NotFoundException} from "@nestjs/common";
import { Product } from './porducts.model';
@Injectable()
export class ProductService {
    private products: Product[] = [];

    insertProduct(title:string,description:string,price:number):string{
        const prodId = Math.random().toString();
        const newProduct = new Product(prodId,title,description,price);
        this.products.push(newProduct);
        return prodId;
    }
    getProducts()
    {
         return [...this.products]
    }
    getProduct(id:String)
    {
        const product = this.products.find((prod)=>prod.id == id);
        if(!product)
        {
            throw new NotFoundException('404');
        }
        return {...product};
    }
    private findProduct(id:string):[Product,number]
    {
        const productindex = this.products.findIndex((prod)=>prod.id == id);
        const product = this.products[productindex];
        if(!product)
        {
            throw new NotFoundException('404');
        }
        return [product,productindex];
    }
    updateProduct(id:string,title:string,description:string,price:number)
    {
        const [product,index] = this.findProduct(id);
        const updatedProduct = {...product};
        if(title)
        {
            updatedProduct.title = title;
        }
        if(description)
        {
            updatedProduct.description = description;
        }
        if(price)
        {
            updatedProduct.price = price;
        }

        this.products[index] = updatedProduct;
    }
    
    DeleteProduct(id :string)
    {
       const [product,index] = this.findProduct(id);
       this.products.splice(index,1);
    }
    
} 