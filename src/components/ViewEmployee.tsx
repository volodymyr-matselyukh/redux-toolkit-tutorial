import { Component, useEffect, useState } from "react";
import { styled } from "styled-components";
import { Link, useParams } from "react-router-dom";
import { UpdateEmployee } from "../types/UpdateEmployee";
import { employeesApi, useGetEmployeesQuery } from "../api/EmployeesApi";
import { produce } from "immer";
import { Employee } from "../types/Employee";
import { useAppDispatch } from "../redux/store";

const EmployeeBlock = styled.form`
	margin: 0 auto;
	width: 800px;
	flex-wrap: wrap;
`;

const EmployeeImage = styled.img`
	background: url("/images/person-image.png") no-repeat;
	height: 150px;
	width: 150px;
	background-size: contain;
`;

const EmployeeName = styled.input`
	display: block;
	width: 300px;
	height: 10px;
	border-radius: 0.375rem;
	border-width: 1px;
	--tw-border-opacity: 1;
	border-color: rgb(229 231 235 / var(--tw-border-opacity));
	--tw-bg-opacity: 1;
	background-color: rgb(255 255 255 / var(--tw-bg-opacity));
	padding: 0.625rem 3rem 0.625rem 1.25rem;
	font-family: Satoshi, sans-serif;
	font-size: 0.875rem;
	line-height: 1.25rem;
	font-weight: 500;
	--tw-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
		0 4px 6px -4px rgba(0, 0, 0, 0.1);
	--tw-shadow-colored: 0 10px 15px -3px var(--tw-shadow-color),
		0 4px 6px -4px var(--tw-shadow-color);
	box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
		var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
`;

const InfoBlock = styled.div`
	margin: 10px;
`;

const Label = styled.label`
	width: 100px;
`;

const Submit = styled.input`
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 9999px;
	border-width: 1px;
	--tw-border-opacity: 1;
	border-color: rgb(0 0 0 / var(--tw-border-opacity));
	background-color: rgb(0 0 0 / var(--tw-bg-opacity));
	padding: 0.375rem 1.25rem;
	text-align: center;
	font-family: Inter, sans-serif;
	font-size: 0.875rem;
	line-height: 1.25rem;
	color: rgb(255 255 255 / var(--tw-text-opacity));
	transition-property: all;
	transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
	transition-duration: 0.15s;

	&:hover {
		background: black;
		color: white;
		cursor: pointer;
	}
`;

type Props = {
	id: string;
};

type State = {
	firstName: string | undefined;
	lastName: string | undefined;
	position: string | undefined;
	yearsOfExperience: number | undefined;
};

export default () => {
	const [employeeToUpdate, setEmployeeToUpdate] = useState<
		UpdateEmployee | undefined
	>(undefined);

	const dispatch = useAppDispatch();

	const { data: employees, error, isLoading } = useGetEmployeesQuery(7);

	const { id } = useParams();

	useEffect(() => {
		const employee = employees?.find((e) => e.id == id);
		const stateEmployee = {
			...employee,
			position: employee?.company.title,
		};

		setEmployeeToUpdate(stateEmployee);
	}, [employees, id]);

	return (
		<EmployeeBlock
			onSubmit={(e) => {
				e.preventDefault();

				dispatch(employeesApi.util.updateQueryData(
					"getEmployees",
					7,
					(employees) => {
						const neededEmployee = employees.find(
							(e) => e.id == id
						);

						if (neededEmployee) {
							neededEmployee.firstName =
								employeeToUpdate?.firstName || "";
							neededEmployee.lastName =
								employeeToUpdate?.lastName || "";
							neededEmployee.post =
								employeeToUpdate?.position || "";
							neededEmployee.yearsOfExperience =
								employeeToUpdate?.yearsOfExperience || 0;
						}

						return employees;
					}
				));

				alert("Successfully updated");
			}}
		>
			<Link style={{ margin: "10px", display: "block" }} to={"/"}>
				Home
			</Link>

			<EmployeeImage />
			<InfoBlock>
				<Label htmlFor="FirstName">First name:</Label>
				<EmployeeName
					id="FirstName"
					value={employeeToUpdate?.firstName}
					type="text"
					onChange={(e) => {
						setEmployeeToUpdate((prev) => {
							return {
								...prev,
								firstName: e.target.value,
							};
						});
					}}
				/>
				<Label htmlFor="LastName">Last name:</Label>
				<EmployeeName
					id="LastName"
					value={employeeToUpdate?.lastName}
					type="text"
					onChange={(e) =>
						setEmployeeToUpdate((prev) => ({
							...prev,
							lastName: e.target.value,
						}))
					}
				/>
				<Label htmlFor="Position">Position:</Label>
				<EmployeeName
					id="Position"
					value={employeeToUpdate?.position}
					type="text"
					onChange={(e) =>
						setEmployeeToUpdate((prev) => ({
							...prev,
							position: e.target.value,
						}))
					}
				/>
				<Label htmlFor="YearsOfExperience">Years of experience:</Label>
				<EmployeeName
					id="YearsOfExperience"
					value={employeeToUpdate?.yearsOfExperience}
					type="number"
					onChange={(e) =>
						setEmployeeToUpdate((prev) => ({
							...prev,
							yearsOfExperience: parseInt(e.target.value),
						}))
					}
				/>
			</InfoBlock>

			<Submit type="submit" value="Submit" />
		</EmployeeBlock>
	);
};
