import styled from "styled-components";
import EmployeeComponent from "./EmployeeComponent";
import { useGetEmployeesQuery } from "../api/EmployeesApi";

type Props = {};

type State = {};

const StaffBlock = styled.div`
	display: flex;
	margin: 0 auto;
	width: 800px;
	flex-wrap: wrap;
`;

export default () => {
	const { data: employees, error, isLoading } = useGetEmployeesQuery(7);

	return (
		<StaffBlock data-test-id="staff-block">
			{employees?.map((employee) => (
				<EmployeeComponent key={employee.id} employee={employee} />
			))}
		</StaffBlock>
	);
}
