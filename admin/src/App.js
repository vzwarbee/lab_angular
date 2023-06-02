import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Resetpassword from './pages/Resetpassword'
import Forgotpassword from "./pages/Forgotpassword";
import Dashboard from "./pages/Dashboard";
import Main from './component/Main'
import Enquiries from './pages/Enquiries';
import Bloglist from './pages/Bloglist';
import BlogCatelist from './pages/BlogCatelist';
import Order from './pages/Order';
import Customers from './pages/Customers';
import Categorylist from './pages/Categorylist';
import Productlist from './pages/Productlist';
import Brandlist from './pages/Brandlist';
import Addblog from './pages/Addblog';
import AddblogCate from './pages/AddblogCate';
import Addproduct from './pages/Addproduct';
import AddBrand from './pages/AddBrand';
import AddProdCategory from './pages/AddCategory';
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/reset-password' element={<Resetpassword />} />
        <Route path='/forgot-password' element={<Forgotpassword />} />
        <Route path='/admin' element={<Main />} >
          <Route index element={<Dashboard />} />
          <Route path='enquiries' element={<Enquiries />} />
          <Route path='blog-list' element={<Bloglist />} />
          <Route path='blog-category-list' element={<BlogCatelist />} />
          <Route path='blog-category' element={<AddblogCate />} />
          <Route path='blog' element={<Addblog />} />
          <Route path='customer' element={<Customers />} />
          <Route path='orders' element={<Order />} />
          <Route path='category-list' element={<Categorylist />} />
          <Route path='category' element={<AddProdCategory />} />
          <Route path='product-list' element={<Productlist />} />
          <Route path='product' element={<Addproduct />} />
          <Route path='brand-list' element={<Brandlist />} />
          <Route path='brand' element={<AddBrand />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
