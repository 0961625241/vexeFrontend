import Signin from './../Components/User/Signin/Signin';
import Signup from './../Components/User/Signup/Signup';

const Routes = [
    {
        path: "/signup",
        exact: false,
        main: Signup
    },
    {
        path: "/login",
        exact: false,
        main: Signin
    },
]

export default Routes;