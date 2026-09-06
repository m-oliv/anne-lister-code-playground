import { useState, useRef } from 'react';
import { toPng } from 'html-to-image';

export function useTextGenerator() {
  const fonts = [
    { name: 'AL Crypthand', value: 'Lister-Crypt' },
    { name: 'AL Consonant Code', value: 'ListerConsonantCode' } 
  ];

  const [text, setText] = useState('');
  const [fontSize, setFontSize] = useState('2.5rem');
  const [color, setColor] = useState('#000000'); 
  const [selectedFont, setSelectedFont] = useState(fonts[0].value);
  const [darkMode, setDarkMode] = useState(true);

  const previewRef = useRef(null);

  const handleTextChange = (event) => setText(event.target.value);
  const handleSizeChange = (event) => setFontSize(event.target.value);
  const handleColorChange = (event) => setColor(event.target.value);
  const handleFontChange = (event) => setSelectedFont(event.target.value);
  const toggleDarkMode = () => setDarkMode(prev => !prev);

  const handleHexTextChange = (event) => {
    let value = event.target.value;
    if (value && !value.startsWith('#')) {
      value = '#' + value;
    }
    setColor(value);
  };

  const downloadImage = () => {
    if (!previewRef.current) return;
    
    // Pequeno delay nativo garante que o motor do browser validou os nós de texto antes do clone do canvas
    document.fonts.ready.then(() => {
      toPng(previewRef.current, { 
        cacheBust: true,
        skipFonts: false, 
        style: {
          transform: 'scale(1)',
          transformOrigin: 'top left'
        }
      })
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = 'my-custom-text.png';
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => console.error('Erro ao exportar imagem:', err));
    });
  };

  return {
    text, fontSize, color, selectedFont, previewRef, fonts, darkMode,
    handleTextChange, handleSizeChange, handleColorChange, handleFontChange, handleHexTextChange, toggleDarkMode,
    downloadImage
  };
}
