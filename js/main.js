

function readFromDatabaseOnce(value) {
    var leadsRef = database.ref(value);
    leadsRef.on('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            var childData = childSnapshot.val();
            console.log(childData);
        });
    });
}