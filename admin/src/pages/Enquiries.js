import React, { useEffect } from 'react'
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { AiOutlineEdit, AiTwotoneDelete } from 'react-icons/ai'
import { getEnqs } from '../features/enquiry/enqSlice';
const columns = [
    {
        title: 'SNo',
        dataIndex: 'key',
    },
    {
        title: 'Name',
        dataIndex: 'name',
        sorter: (a, b) => a.name.length - b.name.length

    },
    {
        title: 'Email',
        dataIndex: 'email',
    },
    {
        title: 'Số điện thoại',
        dataIndex: 'mobile',
    },
    {
        title: 'Nội dung',
        dataIndex: 'comment',
    },
    {
        title: 'Trạng thái',
        dataIndex: 'status',
    },
    {
        title: 'Action',
        dataIndex: 'action',
    },
];

const Enquiries = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getEnqs())
    }, [dispatch])

    const enqsState = useSelector((state) => state.enquiry.enquirys);
    const data1 = [];
    for (let i = 0; i < enqsState.length; i++) {
        data1.push({
            key: i,
            name: enqsState[i].name,
            email: enqsState[i].email,
            mobile: enqsState[i].mobile,
            comment: enqsState.map((e) => {
                return (
                    <p className='desc-nowrap'>{e.comment}</p>
                )
            })[i],
            status: enqsState[i].status,
            action: (<div className='  fs-3 d-flex w-100 align-items-center gap-3'>
                <button className='green button-action' ><AiOutlineEdit /></button >
                <button className='red button-action' > <AiTwotoneDelete /></button >
            </div >
            ),

        });
    }

    return (
        <div>
            <h3 className='mt-2 title'>Enquiries</h3>
            <div>
                <Table columns={columns} dataSource={data1} />
            </div>
        </div>
    )
}

export default Enquiries