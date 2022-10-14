import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { AppConstants } from '../utils/app-constants';
import { OperationUtils } from '../utils/operation-utils';

export abstract class AbstractRepository<T> {

    
//   private httpHeaders = new HttpHeaders({'Content-type':'application/json'});
  private baseUrl: string = "";
  private operationUtils:OperationUtils = new OperationUtils();

  
  constructor(protected httpClient: HttpClient,protected router: Router,protected modelUrl: string){

    if(AppConstants.ENV === AppConstants.ENV_DEV){
      this.baseUrl = AppConstants.BASE_URL_DEV + `/${modelUrl}`;
    }else{
      this.baseUrl = AppConstants.BASE_URL_PROD + `/${modelUrl}`;
    }

  } 

  findAll():Observable<any>{
    console.log(`${this.baseUrl}/get`)
    return this.httpClient.get<T>( `https://localhost:44312/app/usuario/get`)
  }

  findById(id:number):Observable<any>{  
    console.log(`https://localhost:44312/app/usuario/getById/${id}`);
    return this.httpClient.get<T>(`https://localhost:44312/app/usuario/getById/${id}`)
    .pipe(
      catchError(e => {
        this.operationUtils.throwErrorMessageServicePrimeNg(e);
        return throwError(e);
      })
    )
  }

  
  findByParam(param:any, paramOfSearch:string):Observable<T>{
    return this.httpClient.get<T>(`${this.baseUrl}/${paramOfSearch}/${param}`)
    .pipe(
      catchError(e => {
        this.operationUtils.throwErrorMessageServicePrimeNg(e);
        return throwError(e);
      })
    )
  }

  save(type:T):Observable<any>{  
    return this.httpClient.post<T>("https://localhost:44312/app/usuario/add", type)
    .pipe(
      catchError(e => {
        this.operationUtils.throwErrorMessageServicePrimeNg(e);
        return throwError(e);
      })
    )
  }

  update(type:T):Observable<any>{  
    return this.httpClient.put<T>("https://localhost:44312/app/usuario/update", type)
    .pipe(
      catchError(e => {
        this.operationUtils.throwErrorMessageServicePrimeNg(e);
        return throwError(e);
      })
    )
  }


  deleteById(id:number):Observable<any>{  
    console.log("Eliminando desde abstract repository con " + this.baseUrl);
    return this.httpClient.delete<T>(`https://localhost:44312/app/usuario/delete/${id}`)
    .pipe(
      catchError(e => {
        this.operationUtils.throwErrorMessageServicePrimeNg(e);
        console.log("Ocurrio un error al eliminar un" + this.modelUrl);
        return throwError(e);
      })
    )
  }


}
