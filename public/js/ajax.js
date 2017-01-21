/*
//alert('hello world');

$(document).ready(function(){

	//alert("hello world");
});
*/
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
	"<pre style='background-color: gray;'>{{example}}</pre>" +
	"</td>" +
	"<td>" +
	"{{challenge}}" +
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

	//AJAX GET Function - then loop through and create the DOM element to display it
	//success and error are promises - when we get the information do this if not
	//do this
	$.ajax({
		type: 'GET',
		url: 'http://rest.learncode.academy/api/paul/code',
		success: function(topics) {
		// console.log("I have friends!", data); //returns all of johnbob's friends
			$.each(topics, function(i, topic){
				addTopic(topic);	
			});

		},

		error: function(){
			alert('error loading friends');
		}	
	});

	//the above is an older way of using asynchronous calls and promises.  The succes and error still work but 
	//the newer syntax would be written like this:
	/*
	
	$.ajax({
		type: 'GET',
		url: 'http://rest.learncode.academy/api/learncode/code'
	}).done(function(friends){
		$.each(friends, function(i, friend){
			addFriend(friend);
		});
	}).fail(function(){
		alert('error loading friends');
	});




	*/


	$('#add-topic').on('click', function(){

		var topic = {
			concept: $concept.val(),
			example: $example.val(),
			challenge: $challenge.val()
		};
		//AJAX POST Function - click the button w/ id add-friend and then pass it to the API
		$.ajax({
			type: 'POST',
			url: 'http://rest.learncode.academy/api/paul/code',
			data: topic,
			success: function(newTopic){
				addTopic(newTopic);	
			},

			// error: function(){
			// 	alert('error saving order');
			// }
		});

	});

	$topics.delegate('.remove', 'click', function(){

		var $li = $(this).closest('tr');
		//AJAX DELETE Function - click the .remove class button and the id identifies what to delete
		$.ajax({
			type: 'DELETE',
			url: 'http://rest.learncode.academy/api/paul/code/' + $(this).attr('id'),
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
          $("#results").append("<b>" + q + "</b>");
          $.each(data.query.search, function(i,item){
            $("#results").append("<div><a href='http://en.wikipedia.org/wiki/" + encodeURIComponent(item.title) + "'>" + item.title + "</a>" + item.snippet + "</div>");
          });
        });
      });


	 // $("#searchterm").keyup(function(e){
  //       var q = $("#searchterm").val();
  //       $.getJSON("http://rest.learncode.academy/api/learncode/friends/",
  //       {
  //         srsearch: q,
  //         action: "query",
  //         list: "search",
  //         format: "json"
  //       },
  //       function(data) {
  //         $("#results").empty();
  //         $("#results").append("Results for <b>" + q + "</b");
  //         $.each(data.query.search, function(i,item){
  //           $("#results").append("<div><a href='http://rest.learncode.academy/api/learncode/friends/'>" + item.name + "</a>" + item.name + "</div>");
  //         });
  //       });
  //     });

 //  	$('#searchterm').keyup(function(e){
	// 	var q = $("#searchterm").val();
	// $.ajax({
	// 	type: 'GET',
	// 	url: 'http://rest.learncode.academy/api/learncode/friends',
	// 	},
	// 	function(data){
	// 		  $("#results").empty();
 //  	          $("#results").append("Results for <b>" + q + "</b");
 //  	          $.each(data.query.search, function(i,item){
 //            $("#results").append("<div><a href='http://rest.learncode.academy/api/learncode/friends/'" + encodeURIComponent(item.name) + ">" + item.name + "</a>" + item.name + "</div>");
 //          });
	// 	});	
	// });





});

