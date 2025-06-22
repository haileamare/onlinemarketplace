'use client'
import AddNewProductUi from "@/component/products/addProducts";
import { useParams } from "next/navigation";

export default function AddNewProduct(){
    const {shopId}=useParams()
   
    return(
       <AddNewProductUi shopId={shopId}/>
    )
}