import React, { Component } from "react";
import "./Track.css";
export default class Track extends Component {
  renderAction() {
    let isRemoval = true;
    if (isRemoval) {
      return <button className="Track-action">-</button>;
    } else {
      return <button className="Track-action">+</button>;
    }
  }
  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          {/* <h3><!-- track name will go here --></h3> */}
          {/* <p><!-- track artist will go here--> | <!-- track album will go here --></p> */}
        </div>
        <button className="Track-action" onClick={renderAction}>
          {" "}
        </button>
      </div>
    );
  }
}
