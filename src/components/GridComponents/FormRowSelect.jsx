// This is Select Input Component and we are using this in the GridFooter.jsx

const FormRowSelect = ({  name, value, handleChange, list }) => {
    return (
      <div >
        <select
          name={name}
          value={value}
          onChange={handleChange}
          className="FormSelect"
        >
          {list.map((itemValue, index) => {
            return (
              <option key={index} value={itemValue}>
                {itemValue} Page
              </option>
            )
          })}
        </select>
      </div>
    )
  }
  
  export default FormRowSelect