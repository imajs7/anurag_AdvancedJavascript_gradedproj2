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

// capitalize string
const capitalize = sentence => {
    const words = sentence.split(" ");
    for (let i = 0; i < words.length; i++) {
        words[i] = words[i][0].toUpperCase() + words[i].substr(1);
    }
    return words.join(" ");
};

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
    //console.log( sampleSpace[activeResume] );
    controlsVisibility();
    document.querySelector("#candidate-name").textContent = capitalize( sampleSpace[activeResume].basics.name );
    document.querySelector("#short-intro").textContent = capitalize( sampleSpace[activeResume].basics.AppliedFor );
    document.querySelector("#company-name").textContent = capitalize( sampleSpace[activeResume].work['Company Name'] );
    document.querySelector("#position").textContent = capitalize( sampleSpace[activeResume].work.Position );
    document.querySelector("#start-date").textContent = sampleSpace[activeResume].work['Start Date'];
    document.querySelector("#end-date").textContent = sampleSpace[activeResume].work['End Date'];
    document.querySelector("#summary").textContent = sampleSpace[activeResume].work.Summary;
    document.querySelector("#project-name").textContent = capitalize( sampleSpace[activeResume].projects.name );
    document.querySelector("#project-desc").textContent = sampleSpace[activeResume].projects.description;

    let education = '';
    for(let element in sampleSpace[activeResume].education) {
        education = education + '<li><strong>' + capitalize( element ) + ':</strong> ';
        education = education + Object.values( sampleSpace[activeResume].education[element] );
        education = education + '</li>';
    }
    document.querySelector("#education-list").innerHTML = education;

    let internship = '';
    for(let element in sampleSpace[activeResume].Internship) {
        internship = internship + '<li><strong>' + capitalize( element ) + ':</strong> ';
        internship = internship + sampleSpace[activeResume].Internship[element];
        internship = internship + '</li>';
    }
    document.querySelector("#internship-details").innerHTML = internship;

    document.querySelector("#achievements-list > li").innerHTML = sampleSpace[activeResume].achievements.Summary

    document.querySelector("#phone").textContent = sampleSpace[activeResume].basics.phone;
    document.querySelector("#email").textContent = sampleSpace[activeResume].basics.email;
    document.querySelector("#networks").innerHTML = "<a href='" + sampleSpace[activeResume].basics.profiles.url + "'>" + sampleSpace[activeResume].basics.profiles.network + "</a>";

    let skills = '';
    for(let element in sampleSpace[activeResume].skills['keywords']) {
        skills = skills + '<li>' + capitalize( sampleSpace[activeResume].skills['keywords'][element] ) + '</li>';
    }
    document.querySelector("#tech-skills").innerHTML = skills;

    let hobbies = '';
    sampleSpace[activeResume].interests.hobbies.forEach( element => {
        hobbies = hobbies + '<li>' + capitalize( element ) + '</li>';
    } );
    document.querySelector("#hobbies").innerHTML = hobbies;

};

// reset app
const reset = () => {
    document.querySelector("#search").value = '';
    sampleSpace = data['resume'];
    activeResume = 0;
    displayResume();
}

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
            document.querySelector(".content").style.visibility = 'hidden';
            document.querySelector("dialog").showModal();
            return;
        }
        controlsVisibility();
        displayResume();
    }

} );

//reset app button event handler
document.querySelector("#reset").addEventListener( 'click', reset );

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
    reset();
} );

// displays first resume on page load
displayResume();
