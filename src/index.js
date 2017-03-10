import React, {Component, PropTypes} from "react";
import ReactDOM from "react-dom";
import Draggable from "react-draggable";
import {VelocityComponent, VelocityTransitionGroup, velocityHelpers} from "velocity-react";
import {VelocityAnimate, VelocityUi} from "velocity-animate";
import _ from "lodash";
//
//*************************
//*************************
// Nonpublished Imports
//
function updateState(ScopeProxy, Parcel)
{
	let existingState
		= (ScopeProxy.state !== null)
		? _.cloneDeep(ScopeProxy.state)
		: {};
	let adjustedState
		= _.merge(existingState, _.cloneDeep(Parcel));
	//
	try
	{
		ScopeProxy.setState(adjustedState);
	}
	catch(event)
	{
		console.warn("::react-spinnable:problem::updateState:", event);
	}
}
//
//*************************
//*************************
// Exports
//
export default class Spinnable extends Component
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
		// empty
	}
	componentWillUnmount()
	{
		// empty
	}
	componentDidMount()
	{
		let scopeProxy
			= this;
		//
		scopeProxy.setState(
		{
			"Ready":false,
			"Portal":
			{
				"Velocity":
				{
					"Profile":
					{
						"runOnMount":false
					}
				},
				"Rotation":
				{
					"X":0,
					"Y":0,
					"Z":0
				}
			}
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
		window.requestAnimationFrame(()=>
		{
			if(scopeProxy.state !== null
			&& scopeProxy.state !== undefined
			&& scopeProxy.state.Ready === false)
			{
				let spinnableState =
					{
						"Ready":true
					}
				//
				scopeProxy.setState(spinnableState);
				scopeProxy.props.Report.Ready(scopeProxy.props.children);
			}
		});
	}
	render()
	{
		let scopeProxy
			= this;
		let spinnabletargetportalClassname
			= scopeProxy.props.children.props.className;
		let portalPerspective
			= scopeProxy.props.Portal.Distort.Perspective;
		let portalmorphProfile
			= _.has(scopeProxy, "state.Portal.Velocity.Profile")
			? scopeProxy.state.Portal.Velocity.Profile
			: null;
		let adjustedChildTransform
			= "translateX(0)".concat(
			" translateY(0)",
			" translateZ(0)",
			" rotateX(0)",
			" rotateY(0)",
			" rotateZ(0)");
		//
		let portalmorphStyle =
			{
				"display":"inline-block",
				"position":"absolute",
				"visibility":"0",
				"left":"0",
				"opacity":"0",
				"width":"0",
				"height":"0"
			}
		//
		let spinnabletargetportalStyle =
			{
				"margin":"0",
				"padding":"0",
				"perspective":portalPerspective,
				"transform-style":"preserve-3d",
				"border":"none",
				"background":"none",
				"background-attachment":"scroll",
				"background-blend-mode":"normal",
				"bakcground-clip":"border-box",
				"background-image":"none",
				"background-origin":"padding-box",
				"background-position":"0% 0%",
				"background-repeat":"repeat",
				"background-size":"auto",
				"background-color":"transparent"
			}
		//
		this.props.children.props.style
		= (this.props.children.props.style !== undefined)
		? this.props.children.props.style
		: {};
		//
		Object.assign(this.props.children.props.style,
		{
			"top":"0",
			"bottom":"0",
			"left":"0",
			"right":"0",
			"width":"100%",
			"height":"100%",
			"margin":"0",
			"transform":adjustedChildTransform
		});
		return(
			<div id="spinnable-portal-container" className={spinnabletargetportalClassname} style={spinnabletargetportalStyle}>
				{this.props.children}
				<VelocityComponent {...portalmorphProfile}>
					<div id="portal-morph-container" ref="portalmorph" style={portalmorphStyle}></div>
				</VelocityComponent>
			</div>
		);
	}
	//*************************
	//*************************
	// Specialized Methods
	//
	spinnableApply(rotationAxis)
	{
		let scopeProxy
			= this;
		let targetId
			= this.props.children.props.id;
		let targetElement
			= document.getElementById(targetId);
		let rotateEasing
			= scopeProxy.props.Portal.Rotate.Easing;
		let rotateDuration
			= parseFloat(scopeProxy.props.Portal.Rotate.Duration);
		let rotateDisplacement
			= parseFloat(scopeProxy.props.Portal.Rotate.Displace);
		let rotationaxisIsValid
			= ((rotationAxis.toLowerCase() === "x" && scopeProxy.state.Portal.Rotation.X === 0)
			|| (rotationAxis.toLowerCase() === "y" && scopeProxy.state.Portal.Rotation.Y === 0)
			|| (rotationAxis.toLowerCase() === "z" && scopeProxy.state.Portal.Rotation.Z === 0))
			? true
			: false;
		let portalRotationX
			= (rotationAxis.toLowerCase() === "x")
			? rotateDisplacement
			: scopeProxy.state.Portal.Rotation.X;
		let portalRotationY
			= (rotationAxis.toLowerCase() === "y")
			? rotateDisplacement
			: scopeProxy.state.Portal.Rotation.Y;
		let portalRotationZ
			= (rotationAxis.toLowerCase() === "z")
			? rotateDisplacement
			: scopeProxy.state.Portal.Rotation.Z;
		//
		let rotateProfile =
			{
				"runOnMount":false,
				"easing":rotateEasing,
				"duration":rotateDuration,
				"animation":
				{
					"opacity":1
				},
				"progress":(elements, complete, remaining, start, tweenValue)=>
				{
					// http://velocityjs.org/
					// The value of tweenValue is being reported as null for
					// unknown reasons. In order to tween the rotation according
					// to the easing, the actual value of the opacity must be
					// used as it tweens from zero to one. Additionally, at the
					// completion of the tween, the value of the opacity is set
					// back to zero by Velocity.
					//
					let progressValue
						= parseFloat(elements[0].style.opacity);
					let rotateAngle
						= progressValue * rotateDisplacement;
					let targetElement
						= document.getElementById(targetId);
					let targetTransform
						= "rotate".concat(rotationAxis.toUpperCase(), "(", rotateAngle, "deg)");
					//
					Object.assign(targetElement.style,
					{
						"transform":targetTransform
					});
					scopeProxy.props.Report.Change(targetElement);
				},
				"complete":(event)=>
				{
					let completeProfile =
						{
							"runOnMount":false,
							"easing":rotateEasing,
							"duration":10,
							"animation":
							{
								"opacity":0
							},
							"progress":(elements, complete, remaining, start, tweenValue)=>
							{
								// empty
							},
							"complete":(event)=>
							{
								scopeProxy.props.Report.Complete(targetElement);
							}
						}
					//
					updateState(scopeProxy,
					{
						"Portal":
						{
							"Velocity":
							{
								"Profile":completeProfile
							},
							"Rotation":
							{
								"X":portalRotationX,
								"Y":portalRotationY,
								"Z":portalRotationZ
							}
						}
					});
				}
			}
		//
		if(rotationaxisIsValid === true)
		{
			updateState(scopeProxy,
			{
				"Portal":
				{
					"Velocity":
					{
						"Profile":rotateProfile
					}
				}
			});
		}
		scopeProxy.props.Report.Start(targetElement);
	}
	spinnableReset(rotationAxis)
	{
		let scopeProxy
			= this;
		let targetId
			= this.props.children.props.id;
		let targetElement
			= document.getElementById(targetId);
		let rotateEasing
			= scopeProxy.props.Portal.Rotate.Easing;
		let rotateDuration
			= parseFloat(scopeProxy.props.Portal.Rotate.Duration);
		let rotationaxisIsValid
			= (rotationAxis.toLowerCase() === "x"
			|| rotationAxis.toLowerCase() === "y"
			|| rotationAxis.toLowerCase() === "z")
			? true
			: false;
		let rotateDisplacement
			= (rotationaxisIsValid === true)
			? parseFloat(scopeProxy.state.Portal.Rotation[rotationAxis.toUpperCase()])
			: 0;
		let portalRotationX
			= (rotationAxis.toLowerCase() === "x")
			? 0
			: scopeProxy.state.Portal.Rotation.X;
		let portalRotationY
			= (rotationAxis.toLowerCase() === "y")
			? 0
			: scopeProxy.state.Portal.Rotation.Y;
		let portalRotationZ
			= (rotationAxis.toLowerCase() === "z")
			? 0
			: scopeProxy.state.Portal.Rotation.Z;
		//
		let rotateProfile =
			{
				"runOnMount":false,
				"easing":rotateEasing,
				"duration":rotateDuration,
				"animation":
				{
					"opacity":1
				},
				"progress":(elements, complete, remaining, start, tweenValue)=>
				{
					// http://velocityjs.org/
					// The value of tweenValue is being reported as null for
					// unknown reasons. In order to tween the rotation according
					// to the easing, the actual value of the opacity must be
					// used as it tweens from zero to one. Additionally, at the
					// completion of the tween, the value of the opacity is set
					// back to zero by Velocity.
					//
					let progressValue
						= parseFloat(elements[0].style.opacity);
					let rotateAngle
						= rotateDisplacement
						- progressValue * rotateDisplacement;
					let targetElement
						= document.getElementById(targetId);
					let targetTransform
						= "rotate".concat(rotationAxis.toUpperCase(), "(", rotateAngle, "deg)");
					//
					Object.assign(targetElement.style,
					{
						"transform":targetTransform
					});
				},
				"complete":(event)=>
				{
					let completeProfile =
						{
							"runOnMount":false,
							"easing":rotateEasing,
							"duration":0,
							"animation":
							{
								"opacity":0
							},
							"progress":(elements, complete, remaining, start, tweenValue)=>
							{
								// empty
							},
							"complete":(event)=>
							{
								// empty
							}
						}
					//
					updateState(scopeProxy,
					{
						"Portal":
						{
							"Velocity":
							{
								"Profile":completeProfile
							},
							"Rotation":
							{
								"X":portalRotationX,
								"Y":portalRotationY,
								"Z":portalRotationZ
							}
						}
					});
				}
			}
		//
		if(rotationaxisIsValid === true)
		{
			updateState(scopeProxy,
			{
				"Portal":
				{
					"Velocity":
					{
						"Profile":rotateProfile
					}
				}
			});
		}
	}
	//*************************
	//*************************
	// Assignments
	//
	static contextTypes =
		{
			// empty
		}
	//
}