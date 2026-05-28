import React from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import {useEffect, useState} from "react";
import Slider from "react-slick";
const NewItems = () => {
const [items,setItems]=useState([]);
const [loading,setLoading]= useState(true);
const fetchItems=async()=>{
  try{
  const response=await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems");
  setItems(response.data);
  console.log(response.data)
}
catch(error)
{
  console.error("Error fetching new items:", error);
}

finally{
  setLoading(false);
}};
useEffect(()=>{
  setTimeout(() => {
     fetchItems();
  }, 8000);
 
},[]);
const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows:true,
    lazyLoad:"ondemand"
  };
  const CountdownTimer=({ endTime })=>{
    const calculateTimeLeft=()=>{
      const difference= new Date (endTime)-new Date();
      if (difference<=0) 
        return "Expired";
      const hours= Math.floor(difference/(1000*60*60));
      const minutes= Math.floor((difference % (1000*60*60))/(1000*60));
      const seconds= Math.floor((difference %(1000*60))/1000);
return `${hours}h ${minutes}m ${seconds}s`;
    };
    const [timeLeft ,setTimeLeft]= useState(calculateTimeLeft());
    useEffect(()=>{
      const interval=setInterval(()=>{
        setTimeLeft(calculateTimeLeft());
      },1000);
      return ()=>clearInterval(interval);
    }, [endTime]);
    return <span className="countdown-timer">{timeLeft}</span>;
  }
  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-lg-12 slider-container">
            
            {loading ?(
              <div className="row">
                        <Slider {...settings}>
                            {new Array(4).fill(0).map((_, index)=>(
            <div key={index}>
              <div className="nft__item">
                <div className="author_list_pp">
<div className="skeleton skeleton-author"></div>
                </div>
               
                  <div className="skeleton skeleton-count"> 
                    
</div>
                <div className="nft__item_wrap">
<div className="skeleton skeleton-image"></div>
                </div>
                <div className="nft__item_info">
                  <div className="skeleton skeleton-title"></div>
                  <div className="skeleton skeleton-price"></div>
                   <div className="skeleton skeleton-likes"></div>
                  </div>
</div>
</div>
            ))}
             </Slider>
            </div>
            ):(
            <Slider {...settings}>

          {items.map((item, index) => (
            <div key={item.nftId||index}>
              <div className="nft__item">
                <div className="author_list_pp">
                  <Link
                    to={`/item-details/${item.nftId}`}
                    title={`Creator: ${item.authorName}`}
                  >
                    <img className="lazy" src={item.nftImage} alt="" />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>
                <div className="de_countdown">
                  <CountdownTimer endTime={new Date(Date.now()+5*60*60*1000)}/>
                </div>

                <div className="nft__item_wrap">
                  <div className="nft__item_extra">
                    <div className="nft__item_buttons">
                      <button>Buy Now</button>
                      <div className="nft__item_share">
                        <h4>Share</h4>
                        <a href="" target="_blank" rel="noreferrer">
                          <i className="fa fa-facebook fa-lg"></i>
                        </a>
                        <a href="" target="_blank" rel="noreferrer">
                          <i className="fa fa-twitter fa-lg"></i>
                        </a>
                        <a href="">
                          <i className="fa fa-envelope fa-lg"></i>
                        </a>
                      </div>
                    </div>
                  </div>

                  <Link to={`/item-details/${item.nftId}`}>
                    <img
                      src={item.nftImage}
                      className="lazy nft__item_preview"
                      alt=""
                    />
                  </Link>
                </div>
                <div className="nft__item_info">
                  <Link to= '/item-details/'>
                    <h4>{item.title}</h4>
                  </Link>
                  <div className="nft__item_price">{item.price} ETH</div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>{item.likes || 69}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
          </Slider>)}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
