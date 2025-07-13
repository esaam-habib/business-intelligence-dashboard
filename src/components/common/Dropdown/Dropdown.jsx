import { useState, useRef, useEffect } from 'react';
import './Dropdown.css';

const Dropdown = ({ label, options, selectedValues, onSelectionChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggleOption = (option) => {
    const newSelected = new Set(selectedValues);
    if (newSelected.has(option)) {
      newSelected.delete(option);
    } else {
      newSelected.add(option);
    }
    onSelectionChange(newSelected);
  };

  const clearSelection = () => {
    onSelectionChange(new Set());
  };

  const getDisplayText = () => {
    if (selectedValues.size === 0) return 'Select options...';
    if (selectedValues.size === 1) return `${Array.from(selectedValues)[0]}`;
    return `${selectedValues.size} selected`;
  };

  return (
    <div className="dropdown" ref={dropdownRef}>
      <label className="dropdown__label">{label}</label>
      
      <div className="dropdown__container">
        <button
          type="button"
          className="dropdown__trigger"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="dropdown__text">{getDisplayText()}</span>
          <span className={`dropdown__arrow ${isOpen ? 'dropdown__arrow--open' : ''}`}>
            ▼
          </span>
        </button>

        {isOpen && (
          <div className="dropdown__menu">
            {selectedValues.size > 0 && (
              <div className="dropdown__header">
                <button
                  type="button"
                  className="dropdown__clear"
                  onClick={clearSelection}
                >
                  Clear all
                </button>
              </div>
            )}
            
            <div className="dropdown__options">
              {options.length === 0 ? (
                <div className="dropdown__empty">No options available</div>
              ) : (
                options.map((option) => (
                  <label key={option} className="dropdown__option">
                    <input
                      type="checkbox"
                      checked={selectedValues.has(option)}
                      onChange={() => handleToggleOption(option)}
                      className="dropdown__checkbox"
                    />
                    <span className="dropdown__option-text">{option}</span>
                  </label>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dropdown;