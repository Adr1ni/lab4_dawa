function calculateDaysRemaining (date) {
    const actualDate = new Date();
    const insertDate = new Date(date);
    const diferences = insertDate - actualDate;
    return Math.floor(diferences / (1000 * 60 * 60 * 24));
}

module.exports = { calculateDaysRemaining }