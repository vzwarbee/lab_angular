import React, { useEffect } from 'react'
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux'
import { getProdCategorys } from '../features/proCate/prodCateSlice';
import { Link } from 'react-router-dom'
import { AiOutlineEdit, AiTwotoneDelete } from 'react-icons/ai'
const columns = [
    {
        title: 'SNo',
        dataIndex: 'key',
    },
    {
        title: 'Name',
        dataIndex: 'name',
    },
    {
        title: 'Action',
        dataIndex: 'action',
    },
];


const Categorylist = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProdCategorys())
    }, [dispatch])

    const prodCateState = useSelector((state) => state.productCategory.productCategorys
    );
    const data1 = [];
    for (let i = 0; i < prodCateState.length; i++) {
        data1.push({
            key: i,
            name: prodCateState[i].title,
            action: (<div className='  fs-3 d-flex w-100 align-items-center gap-3'>
                <button className='green button-action' ><AiOutlineEdit /></button >
                <button className='red button-action' > <AiTwotoneDelete /></button >
            </div >
            ),

        });
    }
    return (
        <div>
            <h3 className='mt-2 title'>Category list</h3>
            <div>
                <Table columns={columns} dataSource={data1} />
            </div>
        </div>
    )
}

export default Categorylist