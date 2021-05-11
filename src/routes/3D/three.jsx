import React from 'react';

class Three extends React.Component{
    componentDidMount(){
        const canvas = document.getElementById('myhouse');
        const ctx = canvas.getContext('2d');
        function drawTwoArcs() {
            ctx.beginPath()
            ctx.arc(300, 190, 150, 0, Math.PI * 2, false)
            ctx.arc(300, 190, 100, 0, Math.PI * 2, true)
            ctx.fill()
          }
          function draw() {
            ctx.shadowColor = "rgba(0,0,0,0.8)";
            ctx.shadowOffsetX = 12;
            ctx.shadowOffsetY = 12;
            ctx.shadowBlur = 15;
            drawTwoArcs();
          }
          ctx.fillStyle = "rgba(100,140,230,0.5)";
        draw();
        // // Set line width
        // ctx.lineWidth = 10;

        // // Wall
        // ctx.strokeRect(75, 140, 150, 110);

        // // Door
        // ctx.fillRect(130, 190, 40, 60);

        // // Roof
        // ctx.beginPath();
        // ctx.moveTo(50, 140);
        // ctx.lineTo(150, 60);
        // ctx.lineTo(250, 140);
        // ctx.closePath();
        // ctx.stroke();


    }   

    render(){
        return <div>
            <canvas id="myhouse" width="600" height="600"></canvas>
        </div>
    }
}

export default Three
