import React, { useState } from 'react';
import PricingCard from '../src/components/PricingCard';
import './App.css';
import '../src/styles/sidebar.css';

function App() {
  const [showContentButtons, setShowContentButtons] = useState(false);
  const [showContentButtons1, setShowContentButtons1] = useState(false);
  const [showTitleOptions, setShowTitleOptions] = useState(false); // State to track if title button is clicked
  const [showPriceOptions, setShowPriceOptions] = useState(false); 
  const [showFeaturesOptions, setShowFeaturesOptions] = useState(false);// State to track if price button is clicked  
  const [selectedOption, setSelectedOption] = useState(null);
  const [fontSize, setFontSize] = useState('16px'); // Default font size
  const [fontStyle, setFontStyle] = useState('normal'); // Default font style
  const [fontColor, setFontColor] = useState('#000000'); // Default font color
  const [fontFamily, setFontFamily] = useState('system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif'); // Default font family
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [embeddedCode, setEmbeddedCode] = useState('');
  const [templateSize, setTemplateSize] = useState('350px');
  const [templateColor, setTemplateColor] = useState('pink');
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
 
  const [editedTitle, setEditedTitle] = useState(''); // Default edited title
  
  const [editedPrice, setEditedPrice] = useState(''); // Default edited title
  
  const [editedFeatures, setEditedFeatures] = useState('')


  const [customStyles, setCustomStyles] = useState([
    {
      id: '1',
      fontSize: '16px',
      border:'none',
      color: '#ffffff',
      fontStyle: 'normal',
      templateSize: '300px',
      templateColor: 'white',
      iconClass: 'fa-paper-plane',
      title: 'BASIC',
      titleFontColor: '#000000', 
      priceFontColor: '#000000', 
      featuresFontColor: '#000000', 
      price: '70',
      features: ['1 Bed', '1 Bathroom', 'No AC'],
      imageUrl: 'https://as1.ftcdn.net/v2/jpg/02/59/49/00/1000_F_259490093_wt2P7lVqDAW1IOvEbFpCmzNkro45aqwM.jpg'
       },

    
    {
      id: '2',
      fontSize: '16px',
      border:'none',
      color: '#ffffff',
      templateSize: '300px',
      fontStyle: 'normal',
      templateColor: 'white',
      titleFontColor: '#000000', 
      priceFontColor: '#000000', 
      featuresFontColor: '#000000',
      iconClass: 'fa-car',
      title: 'ADVANCE',
      price: '150',
      features: ['2 Beds', '1 Bathroom', 'Air Conditioner'],
      imageUrl: 'https://as1.ftcdn.net/v2/jpg/02/59/49/00/1000_F_259490093_wt2P7lVqDAW1IOvEbFpCmzNkro45aqwM.jpg'
    },
    {
      id: '3',
      fontSize: '16px',
      border:'none',
      color: '#ffffff',
      templateSize: '300px',
      fontStyle: 'normal',
      templateColor: 'white',
     
      titleFontColor: '#000000', 
      priceFontColor: '#000000', 
      featuresFontColor: '#000000', 
      iconClass: 'fa-bicycle',
      title: 'PREMIUM',
      price: '200',
      features: ['King Size Bed', '2 Bathrooms', 'Personal Kitchen & AC'],
      imageUrl: 'https://as1.ftcdn.net/v2/jpg/02/59/49/00/1000_F_259490093_wt2P7lVqDAW1IOvEbFpCmzNkro45aqwM.jpg'
    }
  ]);
  
  

  // Function to handle background color change
const handleBackgroundColorChange = (color) => {
  setBackgroundColor(color);
};

// Function to update custom style for background color
const updateBackgroundColor = (color) => {
  setCustomStyles(prevStyles => {
    return prevStyles.map(template => {
      return { ...template, templateColor: color };
    });
  });
};

  // Function to handle selection of an option
  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setShowContentButtons(option !== 'Add New Template'); // Hide content buttons when 'Add New Template' is selected
    setShowContentButtons1(option !== 'Add New Template');
    setShowTitleOptions(option === 'Title'); // Show title options only when 'Title' is selected
    setShowPriceOptions(option === 'Price'); 
    setShowFeaturesOptions(option === 'Features'); 
  };

  // Function to handle title button click
  const handleTitleButtonClick = () => {
    setShowContentButtons(true);
    setShowTitleOptions(true);
    setShowPriceOptions(false);
    setShowFeaturesOptions(false); // Hide price options when title button is clicked
  };

// Function to handle price button click
// Function to handle price button click
const handlePriceButtonClick = () => {
  setShowContentButtons(true);
  setShowPriceOptions(true); // Show price options when price button is clicked
  setShowTitleOptions(false);
  setShowFeaturesOptions(false); // Hide title options when price button is clicked
};


const handleFeaturesButtonClick = () => {
  setShowContentButtons(true);
  setShowPriceOptions(false); // Show price options when price button is clicked
  setShowTitleOptions(false);
  setShowFeaturesOptions(true); // Hide title options when price button is clicked
};


// Function to handle font size change
const handleFontSizeChange = (value) => {
  setFontSize(value);
  const styleToUpdate = {};
  if (showTitleOptions) styleToUpdate.titleFontSize = value;
  if (showPriceOptions) styleToUpdate.priceFontSize = value;
  if (showFeaturesOptions) styleToUpdate.featuresFontSize = value;
  updateCustomStyle(selectedOption === 'Basic' ? '1' : selectedOption === 'Advance' ? '2' : '3', styleToUpdate);
};


// Function to handle font style change
const handleFontStyleChange = (e) => {
  const style = e.target.value;
  setFontStyle(style);
  const styleToUpdate = {};
  if (showTitleOptions) styleToUpdate.titleFontStyle = style;
  if (showPriceOptions) styleToUpdate.priceFontStyle = style;
  if (showFeaturesOptions) styleToUpdate.featuresFontStyle = style;
  updateCustomStyle(selectedOption === 'Basic' ? '1' : selectedOption === 'Advance' ? '2' : '3', styleToUpdate);
};

// Function to handle font color change
const handleFontColorChange = (e) => {
  const color = e.target.value;
  setFontColor(color);
  const styleToUpdate = {};
  if (showTitleOptions) styleToUpdate.titleFontColor = color;
  if (showPriceOptions) styleToUpdate.priceFontColor = color;
  if (showFeaturesOptions) styleToUpdate.featuresFontColor = color;
  updateCustomStyle(selectedOption === 'Basic' ? '1' : selectedOption === 'Advance' ? '2' : '3', styleToUpdate);
};

// Function to handle font family change
const handleFontFamilyChange = (e) => {
  const family = e.target.value;
  setFontFamily(family);
  const styleToUpdate = {};
  if (showTitleOptions) styleToUpdate.titleFontFamily = family;
  if (showPriceOptions) styleToUpdate.priceFontFamily = family;
  if (showFeaturesOptions) styleToUpdate.featuresFontFamily = family;
  updateCustomStyle(selectedOption === 'Basic' ? '1' : selectedOption === 'Advance' ? '2' : '3', styleToUpdate);
};


  // Function to update custom style for a specific template
  const updateCustomStyle = (templateId, style) => {
    setCustomStyles(prevStyles => {
      return prevStyles.map(template => {
        if (template.id === templateId) {
          return { ...template, ...style };
        } else {
          return template;
        }
      });
    });
  };

  // Function to remove image from the Basic template
  const removeImage = (templateId) => {
    setCustomStyles(prevStyles => {
      return prevStyles.map(template => {
        if (template.id === templateId) {
          return { ...template, imageUrl: null };
        } else {
          return template;
        }
      });
    });
  };

  // Function to delete the last template
  const deleteLastTemplate = () => {
    setCustomStyles(prevStyles => prevStyles.slice(0, -1));
  };

  // Function to delete a template
  const deleteTemplate = () => {
    const lastTemplate = customStyles[customStyles.length - 1];
    if (lastTemplate) {
      setCustomStyles(prevStyles => prevStyles.filter(template => template.id !== lastTemplate.id));
    }
  };

  // Function to add a new template
const addNewTemplate = () => {
  const lastTemplate = customStyles[customStyles.length - 1];
  const newTemplateId = customStyles.length + 1;
  
  if (lastTemplate) {
    const newTemplate = {
      id: newTemplateId.toString(),
      fontSize: lastTemplate.fontSize,
      color: lastTemplate.color,
      fontStyle: lastTemplate.fontStyle,
      fontFamily: lastTemplate.fontFamily,
      templateSize: lastTemplate.templateSize,
      templateColor: lastTemplate.templateColor,
      iconClass: lastTemplate.iconClass,
      title: 'New Template',
      price: '0',
      features: lastTemplate.features.map(feature => feature), // Copy features array
      imageUrl: lastTemplate.imageUrl
    };

    setCustomStyles([...customStyles, newTemplate]);
  } else {
    // If there's no last template, create a default one
    const newTemplate = {
      id: newTemplateId.toString(),
      fontSize: '16px',
      color: '#ffffff',
      fontStyle: 'normal',
      templateSize: '300px',
      templateColor: 'white',
      iconClass: 'fa-new-template', // Change this to a suitable icon class
      title: 'New Template',
      price: '0',
      features: ['Feature 1', 'Feature 2', 'Feature 3'],
      imageUrl: null
    };

    setCustomStyles([...customStyles, newTemplate]);
  }
};


const handleSubmit = () => {
  console.log("hello");
  // Generate embedded code
  const code = generateEmbeddedCode();
  setEmbeddedCode(code);
};


// Function to generate embedded code
// Function to generate embedded code
const generateEmbeddedCode = () => {
  let code = '<div style="display: flex; gap: -80%; margin-top: 5%">';

  // Sort the templates based on their index
  const sortedTemplates = customStyles.slice().sort((a, b) => a.index - b.index);

  customStyles.forEach(template => {
    code += `<div class="pricing-card" style="width: ${template.templateSize}; background: ${template.templateColor}; margin-right: 10px; flex-shrink: 0; margin-left: 10%; border-radius: 20px; gap:5px">`;

    // Add image if selected or use default imageUrl
    if (template.imageUrl) {
      code += `<img src="${template.imageUrl}" alt="Selected Image" class="template-image" style="display: block; width: 50%;  height: 24%; margin-top: 10%; margin-left: 25%; border-radius: 20px;" />`;
    }

    // Add title with styles
    code += `<h2 class="title" style="text-align: center; font-size: ${template.titleFontSize}; color: ${template.titleFontColor}; font-style: ${template.titleFontStyle}; font-family: ${template.titleFontFamily}; margin-top: 20px;">${template.title}</h2>`;

    // Add price with styles
    code += `<h2 class="price" style="text-align: center; font-size: ${template.priceFontSize}; color: ${template.priceFontColor}; font-style: ${template.priceFontStyle}; font-family: ${template.priceFontFamily}; margin-top: 20px;">$${template.price}</h2>`;

    // Add features with styles
    template.features.forEach((feature) => {
      console.log("----------->",feature);
      code += `<h2 class="feature" style="text-align: left; font-size: ${template.featuresFontSize}; color: ${template.featuresFontColor}; font-style: ${template.featuresFontStyle}; font-family: ${template.featuresFontFamily}; margin-top: 2px; margin-left: 35px;">${feature}</h2>`;
    });

    code += `<button class="custom-button" style="background-color: #2C2C54; color: white; border-radius: 5px; width: 70px; height:30px; margin-left: 40%; border: none">Pay</button>`;
    
    // Close the <div> tag for the current template
    code += `</div>`;
  });

  code += '</div>';

 return code;
};




return (
  
  <div style={{border: 'none', boxShadow: 'none'}}  >
    {selectedImage && (
      <div className="image-container" style={{ width: templateSize, height: templateSize, textAlign: 'left'}}>
        <img src={selectedImage} alt="Selected Image" className="template-image" style={{ width: '88%', height: '85%' }} />
        <button onClick={handleRemoveImage} className="remove-image-button">Remove Image</button>
      </div>
    )}
    {!selectedImage && imageUrl && (
      <div className='d-flex flex-column'>
        <div className="image-container" style={{ width: templateSize, height: templateSize, textAlign: 'left' }}>
          <img src={imageUrl} alt="Template Image" className="template-image" style={{ width: '88%', height: '85%' }} />
          <button onClick={handleRemoveImage} className="remove-image-button mt-2">Remove Image</button>
        </div>
        <div style={{ position: 'absolute', top: '40%', right: '20px', }}>
          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
          <button className="add-image-button" onClick={handleAddImageButtonClick} >Add Image</button>
        </div>
      </div>
    )}

    <div>
      <header className="navbar" style={{backgroundColor:'white', padding: '0px', marginTop:'10px'}} >
        <h1 className="navbar-brand p-3" style={{color: "#2C2C54", marginLeft:'50px', fontWeight:'bold'}}>PRICIFIERS</h1>
        <nav style={{display: 'flex', justifyContent: 'space-between', gap: '250px', marginRight: '10px'}}>
          <ul className='nav' style={{display: 'flex', justifyContent: 'space-between', gap: '5px', margin: '0 150px 0 0', fontWeight:'550'}}>
            <li className="nav-item" style={{margin: '0 20px 0 0', fontSize: '18px'}} onClick={() => handleOptionSelect('Basic')}>Basic</li>
            <li className="nav-item" style={{margin: '0 20px 0 0', fontSize: '18px'}} onClick={() => handleOptionSelect('Advance')}>Advance</li>
            <li className="nav-item" style={{margin: '0 20px 0 0', fontSize: '18px'}} onClick={() => handleOptionSelect('Premium')}>Premium</li>
          </ul>
          <ul className="nav" style={{ margin: '0 10px 0 0' }}>
  <li className="nav-item" style={{ margin: '0 20px 0 0', fontSize: '20px' }} onClick={addNewTemplate}>
    <span role="img" aria-label="add" >➕</span> 
  </li>
  <li className="nav-item" style={{ margin: '0 20px 0 0', fontSize: '20px' }} onClick={deleteLastTemplate}>
  <span role="img" aria-label="delete">🗑</span> 
  </li>
  <button className='btns' style={{ margin: '0 20px 0 0', fontSize: '16px' }} onClick={handleSubmit}>Generate Code</button>
  <button className='btns' style={{ margin: '0 20px 0 0', fontSize: '16px' }} onClick={()=>{window.location.href='http://localhost:9000/users/dashboard'}}>Log Out</button>
</ul>
        </nav>
        
      </header>
      
      <div className='d-flex flex-row row' style={{marginLeft:'40px', marginBottom:'40px', width:'1800px'}}>
      <div className="subheader col-sm-2">
        <h3 class="customize" style={{fontSize:'20px', fontWeight:'500', marginTop:'10px'}}>Customize Your Templates Here</h3>
        {/* Render content buttons */}
        {showContentButtons && (
          <div className="subheader-options" style={{ width: '274px'}}>
            <button className="content-button" onClick={handleTitleButtonClick}>Title</button>
            <button className="content-button"onClick={handlePriceButtonClick} >Price</button>
            <button className="content-button"onClick={handleFeaturesButtonClick} >Features</button>
            {/* <button className="content-button">Features</button> <br/> <br/> */}
            {/* Render title options */}
            {showTitleOptions && (
              <div style={{border:'none', borderRadius:'20px', marginTop: '20px', width: '280px'}}>
              <label htmlFor="fontSize" style={{marginTop:'20px',marginLeft:'15px', color:'#2C2C54' }}>Font Size  </label>
              <input 
                type="range" 
                id="fontSize" 
                min="10" 
                max="40" 
                step="2" 
                value={parseInt(fontSize.replace('px', ''))} 
                onChange={(e) => handleFontSizeChange(e.target.value + 'px')} 
                style={{marginLeft:'16px',  height: '5px', borderRadius: '10px', outline: 'none', appearance: 'none', marginTop: '5px'}} // Updated styling
              />
                
                <span>{fontSize}</span>
                <br />
                <label htmlFor="fontStyle" style={{marginTop:'20px',marginLeft:'15px', color:'#2C2C54' }}>Font Style </label>
                <select id="fontStyle" value={fontStyle} onChange={handleFontStyleChange} style={{marginLeft:'16px', color:'black'}}>
                  <option value="normal">Normal</option>
                  <option value="italic">Italic</option>
                  <option value="oblique">Oblique</option>
                </select>
                <br />
                <label htmlFor="fontColor"  style={{marginTop:'20px',marginLeft:'15px', color:'#2C2C54' }}>Font Color  </label>
                <input 
                  type="color"  
                  id="fontColor" 
                  value={fontColor} 
                  onChange={handleFontColorChange} style={{marginLeft:'16px', color:'white'}}/>
                <br />
                <label htmlFor="fontFamily" style={{marginTop:'20px',marginLeft:'15px', color:'#2C2C54' }}>Font Family  </label>
                <select id="fontFamily" value={fontFamily} onChange={handleFontFamilyChange} style={{marginLeft:'16px', color:'black'}}>
                  <option value="Arial, sans-serif" >Arial</option>
                  <option value="Times New Roman, serif">Times New Roman</option>
                  <option value="Courier New, monospace">Courier New</option>
                  <option value="Georgia, serif">Georgia</option>
                  <option value="Verdana, sans-serif">Verdana</option>
                </select>

                
                <br/> 
                <label htmlFor="backgroundColor" style={{marginTop:'20px',marginLeft:'15px', color:'#2C2C54', marginBottom:'20px' }}> Background Color  </label>
                <input 
                  type="color" 
                  id="backgroundColor" 
                  value={backgroundColor} 
                  onChange={(e) => {
                    setBackgroundColor(e.target.value);
                    updateBackgroundColor(e.target.value);
                  }} style={{marginLeft:'16px', color:'white'}}
                />
                
              </div>
            )}

            
            {showPriceOptions && (
              <div style={{border:'none', borderRadius:'20px', marginTop: '20px', width: '280px'}}>
              <label htmlFor="fontSize" style={{marginTop:'20px',marginLeft:'15px', color:'#2C2C54' }}>Font Size  </label>
              <input 
                type="range" 
                id="fontSize" 
                min="10" 
                max="40" 
                step="2" 
                value={fontSize.replace('px', '')} 
                onChange={(e) => handleFontSizeChange(e.target.value + 'px')} 
                style={{marginLeft:'16px'}}
              />

             
              
              <span>{fontSize}</span>
              <br />
              <label htmlFor="fontStyle" style={{marginTop:'20px',marginLeft:'15px', color:'#2C2C54' }}>Font Style </label>
              <select id="fontStyle" value={fontStyle} onChange={handleFontStyleChange} style={{marginLeft:'16px', color:'black'}}>
                <option value="normal">Normal</option>
                <option value="italic">Italic</option>
                <option value="oblique">Oblique</option>
              </select>
              <br />
              <label htmlFor="fontColor"  style={{marginTop:'20px',marginLeft:'15px', color:'#2C2C54'}}>Font Color  </label>
              <input 
                type="color"  
                id="fontColor" 
                value={fontColor} 
                onChange={handleFontColorChange} style={{marginLeft:'16px', color:'white'}}/>
              <br />
              <label htmlFor="fontFamily" style={{marginTop:'20px',marginLeft:'15px', color:'#2C2C54'}}>Font Family  </label>
              <select id="fontFamily" value={fontFamily} onChange={handleFontFamilyChange} style={{marginLeft:'16px', color:'black'}}>
                <option value="Arial, sans-serif" >Arial</option>
                <option value="Times New Roman, serif">Times New Roman</option>
                <option value="Courier New, monospace">Courier New</option>
                <option value="Georgia, serif">Georgia</option>
                <option value="Verdana, sans-serif">Verdana</option>
              </select>

              
              <br/> 
              <label htmlFor="backgroundColor" style={{marginTop:'20px',marginLeft:'15px', color:'#2C2C54', marginBottom:'20px' }}> Background Color  </label>
              <input 
                type="color" 
                id="backgroundColor" 
                value={backgroundColor} 
                onChange={(e) => {
                  setBackgroundColor(e.target.value);
                  updateBackgroundColor(e.target.value);
                }} style={{marginLeft:'16px', color:'white'}}
              />
              
            </div>
              
            )}
            {showFeaturesOptions && (
              <div style={{border:'none', borderRadius:'20px', marginTop: '20px', width: '280px'}}>
              <label htmlFor="fontSize" style={{marginTop:'20px',marginLeft:'15px', color:'#2C2C54'}}>Font Size  </label>
              <input 
                type="range" 
                id="fontSize" 
                min="10" 
                max="40" 
                step="2" 
                value={fontSize.replace('px', '')} 
                onChange={(e) => handleFontSizeChange(e.target.value + 'px')} 
                style={{marginLeft:'16px'}}
              />

             
              
              <span>{fontSize}</span>
              <br />
              <label htmlFor="fontStyle" style={{marginTop:'20px',marginLeft:'15px', color:'#2C2C54' }}>Font Style </label>
              <select id="fontStyle" value={fontStyle} onChange={handleFontStyleChange} style={{marginLeft:'16px', color:'black'}}>
                <option value="normal">Normal</option>
                <option value="italic">Italic</option>
                <option value="oblique">Oblique</option>
              </select>
              <br />
              <label htmlFor="fontColor"  style={{marginTop:'20px',marginLeft:'15px', color:'#2C2C54' }}>Font Color  </label>
              <input 
                type="color"  
                id="fontColor" 
                value={fontColor} 
                onChange={handleFontColorChange} style={{marginLeft:'16px', color:'white'}}/>
              <br />
              <label htmlFor="fontFamily" style={{marginTop:'20px',marginLeft:'15px', color:'#2C2C54' }}>Font Family  </label>
              <select id="fontFamily" value={fontFamily} onChange={handleFontFamilyChange} style={{marginLeft:'16px', color:'black'}}>
                <option value="Arial, sans-serif" >Arial</option>
                <option value="Times New Roman, serif">Times New Roman</option>
                <option value="Courier New, monospace">Courier New</option>
                <option value="Georgia, serif">Georgia</option>
                <option value="Verdana, sans-serif">Verdana</option>
              </select>

              
              <br/> 
              <label htmlFor="backgroundColor" style={{marginTop:'20px',marginLeft:'15px', color:'#2C2C54', marginBottom:'20px' }}> Background Color  </label>
              <input 
                type="color" 
                id="backgroundColor" 
                value={backgroundColor} 
                onChange={(e) => {
                  setBackgroundColor(e.target.value);
                  updateBackgroundColor(e.target.value);
                }} style={{marginLeft:'16px', color:'white'}}
              />
              
            </div>
            )}
          </div>
        )}
      </div>
      <section className='col-sm-10' style={{padding: "0", margin: "0"}}>
        <div>
          <div className="container-fluid">
            <div className="">
              <div className="row">
                <div className='menu col-sm-12 d-flex flex-wrap justify-content-center' style={{gap: '15px',}}>
                  {customStyles.map((style) => (
                    <PricingCard 
                      className="card" 
                      customStyles={customStyles} 
                      setCustomStyles={setCustomStyles}
                      key={style.id}
                      {...style}
                      updateCustomStyle={(style) => updateCustomStyle(style.id, style)}
                      removeImage={() => removeImage(style.id)} 
                          
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      </div>
      

      



      
      {embeddedCode && (
      <div>
        <h3>Embedded Code:</h3>
        <textarea rows="5" cols="50" value={embeddedCode} readOnly />
      </div>
    )}

    <div>
      
    </div>
      <footer className="footer">
        {/* Add your footer content here */}
      </footer>
    </div>
    </div>
  );
}



export default App;
