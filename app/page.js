// import Image from "next/image";
// import Dashboard from "../dashboard/page";



// export default function Home() {
//   return (
//    <div>
//     <Dashboard/>
//    </div>
//   );
// 
// import Navbar from "../components/Navbar";

"use client";
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

import PeopleTable from '../components/PeopleTable';
import Dashboard from '../components/DashboardPage';
import PersonForm from '@/components/PersonForm';
import {
  BrowserRouter as Router, 
  Route,
  Routes,
  BrowserRouter

} from "react-router-dom";

export default function Home() {
  return (
    // <div className="flex">
    //   <Sidebar />
    //   <div className="flex-1">
    //     <Navbar />
    //     <div className="p-6">
    //       {/* <PersonForm/> */}
    //       <PeopleTable />
    //       {/* <h1 className="text-2xl">Welcome to the Dashboard</h1> */}
         
    //     </div>
    //   </div>
    // </div>

    <Router>
      <Navbar />
      <div className="flex">
      
        <Sidebar />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/people" element={<PeopleTable/>} />
          </Routes>
        </div>
      </div>
    </Router>




    
  );
}