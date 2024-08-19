
"use client";  


import { Link } from 'react-router-dom';

export default function Sidebar() {
  return (
    <aside className="bg-gray-200 w-64 p-6">
      <ul>
        <li className="mb-4">
          <Link to="/" className="text-lg font-semibold">Dashboard</Link>
        </li>
        <li>
          <Link to="/people" className="text-lg font-semibold">People Directory</Link>
        </li>
      </ul>
    </aside>
  );
}


