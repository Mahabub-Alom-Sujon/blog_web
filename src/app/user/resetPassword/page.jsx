import LazyLoader from '@/components/master/LazyLoader';
import PlainLayout from '@/components/master/Plain-Layout';
import SetPasswordForm from '@/components/user/SetPasswordForm';
import React from 'react';
import { Suspense } from 'react';

const page = () => {
    return (
        <>
            <PlainLayout>
                <Suspense fallback={<LazyLoader/>}>
                    <SetPasswordForm/>
                </Suspense>
                
            </PlainLayout>
        </>
    );
};

export default page;