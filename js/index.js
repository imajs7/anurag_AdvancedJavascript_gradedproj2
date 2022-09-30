let authData = JSON.parse( localStorage.getItem('resume-auth-data') );

if( authData == null || authData.status == false ) {
    location.href = 'login.html';
    exit;
}
// import data from json file
import data from '../data/Data.json' assert { type: "json" };

// get resume by index
const getResume = index => data['resume'][index];

// console.log( getResume( 2 ).basics.name );

document.querySelector('#logout').addEventListener( 'click', () => {
    if( authData.save == true ) {
        authData.status = false;
        localStorage.setItem('resume-auth-data', JSON.stringify( authData ) );
    } else {
        localStorage.removeItem('resume-auth-data');
    }
    location.href = '/login.html';
} );
