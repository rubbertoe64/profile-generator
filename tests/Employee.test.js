
const Employee = require('../lib/Employee')
const newEmployee = new Employee('Robert', 12, "test@gmail.com" )
describe('Employee', () => {
    it('should return name', () => {
        expect(newEmployee.getName()).toBe('Robert')
    });
    it('should return id', () => {
        expect(newEmployee.getId()).toBe(12)
    });
    it('should return email', () => {
        expect(newEmployee.getEmail()).toBe('test@gmail.com')
    });
    it('should return role', () => {
        expect(newEmployee.getRole()).toBe('Employee')
    });
})