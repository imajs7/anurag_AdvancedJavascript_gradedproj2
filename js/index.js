import data from '../data/Data.json' assert { type: "json" };

if( localStorage.getItem('resume-auth-data') == null ) {
    location.href = 'login.html';
    exit;
}

// get resume by index
const getResume = index => data['resume'][index];

console.log( getResume( 2 ).basics.name );
