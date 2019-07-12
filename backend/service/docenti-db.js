module.exports = class DocentiDB {
    
    constructor() {

        if (!this.searchProfBySurname) {
            throw new Error('Metodo non definito');
        }

        if (!this.searchProfByStructure) {
            throw new Error('Metodo non definito');
        }

        if (!this.searchProfByCourse) {
            throw new Error('Metodo non definito');
        }

        if (!this.searchProfByCode) {
            throw new Error('Metodo non definito');
        }

        if (!this.searchProfByTeaching) {
            throw new Error('Metodo non definito');
        }

        if (!this.searchInsByCode) {
            throw new Error('Metodo non definito');
        }

        if (!this.loginDocente) {
            throw new Error('Metodo non definito');
        }
        
    }

}