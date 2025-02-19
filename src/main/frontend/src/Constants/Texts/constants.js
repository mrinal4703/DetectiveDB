export const isLoggedIn = localStorage.getItem('isLoggedIn') || false;
export const isLoggedIn_session = sessionStorage.getItem('isLoggedIn') || false;
export const email = localStorage.getItem('loggedinuseremail') || '';
export const email_session = sessionStorage.getItem('loggedinuseremail') || '';
export const username = 'localhost:8085';