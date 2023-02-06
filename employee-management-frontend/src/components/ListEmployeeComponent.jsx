import React, {Component, useEffect, useState} from 'react';
import {getEmployees} from "../services/EmployeeService";
import {useNavigate} from "react-router-dom";


function ListEmployeeComponent(props) {

    // constructor(props) {
    //     super(props);
    //
    //     this.state = {
    //         employees: []
    //     }
    //     this.addEmployee = this.addEmployee.bind(this);
    // }

    const [employees, setEmployees] = useState([]);

    const navigate = useNavigate();
    const addEmployee = () => {
       navigate("/add-employee");
       //  return () => <Navigate to="/add-employee" />
    }

    // componentDidMount() {
    //     // EmployeeService.getEmployee().then((res) => {
    //     //     this.setState({employees: res.data});
    //     // });
    //     addEmployee().then();
    // }

    useEffect(() => {
        getEmployees().then((res) => {
            setEmployees(res.data);
            // console.log(res);

            // console.log(employees);
        })
    }, [])


    return (
        <div>
            <h2 className='text-center'>Employee List</h2>
            <div className="row">
                <button className="btn btn-dark" onClick={addEmployee}>Add Employee</button>
                {/*<button className="btn btn-dark" onClick={() => <Navigate to="/add-employees" replace={true}/>}>Add Employee</button>*/}
            </div>
            <div className='row'>
                <table className='table table-striped table-bordered'>
                    <thead>
                    <tr>
                        <th className='text-center'> Employee First Name</th>
                        <th className='text-center'> Employee Last Name</th>
                        <th className='text-center'> Employee Email Id</th>
                        <th className='text-center'> Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        employees.map(employee =>
                            <tr key = {employee.id}>
                                <td>{employee.firstName}</td>
                                <td>{employee.lastName}</td>
                                <td>{employee.emailId}</td>
                            </tr>
                        )
                    }
                    </tbody>
                </table>
            </div>
        </div>
    );

}

export default ListEmployeeComponent;
// export default withRouter(ListEmployeeComponent);