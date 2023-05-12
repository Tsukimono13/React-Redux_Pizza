import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";

type pizzaType = {
    imageUrl: string
    title: string
    price: number
}

const FullPizza: React.FC = () => {
    const [pizza, setPizza] = useState<pizzaType>()
    const navigate = useNavigate()
    const {id} = useParams()

    useEffect(()=>{
        async function fetchPizzas(){
            try {
                const {data} = await axios.get("https://642f12262b883abc641ddda8.mockapi.io/pizza-items/" + id)
                setPizza(data)
            } catch (e) {
                alert("Ошибка при получении пиццы!")
                navigate('/')
            }
        }
        fetchPizzas()
    },[])

    if(!pizza){
      return <>Загрузка...</>
    }
    return (
        <div className='container'>
            <img src={pizza.imageUrl}/>
            <h2>{pizza.title}</h2>
            <h4>{pizza.price} ₽</h4>
        </div>
    );
};

export default FullPizza;