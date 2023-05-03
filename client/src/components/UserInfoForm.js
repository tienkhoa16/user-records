import React from "react";
import "./user-info-form.css";
import { Button } from "./Button";
import { useState } from "react";
import axios from "axios";

export const UserInfoForm = ({ field: { id, name, age, gender, occupation, interests } }) => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(
        "A user was submitted " +
          Array([id, userName, userAge, userGender, userOccupation, userInterests])
      );

      let res = await axios.post(
        "http://localhost:8000/create",
        {
          name: userName,
          age: userAge,
          gender: userGender,
          occupation: userOccupation,
          interests: userInterests,
        },
        { timeout: 5000 }
      );
      if (res.status === 200) {
        alert("Succesfully created a user");
        clearAllFields();
      } else {
        alert("Error sending data to the server");
      }
    } catch (err) {
      console.log("Error submitting the form " + err);
    }
  };

  const clearAllFields = () => {
    setUserName("");
    setUserAge("");
    setUserGender("");
    setUserOccupation("");
    setUserInterests("");
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
        <input name="user-name" required value={userName} onChange={handleChange} />
        <input
          name="user-age"
          type="number"
          required
          value={userAge}
          onChange={handleChange}
          min={0}
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
        <input name="user-occupation" required value={userOccupation} onChange={handleChange} />
        <input name="user-interests" required value={userInterests} onChange={handleChange} />
        <Button label="Submit" primary={true} type="submit" />
      </div>
    </form>
  );
};
