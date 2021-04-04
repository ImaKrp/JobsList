const Profile = require('../model/Profile')

module.exports = {
    index(req, res) {
        return res.render("profile", {profile: Profile.get()})
    },

    update(req, res) {
        const data = req.body
        const weeksPerYears = 52
        const weeksPerMonth = (weeksPerYears - data["vacation-per-year"])/ 12
        const weekTotalHours = data["days-per-week"] * data["hours-per-day"]
        const MonthlyTotalHours = weeksPerMonth * weekTotalHours

        const valueHour= data["monthly-budget"] / MonthlyTotalHours

        Profile.update({
            ...Profile.get(),
            ...req.body,
            "value-hour": valueHour
        })
        
        return res.redirect('/profile')
    }
}