import React from 'react'
import { Redirect } from 'dva/router';

class CameraPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            
        }
        this.startVideoCapture = this.startVideoCapture.bind(this)
    }

    componentDidMount() {
      // this.draw()
      this.startVideoCapture()
    }

    startVideoCapture() {
      let video = document.getElementById('video');
      let canvas = document.getElementById('canvas');
      let that = this;
      let userAgent = navigator.userAgent
      let  isiOS = !!userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      let videoConfig = {width:640,height:420};
      if (isiOS) {
          videoConfig = {
              facingMode: { exact: "user" },
          }
      }
      if(video && canvas){
        let mediaDevices = navigator.mediaDevices;
        mediaDevices.enumerateDevices().then(function(){
          mediaDevices.getUserMedia({
            video: videoConfig,
            audio: false
          }).then(function(stream) {
              that.pageStream = stream
              video.srcObject = stream;
              video.play();
          }).catch(
            function (error) {
              alert(error.name + error.message)
              console.log(error);
            }
          )
        })
      }
    }
    confirm(){
      let canvas = document.getElementById('canvas');
      let video = document.getElementById('video');
      let img = document.getElementById('img');
      canvas.getContext('2d').drawImage(video, 0, 0, 640, 420,0,0,800,600);
      img.src = canvas.toDataURL("image/png");

    }
    draw(){
      let canvas = document.getElementById("canvas")
      if(canvas.getContext){
        var ctx = canvas.getContext('2d');

        ctx.fillStyle = "rgb(200,0,0)";
        ctx.fillRect(10, 10, 55, 50);

        ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
        ctx.fillRect (30, 30, 55, 50);
      }
    }

    render() {
        return (
            <div>
              <video id="video"  src=""  width="640" height="420"></video>
              <canvas id='canvas'  width='800'  height='600'></canvas>
              <img id="img" src="" alt=""/>
              <div onClick={this.confirm} style={{ color: 'red',cursor: 'pointer' }}>截屏</div>
            </div>
        )
    }
}

export default CameraPage