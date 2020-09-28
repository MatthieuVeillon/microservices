import React from "react";

const Signup = () => {
  return (
    <form>
      Signup
      <div>
        <label className="form-group">Email Address</label>
        <input className="form-control" />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input className="form-control" />
      </div>
      <button className="btn btn-primary">Signup</button>
    </form>
  );
};

export default Signup;
