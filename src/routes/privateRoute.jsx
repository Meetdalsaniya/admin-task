import { Iconify } from "../components/iconify/iconify";
import DashboardView from "../sections/dashboard/dashboard-view";
import EstimatesView from "../sections/estimates/view/estimates-view";
import ProjectCreateView from "../sections/project/view/project-create-view";
import ProjectsView from "../sections/project/view/project-view";


const PrivateRoute = [
  {
    text: 'Dashboard',
    icon: <Iconify icon={'radix-icons:dashboard'}/>,
    path: '/',
    component :<DashboardView/>
  },
  {
    text: 'Projects',
    icon: <Iconify icon={'si:projects-alt-duotone'}/>,
    path: '/projects',
    component :<ProjectsView/>
  },
  {
    text: 'Projects',
    icon: <Iconify icon={'si:projects-alt-duotone'}/>,
    path: '/projects/create',
    component :<ProjectCreateView/>
  },
  {
    text: 'Estimates',
    icon: <Iconify icon={'hugeicons:estimate-01'}/>,
    path: '/estimates',
    component :<EstimatesView/>

  },
  
];

export default PrivateRoute;
