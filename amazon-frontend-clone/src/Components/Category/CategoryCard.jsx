import classes from "./categoryCard.module.css"
const CategoryCard = ({data}) => {
 return (
   <div className={classes.category}>
     <a href="">
       <span>
         <h2>{data.title}</h2>
       </span>
       <img src={data.imageURL} alt="" />
       <p>Shop now</p>
     </a>
   </div>
 );

}

export default CategoryCard
