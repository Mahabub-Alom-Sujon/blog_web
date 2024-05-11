"use client"
import React, { useEffect, useState } from 'react';

const CommentsList = (props) => {
    // const [storedPhoto, setStoredPhoto] = useState(null);

    // useEffect(() => {
    //     const photo = localStorage.getItem('photo');
    //     setStoredPhoto(photo);
    // }, []);
    return (
        <section className='CommentsList'>
            <div className='container g-0'>
                <div className='row'>
                    <div className='col-lg-12 pt-4'>
                        <div className='card shadow border-0 p-4'>
                            <div className='section-title'>
                                <h4>Comments</h4>
                            </div>
                            {
                                props.data.map((item, i) => {
                                    return<div key={i} className='comm-box d-flex pb-4'>
                                         {/* {storedPhoto && <img src={storedPhoto} alt="User" />}     */}
                                    <img src={item['users']['photo']} />
                                    <div className='comm-des'>
                                            <span className='me-1'>{item['users']['firstName']}</span>
                                            <span>{item['users']['lastName']}</span>
                                        <p>{item["descriptions"] }</p>
                                    </div>
                                    </div>
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CommentsList;