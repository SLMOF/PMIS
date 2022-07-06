
import { FiAirplay, FiBriefcase, FiPlusSquare, FiUsers } from 'react-icons/fi'
import { NavLink, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import jwt_decode from "jwt-decode";
import { Token } from '@models';

const Sidebar = () => {
    const navigate = useNavigate();

    const MySwal = withReactContent(Swal);

    // const onLookupClickHandler = (e: any) => {
    //     e.preventDefault();

    //     MySwal.fire({
    //         showConfirmButton: false,
    //         allowOutsideClick: false,
    //         showCloseButton: true,
    //         width: 800,
    //         html: <Lookup callback={() => navigate("/documents/list")} />
    //     })
    // }

    const token = JSON.parse(localStorage.getItem('token') ?? '');
    const decoded: Token = jwt_decode(token);
    const role = decoded.roleName;
    return (
        <div className="sidebar-wrapper sidebar-theme">
            <nav id="sidebar">
                {/* <div className="shadow-bottom" /> */}
                <ul className="list-unstyled menu-categories" id="accordionExample">
                    <li className="menu">
                        <NavLink to="/" aria-expanded="false" className="dropdown-toggle">
                            <div >
                                <FiAirplay />
                                <span>Dashboard</span>
                            </div>
                        </NavLink>
                    </li>
                    <li className="menu">
                        <a href="#user" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">
                            <div >
                                <FiUsers />
                                <span>Visitors</span>
                            </div>
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-right"><polyline points="9 18 15 12 9 6" /></svg>
                            </div>
                        </a>
                        <ul className="collapse submenu list-unstyled" id="user" data-parent="#accordionExample">
                            <li>
                                {role === "Admin" ? <NavLink to="/visitor/new"> Add Visitor </NavLink> : <NavLink to="/visitor/newPop"> Add Visitor </NavLink>}
                            </li>
                            <li>
                                <NavLink to="/visitor/list"> Visitors List </NavLink>
                            </li>
                        </ul>
                    </li>
                    {/* <li className="menu">
                        <NavLink to="/owners/new" aria-expanded="false" className="dropdown-toggle">
                            <div >
                                <FiPlusSquare />
                                <span>Ganacsade</span>
                            </div>
                        </NavLink>
                    </li> */}
                    <li className="menu">
                        <NavLink to="/business/types" aria-expanded="false" className="dropdown-toggle">
                            <div >
                                <FiBriefcase />
                                <span>Departments</span>
                            </div>
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </div>

    )
}

export default Sidebar
