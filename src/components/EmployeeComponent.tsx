import { Component } from "react";
import { styled } from "styled-components";
import { Employee } from "../types/Employee";
import { Link } from "react-router-dom";

type Props = {
	employee: Employee;
};

type State = {};

const EmployeeCard = styled.div`
	height: 300px;
	width: 220px;
	background: url("/images/card.png") no-repeat;
	background-size: contain;

	&:hover {
		cursor: pointer;
	}
`;

const EmployeeProperty = styled.div`
	color: black;
	height: 30px;
	width: 70%;
	position: relative;
	top: 160px;
	text-align: center;
	display: flex;
	align-items: center;
	font-size: 14px;
	border-radius: 5px;
	margin: 0 auto;
	overflow-x: hidden;
	background: antiquewhite;
	word-wrap: normal;
	text-overflow: ellipsis;
	white-space: nowrap;
	text-align: left;
	padding-left: 5px;
`;

const FullName = styled(EmployeeProperty)``;

const Post = styled(EmployeeProperty)`
	top: 165px;
`;

const Experience = styled(EmployeeProperty)`
	top: 170px;
`;

export default class EmployeeComponent extends Component<Props, State> {
	state = {};

	render() {
		return (
			<Link to={`/view/${this.props.employee.id}`}>
				<EmployeeCard>
					<FullName>
						{this.props.employee.firstName}&nbsp;
						{this.props.employee.lastName}
					</FullName>

					<Post>{this.props.employee.company.title}</Post>

					<Experience>
						Experience: {this.props.employee.yearsOfExperience} years
					</Experience>
				</EmployeeCard>
			</Link>
		);
	}
}
