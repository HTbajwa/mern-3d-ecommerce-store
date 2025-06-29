import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Loadercomp from '../../components/Loadercomp';
import { getinfo } from '../../Localstorage/Store';

const Profiledetail = () => {
    const [srtloader, setsrtloader] = useState(true);
    const [data, setData] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        // Retrieve user data from localStorage
        const userData = getinfo();  // Call the function to get user data

        if (!userData) {
            navigate("/Dashboard"); // Redirect if no user info found
        } else {
            setData(userData); // Set the retrieved data to state
        }

        setsrtloader(false);
    }, [navigate]);

    return (
        <div style={{ width: '100%' }}>
            <div className="dashboardcontent">
                <div className="container-fuild px-2 desgin1">
                    <div className="row bg-white">
                        <div className="col-lg-12 d-flex justify-content-between py-2" style={{ background: 'hsla(210, 85%, 32%, 0.2)', color: '#0C5398' }}>
                            <p className="m-0 customfont">Personal Detail</p>
                            <div className="addnew d-block mb-2">
                                <button className="btn text-white closebtn">
                                    <NavLink to='/dashboard' style={{ textDecoration: 'none', color: 'white' }}>x Close</NavLink>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {srtloader ? (
                    <div className="container-fuild bg-white">
                        <div className="col-12 d-flex justify-content-center" style={{ gap: '4px', position: 'absolute', width: "80%" }}>
                            <div className='px-2'><Loadercomp size={100} /></div>
                        </div>
                    </div>
                ) : (
                    <div className="container-fuild px-2 pb-4 pt-3 bg-white">
                        <div className="row bg-white pb-4 round" style={{ border: '1px solid #E0E0E0', margin: "10px 0px", borderRadius: '3px' }}>
                            {[ 
                                { label: "Full Name", value: data.first_name },
                                { label: "Email", value: data.email },
                                { label: "Date of Birth", value: data.dob },
                                { label: "Mobile No.", value: data.mobile },
                                { label: "isAdmin", value: data.isAdmin },
                                
                            ].map((item, index) => (
                                <div className="col-6 px-4 pt-4" key={index}>
                                    <div className="row">
                                        <div className="col-3">
                                            <label className="form-label">{item.label}</label>
                                        </div>
                                        <div className="col-9">
                                            <p className='customcolor'>{item.value || "N/A"}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profiledetail;
