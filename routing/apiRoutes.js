// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

var friendData = require("../app/data/data");


// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
    // API GET Requests
    // Below code handles when users "visit" a page.
    // In each of the below cases when a user visits a link
    // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
    // ---------------------------------------------------------------------------

    app.get("/api/friends", function(req, res) {
        res.json(friendData);
    });


    // API POST Requests
    // Below code handles when a user submits a form and thus submits data to the server.
    // In each of the below cases, when a user submits form data (a JSON object)
    // ...the JSON is pushed to the appropriate JavaScript array
    // (ex. User fills out a reservation request... this data is then sent to the server...
    // Then the server saves the data to the tableData array)
    // ---------------------------------------------------------------------------
    var newFriendArray = []

    app.post("/api/friends", function(req, res) {

        console.log(req.body)
        var surveyScores = req.body.scores
        var sum = 0;
        var result = 0

        for (var i = 0; i < friendData.length; i++) {
            sum = 0; // next person to calculate total   //difference

            for (var j = 0; j < surveyScores.length; j++) {
                result = Math.abs(friendData[i].scores[j] - surveyScores[j])
                sum += result
            }
            newFriendArray.push({
                name: friendData[i].name,
                photo: friendData[i].photo,
                totalDifference: sum
            })

        } // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
        // It will do this by sending out the value "true" have a table
        // req.body is available since we're using the body parsing middleware

        /// when you are going to receive the survey from the survey.html submit  then you can going to compare the scores with all the freidns scores
        // you are going to find the best math



        friendData.push(req.body)


        newFriendArray.sort(function(a, b) {
            return a.totalDifference - b.totalDifference
        })

        console.log(newFriendArray)
        res.json(newFriendArray[0])
            // res.json the object with the name and the pibest  match
    });

    // ---------------------------------------------------------------------------
    // I added this below code so you could clear out the table while working with the functionality.
    // Don"t worry about it!

    app.post("/api/clear", function(req, res) {
        // Empty out the arrays of data
        friendData.length = 0;


        res.json({ ok: true });
    });
};