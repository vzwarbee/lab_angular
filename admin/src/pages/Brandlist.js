import React, { useEffect } from 'react'
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux'
import { getBrands } from '../features/brand/brandSlice';
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


const Brandlist = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getBrands())
    }, [dispatch])

    const brandState = useSelector((state) => state.brand.brands);
    const data1 = [];
    for (let i = 0; i < brandState.length; i++) {
        data1.push({
            key: i,
            name: brandState[i].title,
            action: (<div className='  fs-3 d-flex w-100 align-items-center gap-3'>
                <button className='green button-action' ><AiOutlineEdit /></button >
                <button className='red button-action' > <AiTwotoneDelete /></button >
            </div >
            ),

        });
    }

    return (
        <div>
            <h3 className='mt-2 title'>Brand list</h3>
            <div>
                <Table columns={columns} dataSource={data1} />
            </div>
        </div>
    )
}

export default Brandlist