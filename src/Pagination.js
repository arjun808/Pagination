import axios from 'axios';
import React, { useEffect, useState } from 'react'

function Pagination() {
    const [data,setData]=useState([]);
    const [page,setPage]=useState(1);
    const getData=async()=>{
        try{

   const responce = await axios.get("https://dummyjson.com/products?limit=100").then((data)=>{
    setData(data.data.products);
   }).catch((err)=>{
    console.log("error",err)
   });
       

        }catch(err){
            console.log("error while fatching the data",err);
        }
    }
    useEffect(()=>{
        getData();
    },[])
    console.log(data);
  return (
    <div className='w-full h-full '>
    <div className='flex justify-center' >
     <h1 className='text-4xl font-bold mb-4'>Pagination</h1>
    </div>
    <div className='flex mt-4 flex-col items-center'>

   <ul className='grid grid-cols-4 space-x-4'>
   {data.slice(page*10-10,page*10).map((product)=>{
       return <li key={product.id} className=' mb-3 bg-slate-700 rounded-lg items-center justify-center  font-bold'>
       {product.id}
       <img src={product.thumbnail}></img>
       {product.title}
       </li>
    })}
   </ul>
   <div className='flex'>
 
   {
    data.length>0 &&
    <div className='mt-6 mb-7'>
    <span 
                className={`${page === 1 ? 'hidden' : 'display'} cursor-pointer`} 
                onClick={() => { page === 1 ? setPage(10) : setPage(page - 1) }}
            >
                ◀️
            </span>
  {[...Array(data.length/10)].map((_,i)=>{
    return <span onClick={(()=>{setPage(i+1)})} className={`${i+1 === page ? 'bg-blue-500' : ''} p-4 border border-gray-600 ml-2 h-9 cursor-pointer`}>{i+1}</span>
  })}
  <span 
                className={`${page === 10 ? 'hidden' : 'display'} cursor-pointer`} 
                onClick={() => { page === 10 ? setPage(11) : setPage(page + 1) }}
            >
                ▶️
            </span>
    </div>
   }
   </div>
    </div>
    

    </div>
  )
}

export default Pagination