import React, { useEffect } from 'react'
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux'

import { Link } from 'react-router-dom'
import { AiOutlineEdit, AiTwotoneDelete } from 'react-icons/ai'
import { getOrder } from '../features/auth/authSlice';

const columns = [
    {
        title: 'SNo',
        dataIndex: 'key',
    },
    {
        title: 'Họ và Tên',
        dataIndex: 'name',
    },
    {
        title: 'Tên sản phẩm',
        dataIndex: 'product',
    },
    {
        title: 'Tổng giá',
        dataIndex: 'amount',
    },
    {
        title: 'Ngày xuất bản',
        dataIndex: 'date',
    },
    {
        title: 'Action',
        dataIndex: 'action',
    },
];

const Order = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getOrder())
    }, [dispatch])

    const orderState = useSelector((state) => state.auth.orders);
    // console.log(orderState);
    const data1 = [];
    for (let i = 0; i < orderState.length; i++) {
        data1.push({
            key: i + 1,
            name: orderState[i].orderby.firstname,
            product: orderState[i].products.map((i) => { return <p>{i.product.title}&nbsp;...</p> })[0],
            amount: orderState[i].paymentIntent.amount,
            date: new Date(orderState[i].createdAt).toLocaleDateString(),
            action: (<div className='  fs-3 d-flex w-100 align-items-center gap-3'>
                <button className='green button-action' ><AiOutlineEdit /></button >
                <button className='red button-action' > <AiTwotoneDelete /></button >
            </div >
            ),

        });
    }
    return (
        <div>
            <h3 className='mt-2 title'>Order</h3>
            <div>
                <Table columns={columns} dataSource={data1} />
            </div>
        </div>
    )
}

export default Order