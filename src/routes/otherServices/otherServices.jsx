import React from 'react';
import * as d3 from 'd3';
import { wallColumn,parkingArea,deviceArea } from '../../mock/mapdata'
import { Button } from 'antd';
import jinghui from '../../asset/car.jpeg'

const imagePath = "@asset/car.jpeg";

class OtherServices extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        carsposition: [
          {
            id: '01',
            x: 200,
            y: 400,
            w: 30,
            h: 30
          },{
            id: '02',
            x: 240,
            y: 400,
            w: 30,
            h: 30
          }
        ],
        parkspace:[
          {
            id: 1,
            x: 400,
            y: 260,
            w: 60,
            h: 80
          }
        ],
        planroute: [[100, 100],[400,260]],
        carLineMove: false,
        carLine: [
          {
            x:0,
            y:0
          },{
            x:0,
            y:0
          }
        ]
      }
      this.rightMove = this.rightMove.bind(this);
      this.mousemove =  this.mousemove.bind(this);
      this.mouseup = this.mouseup.bind(this);
      this.handleLine = this.handleLine.bind(this);
    }
    componentDidMount(){
      this.run1();
      this.handleLine();
      this.svgRef.addEventListener('mousemove', this.mousemove)
      this.svgRef.addEventListener('mouseup', this.mouseup)
    }

    rightMove(){
      console.log('右移')
      this.setState({
        planroute: [[200, 200],[500,360]]
      })
    }

    generatePath(cx, cy, radius, theta, dy) {
     theta = Math.PI * theta / 180;
     var xStart = cx + radius * Math.sin(theta); 
     var yStart = cy + radius * Math.cos(theta); 
     
     var xStop = cx - radius * Math.sin(theta); 
     var yStop = yStart; 
    
     var path = `M ${xStart} ${yStart} A ${radius} ${radius}, 0,1,0, ${xStop} ${yStop} L ${cx} ${cy + dy}`
     
     console.log(path)
     return path;
    }

    mouseDown=(param)=>{
      let path = [
        {
          x: param.x + 15, // 15为小车的宽
          y: param.y + 15
        },{
          x: param.x + 15,
          y: param.y + 15
        }
      ]
      this.setState({
        carLineMove: true,
        carLine: path
      })
    }
    mouseup(){
      this.setState({
        carLineMove: false,
      })
    }
    mousemove(e){
      if(this.state.carLineMove){
        this.setState((state, props) => {
          let path = [
            {
              x: state.carLine[0].x,
              y: state.carLine[0].y
            },{
              x: e.clientX,
              y: e.clientY -90 // 90为顶部导航栏的高度
            }
          ]
          return {
            carLine: path
          }
        })
      }
      
    }
    run1 (){
      let w = 1200,
          h =870,
          p = 20,
          x = d3.scaleLinear().domain([0,1]).range([p, w - p]),
          y= d3.scaleLinear().domain([0, 1]).range([h - p, p]);

      let svg = d3.select("svg");
      var grid = svg.selectAll(".grid")
        .data(x.ticks(40))
        .enter().append("g")
        .attr("stroke", "#bababa")
        .attr('stroke-width', '0.4');
      //(5) 添加线条，设置起始坐标(x1,y1)和结束坐标(x2,y2)的值即可

      //竖线
      grid.append("line")
        .attr("x1", x)
        .attr("x2", x)
        .attr("y1", p)
        .attr("y2", h - p - 1);
      
      //横线
      grid.append("line")
        .attr("y1", y)
        .attr("y2", y)
        .attr("x1", p)
        .attr("x2", w - p + 1);

      // 边框线
      let lineGenerator = d3.line().x(function(d){
        return d.x
      })
      .y(function(d){
        return d.y
      })
      
      // 墙柱障碍物
      var border = svg.selectAll("borders").data(wallColumn).enter().append("path")
      .attr('stroke', 'rgb(250,250,250)')
      .attr('stroke-width', '4')
      .attr('fill', function(d,i){
        return d.type === 1 ? 'rgb(250,250,250)':'none'
      })
      .attr('d', function(d, i){
        return lineGenerator(d.points)
      })

      // 泊车取车区域
      var parking = svg.selectAll("parkings").data(parkingArea).enter().append("path")
      .attr('stroke', 'none')
      .attr('stroke-width', '4')
      .attr('fill', 'rgb(88,142,192)')
      .attr('d', function(d, i){
        return lineGenerator(d.points)
      })

      // 设备区域
      var devices = svg.selectAll("devices").data(deviceArea).enter().append("path")
      .attr('stroke', 'none')
      .attr('stroke-width', '4')
      .attr('fill', 'rgb(92,105,202)')
      .attr('d', function(d, i){
        return lineGenerator(d.points)
      })

      // // 锁闭区域
      // var lock = svg.selectAll("locks").data(this.state.lockposition).enter().append("rect")
      //   .attr("fill", "rgb(109,83, 154)")
      //   .attr('stroke', 'rgb(127,113,165)')
      //   .attr('stroke-width', '2')
      //   .attr("x", function(d, i){
      //     return d.x;
      //   }).attr("y", function(d){
      //     return d.y; 
      //   }).attr("width",function(d){
      //     return d.w
      //   })
      //   .attr("height", function(d){
      //     return d.h
      //   })

      // 停车位置
      // let parkspace = svg.selectAll("parks").data(this.state.parkspace).enter().append("rect")
      //   .attr("fill", "rgb(47,96,162)")
      //   .attr('stroke', 'rgb(83,164,213)')
      //   .attr('stroke-width', '2')
      //   .attr("x", function(d, i){
      //     return d.x;
      //   }).attr("y", function(d){
      //     return d.y; 
      //   }).attr("width",function(d){
      //     return d.w
      //   })
      //   .attr("height", function(d){
      //     return d.h
      //   })

        // 汽车
       var imgs = svg.selectAll('image').data(this.state.carsposition).enter()
          .append("image")
          .attr("width",function(d,i){
            return d.w
          })
          .attr("height",function(d,i){
            return d.h
          })
          .attr("x", function(d,i){
            return d.x
          })
          .attr("y", function(d,i){
            return d.y
          })
          .attr("xlink:href", jinghui)
          .on('mousedown',(e) => {
            let param = JSON.parse(JSON.stringify(e))
            this.mouseDown(param)
          })
        

        // 路线图
        svg.selectAll('.drawLineCont').data([1]).enter().append('g').attr('class', 'drawLineCont')

        // var paths = svg.append("path")
        // .style("fill", "none")
        // .style("stroke", "rgb(122,135,115)")
        // .style("stroke-dasharray", "10, 4")
        // .attr("d", lineGenerator(this.state.planroute))
        //   // 路线头
        // var startCircle = svg
        // .append('circle')
        // .attr("fill", "rgb(222,168,74)")
        // .attr("cx",this.state.planroute[0][0])
        // .attr("cy",this.state.planroute[0][1])
        // .attr('r', 6)

        //   // 路线尾
        // let water = svg.append("path")
        //   .attr('d', this.generatePath(this.state.planroute[1][0], this.state.planroute[1][1], 10, 63, 20))
        //   .attr('fill', 'rgb(220,174,70)')
    }
    handleLine(){
      let lineGenerator = d3.line().x(function(d){
        return d.x
      }).y(function(d){
        return d.y
      })

      const handlePath = ( target ) => {
        target.attr('class','drawLine')
        .style("stroke", 'rgb(122,135,115)')
        .style("stroke-dasharray", "10, 4")
        .attr('stroke-width', '2')
        .attr('d',lineGenerator(this.state.carLine))
      }
      
      handlePath(d3.select('.drawLineCont').selectAll('.drawLine').data([1]))
      handlePath(d3.select('.drawLineCont').selectAll('.drawLine').data([1]).enter().append('path'))
      d3.select('.drawLineCont').exit().remove() 
    }
    download(){
      let svg=d3.select("#svg")
      var serializer = new XMLSerializer();
      var source = serializer.serializeToString(svg.node());
      
      source = '<?xml version="1.0" standalone="no"?>\r\n' + source;
      var url = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(source);
      document.write('<img src="' + url + '"/>');
      var canvas = document.createElement("canvas");
      canvas.width = 1200;
      canvas.height = 875;
  
      var context = canvas.getContext("2d");
      var image = new Image;
      image.src = document.getElementsByTagName('img')[0].src;
      image.onload = function() {
          context.drawImage(image, 0, 0);
          var a = document.createElement("a");
          a.download = "map.png";
          a.href = canvas.toDataURL("image/png");
          a.click();
      };
    }

    render() {
        return (
            <div>
              <svg 
                id="svg"
                ref = {ref => this.svgRef = ref}
                width="1200" height="870" style={{ backgroundColor: 'rgb(59,72,185)' }}></svg>
                {this.handleLine()}
              <button onClick={ this.rightMove }>右移</button>
              <Button onClick={this.download}>下载</Button>
            </div>
        )
    }
}

export default OtherServices