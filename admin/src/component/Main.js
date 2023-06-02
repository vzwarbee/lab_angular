import React, { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import { FiLogOut } from 'react-icons/fi'
import { AiOutlineDashboard, AiOutlineShoppingCart, AiOutlineUser } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const { Header, Sider, Content } = Layout;
const Main = () => {

    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const navigate = useNavigate();

    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="logo" >
                    <h2 className='text-white mb-0 fs-5 text-center py-3'>ADMIN</h2>
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    onClick={({ key }) => {
                        if (key === 'signout') {

                        } else {
                            navigate(key)
                        }

                    }}
                    items={[
                        {
                            key: '',
                            icon: <AiOutlineDashboard className='fs-4' />,
                            label: 'Dashboard',
                        },
                        {
                            key: 'customer',
                            icon: <AiOutlineUser className='fs-4' />,
                            label: 'Customers',
                        },
                        {
                            key: 'catalog',
                            icon: <AiOutlineShoppingCart className='fs-4' />,
                            label: 'Catalog',
                            children: [
                                {
                                    key: 'product',
                                    icon: <AiOutlineShoppingCart className='fs-4' />,
                                    label: 'Add Product',
                                },
                                {
                                    key: 'product-list',
                                    icon: <AiOutlineShoppingCart className='fs-4' />,
                                    label: 'Product List',
                                },
                                {
                                    key: 'brand',
                                    icon: <AiOutlineShoppingCart className='fs-4' />,
                                    label: 'Brand',
                                },
                                {
                                    key: 'brand-list',
                                    icon: <AiOutlineShoppingCart className='fs-4' />,
                                    label: 'brand List',
                                },
                                {
                                    key: 'category',
                                    icon: <AiOutlineShoppingCart className='fs-4' />,
                                    label: 'Category',
                                },
                                {
                                    key: 'category-list',
                                    icon: <AiOutlineShoppingCart className='fs-4' />,
                                    label: 'Category List',
                                },
                            ]
                        },
                        {
                            key: 'orders',
                            icon: <AiOutlineUser className='fs-4' />,
                            label: 'Orders',
                        },
                        {
                            key: 'blogs',
                            icon: <AiOutlineUser className='fs-4' />,
                            label: 'Blogs',
                            children: [
                                {
                                    key: 'blog',
                                    icon: <AiOutlineUser className='fs-4' />,
                                    label: 'Add Blog',
                                },
                                {
                                    key: 'blog-list',
                                    icon: <AiOutlineUser className='fs-4' />,
                                    label: 'Blog List',
                                },
                                {
                                    key: 'blog-category',
                                    icon: <AiOutlineUser className='fs-4' />,
                                    label: 'Add Blog Category',
                                },
                                {
                                    key: 'blog-category-list',
                                    icon: <AiOutlineUser className='fs-4' />,
                                    label: 'Blog CateList',
                                },
                            ]
                        },
                        {
                            key: 'enquiries',
                            icon: <AiOutlineUser className='fs-4' />,
                            label: 'Enquiries',
                        },

                    ]}
                />
            </Sider>
            <Layout className="site-layout">
                <Header className='d-flex justify-content-between ps-1 pe-5' style={{ padding: 0, background: colorBgContainer }}>
                    {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                        className: 'trigger',
                        onClick: () => setCollapsed(!collapsed),
                    })}
                    <div className='d-flex gap-3 align-items-center '>
                        <div className='d-flex gap-3 align-items-center p-3'>
                            <div>
                                <img src='logo512.png' alt='dashboard' />
                            </div>
                            <div role="button" id="dropdownMenuLink" data-bs-toggle="dropdown"
                                aria-expanded="false">

                                <h5 className='text-dark mb-0'>Admin</h5>
                                <p className='mb-0'>admin@gmail.com</p>
                            </div>
                            <div class="dropdown-menu" aria-describedby='dropdownMenuLink'>
                                <li>
                                    <Link to='/' style={{ height: "auto", lineHeight: "25px" }} className='dropdown-item'>
                                        View Profile
                                    </Link>
                                </li>
                                <li>
                                    <Link to='/' style={{ height: "auto", lineHeight: "25px" }} className='dropdown-item d-flex justify-content-between align-items-center'>
                                        Logout <FiLogOut className='red' />
                                    </Link>
                                </li>
                            </div>
                        </div>
                    </div>
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                    }}
                >
                    <ToastContainer position="top-right"
                        autoClose={1000}
                        hideProgressBar={false}
                        newestOnTop={true}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        theme="dark" />
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    )
}

export default Main