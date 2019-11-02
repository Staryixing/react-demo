import React from 'react';

var SubscriptionMixin = {
  getInitialState: function() {
    return {
      comments: DataSource.getComments()
    }
  },
  componentDidMount: function(){
    DataSource.addChangeListener()
  },
  componentWillMount:function(){
    DataSource.removeChangeListener()
  },
  handleChange: function(){
    this.setState({
      comments: DataSource.getComments()
    })
  }
}

var CommentList = React.createClass({
  mixins: [SubscriptionMixin],
  render: function(){
    var comments = this.state.comments;
    return (
      <div>
        {
          comments.map(function(comment){
            return <div>{comment}</div>
          })
        }
      </div>
    )
  }
})

function withSubscription(WrappedComponent){
  return React.createClass({
    getInitialState: function(){
      return {
        comments: DataSource.getComments()
      }
    },
    componentDidMount: function(){
      DataSource.addChangeListener(this.handleChange);
    },
    componentWillUnmount: function() {
      DataSource.removeChangeListener(this.handleChange);
    },
    handleChange: function() {
      this.setState({
        comments: DataSource.getComments()
      });
    },

    render: function() {
      // Use JSX spread syntax to pass all props and state down automatically.
      return <WrappedComponent {...this.props} {...this.state} />;
    }
  })
}
module.exports = CommentList;
// class CommentList extends React.Component{
//   constructor(props){
//     super(props);
//     this.handleChange = this.handleChange.bind(this);
//     this.state = {
//       comments: DataSource.getComments()
//     }
//   }
//   componentDidMount(){
//     DataSource.addChangeListener()
//   }
//   componentWillMount(){
//     DataSource.removeChangeListener()
//   }
//   handleChange(){
//     this.setState({
//       comments: DataSource.getComments()
//     })
//   }
//   render() {
//     return(
//       <div>
//         {this.state.comments.map((comment) => {
//           <div>{comment}</div>
//         })}
//       </div>
//     )
//   }
// }