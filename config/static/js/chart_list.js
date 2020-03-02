

window.addEventListener('DOMContentLoaded',function(){




    // type 종류 [ line,bar,doughnut ]

    const randomData = {
        dayNumber(){
            return  Math.round(Math.random() * 50);
        },
        weekNumber(){
            return  Math.round(Math.random() * 100);
        },
        monthNumber(){
            return  Math.round(Math.random() * 200);
        },
    };




    var ctx = document.getElementById('chart01').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Red', 'Blue', 'Yellow'],
            datasets: [{
                label: '일',
                data: [randomData.dayNumber(), randomData.dayNumber(), randomData.dayNumber(),randomData.dayNumber(),randomData.dayNumber()],
                backgroundColor: 'rgba(0,255,0,0.3)',
                // borderColor:'dodgerblue',
                // borderDash:[3,3],
                // borderDashOffset:1,
                // showLine:false, //베지에곡선 그리기

            }, {
                label: '주',
                data: [randomData.weekNumber(), randomData.weekNumber(), randomData.weekNumber(),randomData.weekNumber(),randomData.weekNumber()],
                backgroundColor: 'rgba(255,0,0,0.3)',
            },{
                label: '월',
                data: [randomData.monthNumber(), randomData.monthNumber(), randomData.monthNumber(),randomData.monthNumber(),randomData.monthNumber()],
                backgroundColor: 'rgba(255,237,83,0.3)',
            }],
        },
        options: {
            elements: {

            },
            animation: {
                onProgress: function (animation) {

                },
            },
            layout: {
                padding: {
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0
                }
            },

            legend: {
                display: true,
                labels: {
                    // fontColor: 'rgb(255, 99, 132)',
                    // fontSize:13
                }
            },
            title:{
                display: true,
                text:'트래픽 현황',
                position:'bottom',
            }


        }

    });


    var ctx2 = document.getElementById('chart02').getContext('2d');
    var chart2 = new Chart(ctx2, {
        // The type of chart we want to create
        type: 'doughnut',

        // The data for our dataset
        data: {
            labels: ['게시물1', '게시물2','게시물3','게시물4'],
            datasets: [{
                label: 'My First dataset',
                backgroundColor: [
                    'rgb(243,162,84)',
                    'rgb(238,110,133)',
                    'rgb(82,161,229)',
                    'rgb(248,206,107)',
                ],
                data: [17, 10, 5, 2]
            }]
        },


        // Configuration options go here
        options: {}
    });


    var ctx3 = document.getElementById('chart03').getContext('2d');
    var chart3 = new Chart(ctx3, {
        // The type of chart we want to create
        type: 'bar',

        // The data for our dataset
        data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [{
                label: 'My First dataset',
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: [0, 10, 5, 2, 20, 30, 45]
            }]
        },

        // Configuration options go here
        options: {}
    });





});