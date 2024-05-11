import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
const NewsSkeleton = () => {
    return (
        <>
            <div className='container'>
                <div className='row'>
                    {Array.from({length:6}).map((_,index)=>{
                            return (
                                <div key={index} className="col-lg-6 col-md-6 col-sm-12">
                                    <div className='card shadow'>
                                    <SkeletonTheme baseColor="#202020" highlightColor="#444">
                                        <p>
                                            <Skeleton count={10} />
                                        </p>
                                    </SkeletonTheme>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    );
};

export default NewsSkeleton;