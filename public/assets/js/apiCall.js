function getAnimals() {
    // Call the API
    // This is a POST request, because we need the API to generate a new token for us
    var key = 'MreeZBU8nfEU6g8h8MBxZIJ5hyzudGud1TYU3gJ2Ase5M7RfyD';
    var secret = 'fsYBRCekV4CmGOJTguA735YLrTbDpwcHJTYhImyi';
    var org = 'TX1318';
    var status = 'adoptable';
    var type = 'Dog'

    fetch('https://api.petfinder.com/v2/oauth2/token', {
        method: 'POST',
        body: 'grant_type=client_credentials&client_id=' + key + '&client_secret=' + secret,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(function (resp) {

        // Return the response as JSON
        return resp.json();

    }).then(function (data) {

        // Log the API data
        console.log('token', data);

        // Return a second API call
        // This one uses the token we received for authentication
        return fetch('https://api.petfinder.com/v2/animals?organization=' + org + '&status=' + status, {
		    headers: {
                'Authorization': data.token_type + ' ' + data.access_token,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

    }).then(function (resp) {

        // Return the API response as JSON
        return resp.json();

    }).then(function (data) {

        // Log the pet data
        console.log('pets', data);
        var obj = data;
        var myJSON = JSON.stringify(obj);
        var length = Object.keys(myJSON).length;
        document.getElementById("dogs").innerHTML = myJSON;
    }).catch(function (err) {

        // Log any errors
        console.log('something went wrong', err);
    });
}