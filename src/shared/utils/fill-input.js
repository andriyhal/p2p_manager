const fillInput = (selector, value) => {
    const inputElement = document.querySelector(selector);
          
    inputElement.value = value;
}

export default fillInput;