define(
function () {
    var lastWeekDateRange = function(date) {
        var today = date.utc();
        if (today.day() === 0) { // Sunday
            today = today.subtract(1, 'day');
        }

        var end = today.day(1).startOf('day');

        return {
            start_at: end.clone().subtract(1, 'weeks'),
            end_at: end
        }
    };

    return {
        lastWeekDateRange: lastWeekDateRange
    };
});