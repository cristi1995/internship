    $(document).ready(function(){
    	var pageNo = 0;
		getContent(pageNo);
		$(window).scroll(function() {
	   		if($(window).scrollTop() + $(window).height() == $(document).height()) {
	   			pageNo++;
	   			getNext(pageNo);
			}
		})
    })
	

    function getNext(pageNo) {
		getContent(pageNo);
    }
	function getContent(pageNo){
		//initialize 
		var requestCallback = new MyRequestsCompleted({
		    numRequest: 2
		});
		if (pageNo == 0) {
			var myurl = 'http://gov.ro/ro/json-agenda';
		} else {
			var myurl = 'http://gov.ro/ro/json-agenda&page=' + pageNo;
		}
		$.ajax({
		  dataType: "jsonp",
		  url: myurl,
		  type: 'GET',    
		  success: function(data) {
	        requestCallback.addCallbackToQueue(true, function() {
	            alert('Im the first callback');
	        });
		  }}).done(function ( data ) {
		   $.each(data.rez, function(i, item){
		   	var date = Date.parse(item.data_publicarii.replace( /(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"));
		   	var dateString = date.getDate().toString() + date.getMonth().toString() + date.getFullYear().toString();
		    var formattedDate = date.getDate() + ' ' + month(date.getMonth()) + ' ' + date.getFullYear().toString();
		   	// vezi daca exista container pentru obiect in functie de data publicarii
		   	if ($('.'+dateString).length > 0) {
		   		// daca da, adauga la finalul containerului
				$('.'+dateString).append(contentAgenda(item)).html();
				$('.container-agenda').collapsibleset('refresh')
		   	} else {
			   	// daca nu, creaza un nou container cu data publicarii ca si clasa
			   	content = '<div class="container-agenda__item ' + 
			   	dateString + '"><h2> Știre din ' + 
			   	formattedDate + '</h2>' + contentAgenda(item) + '</div>'
			   	$('.container-agenda').append(content).html();
				$('.container-agenda').collapsibleset('refresh')

			}
			})
		  });
		    $.ajax({
		  	dataType: "jsonp",
		    url: 'http://posturi.gov.ro/feed/json',
		    success: function(data) {
		        requestCallback.addCallbackToQueue(true, function() {
		            alert('Im the second callback');
		        });
		    }
		}).done(function ( data ) {
		   console.log(data)
		  });
	}	

	function contentAgenda(item){
		var titlu = decodeEntities(item.titlu)
		content = '<div class="container-agenda__item__container" data-role="collapsible"><h3>' 
		   		+ decodeEntities(item.titlu)+'</h3><div class="container-agenda__item__container__content"><p>'
		   		+ decodeEntities(item.continut.trim().replace(/\n/g,'<br />').replace(/\t/g,'&nbsp;&nbsp;&nbsp;')) + '</p></div></div>'
	   	return content
	}

	var MyRequestsCompleted = (function() {
    var numRequestToComplete, requestsCompleted, callBacks, singleCallBack;

    return function(options) {
        if (!options) options = {};

        numRequestToComplete = options.numRequest || 0;
        requestsCompleted = options.requestsCompleted || 0;
        callBacks = [];
        var fireCallbacks = function() {
            alert("we're all complete");
            for (var i = 0; i < callBacks.length; i++) callBacks[i]();
        };
        if (options.singleCallback) callBacks.push(options.singleCallback);

        this.addCallbackToQueue = function(isComplete, callback) {
            if (isComplete) requestsCompleted++;
            if (callback) callBacks.push(callback);
            if (requestsCompleted == numRequestToComplete) fireCallbacks();
        };
        this.requestComplete = function(isComplete) {
            if (isComplete) requestsCompleted++;
            if (requestsCompleted == numRequestToComplete) fireCallbacks();
        };
        this.setCallback = function(callback) {
            callBacks.push(callBack);
        };
    };
})();
