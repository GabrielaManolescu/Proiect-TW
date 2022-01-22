import React, { Fragment } from "react";
// import Gallery from './Gallery';
import Img1 from '../img/im1.jpg';
import Img2 from '../img/im2.png';
import Img3 from '../img/im3.jpg';
import './Gallery.css'

const Gallery = () => {


    let data = [

        {
            id: 1,
            imgSrc: Img1,
        },
        {
            id: 2,
            imgSrc: Img2,
        },
        {
            id: 3,
            imgSrc: Img3,
        }

    ]


    return (
        <>
            <div className="gallery">{
                data.map((item, index) => {
                    return (
                        <div className="pics" key={index}>
                            <img src={item.imgSrc} style={{ width: '100%' }} />
                        </div>
                    )
                }
                )
            }
            </div>

        </>

    )



}

export default Gallery;