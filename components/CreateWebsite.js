import React from 'react';

function CreateWebsite(props) {
  const handleInputChange = (event) => {
    props.setInputValue(event.target.value);
  }

  return (
    <div>
      <h2>Create Website</h2>
      <label htmlFor="websiteNameInput">Website Name:</label>
      <input
        id="websiteNameInput"
        type="text"
        value={props.inputValue}
        onChange={handleInputChange}
      />
    </div>
  );
}

export default CreateWebsite;