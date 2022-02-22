const Manager = require('../lib/Manager')
const newManager = new Manager('Robert', 12, "test@gmail.com", "1234567890" )
describe('Manager', () => {
    it('should return name', () => {
        expect(newManager.getName()).toBe('Robert')
    });
    it('should return id', () => {
        expect(newManager.getId()).toBe(12)
    });
    it('should return email', () => {
        expect(newManager.getEmail()).toBe('test@gmail.com')
    });
    it('should return role', () => {
        expect(newManager.getRole()).toBe('Manager')
    });
    it('should return office number', () => {
        expect(newManager.getOfficeNumber()).toBe('1234567890')
    })

})