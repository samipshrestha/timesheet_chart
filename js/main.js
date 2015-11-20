;(function(){
    'use strict';

    $(document).ready(function() {
        $('h2').heading({
            text: 'TIMESHEET CHART for ',
            color: '#FF9112',
            fontStyle: 'italic',
        });
        var canvas = document.getElementById('myCanvas');
        var ctx = $('#myCanvas').get(0).getContext("2d");
        ctx.clearRect(0,0,1100,500);
        var data = {
            months : ["Jan", "Feb", "Mar", "Apr", "May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
            event1: {
                title: 'javascript',
                startmonth : '1',
                endmonth : '3',
                startYear : '2011',
                endYear : '2011',
            },

            event2: {
                title: 'php',
                startmonth : '3',
                endmonth : '5',
                startYear : '2011',
                endYear : '2011',
            },
            event3: {
                title: 'KSS',
                startmonth : '1',
                endmonth : '1',
                startYear : '2011',
                endYear : '2011',
            },

            event4: {
                title: 'Outing',
                startmonth : '06',
                endmonth : '06',
                startYear : '2011',
                endYear : '2011',
            },

            event5: {
                title: 'Goal Setup',
                startmonth : '08',
                endmonth : '12',
                startYear : '2011',
                endYear : '2011',
            }
       }
       $('#mycanvas').drawLineGraph(canvas,ctx, data);
    });
})();