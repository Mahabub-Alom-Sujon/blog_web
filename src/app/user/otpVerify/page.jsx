import LazyLoader from '@/components/master/LazyLoader';
import PlainLayout from '@/components/master/Plain-Layout';
import PINVerifyForm from '@/components/user/PINVerifyForm';
import React from 'react';
import { Suspense } from 'react';

const page = () => {
    return (
        <div>
            <PlainLayout>
                <Suspense fallback={<LazyLoader/>}>
                    <PINVerifyForm/>
                </Suspense>
                
            </PlainLayout>
        </div>
    );
};

export default page;