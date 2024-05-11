import Link from 'next/link';
import React from 'react';
import { PrismaClient } from "@prisma/client";
async function getData() {
    const prisma = new PrismaClient();
    let Tags = await prisma.tags.findMany({
        select: { id: true, name: true },
        orderBy: { id: "asc"}
    });
     return {Tags};
}
const Tags = async () => {
    const data = await getData();
    return (
        <section id='tags'>
            <div className='container'>
                <div className='row'>
                    <div className='col-lg-12 col-md-12 px-0'>
                        <div className='section-title'>
                            <h4>Tags</h4>
                        </div>
                        <div className='tagcloud'>
                            <ul className='mb-0'>
                                {
                                    data.Tags.map((Item, i) => {
                                        return<li key={i}>
                                            <Link className="nav-link" href={`/tags?id=${Item?.id}`}>{Item['name']}</Link>
                                        </li>
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Tags;