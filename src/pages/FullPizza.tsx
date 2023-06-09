import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import styles from './FullPizza.module.scss'
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
            <div className={styles.pizzaBlock}>
                <div>
                    <img className={styles.pizzaImg} src={pizza.imageUrl}/>
                </div>
                <div className={styles.pizzaText}>
                    <h2>{pizza.title}</h2>
                    <h4>{pizza.price} ₽</h4>
                    <Link to={'/'}>
                        <button className="button button--outline button--add">
                            <span>Назад</span>
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default FullPizza;