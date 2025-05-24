import {useState, useEffect } from 'react';
import supabase from '../config/supabaseClient'
import SmoothieCard from '../components/SmoothieCard';
const Home=()=>{
  const [fetchError,setFetchError]=useState(null);
  const [smoothies,setSmoothies]=useState(null);
  const [orderBy,setOrderBy] =useState('created_at');

  const handleDelete = (id)=>{
    setSmoothies(
      (prevSmoothies)=>{
        return prevSmoothies.filter(sm=>sm.id!==id)
      }
    );

  }

  useEffect(() => {
    const fetchSmoothies = async () => {
      console.log('Fetching with orderBy:', orderBy);
      const { data, error } = await supabase
        .from('smoothies')
        .select()
        .order(orderBy,{ascending:false})
        
      if(error){
        console.error('Fetch Error:', error); // 콘솔에 오류 출력
        setFetchError('Could not fetch the smoothies')
        setSmoothies(null)
      }

      if(data){
        console.log('Fetched smoothies:', data); // 가져온 데이터 출력
        setSmoothies(data)
        setFetchError(null)

      }
    }
    fetchSmoothies()

  }, [orderBy])

    return(
        <div className="page Home">
            {fetchError&&(<p>{fetchError}</p>)}
            {
              smoothies&&(
                <div className="smoothies">
                  <div className="order-by">
                  <p>Order By</p>
                  <button onClick={()=>setOrderBy('created_at')}>Time Created</button>
                  <button onClick={()=>setOrderBy('title')}>Title</button>
                  <button onClick={()=>setOrderBy('rating')}>rating</button>
                  </div>
                  <div className="smoothie-grid">
                    {
                      smoothies.map(smoothie=>(
                        <SmoothieCard key={smoothie.id} smoothie={smoothie} onDelete={handleDelete}/>
                      ))
                    }
                  </div>

                </div>
              )
            }
        </div>
    )

}
export default Home;