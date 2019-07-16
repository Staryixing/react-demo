import React from 'react';
import * as d3 from 'd3';

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
            w:90,
            h: 30
          },{
            id: '02',
            x: 240,
            y: 400,
            w: 90,
            h: 30
          }
        ],
        lockposition: [
          {
            id: 1,
            x: 40,
            y: 110,
            w: 60,
            h: 80
          },
          {
            id: 2,
            x: 40,
            y: 200,
            w: 60,
            h: 80
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
        planroute: [[100, 100],[400,260]]
      }
      this.rightMove = this.rightMove.bind(this)
    }
    componentDidMount(){
      this.run1()
    }
    run (){
      var data = [
        {month: "Q1-2016", apples: 3840, bananas: 1920, cherries: -1960, dates: -400},
        {month: "Q2-2016", apples: 1600, bananas: 1440, cherries: -960, dates: -400},
        {month: "Q3-2016", apples:  640, bananas:  960, cherries: -640, dates: -600},
        {month: "Q4-2016", apples:  320, bananas:  480, cherries: -640, dates: -400}
      ];

      var series = d3.stack()
          .keys(["apples", "bananas", "cherries", "dates"])
          .offset(d3.stackOffsetDiverging)
          (data);

      var svg = d3.select("svg"),
          margin = {top: 20, right: 30, bottom: 30, left: 60},
          width = +svg.attr("width"),
          height = +svg.attr("height");

      var x = d3.scaleBand()
          .domain(data.map(function(d) { return d.month; }))
          .rangeRound([margin.left, width - margin.right])
          .padding(0.1);

      var y = d3.scaleLinear()
          .domain([d3.min(series, stackMin), d3.max(series, stackMax)])
          .rangeRound([height - margin.bottom, margin.top]);

      var z = d3.scaleOrdinal(d3.schemeCategory10);

      svg.append("g")
        .selectAll("g")
        .data(series)
        .enter().append("g")
          .attr("fill", function(d) { return z(d.key); })
        .selectAll("rect")
        .data(function(d) { return d; })
        .enter().append("rect")
          .attr("width", x.bandwidth)
          .attr("x", function(d) { return x(d.data.month); })
          .attr("y", function(d) { return y(d[1]); })
          .attr("height", function(d) { return y(d[0]) - y(d[1]); })

      svg.append("g")
          .attr("transform", "translate(0," + y(0) + ")")
          .call(d3.axisBottom(x));

      svg.append("g")
          .attr("transform", "translate(" + margin.left + ",0)")
          .call(d3.axisLeft(y));

      function stackMin(serie) {
        return d3.min(serie, function(d) { return d[0]; });
      }

      function stackMax(serie) {
        return d3.max(serie, function(d) { return d[1]; });
      }
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

    run1 (){

      let w = 960,
          h =500,
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
      let linedata = [[40, 460],[40, 100],[100,100],[100,40],[860, 40],[860, 460],[200, 460]]
      let lineGenerator = d3.line().x(function(d){
        return d[0]
      })
      .y(function(d){
        return d[1]
      })
      svg.append("path")
      .attr('stroke', 'rgb(141,281,200)')
      .attr('stroke-width', '4')
      .attr('fill', 'none')
      .attr('d', lineGenerator(linedata))

      // 锁闭区域
      var lock = svg.selectAll("locks").data(this.state.lockposition).enter().append("rect")
        .attr("fill", "rgb(109,83, 154)")
        .attr('stroke', 'rgb(127,113,165)')
        .attr('stroke-width', '2')
        .attr("x", function(d, i){
          return d.x;
        }).attr("y", function(d){
          return d.y; 
        }).attr("width",function(d){
          return d.w
        })
        .attr("height", function(d){
          return d.h
        })

      // 停车位置
      let parkspace = svg.selectAll("parks").data(this.state.parkspace).enter().append("rect")
        .attr("fill", "rgb(47,96,162)")
        .attr('stroke', 'rgb(83,164,213)')
        .attr('stroke-width', '2')
        .attr("x", function(d, i){
          return d.x;
        }).attr("y", function(d){
          return d.y; 
        }).attr("width",function(d){
          return d.w
        })
        .attr("height", function(d){
          return d.h
        })

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
          .on("click", function(d){
            let self = this;
            console.log('d',d)
            
          })

          // 路线图
          var paths = svg.append("path")
          .style("fill", "none")
          .style("stroke", "rgb(122,135,115)")
          .style("stroke-dasharray", "10, 4")
          .attr("d", lineGenerator(this.state.planroute))
            // 路线头
          var startCircle = svg
          .append('circle')
          .attr("fill", "rgb(222,168,74)")
          .attr("cx",this.state.planroute[0][0])
          .attr("cy",this.state.planroute[0][1])
          .attr('r', 6)

            // 路线尾
          let water = svg.append("path")
            .attr('d', this.generatePath(this.state.planroute[1][0], this.state.planroute[1][1], 10, 63, 20))
            .attr('fill', 'rgb(220,174,70)')
    }
    
    render() {
        return (
            <div>
              <svg width="960" height="500" style={{ backgroundColor: 'rgb(52,70,130)' }}></svg>
              <button onClick={ this.rightMove }>右移</button>
            </div>
        )
    }
}

export default OtherServices