import React, {useState} from 'react';

const Categories = () => {
    const [activeIndex, setActiveIndex] = useState(0)

    const categories = ["Все", "Мясные", "Вегетарианская", "Гриль", "Острые", "Закрытые"]

    return (
        <div className="categories">
            <ul>
                {categories.map((cat, i) => (
                    <li key={i} onClick={() => setActiveIndex(i)} className={activeIndex === i ? "active" : ""}>{cat}</li>))
                }
            </ul>
        </div>
    );
};

export default Categories;