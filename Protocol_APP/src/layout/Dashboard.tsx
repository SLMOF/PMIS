
// import { UserInfoViewModel } from '@viewModels';
import { useContext, useEffect, useState } from 'react'

const Dashboard = () => {
    // const [user, setUser] = useState<UserInfoViewModel>();

    // useEffect(() => {
    //     // userStore.validateToken();
    //     (async function () {
    //         const currentUser = await userStore.getUserInfo();
    //         if (currentUser)
    //             setUser(currentUser);
    //     })();
    // }, []);


    return (
        <>
            <div className="container mt-3">
                <div className="d-flex align-items-center justify-content-center">
                    <img src="/assets/img/astaan.png" className="navbar-logo mt-5" alt="logo" style={{ width: "45%", opacity: 0.2 }} />
                </div>
            </div>
            <div className="container mt-5">
                <hr style={{ backgroundColor: "#ccc", height: "1px", border: "none" }} />
                {/* <div className="row" >
                    <div className="col">
                        <h6>Name: {user?.fullName}</h6>
                    </div>
                    <div className="col" style={{ textAlign: "center" }}>
                        <h6>Office: {user?.officeName}</h6>
                    </div>
                    <div className="col" style={{ textAlign: "right" }}>
                        <h6>Department: {user?.deptName}</h6>
                    </div>
                </div> */}
                <hr style={{ backgroundColor: "#ccc", height: "1px", border: "none" }} />
            </div>
        </>
    )
}

export default Dashboard
