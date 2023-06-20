import React from "react";
import * as Validator from "validatorjs";

const Input = ({ label, type, name, onChange }) => {
  return (
    <div>
      <label>{label}:</label>
      <br />
      <input type={type} name={name} onChange={(e) => onChange(e.target.value)} />
      <br />
    </div>
  );
};

const ShowErrors = ({ errors }) => {
  return (
    <ul style={{ color: "red", marginLeft: "-20px" }}>
      {errors.map((error, i) => (
        <li key={i}>{error}</li>
      ))}
    </ul>
  );
};

export default class FormElement extends React.Component {
  state = {
    email: "",
    password: "",
    errors: [],
    success: false,
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { email, password } = this.state;

    let data = {
      email,
      password,
    };

    let rules = {
      email: "required|email",
      password: "required|min:8",
    };

    let validation = new Validator(data, rules);
    validation.passes();

    if (validation.fails()) {
      this.setState({
        errors: [
          ...validation.errors.get("email"),
          ...validation.errors.get("password"),
        ],
        success: false,
      });
    } else {
      this.setState({
        errors: [],
        success: true,
      })
      alert("Login Berhasil");
    }
  };

  render() {
    const style = {
      width: "400px",
      margin: "100px auto 0",
      border: "1px solid black",
      padding: "10px",
    };

    const { errors, success } = this.state;

    return (
      <div style={style}>
        {success && (
          <div>Login berhasil!</div>
        )}
        {errors.length > 0 && <ShowErrors errors={errors} />}
        <h4>Login Page</h4>
        <form onSubmit={this.handleSubmit}>
          <Input
            type="text"
            name="email"
            label="Email"
            onChange={(value) => this.setState({ email: value })}
          />
          <Input
            type="password"
            name="password"
            label="Password"
            onChange={(value) => this.setState({ password: value })}
          />
          <br />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
}
