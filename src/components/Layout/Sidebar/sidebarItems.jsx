import { Iconify } from '../../iconify/iconify';

const SideBarItems = [
  {
    text: 'Dashboard',
    icon: <Iconify icon={'radix-icons:dashboard'}/>,
    path: '/',
  },
  {
    text: 'Projects',
    icon: <Iconify icon={'si:projects-alt-duotone'}/>,
    path: '/projects',
  },
  {
    text: 'Estimates',
    icon: <Iconify icon={'hugeicons:estimate-01'}/>,
    path: '/estimates',
  },
];

export default SideBarItems;
