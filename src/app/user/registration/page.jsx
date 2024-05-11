import LazyLoader from '@/components/master/LazyLoader';
import PlainLayout from '@/components/master/Plain-Layout';
import SignUpForm from '@/components/user/SignUpForm';
import Link from 'next/link';
import React from 'react';
import { Suspense } from 'react';

const page = () => {
    return (
        <div>
            <PlainLayout>
                <Suspense fallback={<LazyLoader/>}>
                    <SignUpForm/>
                </Suspense>
                
            </PlainLayout>
            
        </div>
    );
};

export default page;