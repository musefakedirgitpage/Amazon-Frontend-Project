import { categoryinfo } from "./categoryInfor";
import  CategoryCard  from "./CategoryCard";
import classes from "./categoryCard.module.css"

const Category = () => {
  return (
    <section className={classes.category__container}>
      {categoryinfo.map((item,i) => {
       return <CategoryCard key={i} data={item} />;
      })}
    </section>
  );
}

export default Category

