var key = "4ed75158af45aeeb2df0525d0af7e52c";
var token = "159afbf454811016be493bce6978b565c52f0d2a6669a0d969e3db9d533ad060";
var board = "9TgrKdIZ";

var trelloUrl = "https://api.trello.com/1/boards/"+ board +"/cards?key="+ key +"&token="+ token +"&fields=url,name,shortLink,idMembersVoted,labels";
console.log("Sortie de l'API Trello", trelloUrl);

$.ajax({
	url: trelloUrl,
	type: "get",
	dataType: "json",
	data: {
		json: JSON.stringify(trelloUrl),
		delay: 3
	},
	success: function(data, textStatus, jqXHR) {
		// since we are using jQuery, you don't need to parse response
		drawTable(data);
	}
});

function drawTable(data) {
	for (var i = 0; i < data.length; i++) {
		drawRow(data[i]);
	}
}

function drawRow(rowData) {

	var labelsNames = (rowData.labels).map(function(label) {
		return label.name
	});

	var row = $("<tr class='Table-row'/>")
	$("#trelloDatas").append(row);
	row.append($("<td class='Table-cell u-tal'>" + rowData.name + "</td>"));
	row.append($("<td class='Table-cell'><a href="+ rowData.url +" target=_blank>" + rowData.shortLink + "</a></td>"));
	row.append($("<td class='Table-cell u-tal'>" + Object.values(labelsNames) +"</td>"));
	row.append($("<td class='Table-cell'>" + Object.keys(rowData.idMembersVoted).length +"</td>"));
}
