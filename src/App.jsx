import React, { useEffect } from 'react';
import { useTextGenerator } from './hooks';
import './App.css';

export default function App() {
  const {
    text,
    fontSize,
    color,
    selectedFont,
    previewRef,
    fonts,
    darkMode,
    handleTextChange,
    handleSizeChange,
    handleColorChange,
    handleFontChange,
    handleHexTextChange,
    toggleDarkMode,
    downloadImage
  } = useTextGenerator();

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }, [darkMode]);

  return (
    <div className="root-wrapper">
      
      <div className="theme-toggle-container">
        <button className="theme-toggle-btn" onClick={toggleDarkMode}>
          {darkMode ? '🌙 Dark Mode' : '☀️ Light Mode'}
        </button>
      </div>

      <div className="header-block">
        <h1 className="main-title">AL Code Font Playground</h1>
        <p className="main-description">
          A playground to test custom fonts that mimic Anne Lister's crypthand and codes. This tool allows users to try out custom fonts and download examples. Images are generated on the fly and are downloadable so users can check the font version against the original documents. 
        </p>
        <p className="main-description"><b>Note:</b>&nbsp;No text or images are saved on the browser. </p>
      </div>

      <div className="app-main-grid">
      
        <div className="font-selection-sidebar">
          <h2 className="sidebar-title">Choose Font</h2>
          <div className="radio-group-wrapper">
            {fonts.map((font) => (
              <label 
                key={font.value} 
                className={`font-radio-label ${selectedFont === font.value ? 'selected-active' : ''}`}
              >
                <input
                  type="radio"
                  name="fontFamily"
                  value={font.value}
                  checked={selectedFont === font.value}
                  onChange={handleFontChange}
                  className="native-radio-input"
                />
                <span className="font-display-name">{font.name}</span>
                <span className="font-live-sample" style={{ fontFamily: font.value }}>
                  (Sample ABC)
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* SECÇÃO 2: Workspace */}
        <div className="workspace-right-grid">
          
          {/* Editor */}
          <div className="editor-card-container">
            <h2 className="card-title">1. Editor</h2>
            
            <div className="control-bar-row">
              <div className="control-select-column">
                <span className="control-label-heading">FONT SIZE</span>
                <select value={fontSize} onChange={handleSizeChange} className="native-dropdown-element">
                  <option value="1rem">Small</option>
                  <option value="1.75rem">Medium</option>
                  <option value="2.5rem">Large</option>
                  <option value="3.5rem">Extra Large</option>
                </select>
              </div>

              <div className="control-select-column">
                <span className="control-label-heading">TEXT COLOR</span>
                <div className="color-controls-flex">
                  <input type="color" value={color} onChange={handleColorChange} className="native-color-element" />
                  <input type="text" value={color} onChange={handleHexTextChange} maxLength={7} className="native-hex-input-element" />
                </div>
              </div>
            </div>

            <textarea 
              value={text} 
              onChange={handleTextChange} 
              className="text-canvas-input" 
              placeholder="Your text goes here..."
            />
          </div>

          {/* Preview */}
          <div className="preview-card-container">
            <div>
              <div className="preview-header-row">
                <h2 className="card-title">2. Preview</h2>
                <button 
                  className="tactile-download-action-btn" 
                  onClick={downloadImage}
                  title="Save this preview text configuration to your computer as a PNG file"
                >
                  <span>📥</span> Download
                </button>
              </div>
              
              <div className="on-screen-dashed-boundary">
                <div className="image-capture-canvas-box" ref={previewRef}>
                  <div 
                    className="render-bounded-text-node" 
                    style={{ fontSize: fontSize, color: color, fontFamily: selectedFont }}
                  >
                    {text || ''}
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
