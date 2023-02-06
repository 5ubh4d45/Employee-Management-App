import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";

function CreateEmployeeComponent() {
    const navigate = useNavigate();

    const [inputField, setInputField] = useState({
        first_name: "",
        last_name: "",
        emailId: "",
    });


    const inputHandler = (e) => {
      const {name, value} = e.target;
      setInputField(prevState => ({
          ...prevState, [name]: value,
      }))                      // I have no idea wtf it means got from: https://stackoverflow.com/questions/53519578/forms-as-functional-components-with-react
    }

    return (
        <div>
            {/*<h2 className="h2">Create Employee</h2>*/}
            {/*<div>*/}
            {/*    <button className="btn-dark" onClick={() => navigate("/")}>Go Home</button>*/}
            {/*</div>*/}
            <div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3">
                        <h3 className="text-center">Add Employee</h3>
                        <div className="card-body">
                            <form>
                                <div className="form-group">
                                    <label>First Name</label>
                                    <input placeholder="First Name" name="first_name" className="form-control"
                                    value={inputField.first_name} onChange={inputHandler}/>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default CreateEmployeeComponent;