// $$$$$$$$$$$$$$$$$$$$$$ FORMATTING DATE $$$$$$$$$$$$$$$$$$$$$$
export default function formatDate(date, seperator) {
    let getA = [{ day: 'numeric' }, { month: 'short' }, { year: 'numeric' }];
    let getDate = new Date(date)
    function format(m) {
        let f = new Intl.DateTimeFormat('en', m);
        return f.format(getDate);
    }
    return getA.map(format).join(seperator) + " / " + getDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

// $$$$$$$$$$$$$$$$$$$$$$ CAPITALIZING WORDS $$$$$$$$$$$$$$$$$$$$$$
export const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// $$$$$$$$$$$$$$$$$$$$$$ VALIDATING PASSWORD $$$$$$$$$$$$$$$$$$$$$$
export const validatePassword = (value) => {
    if (value.length < 6) {
        return 'Password should be at-least 6 characters.';
    } else
        //    if ( !/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)(?=.*[!@#$*])/.test(value)) {
        //       return 'Password should contain at least one uppercase letter, lowercase letter, digit, and special symbol.';
        // }
        return true;
};

// $$$$$$$$$$$$$$$$$$$$$$ CHECK IF TOKEN EXPIRED $$$$$$$$$$$$$$$$$$$$$$
export function isTokenExpired(token) {
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return (Math.floor((new Date()).getTime() / 1000)) >= expiry;
}