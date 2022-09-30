let authData = JSON.parse( localStorage.getItem('resume-auth-data') );

if( authData == null || authData.status == false ) {
    location.href = 'login.html';
    exit;
}

// import data from json file
import data from '../data/Data.json' assert { type: "json" };
let sampleSpace = data['resume'];
let activeResume = 0;

const displayResume = () => {
    console.log( sampleSpace[activeResume] );
    document.querySelector(".title > h1").textContent = sampleSpace[activeResume].basics.name;
    document.querySelector(".title > h4").textContent = `Applied For: ${sampleSpace[activeResume].basics.AppliedFor}`;
};

const showPrevious = () => {
    activeResume = Math.max( activeResume - 1, 0);
    displayResume();
};

const showNext = () => {
    activeResume = Math.min( activeResume + 1, sampleSpace.length - 1);
    displayResume();
};

// build searcheable data sample by query string
document.querySelector("#search").addEventListener( 'keydown', ( event ) => {
    
    if( event.key == 'Enter' ) {
        event.preventDefault();
        sampleSpace = data['resume'].filter( item => item['basics'].AppliedFor.toLowerCase() === event.target.value.toLowerCase() );
        activeResume = 0;
        if( sampleSpace.length < 1 ) {
            sampleSpace = data['resume'];
            document.querySelector("dialog").showModal();
        }
        displayResume();
    }

} );

document.querySelector("#prev").addEventListener( 'click', showPrevious );
document.querySelector("#next").addEventListener( 'click', showNext );

document.querySelector('#logout').addEventListener( 'click', e => {
    e.preventDefault();
    if( authData.save == true ) {
        authData.status = false;
        localStorage.setItem('resume-auth-data', JSON.stringify( authData ) );
    } else {
        localStorage.removeItem('resume-auth-data');
    }
    location.href = '/login.html';
} );

document.querySelector("#close-dialog").addEventListener( 'click', () => {
    document.querySelector("#search").value = '';
    document.querySelector("dialog").close();
} );

displayResume();
