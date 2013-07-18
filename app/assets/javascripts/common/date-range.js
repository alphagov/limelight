define(
function () {
    var lastWeekDateRange = function(date, weeksAgo) {
        var weeksAgo = weeksAgo || 0;
        var today = date;
        if (today.day() === 0) { // Sunday
            weeksAgo += 1
        }

        var end = today.day(1).startOf('day').subtract(weeksAgo, 'weeks');

        return {
            start_at: end.clone().subtract(1, 'weeks'),
            end_at: end
        }
    };

    return {
        lastWeekDateRange: lastWeekDateRange
    };
});