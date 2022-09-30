let authData = JSON.parse( localStorage.getItem('resume-auth-data') );

if( authData == null || authData.status == false ) {
    location.href = 'login.html';
    exit;
}

// import data from json file
import data from '../data/Data.json' assert { type: "json" };
let sampleSpace = data['resume'];

// variable to keep track of current shown resume
let activeResume = 0;

// set visibility for prev & next controls
const controlsVisibility = () => {
    const prev = document.querySelector("#prev");
    const next = document.querySelector("#next");
    
    if ( sampleSpace.length < 2 ) {
        prev.style.visibility = 'hidden';
        next.style.visibility = 'hidden';
    }

    ( activeResume == 0 ) ? prev.style.visibility = 'hidden' : prev.style.visibility = 'visible';
    ( activeResume == sampleSpace.length - 1 ) ? next.style.visibility = 'hidden' : next.style.visibility = 'visible';
};

// renders resume data on page
const displayResume = () => {
    console.log( sampleSpace[activeResume] );
    controlsVisibility();
    document.querySelector(".title > h1").textContent = sampleSpace[activeResume].basics.name;
    document.querySelector(".title > h4").textContent = `Applied For: ${sampleSpace[activeResume].basics.AppliedFor}`;
    document.querySelector("#company-name").textContent = sampleSpace[activeResume].work['Company Name'];
    document.querySelector("#position").textContent = sampleSpace[activeResume].work.Position;
    document.querySelector("#start-date").textContent = sampleSpace[activeResume].work['Start Date'];
    document.querySelector("#end-date").textContent = sampleSpace[activeResume].work['End Date'];
    document.querySelector("#summary").textContent = sampleSpace[activeResume].work.Summary;
    document.querySelector("#project-name").textContent = sampleSpace[activeResume].projects.name;
    document.querySelector("#project-desc").textContent = sampleSpace[activeResume].projects.description;
};

// updates activeResume & calls displayResume for Previous resume
const showPrevious = () => {
    activeResume = Math.max( activeResume - 1, 0);
    displayResume();
};

// updates activeResume & calls displayResume for Next resume
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
            controlsVisibility();
            document.querySelector(".content").style.visibility = 'hidden';
            document.querySelector("dialog").showModal();
        }
        displayResume();
    }

} );

// event handlers for previous & next buttons
document.querySelector("#prev").addEventListener( 'click', showPrevious );
document.querySelector("#next").addEventListener( 'click', showNext );

// event handler for logout button
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

// event handler for close modal button
document.querySelector("#close-dialog").addEventListener( 'click', () => {
    document.querySelector("#search").value = '';
    document.querySelector("dialog").close();
    document.querySelector(".content").style.visibility = 'visible';
    sampleSpace = data['resume'];
} );

// displays first resume on page load
displayResume();
