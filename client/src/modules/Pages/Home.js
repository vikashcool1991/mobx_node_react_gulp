import React, { Component } from 'react';
import { Button} from 'react-lightning-design-system';
// import Button from 'muicss/lib/react/button';
import Form from "react-jsonschema-form";
const schema = {
  title: "Todo",
  type: "object",
  required: ["title"],
  properties: {
    title: {type: "string", title: "Title", default: "A new task"},
    done: {type: "boolean", title: "Done ?", default: false}
  }
};
const log = (type) => console.log.bind(console, type);


export default class Home extends Component {
	constructor(props) {
		super(props);
	}

  render() {
    return (
    	<div style={{ "width": "250px", "margin": "10% 0% 0% 40%" }}>
    		<Form schema={schema}
        onChange={log("changed")}
        onSubmit={log("submitted")}
        onError={log("errors")} />
	    </div>
    );
  }
}
