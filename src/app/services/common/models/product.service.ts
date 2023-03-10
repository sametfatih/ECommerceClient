import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { Create_Product } from 'src/app/contracts/product/create_product';
import { List_Product_Image } from 'src/app/contracts/product/list_product_image';
import { List_Product } from '../../../contracts/product/list_product';
import { HttpclientService } from '../httpclient.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClientService: HttpclientService) { }

  create(product: Create_Product, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void) {
    this.httpClientService.post({
      controller: "products"
    }, product).subscribe(result => {
      successCallBack();
    }, (errorResponse: HttpErrorResponse) => {
      const _error: Array<{ key: string, value: Array<string> }> = errorResponse.error;
      let message = "";
      _error.forEach((v, index) => {
        v.value.forEach((_v, _index) => {
          message += `${_v}<br>`;
        });
      });
      errorCallBack(message);
    });
  }

  async read(page: number = 0, size: number = 5, succesCallBack?: () => void, errorCallBack?: (errorMessage: string) => void):
    Promise<{
      totalCount: number, products: List_Product[]
    }> {
    const promiseData: Promise<{
      totalCount: number, products: List_Product[]
    }> = this.httpClientService.get<{
      totalCount: number, products: List_Product[]
    }>
      ({
        controller: "products",
        queryString: `page=${page}&size=${size}`
      }).toPromise();

    promiseData
      .then(success => succesCallBack())
      .catch(errorResponse => errorCallBack(errorResponse.message));

    return await promiseData;
  }

  async delete(id: string) {
    const deleteObservable: Observable<any> = this.httpClientService.delete({
      controller: "products"
    }, id)
    await firstValueFrom(deleteObservable);
  }

  async readImages(id: string,succesCallBack:()=>void): Promise<List_Product_Image[]> {
    const getObservable: Observable<List_Product_Image[]> = this.httpClientService.get<List_Product_Image[]>({
      action: "getproductimages",
      controller: "products"
    }, id);

    const images : List_Product_Image[]= await firstValueFrom(getObservable);

    succesCallBack();

    return images;
  }
  async deleteImage(productId:string,imageId:string,succesCallBack:()=>void){
    const deleteObservable = this.httpClientService.delete({
      action: "deleteproductimage",
      controller:"products",
      queryString:`imageId=${imageId}`
    },productId);
    
    await firstValueFrom(deleteObservable);
    succesCallBack();
  }
}
