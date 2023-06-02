import React, { useEffect } from 'react'
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { AiOutlineEdit, AiTwotoneDelete } from 'react-icons/ai'
import { getBlogCates } from '../features/blogCate/blogCateSlice';
const columns = [
    {
        title: 'SNo',
        dataIndex: 'key',
    },
    {
        title: 'Tên danh mục blog',
        dataIndex: 'name',
        sorter: (a, b) => a.name.length - b.name.length
    },
    {
        title: 'Action',
        dataIndex: 'action',
    },
];


const BlogCatelist = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getBlogCates())
    }, [dispatch])

    const blogCatesState = useSelector((state) => state.blogCate.blogCates);
    const data1 = [];
    for (let i = 0; i < blogCatesState.length; i++) {
        data1.push({
            key: i,
            name: blogCatesState[i].title,
            action: (<div className='  fs-3'>
                <Link className='green' to='/'><AiOutlineEdit /></Link>
                <Link className='red ms-3' to="/"><AiTwotoneDelete /></Link>
            </div>
            ),

        });
    }



    return (
        <div>
            <h3 className='mt-2 title'>Blog cate list</h3>
            <div>
                <Table columns={columns} dataSource={data1} />
            </div>
        </div>
    )
}

export default BlogCatelist