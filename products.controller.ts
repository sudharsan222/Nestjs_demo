import { Controller,Post,Body,Get, Param, Put, Patch, Delete} from "@nestjs/common";
import { ProductService } from "./product.service";
@Controller('products')
export class ProductController {
    constructor(private readonly productsService: ProductService)
    {}
    @Post()
    addProduct(@Body('title') prodTitle:string,@Body('description') description:string,@Body('price') price:number):any{
           const generatedId =  this.productsService.insertProduct(prodTitle,description,price);
           return {id:generatedId};
    }
    @Get()
    getProducts():any{
        return this.productsService.getProducts();
    } 
    @Get(':id')
    getProduct(@Param('id') prodId:string):any{
        return this.productsService.getProduct(prodId);
    }

    @Patch(':id')
    updateProduct(@Param('id') prodId:string,@Body('title') prodtitle:string,@Body('description') description:string,@Body('price') price:number):any{
       this.productsService.updateProduct(prodId,prodtitle,description,price);
       return null;
    }

    @Delete(':id')
    DeleteProduct(@Param('id') prodId:string):any{
         this.productsService.DeleteProduct(prodId);
         return null;
    }
}