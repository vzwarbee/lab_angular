import React, { useEffect } from 'react'
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux'
import { getBlogs } from '../features/blog/blogSlice';
import { Link } from 'react-router-dom'
import { AiOutlineEdit, AiTwotoneDelete } from 'react-icons/ai'
const columns = [
    {
        title: 'SNo',
        dataIndex: 'key',
    },
    {
        title: 'Tên blog',
        dataIndex: 'name',
    },
    {
        title: 'Nội dung',
        dataIndex: 'desc',
    },
    {
        title: 'Danh mục blog',
        dataIndex: 'category',
    },
    {
        title: 'Action',
        dataIndex: 'action',
    },
];

const Bloglist = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getBlogs())
    }, [dispatch])

    const blogsState = useSelector((state) => state.blog.blogs);
    const data1 = [];
    for (let i = 0; i < blogsState.length; i++) {
        data1.push({
            key: i,
            name: blogsState[i].title,
            desc: blogsState[i].description,
            category: blogsState[i].category,
            action: (<div className='  fs-3 d-flex w-100 align-items-center gap-3'>
                <button className='green button-action' ><AiOutlineEdit /></button>
                <button className='red button-action' ><AiTwotoneDelete /></button>
            </div>
            ),

        });
    }


    return (
        <div>
            <h3 className='mt-2 title'>Blog list</h3>
            <div>
                <Table columns={columns} dataSource={data1} />
            </div>
        </div>
    )
}

export default Bloglist