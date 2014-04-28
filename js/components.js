/** @jsx React.DOM */

var WorkComponent = React.createClass ({
  render: function() {
    return (
        <div>Hello</div>
      );
  }
});


/* RENDER REACT */

React.renderComponent(
  <WorkComponent />,
  document.getElementById('work-content')
);