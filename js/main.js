;(function(){
    'use strict';

    $(document).ready(function() {
        var headingOptions = {
            text: 'TIMESHEET CHART for ',
            color: '#FF9112',
            fontStyle: 'italic',
        };

        var data = {
            months : ["Jan", "Feb", "Mar", "Apr", "May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
            event1: {
                title: 'javascript',
                startDate : '8/1/2015',
                endDate : '31/3/2015'
            },
             event2: {
                title: 'javascript',
                startDate : '28/2/2011',
                endDate : '30/4/2015'
            },
             event3: {
                title: 'javascript',
                startDate : '1/2/2011',
                endDate : '28/3/2011'
            },
             event4: {
                title: 'javascript',
                startDate : '1/1/2015',
                endDate : '28/2/2015'
            },
             event5: {
                title: 'javascript',
                startDate : '1/1/2015',
                endDate : '28/2/2015'
            },
             event6: {
                title: 'javascript',
                startDate : '1/1/2015',
                endDate : '28/2/2015'
            },
             event7: {
                title: 'javascript',
                startDate : '1/1/2015',
                endDate : '28/2/2015'
            },
       }
       $('#myCanvas').drawLineGraph(data, headingOptions);
    });
})();