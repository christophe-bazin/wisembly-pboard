// TableSorter config
$("#trelloDatas").tablesorter( {sortList: [[5,1], [0,1]]} ); 


// Trello authorize (with client.js)
var onAuthorize = function() {
	updateLoggedIn();
	$("#output").empty();

	Trello.members.get("me", function(member) {
		window.idMemberVoted = member.id;
	});
};
var updateLoggedIn = function() {
	var isLoggedIn = Trello.authorized();
	$("#loggedout").toggle(!isLoggedIn);
	$("#loggedin").toggle(isLoggedIn);
};
var logout = function() {
	Trello.deauthorize();
	updateLoggedIn();
};
Trello.authorize({
	interactive: false,
	success: onAuthorize
});
$("#connectLink").click(function() {
	Trello.authorize({
		type: "popup",
		success: onAuthorize,
		scope: { read: true, write: true },
	});
});
$("#disconnect").click(logout);


// Vote function
$.getScript('js/trello.js', function() {
var trelloUrl = "https://api.trello.com/1/boards/"+ board +"/cards?key="+ key +"&token="+ token +"&fields=url,name,shortLink,idMembersVoted,labels,dateLastActivity";

	$.ajax({
		url: trelloUrl,
		type: "get",
		dataType: "json",
		data: {
			json: JSON.stringify(trelloUrl),
			delay: 3
		},
		success: function(data, textStatus, jqXHR) {
			getTrelloData(data);
		}
	});
	function getTrelloData(data) {
		for (var i = 0; i < data.length; i++) {
			displayTrelloDatas(data[i]);
		}
	}
	function displayTrelloDatas(displayTrelloData) {

		$a = displayTrelloData.idMembersVoted // Liste des votants sur trello 
		$b = idMemberVoted // Mon id

		if ($a.indexOf($b) !== -1) {
			$('.' + displayTrelloData.id + ' .vote').attr('class', 'Btn Btn--validate voted')
		}

		$('.' + displayTrelloData.id + ' .vote').click(function() {
			$.ajax({
				type: 'POST',
				data: "key="+ key +"&token="+ (Trello.token() || token) +"&value="+ idMemberVoted +"",
				success: function(success) { 
					$('.' + displayTrelloData.id + ' .vote').attr('class', 'Btn Btn--validate voted').find('.count').html(parseInt($('.' + displayTrelloData.id + ' .count').html())+1)	
					$(document).ajaxStop(function() { (location).reload(true); });
					console.log("success") 
				},
				error: function(error){ console.log("error") },
				url: "https://www.trello.com/1/cards/"+ displayTrelloData.id +"/membersVoted?",
				cache:false
			});
		});

		$('.' + displayTrelloData.id + ' .voted').click(function() {
			$.ajax({
				type: 'DELETE',
				data: "key="+ key +"&token="+ (Trello.token() || token) +"&value="+ idMemberVoted +"",
				success: function(success) { 
					$('.' + displayTrelloData.id + ' .voted').attr('class', 'Btn vote').find('.count').html(parseInt($('.' + displayTrelloData.id + ' .count').html())-1)	
					$(document).ajaxStop(function() { location.reload(true); });
					console.log("success") 
				},
				error: function(error){ console.log("error") },
				url: "https://www.trello.com/1/cards/"+ displayTrelloData.id +"/membersVoted/" + idMemberVoted +"",
				cache:false
			});
		});
	}
});


// Search function
$('#search_field').on('keyup', function() {
	var value = $(this).val();
	var patt = new RegExp(value, "i");

	$('#trelloDatas').find('tr').each(function() {
		if (!($(this).find('td').text().search(patt) >= 0)) {
			$(this).not('.Table-row').hide();
		}
		if (($(this).find('td').text().search(patt) >= 0)) {
			$(this).show();
		}
	});

});
