import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AiOutlineEdit, AiTwotoneDelete } from 'react-icons/ai'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from "react-toastify"
import { Table } from 'antd';
import { getUsers } from '../features/customers/customerSlice';
import { deleteUser } from '../features/auth/authSlice';
const columns = [
    {
        title: 'SNo',
        dataIndex: 'key',
    },
    {
        title: 'Tên đầy đủ',
        dataIndex: 'name',
        defaultSortOrder: "descend",
        sorter: (a, b) => a.name.length - b.name.length
    },
    {
        title: 'Email',
        dataIndex: 'email',
    },
    {
        title: 'số điện thoại',
        dataIndex: 'mobile',
    },
    {
        title: 'Vai trò',
        dataIndex: 'role',
    },
    {
        title: 'Action',
        dataIndex: 'action',
    },
];


const Customers = () => {
    const dispatch = useDispatch();
    const location = useLocation()
    const navigate = useNavigate()
    useEffect(() => {
        dispatch(getUsers())
    }, [dispatch]);

    const customerState = useSelector((state) => state.customer.customers);

    const delUser = (id) => {
        dispatch(deleteUser(id))
        toast.success("Xóa thành công");

        setTimeout(() => {
            navigate(location.pathname)
        }, 1000)

    }
    const data1 = [];
    for (let i = 0; i < customerState.length; i++) {
        if (customerState[i].role !== 'admin') {
            data1.push({
                key: i,
                name: customerState[i].firstname + " " + customerState[i].lastname,
                email: customerState[i].email,
                mobile: customerState[i].mobile,
                role: customerState[i].role,
                action: (<div className='  fs-3 d-flex w-100 align-items-center gap-3'>
                    <button className='green button-action' ><AiOutlineEdit /></button>
                    <button className='red button-action' onClick={() => delUser(customerState[i]._id)}><AiTwotoneDelete /></button>
                </div>
                ),

            });
        }
    }

    return (
        <div>
            <h3 className='mt-2 title'>Quản lý người dùng</h3>
            <div>
                <Table columns={columns} dataSource={data1} />
            </div>
        </div>
    )
}

export default Customers