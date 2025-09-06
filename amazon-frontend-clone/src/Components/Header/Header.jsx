import { BsSearch } from "react-icons/bs";
import { BiCart } from "react-icons/bi";
import { PiMapPin } from "react-icons/pi";
import classes from "./header.module.css"
import LowerHeader from "./LowerHeader";
import { Link } from "react-router-dom";
import { DataContext } from "../DataProvider/Dataprovider";
import { useContext } from "react";
import {auth} from "../../Utility/firbas"


const Header = () => {
  const [{basket, user}, dispatch] = useContext(DataContext);
  const totalItem=basket?.reduce((amount,item)=>{return item.amount+amount},0)
  return (
    <section className={classes.fixed}>
      <section>
        <div className={classes.header__container}>
          <div className={classes.logo__container}>
            <Link to="/">
              <img
                src="https://pngimg.com/uploads/amazon/small/amazon_PNG11.png"
                alt=""
              />
            </Link>
            <div className={classes.delivery}>
              <span>
                <PiMapPin />
              </span>

              <div>
                <p>Delivered to</p>
                <span>Ethiopia</span>
              </div>
            </div>
          </div>

          <div className={classes.search}>
            <select name="" id="">
              <option value="">All</option>
            </select>
            <input type="text" />
            <BsSearch size={39} />
          </div>
          {/* right side */}

          <div className={classes.order__container}>
            <Link to="" className={classes.language}>
              <img
                src="https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/1024px-Flag_of_the_Unites_States.svg.jpg"
                alt="American Flag"
              />
              <select name="" id="">
                <option value="">En</option>
              </select>
            </Link>

            <Link to={!user && "/Auth"}>
              <div>
                {user ? (
                  <>
                    <p>Hello {user?.email?.split("@")[0]}</p>
                    <span onClick={()=>auth.signOut()}>Sign Out</span>
                  </>
                ) : (
                  <>
                    <p>Hello, Sign In</p>
                    <span>Account & Lists</span>
                  </>
                )}
              </div>
            </Link>
            <Link to="/Order">
              <p>returns</p>
              <span>& Orders</span>
            </Link>
            <Link to="/Cart" className={classes.Cart}>
              <BiCart size={35} />
              <span>{totalItem}</span>
            </Link>
          </div>
        </div>
        <LowerHeader />
      </section>
    </section>
  );
};

export default Header;
