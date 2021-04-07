const Profile = require('../model/Profile')

module.exports = {
    async index(req, res) {
        return res.render("profile", {profile: await Profile.get()})
    },

    async update(req, res) {
        const data = req.body
        const weeksPerYears = 52
        const weeksPerMonth = (weeksPerYears - data["vacation-per-year"])/ 12
        const weekTotalHours = data["days-per-week"] * data["hours-per-day"]
        const MonthlyTotalHours = weeksPerMonth * weekTotalHours

        const valueHour= data["monthly-budget"] / MonthlyTotalHours

        const profile = await Profile.get()

        Profile.update({
            ...profile,
            ...req.body,
            "value-hour": valueHour
        })
        
        return res.redirect('/profile')
    }
}