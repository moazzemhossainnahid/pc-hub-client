import { BsCameraVideo, BsCashCoin, BsChatSquare, BsGear, BsHouseDoor, BsListTask, BsPeople, BsPerson, BsPlusCircle, BsPower, BsStar, BsUiChecksGrid, BsVolumeUp } from "react-icons/bs";
import { FaDesktop } from "react-icons/fa";

const adminRoute = [
    {
        title: 'Dashboard',
        path: '/admin/dashboard',
        icon: <BsHouseDoor></BsHouseDoor>
    },
    {
        title: 'Add Course',
        path: '/admin/add-course',
        icon: <BsPlusCircle></BsPlusCircle>
    },
    {
        title: 'Live Classes',
        path: '/admin/live-classes',
        icon: <BsCameraVideo></BsCameraVideo>
    },
    {
        title: 'Announcements',
        path: '/admin/announcements',
        icon: <BsVolumeUp></BsVolumeUp>
    },
    {
        title: 'Quiz Attempts',
        path: '/admin/quiz',
        icon: <BsChatSquare></BsChatSquare>
    },
    {
        title: 'Assignments',
        path: '/admin/assignments',
        icon: <BsListTask></BsListTask>
    },
    {
        title: 'Manage Courses',
        path: '/admin/manage-courses',
        icon: <BsUiChecksGrid></BsUiChecksGrid>
    },
    {
        title: 'Manage Users',
        path: '/admin/manage-users',
        icon: <BsPeople></BsPeople>
    },
    {
        title: 'Manage Reviews',
        path: '/admin/manage-reviews',
        icon: <BsStar></BsStar>
    },
    {
        title: 'Transactions',
        path: '/admin/transactions',
        icon: <BsCashCoin></BsCashCoin>
    },
    {
        title: 'Content Manage',
        path: '/admin/content-manage',
        icon: <FaDesktop></FaDesktop>
    },
    {
        title: 'My Profile',
        path: '/admin/my-profile',
        icon: <BsPerson></BsPerson>
    },
    {
        title: 'Settings',
        path: '/admin/settings',
        icon: <BsGear></BsGear>
    }
]

export default adminRoute;