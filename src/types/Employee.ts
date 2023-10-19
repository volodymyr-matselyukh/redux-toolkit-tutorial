export interface Employee {
	id: string,
	post: string,
	joinDate: Date,
	firstName: string,
	lastName: string,
	birthDate: string,
	yearsOfExperience: number,
	manager: string,
	company: {
		title: string
	}
}