if( localStorage.getItem('resume-auth-data') != null ) {
    location.href = '/';
    exit;
}

const switcher = document.querySelector("#switch");
const signinForm = document.querySelector("#signin-form");
const signupForm = document.querySelector("#signup-form");

switcher.addEventListener( 'click', () => {
    if( switcher.checked == true ) {
        signinForm.style.left = '-100%';
        signinForm.style.opacity = 0;
        signinForm.style.visibility = 'hidden';

        signupForm.style.left = 0;
        signupForm.style.opacity = 1;
        signupForm.style.visibility = 'visible';
    } else {
        signupForm.style.left = '100%';
        signupForm.style.opacity = 0;
        signupForm.style.visibility = 'hidden';

        signinForm.style.left = '0';
        signinForm.style.opacity = 1;
        signinForm.style.visibility = 'visible';
    }
} );