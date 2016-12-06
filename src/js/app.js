// *************************************
//
//   File Name
//   -> Description
//
// *************************************

  // -------------------------------------
  //   Private Variables
  // -------------------------------------

  // ...

  // -------------------------------------
  //   Initialize
  // -------------------------------------



  // -------------------------------------
  //   Set Event Handlers
  // -------------------------------------


// -------------------------------------
//   Usage
// -------------------------------------

// Get a URL with fetch
function get(url) {
  return fetch(url, {
    method: 'get'
  });
}

// Get JSON from a URL
function getJSON(url) {
  return get(url).then(function(response) {
    return response.json();
  });
}

// Output JSON into the dom
function outputJSON() {

  getJSON('data/global-top-10-tracks.json')
  .then(function(response) {

    // Loop over the JSON and output values
    // I'd love to move this out of here, but I'll need to figure out passing response.tracks in
    $.each(response.tracks, function(i, track) {

      // Set variables from JSON keys
      const ID = response.tracks[i].trackID;
      const name = response.tracks[i].trackName;
      const artist = response.tracks[i].trackArtist;

      // Output from the JSON keys using template strings, woohoo!
      document.querySelector('#all').innerHTML += `
        <article>
          <img src="images/${ID}.jpeg" />
          <h3><a class='track-link' data-track='${i}' href='#track'>${name}</a></h3>
          <h4>${artist}</h4>
        </article>
      `;

    })

    let trackLinks = document.querySelectorAll('.track-link');

    trackLinks.forEach(function(trackLink) {
      trackLink.addEventListener('click', function() {

        // Get the track's object index from the data attribute
        let index = this.getAttribute('data-track');
        let track = response.tracks[index];
        let name = response.tracks[index].trackName;
        let artist = response.tracks[index].trackArtist;
        let ID = response.tracks[index].trackID;

        console.log(index);

        document.querySelector('#track').innerHTML = `
          <article>
            <img src='images/${ID}.jpeg' />
            <h1>${name}</h1>
            <h2>${artist}</h2>
          </article>
        `;

      });
    });

  })
  .catch(function(error) {
    console.log(error);
  })

}

outputJSON();
