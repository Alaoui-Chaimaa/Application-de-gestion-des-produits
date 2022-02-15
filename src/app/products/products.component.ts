import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, of, startWith } from 'rxjs';
import { Product } from '../modeles/product.model';
import { ProductsService } from '../services/products.service';
import { AppDataState, DataStateEnum } from '../state/state';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(private productsService:ProductsService, private router:Router) { }

  //Ca peut etre un tableau ou null
  products$:Observable<AppDataState<Product[]>> | null=null;
  readonly DataStateEnum=DataStateEnum;
  ngOnInit(): void {
  }
  
  onGetAllProducts()
  {
    //Gérer les erreurs
    this.products$=
    this.productsService.getAllProducts().pipe(
      map((data)=>({dataState:DataStateEnum.LOADED,data:data})),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err=>of({dataState:DataStateEnum.ERROR,errorMessage:err.message}))

    );
  }
  onGetSelectedProducts()
  {
    this.products$=
    this.productsService.getSelectedProducts().pipe(
      map((data)=>({dataState:DataStateEnum.LOADED,data:data})),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err=>of({dataState:DataStateEnum.ERROR,errorMessage:err.message}))

    );
  }
  onGetAvailableProducts()
  {
    this.products$=
    this.productsService.getAvailableProducts().pipe(
      map((data)=>({dataState:DataStateEnum.LOADED,data:data})),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err=>of({dataState:DataStateEnum.ERROR,errorMessage:err.message}))

    );

  }

  onSearch(dataForm: any)
  {
    this.products$=
    this.productsService.searchProducts(dataForm.keyword).pipe(
      map((data)=>({dataState:DataStateEnum.LOADED,data:data})),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err=>of({dataState:DataStateEnum.ERROR,errorMessage:err.message}))

    );
  }

  onSelect(p: Product)
  {
    this.productsService.select(p)
    .subscribe(data=>{
      p.selected=data.selected;
    });
  }
  onDelete(p: Product)
  {
    this.productsService.deleteProduct(p)
    .subscribe(data=>{
      this.onGetAllProducts();
    });
  }
  onNewProduct()
  {
     this.router.navigateByUrl("/newProduct");
  }
  onEdit(p: Product)
  {
    this.router.navigateByUrl("/editProduct/"+p.id);
  }


}
