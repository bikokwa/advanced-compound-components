import React, { createContext, useContext, useState } from "react";
import "./App.css";

const CheckboxInterface = createContext(null);

const Checkbox = ({ children }) => {
  const [checked, setChecked] = useState(true);

  return (
    <CheckboxInterface.Provider value={{ checked, setChecked }}>
      {children}
    </CheckboxInterface.Provider>
  );
};

const CheckboxInput = () => {
  const context = useContext(CheckboxInterface);

  if (!context) {
    throw new Error("Should be used inside <Checkbox />");
  }

  const { checked, setChecked } = context;

  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={(e) => {
        setChecked(e.target.checked);
      }}
    />
  );
};

const Label = ({ children }) => {
  const context = useContext(CheckboxInterface);

  if (!context) {
    throw new Error("Label should be called from Checkbox component");
  }

  const { setChecked } = context;

  return (
    <label onClick={() => setChecked((state) => !state)}>{children}</label>
  );
};

function App() {
  return (
    <Checkbox>
      <CheckboxInput />
      <div>
        <Label>Click Me</Label>
      </div>
    </Checkbox>
  );
}

export default App;
