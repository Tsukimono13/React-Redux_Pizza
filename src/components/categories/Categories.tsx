import React from 'react';

type PropsType = {
    value: number
    onChangeCategory: (i: number)=> void
}
const categories = ["Все", "Мясные", "Вегетарианская", "Гриль", "Острые", "Закрытые"]


const Categories: React.FC<PropsType> = React.memo(({value, onChangeCategory}) => {
    return (
        <div className="categories">
            <ul>
                {categories.map((category, i) => (
                    <li key={i} onClick={() => onChangeCategory(i)} className={value === i ? "active" : ""}>{category}</li>))
                }
            </ul>
        </div>
    );
});

export default Categories;