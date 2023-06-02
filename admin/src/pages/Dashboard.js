import React from 'react'
import '../style/Dashboard.css'
import { BsArrowDownRight } from 'react-icons/bs'
import { Column } from '@ant-design/plots';
import { Table } from 'antd';
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
        title: 'Product',
        dataIndex: 'product',
    },
    {
        title: 'Status',
        dataIndex: 'status',
    },
];
const data1 = [];
for (let i = 0; i < 46; i++) {
    data1.push({
        key: i,
        name: `Edward King ${i}`,
        product: 32,
        status: `London, Park Lane no. ${i}`,
    });
}

const Dashboard = () => {

    const data = [
        {
            type: 'Jan',
            sales: 38,
        },
        {
            type: 'Feb',
            sales: 52,
        },
        {
            type: 'Mar',
            sales: 61,
        },
        {
            type: 'Apr',
            sales: 145,
        },
        {
            type: 'May',
            sales: 48,
        },
        {
            type: 'Jun',
            sales: 38,
        },
        {
            type: 'July',
            sales: 38,
        },
        {
            type: 'Aug',
            sales: 38,
        },
        {
            type: 'Sept',
            sales: 38,
        },
        {
            type: 'Oct',
            sales: 38,
        },
        {
            type: 'Nov',
            sales: 38,
        },
        {
            type: 'Dec',
            sales: 38,
        },
    ];
    const config = {
        data,
        xField: 'type',
        yField: 'sales',
        color: ({ type }) => {
            return "#ffd333"
        },
        label: {
            // 可手动配置 label 数据标签位置
            position: 'middle',
            // 'top', 'bottom', 'middle',
            // 配置样式
            style: {
                fill: '#FFFFFF',
                opacity: 0.6,
            },
        },
        xAxis: {
            label: {
                autoHide: true,
                autoRotate: false,
            },
        },
        meta: {
            type: {
                alias: 'Month',
            },
            sales: {
                alias: 'Income',
            },
        },
    };

    return (
        <div >
            <h3 className='mb-4 title'>Dashboard</h3>
            <div className='d-flex justify-content-between align-items-center gap-3'>
                <div className='d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3'>
                    <div>
                        <p className='desc'>Total</p> <h4 className='mb-0 sub-title'>$1234</h4>
                    </div>
                    <div className='d-flex flex-column align-items-end'>
                        <h6>< BsArrowDownRight /> 32%</h6>
                        <p className='mb-0 second-title'>Compared to a 2020</p>
                    </div>
                </div>
                <div className='d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3'>
                    <div>
                        <p className='desc'>Total</p> <h4 className='mb-0 sub-title'>$1234</h4>
                    </div>
                    <div className='d-flex flex-column align-items-end'>
                        <h6 className='red '>< BsArrowDownRight /> 32%</h6>
                        <p className='mb-0 second-title'>Compared to a 2020</p>
                    </div>
                </div>
                <div className='d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3'>
                    <div>
                        <p className='desc'>Total</p> <h4 className='mb-0 sub-title'>$1234</h4>
                    </div>
                    <div className='d-flex flex-column align-items-end'>
                        <h6 className='green'>< BsArrowDownRight /> 32%</h6>
                        <p className='mb-0 second-title'>Compared to a 2020</p>
                    </div>
                </div>
            </div>
            <div className="mt-4 bg-white p-3">
                <h3 className="mt-2 title">In Come</h3>
                <div className='mt-4'>
                    <Column {...config} />
                </div>
            </div>
            <div className='mt-4 bg-white p-3'>
                <h3 className='mt-2 title'>Resend Orders</h3>
                <div className='mt-4'>
                    <Table columns={columns} dataSource={data1} />

                </div>
            </div>
        </div>
    )
}

export default Dashboard