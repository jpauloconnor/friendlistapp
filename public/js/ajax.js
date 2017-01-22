var $topics = $('#topics');
var $concept = $('#concept');
var $example = $('#example');
var $challenge = $('#challenge');


var topicTemplate = "" + 
	"<tr>" +
	"<td>" +
	"{{concept}}" +
	"</td>" +
	"<td>" +
	"{{challenge}}" +
	"</td>" +
	"<td valign='top'>" +
    '<pre>' +
    '<textarea id="update" rows="4" style="width:300px">' +
    '{{example}}' +
    '</textarea>' +
    '</code>' +
	"</td>" +
	"<td>"	+
	"<button id='{{id}}' class='remove btn btn-info'>X</button>" +
	"</td>" +
	 "</tr> <br>";

function addTopic(topic){
	$topics.append(Mustache.render(topicTemplate, topic));
	$concept.val('');
	$example.val('');
	$challenge.val('');
};


$(document).ready(function(){
	
//GET
	$.ajax({
		type: 'GET',
		url: 'http://rest.learncode.academy/api/paul/javascriptcode',
		success: function(topics) {
			$.each(topics, function(i, topic){
				addTopic(topic);	
			});
		},
		error: function(){
			alert('error loading friends');
		}	
	});


//POST
$('#add-topic').on('click', function(){

		var topic = {
			concept: $concept.val(),
			example: $example.val(),
			challenge: $challenge.val()
		};
		$.ajax({
			type: 'POST',
			url: 'http://rest.learncode.academy/api/paul/javascriptcode',
			data: topic,
			success: function(newTopic){
				addTopic(newTopic);	
			},

			error: function(){
				console.log('error saving');
			}
		});
	});

//PUT(UPDATE THE CODE IN THE TABLE)
// $('#example-update').on('click', function(){

// 		var update = {
// 			update: $update.val()
// 		};
// 		$.ajax({
// 			type: 'PUT',
// 			url: 'http://rest.learncode.academy/api/paul/javascriptcode',
// 			data: update,
// 			success: function(newTopic){
// 				addTopic(newTopic);	
// 			},

// 			error: function(){
// 				console.log('error saving');
// 			}
// 		});
// 	});

//DELETE
	$topics.delegate('.remove', 'click', function(){

		var $li = $(this).closest('tr');
		//AJAX DELETE Function - click the .remove class button and the id identifies what to delete
		$.ajax({
			type: 'DELETE',
			url: 'http://rest.learncode.academy/api/paul/javascriptcode/' + $(this).attr('id'),
			success: function(){
				$li.fadeOut(300, function(){
					$(this).remove();
				});
			}
		});
	});

	$("#searchterm").keyup(function(e){
		var q = $("#searchterm").val();
		$.getJSON("http://en.wikipedia.org/w/api.php?callback=?",
		{
			srsearch: q,
			action: "query",
			list: "search",
			format: "json"
		},
		function(data) {
			$("#results").empty();
			$("#results").append("Results for <b>" + q + "</b>");
			$.each(data.query.search, function(i,item){
				$("#results").append("<div><a href='http://en.wikipedia.org/wiki/" + encodeURIComponent(item.title) + "'>" + item.title + "</a>" + item.snippet + "</div>");
			});
		});
	});
});

