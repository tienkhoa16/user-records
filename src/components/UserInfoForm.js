import React from "react";
import "./user-info-form.css";
import { Button } from "./Button";
import { useState } from "react";

export const UserInfoForm = ({ field: { name, age, gender, occupation, interests } }) => {
  const [userName, setUserName] = useState(name);
  const [userAge, setUserAge] = useState(age);
  const [userGender, setUserGender] = useState(gender);
  const [userOccupation, setUserOccupation] = useState(occupation);
  const [userInterests, setUserInterests] = useState(interests);

  const handleChange = (e) => {
    console.log("Field " + e.target.name + " was changed to " + e.target.value);
    if (e.target.name === "user-name") {
      setUserName(e.target.value);
    } else if (e.target.name === "user-age") {
      setUserAge(parseInt(e.target.value));
    } else if (e.target.name === "user-gender") {
      setUserGender(e.target.value);
    } else if (e.target.name === "user-occupation") {
      setUserOccupation(e.target.value);
    } else if (e.target.name === "user-interests") {
      setUserInterests(e.target.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(
      "A user was submitted " +
        Array([userName, userAge, userGender, userOccupation, userInterests])
    );
  };

  return (
    <form className="user-info-form" onSubmit={handleSubmit}>
      <div className="form-column form-labels">
        <label>Name</label>
        <label>Age</label>
        <label>Gender</label>
        <label>Occupation</label>
        <label>Interests</label>
      </div>
      <div className="form-column form-values">
        <input name="user-name" required defaultValue={userName} onChange={handleChange} />
        <input
          name="user-age"
          type="number"
          required
          defaultValue={userAge}
          onChange={handleChange}
        />
        <div style={{ display: "flex", flexDirection: "row" }}>
          <label>
            <input
              name="user-gender"
              type="radio"
              value="male"
              required
              checked={userGender === "male"}
              onChange={handleChange}
            />
            Male
          </label>
          <label>
            <input
              name="user-gender"
              type="radio"
              value="female"
              checked={userGender === "female"}
              onChange={handleChange}
            />
            Female
          </label>
          <label>
            <input
              name="user-gender"
              type="radio"
              value="other"
              checked={userGender === "other"}
              onChange={handleChange}
            />
            Other
          </label>
        </div>
        <input
          name="user-occupation"
          required
          defaultValue={userOccupation}
          onChange={handleChange}
        />
        <input
          name="user-interests"
          required
          defaultValue={userInterests}
          onChange={handleChange}
        />
        <Button label="Submit" primary={true} type="submit" />
      </div>
    </form>
  );
};
