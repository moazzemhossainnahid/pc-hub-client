import { BsBook, BsBookmarks, BsCameraVideo, BsCashCoin, BsChatDots, BsCheckCircle, BsFolderCheck, BsGear, BsHeadset, BsHouseDoor, BsListTask, BsMortarboard, BsPerson, BsVectorPen, BsVolumeUp } from "react-icons/bs";

const studentRoute = [
    {
        title: 'Dashboard',
        path: '/user/dashboard',
        icon: <BsHouseDoor></BsHouseDoor>
    },
    {
        title: 'Running Course',
        path: '/user/running-course',
        icon: <BsBook></BsBook>
    },
    {
        title: 'Live Courses',
        path: '/user/live-sessions',
        icon: <BsCameraVideo></BsCameraVideo>
    },
    {
        title: 'Announcements',
        path: '/user/announcements',
        icon: <BsVolumeUp></BsVolumeUp>
    },
    // {
    //     title: 'Support',
    //     path: '/user/support',
    //     icon: <BsHeadset></BsHeadset>
    // },
    {
        title: 'Assignments',
        path: '/user/assignments-result',
        icon: <BsListTask></BsListTask>
    },
    // {
    //     title: 'Bookmarks',
    //     path: '/user/bookmarks',
    //     icon: <BsBookmarks></BsBookmarks>
    // },
    {
        title: 'Enrolled Courses',
        path: '/user/enrolled-courses',
        icon: <BsFolderCheck></BsFolderCheck>
    },
    {
        title: 'Completed Courses',
        path: '/user/completed-courses',
        icon: <BsCheckCircle></BsCheckCircle>
    },
    // {
    //     title: 'Certification',
    //     path: '/user/certificate',
    //     icon: <BsMortarboard></BsMortarboard>
    // },
    {
        title: 'Payment History',
        path: '/user/payment-history',
        icon: <BsCashCoin></BsCashCoin>
    },
    {
        title: 'Feedbacks',
        path: '/user/feedbacks',
        icon: <BsVectorPen></BsVectorPen>
    },
    {
        title: 'My Profile',
        path: '/user/profile',
        icon: <BsPerson></BsPerson>
    },
    {
        title: 'Settings',
        path: '/user/settings',
        icon: <BsGear></BsGear>
    },
]

export default studentRoute;