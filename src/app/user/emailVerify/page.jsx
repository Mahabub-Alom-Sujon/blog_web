import LazyLoader from '@/components/master/LazyLoader';
import PlainLayout from '@/components/master/Plain-Layout';
import EmailVerifyForm from '@/components/user/EmailVerifyForm';
import React from 'react';
import { Suspense } from 'react';

const page = () => {
    return (
        <>
            <PlainLayout>
                <Suspense fallback={<LazyLoader/>}>
                    <EmailVerifyForm/>
                </Suspense>
                
            </PlainLayout>
        </>
    );
};

export default page;