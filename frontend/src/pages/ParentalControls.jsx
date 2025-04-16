import { useState, useEffect } from "react";
import axios from "axios";

const ParentalControls = ({ userId }) => {
  const [enabled, setEnabled] = useState(false);
  const [ageLimit, setAgeLimit] = useState(13);

  useEffect(() => {
    axios.get(`/api/parental-controls/${userId}`)
      .then(res => {
        setEnabled(res.data.enabled);
        setAgeLimit(res.data.ageLimit);
      });
  }, [userId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`/api/parental-controls/${userId}`, {
      enabled,
      ageLimit,
    }).then(() => alert("Updated!"));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Enable Parental Controls:
        <input
          type="checkbox"
          checked={enabled}
          onChange={(e) => setEnabled(e.target.checked)}
        />
      </label>
      <br />
      <label>
        Age Limit:
        <input
          type="number"
          value={ageLimit}
          onChange={(e) => setAgeLimit(parseInt(e.target.value))}
        />
      </label>
      <br />
      <button type="submit">Save Settings</button>
    </form>
  );
};

export default ParentalControls;
