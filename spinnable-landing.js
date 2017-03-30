import React, {Component, PropTypes} from "react";
import ReactDOM from "react-dom";
import {connect} from "react-redux";
import {Panel, Button} from "react-bootstrap";
import Highlight from "react-syntax-highlight";
import Formfields from "react-form-fields";
import Spinnable from "react-spinnable";
//
import {fetchSpinnableHtml} from "../actions/actions";
import {fetchSpinnablePropsexampleJs} from "../actions/actions";
import {fetchSpinnableMethodsexampleJs} from "../actions/actions";
import {fetchSpinnablePropsDemoexampleJson} from "../actions/actions";
import {fetchSpinnableCssDemoexampleCss} from "../actions/actions";
import {fetchSpinnableDeployexampleHtml} from "../actions/actions";
import BackgroundCanvas from "../components/background-canvas";
import {updateState} from "../toolbox/toolbox";
import ReactGA from "react-ga";
//
class SpinnableLanding extends Component
{
	//*************************
	//*************************
	// Standard Methods
	//
	constructor(props)
	{
	    super(props);
	}
	getChildContext()
	{
		// empty
	}
	getInitialState()
	{
		return({});
	}
	componentWillMount()
	{
		this.props.fetchSpinnableHtml();
		this.props.fetchSpinnablePropsexampleJs();
		this.props.fetchSpinnableMethodsexampleJs();
		this.props.fetchSpinnablePropsDemoexampleJson();
		this.props.fetchSpinnableCssDemoexampleCss();
		this.props.fetchSpinnableDeployexampleHtml();
	}
	componentWillUnmount()
	{
		// empty
	}
	componentDidMount()
	{
		let scopeProxy
			= this;
		let setViewLoaded
			= scopeProxy.context.setViewLoaded;
		let setLayoutMode
			= scopeProxy.context.setLayoutMode;
		let updateNavigationState
			= scopeProxy.context.updateNavigationState;
		let navigationSection
			= 0;
		//
		window.requestAnimationFrame(()=>
		{
			// Updating the section index this way lets the
			// state of the nagigation cluster fully initialize
			// before the activeKey value is updated. This is
			// necessary for it to be possible to navigate
			// back to the wares section from within a component
			// landing page when the component landing page is
			// directly accessed via the url bar in the browser.
			updateNavigationState(navigationSection);
		});
		let setviewTimeout =
			setTimeout(function()
			{
				setViewLoaded(true);
				setLayoutMode("full");
			},
			500);
		//
		updateState(scopeProxy,
		{
			"Ready":false
		});
	}
	componentWillUpdate()
	{
		// empty
	}
	componentDidUpdate()
	{
		let scopeProxy
			= this;
		//
		window.requestAnimationFrame(function()
		{
			if(scopeProxy.state !== undefined
			&& scopeProxy.state.Ready === false)
			{
				updateState(scopeProxy,
				{
					"Ready":true
				});
				document.getElementById("spinnabledisplace-input-field").value
				= "45deg";
				document.getElementById("spinnableeasing-input-field").value
				= "[400,5]";
				document.getElementById("spinnableduration-input-field").value
				= "500ms";
				document.getElementById("spinnableperspective-input-field").value
				= "300px";
				document.getElementById("spinnableaxis-input-field").value
				= "z";
			}
		});
	}
	render()
	{
		let scopeProxy
			= this;
		let spinnableHtml
			= scopeProxy.props.html;
		let jsonReady
			= true;
		let profileReady
			= true;
		let spinnablePropsDemoExample
			= (scopeProxy.props.spinnablePropsexampleJs !== undefined
			&& scopeProxy.props.spinnablePropsexampleJs !== null)
			? scopeProxy.props.spinnablePropsexampleJs
			: "loading...";
		let spinnableMethodsDemoExample
			= (scopeProxy.props.spinnableMethodsexampleJs !== undefined
			&& scopeProxy.props.spinnableMethodsexampleJs !== null)
			? scopeProxy.props.spinnableMethodsexampleJs
			: "loading...";
		let spinnablePropsExample
			= (scopeProxy.props.spinnablePropsDemoexampleJson !== undefined
			&& scopeProxy.props.spinnablePropsDemoexampleJson !== null)
			? scopeProxy.props.spinnablePropsDemoexampleJson
			: "loading...";
		let spinnableCssDemoExample
			= (scopeProxy.props.spinnableCssDemoexampleCss !== undefined
			&& scopeProxy.props.spinnableCssDemoexampleCss !== null)
			? scopeProxy.props.spinnableCssDemoexampleCss
			: "loading...";
		let spinnableDeployExample
			= (scopeProxy.props.spinnableDeployexampleHtml !== undefined
			&& scopeProxy.props.spinnableDeployexampleHtml !== null)
			? scopeProxy.props.spinnableDeployexampleHtml
			: "loading...";
		//
		let spinnableProfile =
			{
				"Portal":
				{
					"Distort":
					{
						"Perspective":"200px"
					},
					"Rotate":
					{
						"Displace":"45deg",
						"Easing":[400, 5],
						"Duration":"1000"
					}
				},
				"Report":
				{
					"Start":(event)=>
					{
						// empty
					},
					"Change":(event)=>
					{
						// empty
					},
					"Complete":(event)=>
					{
						// empty
					},
					"Ready":(event)=>
					{
						// empty
					}
				}
			}
		//
		let sandboxProfileOnMount =
			{
				"Portal":
				{
					"Distort":
					{
						"Perspective":"200px"
					},
					"Rotate":
					{
						"Displace":"45deg",
						"Easing":[400, 5],
						"Duration":"1000"
					}
				},
				"Report":
				{
					"Start":(event)=>
					{
						// empty
					},
					"Change":(event)=>
					{
						// empty
					},
					"Complete":(event)=>
					{
						// empty
					},
					"Ready":(event)=>
					{
						// empty
					}
				}
			}
		//
		let spinnabledisplaceInputProfile =
			{
				"tag":"input",
				"validation":false,
				"errorMsg":"",
				"required":true,
				"attributes":
				{
					"type":"text",
					"placeholder":"Displace",
					"name":"spinnabedisplace-input",
					"id":"spinnabledisplace-input-field",
					"className":"sandbox-formfield-input"
				},
				"onChange":scopeProxy.updateSandboxProfile.bind(scopeProxy)
			}
		//
		let spinnableeasingInputProfile =
			{
				"tag":"input",
				"validation":false,
				"errorMsg":"",
				"required":true,
				"attributes":
				{
					"type":"text",
					"placeholder":"Easing",
					"name":"spinnabeeasing-input",
					"id":"spinnableeasing-input-field",
					"className":"sandbox-formfield-input"
				},
				"onChange":scopeProxy.updateSandboxProfile.bind(scopeProxy)
			}
		//
		let spinnabledurationInputProfile =
			{
				"tag":"input",
				"validation":false,
				"errorMsg":"",
				"required":true,
				"attributes":
				{
					"type":"text",
					"placeholder":"Duration",
					"name":"spinnabeduration-input",
					"id":"spinnableduration-input-field",
					"className":"sandbox-formfield-input"
				},
				"onChange":scopeProxy.updateSandboxProfile.bind(scopeProxy)
			}
		//
		let spinnableperspectiveInputProfile =
			{
				"tag":"input",
				"validation":false,
				"errorMsg":"",
				"required":true,
				"attributes":
				{
					"type":"text",
					"placeholder":"Perspective",
					"name":"spinnabeperspective-input",
					"id":"spinnableperspective-input-field",
					"className":"sandbox-formfield-input"
				},
				"onChange":scopeProxy.updateSandboxProfile.bind(scopeProxy)
			}
		//
		let spinnableaxisInputProfile =
			{
				"tag":"input",
				"validation":false,
				"errorMsg":"",
				"required":true,
				"attributes":
				{
					"type":"text",
					"placeholder":"Spin Axis",
					"name":"spinnabeaxis-input",
					"id":"spinnableaxis-input-field",
					"className":"sandbox-formfield-input"
				},
				"onChange":scopeProxy.updateSandboxProfile.bind(scopeProxy)
			}
		//
		let backgroundcanvasProfile =
			{
				"Background":
				{
					"Color":"rgba(245,245,255,1)"
				},
				"Watermark":
				{
					"Name":"spinnable",
					"Image":"anvil-watermark-filtered_480x363.png"
				}
			}
		//
		let sandboxProfile
			= _.has(scopeProxy, "state.Sandbox.Profile")
			? scopeProxy.state.Sandbox.Profile
			: sandboxProfileOnMount;
		//
		if(jsonReady === true
		&& profileReady === true)
		{
			return(
				<div id="wares-landing-container" ref="wareslanding" className="wares-landing">
					<div id="wares-landing-content-conainer" ref="wareslandingcontent" className="wares-landing-content">
						<div id="ware-introduction-container" ref="wareintroduction" className="ware-introduction">
							<div id="ware-landing-html-container" ref="warelandinghtml" dangerouslySetInnerHTML={{"__html":spinnableHtml}} className="ware-landing-html"/>
						</div>
						<div id="ware-properties-detail-container" className="ware-properties-detail">
							<Panel collapsible defaultExpanded={false} header="Properties (props)" className="detail-heading">
								<Highlight lang="json" value={spinnablePropsExample}/>
							</Panel>
						</div>
						<div id="ware-properties-detail-container" className="ware-properties-detail">
							<Panel collapsible defaultExpanded={false} header="Methods" className="detail-heading">
								<Highlight lang="js" value={"let spinnableexampleRef = this.refs.spinnableexample;"}/>
								<hr/>
								<Highlight lang="js" value={spinnableMethodsDemoExample}/>
							</Panel>
						</div>
						<div id="ware-properties-detail-container" className="ware-properties-detail">
							<Panel collapsible defaultExpanded={false} header="Demo Properties (props)" className="detail-heading">
								<Highlight lang="js" value={spinnablePropsDemoExample}/>
							</Panel>
						</div>
						<div id="ware-properties-detail-container" className="ware-properties-detail">
							<Panel collapsible defaultExpanded={false} header="Demo Styles (css)" className="detail-heading">
								<Highlight lang="css" value={spinnableCssDemoExample}/>
							</Panel>
						</div>
						<div id="ware-properties-detail-container" className="ware-properties-detail">
							<Panel collapsible defaultExpanded={true} header="Deploy" className="detail-heading">
								<Highlight lang="jsx" value={"npm install react-spinnable -s"}/>
								<hr/>
								<Highlight lang="js" value={"import Spinnable from 'react-spinnable';"}/>
								<hr/>
								<Highlight lang="html" value={spinnableDeployExample}/>
							</Panel>
						</div>
						<div id="spinnable-showcase-container" ref="spinnableshowcase" className="spinnable-showcase">
							<div id="spinnable-heading-container" ref="spinnableheading" className="spinnable-heading">
								<div id="spinnable-heading-headline-container" ref="spinnableheadingheadline" className="spinnable-heading-headline">
									Demo
								</div>
							</div>
							<hr/>
							<div id="spinnable-axislinear-container" className="spinnable-axis">
								<div id="spinnableaxis-title-container" className="spinnableaxis-title">Spinnable Axis</div>
								<div id="spinnable-demo-horizontal-host-container" className="spinnable-demo-host">
									<div id="spinnable-demo-title-container" className="spinnable-demo-title">X-Axis</div>
									<Button className="spinnable-activate-button" onClick={scopeProxy.applySpinnable.bind(this, "x")}>Spin</Button>
									<Button className="spinnable-activate-button" onClick={scopeProxy.resetSpinnable.bind(this, "x")}>Reset</Button>
									<div id="spinnable-card-xaxis-container" className="spinnable-card">
										<Spinnable id="linear-xaxis-container" ref="spinnablexaxis" {...spinnableProfile}>
											<div id="spinnable-cardtarget-linearxaxis-container" className="spinnable-cardtarget"><div className="spinnable-targetlabel">Spin</div></div>
										</Spinnable>
									</div>
								</div>
								<div id="spinnable-demo-vertical-host-container" className="spinnable-demo-host">
									<div id="spinnable-demo-title-container" className="spinnable-demo-title">Y-Axis</div>
									<Button className="spinnable-activate-button" onClick={scopeProxy.applySpinnable.bind(this, "y")}>Spin</Button>
									<Button className="spinnable-activate-button" onClick={scopeProxy.resetSpinnable.bind(this, "y")}>Reset</Button>
									<div id="spinnable-card-yaxis-container" className="spinnable-card">
										<Spinnable id="linear-yaxis-container" ref="spinnableyaxis" {...spinnableProfile}>
											<div id="spinnable-cardtarget-linearyaxis-container" className="spinnable-cardtarget"><div className="spinnable-targetlabel">Spin</div></div>
										</Spinnable>
									</div>
								</div>
								<div id="spinnable-demo-radial-host-container" className="spinnable-demo-host">
									<div id="spinnable-demo-title-container" className="spinnable-demo-title">Z-Axis</div>
									<Button className="spinnable-activate-button" onClick={scopeProxy.applySpinnable.bind(this, "z")}>Spin</Button>
									<Button className="spinnable-activate-button" onClick={scopeProxy.resetSpinnable.bind(this, "z")}>Reset</Button>
									<div id="spinnable-card-zaxis-container" className="spinnable-card">
										<Spinnable id="linear-zaxis-container" ref="spinnablezaxis" {...spinnableProfile}>
											<div id="spinnable-cardtarget-linearzaxis-container" className="spinnable-cardtarget"><div className="spinnable-targetlabel">Spin</div></div>
										</Spinnable>
									</div>
								</div>
							</div>
							<hr/>
							<div id="spinnable-axislinear-container" className="spinnable-axis">
								<div id="spinnableaxis-title-container" className="spinnableaxis-title">Sandbox</div>
								<div id="spinnable-sandbox-host-container" className="spinnable-sandbox-host">
									<div id="spinnable-sandbox-container" className="spinnable-sandbox">
										<Button className="spinnable-activate-button" onClick={scopeProxy.applySandboxSpinnable.bind(this)}>Spin</Button>
										<Button className="spinnable-activate-button" onClick={scopeProxy.resetSandboxSpinnable.bind(this)}>Reset</Button>
										<div id="spinnable-demo-title-container" className="spinnable-demo-title">Profile</div>
										<div id="spinnable-profilefields-container" className="spinnable-profilefields">
											<div id="profilefields-left-container" className="spinnable-profilefields-column">
												<div id="profilefield-host-container" className="profilefield-host">
													<div id="profilefield-label-container" className="profilefield-label">degrees</div>
													<Formfields {...spinnabledisplaceInputProfile}/>
												</div>
												<div id="profilefield-host-container" className="profilefield-host">
													<div id="profilefield-label-container" className="profilefield-label">string, spring array | easing</div>
													<Formfields {...spinnableeasingInputProfile}/>
												</div>
												<div id="profilefield-host-container" className="profilefield-host">
													<div id="profilefield-label-container" className="profilefield-label">num | milliseconds</div>
													<Formfields {...spinnabledurationInputProfile}/>
												</div>
												<div id="profilefield-host-container" className="profilefield-host">
													<div id="profilefield-label-container" className="profilefield-label">perspective | dist</div>
													<Formfields {...spinnableperspectiveInputProfile}/>
												</div>
												<div id="profilefield-host-container" className="profilefield-host">
													<div id="profilefield-label-container" className="profilefield-label">axis | x,y,z</div>
													<Formfields {...spinnableaxisInputProfile}/>
												</div>
											</div>
										</div>
										<div id="spinnable-sandbox-card-host-container" className="spinnable-sandbox-card-host">
											<div id="spinnable-sandbox-card-container" className="spinnable-sandbox-card">
												<Spinnable id="sandbox-spinnable-container" ref="sandboxspinnable" {...sandboxProfile}>
													<div id="spinnable-cardtarget-sandbox-container" className="spinnable-sandbox-cardtarget"><div className="spinnable-targetlabel">Spin</div></div>
												</Spinnable>
											</div>
										</div>
									</div>
								</div>
							</div>

						</div>
					</div>
					<BackgroundCanvas ref="backgroundcanvas" {...backgroundcanvasProfile}/>
				</div>
			);
		}
		else
		{
			return(
				<div id="wares-landing-container" ref="wareslanding" className="wares-landing">
					"Loading Spinnable Content..."
				</div>
			);
		}
	}
	//*************************
	//*************************
	// Specialized Methods
	//
	applySpinnable(rotationAxis)
	{
		let scopeProxy
			= this;
		let refValue
			= "spinnable".concat(rotationAxis, "axis");
		let spinnablexaxisRef
			= this.refs[refValue];
		//
		ReactGA.event(
		{
		  "category":"spinnable_action",
		  "action":"apply_clicked",
		  "label":"apply_axis-".concat(rotationAxis, "_spinnable")
		});
		spinnablexaxisRef.spinnableApply(rotationAxis);
	}
	resetSpinnable(rotationAxis)
	{
		let scopeProxy
			= this;
		let refValue
			= "spinnable".concat(rotationAxis, "axis");
		let spinnablexaxisRef
			= this.refs[refValue];
		//
		ReactGA.event(
		{
		  "category":"spinnable_action",
		  "action":"reset_clicked",
		  "label":"reset_axis-".concat(rotationAxis, "_spinnable")
		});
		spinnablexaxisRef.spinnableReset(rotationAxis);
	}
	applySandboxSpinnable(event)
	{
		let scopeProxy
			= this;
		let sandboxspinnableRef
			= this.refs.sandboxspinnable;
		let spinnableAxis
			= document.getElementById("spinnableaxis-input-field").value;
		//
		ReactGA.event(
		{
		  "category":"spinnable_action",
		  "action":"sandbox_apply_clicked",
		  "label":"apply_axis-".concat(spinnableAxis, "_spinnable")
		});
		sandboxspinnableRef.spinnableApply(spinnableAxis);
	}
	resetSandboxSpinnable(event)
	{
		let scopeProxy
			= this;
		let sandboxspinnableRef
			= this.refs.sandboxspinnable;
		let spinnableAxis
			= document.getElementById("spinnableaxis-input-field").value;
		//
		ReactGA.event(
		{
		  "category":"spinnable_action",
		  "action":"sandbox_reset_clicked",
		  "label":"reset_axis-".concat(spinnableAxis, "_spinnable")
		});
		sandboxspinnableRef.spinnableReset(spinnableAxis);
	}
	updateSandboxProfile()
	{
		let scopeProxy
			= this;
		let spinnableDisplace
			= document.getElementById("spinnabledisplace-input-field").value;
		let spinnableEasing
			= document.getElementById("spinnableeasing-input-field").value;
		let spinnableDuration
			= document.getElementById("spinnableduration-input-field").value;
		let spinnablePerspective
			= document.getElementById("spinnableperspective-input-field").value;
		let regExp
			= /\[([^)]+)\]/;
		let easingValue
			= (regExp.exec(spinnableEasing) !== null)
			? regExp.exec(spinnableEasing)[1]
			: null;
		let easingArray
			= (easingValue !== null)
			? easingValue.split(",")
			: [];
		let springArray
			= (easingArray.length === 2)
			? easingArray
			: [];
		//
		let adjustedSpringArray =
			springArray.map((arrayItem)=>
			{
				return(parseFloat(arrayItem));
			});
		//
		let filteredSpinnableEasing
			= (springArray.length === 2)
			? adjustedSpringArray
			: spinnableEasing;
		//
		if(_.has(scopeProxy, "state.Sandbox.Profile.Portal.Rotate"))
		{
			Object.assign(scopeProxy.state.Sandbox.Profile.Portal.Rotate,
			{
				"Easing":null
			});
		}
		updateState(scopeProxy,
		{
			"Sandbox":
			{
				"Profile":
				{
					"Portal":
					{
						"Distort":
						{
							"Perspective":spinnablePerspective
						},
						"Rotate":
						{
							"Displace":spinnableDisplace,
							"Easing":filteredSpinnableEasing,
							"Duration":spinnableDuration
						}
					},
					"Report":
					{
						"Start":(event)=>
						{
							// empty
						},
						"Change":(event)=>
						{
							// empty
						},
						"Complete":(event)=>
						{
							// empty
						},
						"Ready":(event)=>
						{
							// empty
						}
					}
				}
			}
		});
	}
	//*************************
	//*************************
	// Assignments
	//
	static contextTypes =
		{
			"transitionBody":PropTypes.func,
			"updateNavigationState":PropTypes.func,
			"setViewLoaded":PropTypes.func,
			"setLayoutMode":PropTypes.func
		}
	//
}
function mapAxiosstateToReactprops(axiosState)
{
	// This function is only called when the axios
	// response updates the application state. Once
	// this function is called, the component state
	// is updated which causes the render() function
	// to execute.
	return(
	{
		// When the application state (state.posts.all) is
		// updated by the axios promise, the promise response
		// is assigned the component state this.content.posts.
		"html":axiosState.content.html,
		"spinnablePropsexampleJs":axiosState.content.spinnablePropsexampleJs,
		"spinnableMethodsexampleJs":axiosState.content.spinnableMethodsexampleJs,
		"spinnablePropsDemoexampleJson":axiosState.content.spinnablePropsDemoexampleJson,
		"spinnableCssDemoexampleCss":axiosState.content.spinnableCssDemoexampleCss,
		"spinnableDeployexampleHtml":axiosState.content.spinnableDeployexampleHtml
	});
}
export default connect(mapAxiosstateToReactprops,
{
	"fetchSpinnableHtml":fetchSpinnableHtml,
	"fetchSpinnablePropsexampleJs":fetchSpinnablePropsexampleJs,
	"fetchSpinnableMethodsexampleJs":fetchSpinnableMethodsexampleJs,
	"fetchSpinnablePropsDemoexampleJson":fetchSpinnablePropsDemoexampleJson,
	"fetchSpinnableCssDemoexampleCss":fetchSpinnableCssDemoexampleCss,
	"fetchSpinnableDeployexampleHtml":fetchSpinnableDeployexampleHtml
})(SpinnableLanding);