export enum DataStateEnum {

    LOADING,
    LOADED,
    ERROR
}

//type générique appliqué à n'importe quel type
export interface  AppDataState<T> 
{

    dataState?:DataStateEnum,
    //? indique que l'attribut n'est pas obligatoire
    data?:T,
    errorMessage?:string
}
