import React from "react";
import * as Validator from "validatorjs";

const Input = ({label, type, name}) => {
    return (
        <div>
            <label>
            {label}:
        </label>
        <br />
        <label>
        <input type={type} name={name} />
        </label>
        <br />
        </div>
    )
}

const ShowErrors = ({errors}) => {
    return(
        <ul style={{color : 'red', marginLeft : '-20px'}}>
            {
                errors.map((error, i) => <li key={i}>{error}</li>)
            }
        </ul>
    )
}

export default class FormElement extends React.Component{
    state = {
        email : '',
        password : '',
        errors:[]

    }

    handleSubmit = event => {
        event.preventDefault();
        const {email, password}=this.state;

        let data = {
            email,
            password
        }
        
        let rules = {
            email : 'required|email',
            password : 'required|min:8'
        }

        let validation = new Validator(data, rules);
        validation.passes();
        this.setState({
            errors: [
                ...validation.errors.get('email'),
                ...validation.errors.get('password'),
            ]
        })
    }
    render(){
        const style = {
            width : '400px',
            margin : '100px auto 0',
            border : '1px solid black',
            padding : '10px'
        }
        return(
            <div style={style}>
                {
                    this.state.errors && <ShowErrors errors={this.state.errors} />
                }
                <h4>Login Page</h4>
                <form onSubmit={this.handleSubmit}>
                    <Input type="text" name="email" label="Email" 
                    onChange={value => this.setState({email:value})}/>
                    <Input type="text" name="password" label="Password" 
                    onChange={value => this.setState({password:value})}/>
                    <br />
                    <button type="submit">Login</button>
                </form>
            </div>
        )
    }
        
}