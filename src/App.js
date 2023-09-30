import jsPDF from "jspdf";
import React, { useRef, useState } from "react";

const initValues = {
  name: "",
  description: "",
  images: [],
  categories: "",
};

const App = () => {
  const [formData, setFormData] = useState(initValues);
  const [exps, setExps] = useState([]);
  const [a, setA] = useState([1, 2, 3, 4, 5]);

  const addExp = (e) => {
    e.preventDefault();
    setExps([...exps, { title: "", description: "" }]);
  };

  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    // setImage(e.target.files[0]);
    const files = Array.from(e.target.files);
    setFormData((prev) => ({ ...prev, images: [...prev.images, ...files] }));
  };

  // const updateA = (index) => {
  //   const tempA = [...a];
  //   tempA.splice(index, 1);
  //   setA(tempA);
  // };

  const handleExp = (index, e) => {
    const { name, value } = e.target;
    const updatedExps = [...exps];
    updatedExps[index][name] = value;
    setExps(updatedExps);
  };

  const handleRemoveExps = (index) => {
    const updatedExps = [...exps];
    updatedExps.splice(index, 1);
    setExps(updatedExps);
  };

  const downloadPDF = () => {
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    pdf.rect(20, 20, 10, 10); // empty square

    pdf.rect(40, 20, 10, 10, "F"); // filled square

    pdf.setDrawColor(255, 0, 0);
    pdf.rect(60, 20, 10, 10); // empty red square

    pdf.setDrawColor(255, 0, 0);
    pdf.rect(80, 20, 10, 10, "FD"); // filled square with red borders

    pdf.setDrawColor(0);
    pdf.setFillColor(255, 0, 0);
    pdf.rect(100, 20, 10, 10, "F"); // filled red square

    pdf.setDrawColor(0);
    pdf.setFillColor(255, 0, 0);
    pdf.rect(120, 20, 10, 10, "FD"); // filled red square with black borders

    pdf.setDrawColor(0);
    pdf.setFillColor(255, 255, 255);
    pdf.roundedRect(140, 20, 10, 10, 3, 3, "FD"); //  Black sqaure with rounded corners

    pdf.setFontSize(30);

    pdf.text(10, 20, `Name: ${formData.name}`);

    // Add Description
    pdf.text(10, 40, `Description: ${formData.description}`);

    exps.forEach((item) => {
      pdf.text(10, 60, `${item.title}`);
      pdf.text(10, 80, `${item.description}`);
    });

    pdf.save("two-by-four.pdf");
  };

  return (
    <div className="App">
      {/* {JSON.stringify(formData)} */}
      {/* {formData} */}
      <form>
        {/* {a.map((x, index) => (
          <p onClick={() => updateA(index)}>{x}</p>
        ))} */}
        <br />

        <div>
          <label>Name</label>
          <input
            style={{
              backgroundColor: "transparent",
              border: "none",
              outline: "none",
              color: "white",
              borderBottom: "2px solid white",
            }}
            type="text"
            placeholder="Enter your name"
            name="name"
            value={formData.name}
            onChange={onChangeHandler}
          />
        </div>

        <div>
          <label>Description</label>
          <textarea
            style={{
              backgroundColor: "transparent",
              border: "none",
              outline: "none",
              color: "white",
              borderBottom: "2px solid white",
            }}
            type="text"
            placeholder="Describe here...."
            name="description"
            value={formData.description}
            onChange={onChangeHandler}
          />
        </div>

        <select name="categories" onChange={onChangeHandler}>
          <label>Categories:</label>
          <option value={""}>Choose</option>
          <option value={"1"}>Ethelete 1</option>
          <option value={"2"}>Ethelete 2</option>
        </select>

        <div>
          <label>Image</label>
          <input type="file" multiple onChange={handleImage} />

          {formData.images.length > 0 &&
            formData.images.map((x) => <img src={URL.createObjectURL(x)} />)}

          <br />

          <button onClick={addExp}>Add Exps</button>
          {exps.map((x, index) => (
            <div>
              <input
                value={x.title}
                name="title"
                onChange={(e) => handleExp(index, e)}
              />
              <textarea
                value={x.description}
                name="description"
                onChange={(e) => handleExp(index, e)}
              />

              <span onClick={() => handleRemoveExps(index)}>Remove</span>
            </div>
          ))}
        </div>
      </form>

      <button onClick={downloadPDF}>download PDF</button>
      <div>
        name : {formData.name}
        description : {formData.description}
      </div>
    </div>
  );
};

export default App;
