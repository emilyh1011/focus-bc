//Prevent default form submission behavior on nested inputed fields
export const preventEnterSubmit = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevents the default form submission behavior
    }
 };