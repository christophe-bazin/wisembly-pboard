// Timeline
google.charts.load('current', {'packages':['timeline']});

google.charts.setOnLoadCallback(drawGID);

function drawGID() {
	var queryString = encodeURIComponent('SELECT K,D,E,G WHERE C is not null AND D is not null AND I is null ORDER BY G');

	var query = new google.visualization.Query(
		'https://docs.google.com/spreadsheets/d/1aR3Dldfva5iqHXQLOX3YZ-TXZPD-4AiOxZ44AytiJ0w/gviz/tq?gid=836971347&headers=1&tq=' + queryString);
	query.send(handleQueryResponse);
}

function handleQueryResponse(response) {
	if (response.isError()) {
		alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
		return;
	}

	var data = response.getDataTable();
	var chart = new google.visualization.Timeline(document.getElementById('timeline'));
	
	var options = {
		hAxis: {
			format: ('MMM d')
		},
		height: ('500')
	};

	chart.draw(data, options);
}
