import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getRestaurant, deleteRestaurant } from "../../utilities/people-service";


export default function Show(props) {
    const [restaurant, setRestaurant]= useState(null)
        const navigate = useNavigate() 
        const { id } = useParams() 
    
        async function handleRequest(){
            const restaurantResponse = await getRestaurant(id);
            console.log(restaurantResponse); 
            if (restaurant?._id){
                setRestaurant(restaurantResponse)
            } else {
                console.log(restaurantResponse)
                navigate('/')
        }
    }
        async function handleDelete(){
            try {
                console.log(id) 
                const deleteResponse =await deleteRestaurant(id)
                console.log(deleteResponse) 
            if (deleteResponse._id){
                console.log('redirect')
            } else {
                throw Error('Entry not found')
            }
            navigate ('/')
            } catch (error) {
                console.log(error)
            }
        }
            console.log(id)
            useEffect(() => {
                handleRequest()
            }, [])

    return (<div className='restaurant-card'>
        <h3>{restaurant.name}</h3>
          <p>Categories: {restaurant.categories}</p>
          <p>Phone: {restaurant.display_phone}</p>
          <p>Address: {restaurant.display_address}</p>
          <p>Link: {restaurant.url}</p>
          <button className="delete" onClick={handleDelete}> Remove Restaurant</button>
    </div>)
}