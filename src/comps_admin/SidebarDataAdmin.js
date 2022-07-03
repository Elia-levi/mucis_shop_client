import React from 'react'

import { MdOutlineCategory, MdProductionQuantityLimits } from "react-icons/md";
import { IoBagCheckOutline } from "react-icons/io5";
import { BiCategory } from "react-icons/bi";
import { FiUsers } from "react-icons/fi";


export const SidebarDataAdmin = [
    {
        title: 'Catgories',
        path: '/admin/categories',
        icon: <BiCategory />,
        cName: 'nav-text'
    },
    {
        title: 'SubCategories',
        path: '/admin/subCategoriesList',
        icon: <MdOutlineCategory />,
        cName: 'nav-text'
    },
    {
        title: 'Products',
        path: '/admin/products',
        icon: <MdProductionQuantityLimits />,
        cName: 'nav-text'
    },
    {
        title: 'Users',
        path: '/admin/users',
        icon: <FiUsers />,
        cName: 'nav-text'
    },
    {
        title: 'Orders',
        path: '/admin/checkout',
        icon: <IoBagCheckOutline />,
        cName: 'nav-text'
    }
]