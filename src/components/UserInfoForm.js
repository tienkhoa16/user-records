import React from "react";
import "./user-info-form.css";
import { Button } from "./Button";

export const UserInfoForm = ({ field: { user_name, age, gender, occupation, interests }, onSubmit }) => {
  return (
    <form className="user-info-form">
      <div className="form-column form-labels">
        <label>Name</label>
        <label>Age</label>
        <label>Gender</label>
        <label>Occupation</label>
        <label>Interests</label>
        <Button label="Clear" />
      </div>
      <div className="form-column form-values">
        <input name="user-name" required value={user_name} />
        <input name="user-age" type="number" required value={age} />
        <div style={{ display: "flex", flexDirection: "row" }}>
          <label>
            <input
              name="user-gender"
              type="radio"
              value="male"
              required
              defaultChecked={gender === "male"}
            />
            Male
          </label>
          <label>
            <input
              name="user-gender"
              type="radio"
              value="female"
              defaultChecked={gender === "female"}
            />
            Female
          </label>
          <label>
            <input
              name="user-gender"
              type="radio"
              value="other"
              defaultChecked={gender === "other"}
            />
            Other
          </label>
        </div>
        <input name="user-occupation" required value={occupation} />
        <input name="user-interests" required value={interests} />
        <Button label="Submit" primary={true} type="submit" />
      </div>
    </form>
  );
};
