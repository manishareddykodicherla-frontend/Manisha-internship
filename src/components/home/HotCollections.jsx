import React from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";

<<<<<<< Updated upstream
const HotCollections = () => {
=======
  
    const fetchCollections = async () => {
      try {
        const response = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections");
        setCollections(response.data);
      } catch (error) {
        console.error("Error fetching collections:", error);
      }
    };
useEffect(() => {
    fetchCollections();
  }, []);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows:true,
    lazyLoad:"ondemand"
  };
>>>>>>> Stashed changes
  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
<<<<<<< Updated upstream
          {new Array(4).fill(0).map((_, index) => (
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
              <div className="nft_coll">
                <div className="nft_wrap">
                  <Link to="/item-details">
                    <img src={nftImage} className="lazy img-fluid" alt="" />
=======
<div className="col-lg-12 slider-container">
      <Slider {...settings}>
          {collections.map((item) => (
            <div  key={item.id ||item.code}>
              <div className="nft_coll">
                <div className="nft_wrap">
                  <Link to="/item-details">
                    <img src={item.nftImage} className="lazy img-fluid" alt="" loading="lazy" />
>>>>>>> Stashed changes
                  </Link>
                </div>
                <div className="nft_coll_pp">
                  <Link to="/author">
<<<<<<< Updated upstream
                    <img className="lazy pp-coll" src={AuthorImage} alt="" />
=======
                    <img className="lazy pp-coll" src={item.authorImage} alt="" loading="lazy" />
>>>>>>> Stashed changes
                  </Link>
                  <i className="fa fa-check"></i>
                </div>
                <div className="nft_coll_info">
                  <Link to="/explore">
<<<<<<< Updated upstream
                    <h4>Pinky Ocean</h4>
                  </Link>
                  <span>ERC-192</span>
=======
                    <h4 loading="lazy">{item.title}</h4>
                  </Link>
                  <span loading="lazy">ERC-{item.code}</span>
>>>>>>> Stashed changes
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
