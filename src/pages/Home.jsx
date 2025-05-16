import supabase from '../config/supabaseClient'
import { useEffect, useState } from 'react'

import SmoothieCard from '../components/SmoothieCard'

const Home = ()=>{
    //에러서 발생시 화면에 표시
    const [fetchError,setFetchError]=useState(null)
    //supabase에서 데이터 읽어와서 저장
    const [smoothies,setSmoothies]= useState(null)
    //정렬
    const [orderBy,setOrderBy]=useState('created_at')

    //삭제 헨들러
    const handleDelete = (id) =>{
        setSmoothies(pervSmoothies=>{
            return pervSmoothies.filter(sm=>sm.id!==id)
        })
    }
    useEffect(()=>{

        const fetchSmoothies = async ()=>{//supabase작업
            const {data,error}=await supabase
            .from('smoothies')
            .select()
            .order(orderBy,{ascending:false});
            if(error){
               setFetchError('Could not fetch the smoothies') ;
               setSmoothies(null);
            }
            if(data){
                setSmoothies(data);
                setFetchError(null);
            }
        }

        fetchSmoothies();

    },[orderBy]);

    return(
       <div className="page home">
        {fetchError&&(<p>{fetchError}</p>)}
        {smoothies&&(
          <div className="smoothies">
            <div className="order-by">
                <p>Order by:</p>
                <button onClick={()=>setOrderBy('created_at')}>Time Create</button>
                <button onClick={()=>setOrderBy('title')}>Title</button>
                <button onClick={()=>setOrderBy('rating')}>Rating</button>
            </div>
            <div className="smoothie-grid">
                {
                    smoothies.map(smoothie => (
                        // <div key={smoothie.id} className="smoothie-card">
                        //     <h3>{smoothie.title}</h3>
                        //     <p>Rating: {smoothie.rating}</p>
                        //     <p>{smoothie.method}</p>
                        // </div>
                        <SmoothieCard key={smoothie.id} smoothie={smoothie} onDelete={handleDelete} />
                    ))
                }
            </div>
          </div>  
        )}
       </div> 
    )    


}
export default Home;