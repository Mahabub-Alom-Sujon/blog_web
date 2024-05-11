import PlainLayout from '@/components/master/Plain-Layout';
import CommentForm from '@/components/news/CommentForm';
import CommentsList from '@/components/news/CommentsList';
import NewsDetails from '@/components/news/NewsDetails';
import Tags from '@/components/news/Tags';
import React from 'react';
import Subscribe from '@/components/news/Subscribe';
async function getData(id) {
    let details = (await (await fetch(`${process.env.HOST}/api/post/postSingle?id=${id}`)).json())['data']
    let Comments = (await (await fetch(`${process.env.HOST}/api/comment?postID=${id}`,{cache:"no-store"})).json())['data']
    return{details,Comments}
}
const page = async ({searchParams}) => {
    let id=searchParams['id'];
    const data=await getData(id);
    return (
        <PlainLayout>
            <div className='container'>
                <div className='row'>
                    <div className='col-lg-8'>
                        <NewsDetails data={ data.details} />
                        <CommentsList data={data['Comments']} />
                        <CommentForm postID={id}/>
                    </div>
                    <div className='col-lg-4'>
                        <Tags/>
                        <div className='sub-com'>
                            <h2 className='text-center'>Subscribe</h2>
                            <p className='text-center pb-2'>Subscribe to get the new updates!</p>
                            <Subscribe/>
                        </div>
                    </div>
                </div>
            </div>
        </PlainLayout>
    );
};

export default page;