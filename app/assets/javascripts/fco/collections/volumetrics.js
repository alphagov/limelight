define([
  'extensions/collections/collection',
  'extensions/models/group',
  'extensions/mixins/date-functions'
],
function (Collection, Group, dateFunctions) {
  var START_STAGE_MATCHER = /start$/;
  var DONE_STAGE_MATCHER = /done$/;

  function filterByEventCategory(data, matcher) {
    return _.filter(data, function (d) {
      return d.eventCategory.match(matcher) !== null;
    });
  }

  function findCompletion(existingStartedEvent, existingCompletedEvent) {
    var completion = 0;
    if (_.isObject(existingStartedEvent) && _.isObject(existingCompletedEvent)) {
      completion = (existingCompletedEvent.uniqueEvents / existingStartedEvent.uniqueEvents) * 100;
    }
    return completion;
  }

  function getEventForTimestamp(events, timestamp) {
    return _.find(events, function (d) {
      return moment(d._timestamp).isSame(timestamp);
    });
  }

  var VolumetricsCollection = Collection.extend({
    model: Group,

    apiName: 'journey',

    initialize: function (models, options) {
      this.serviceName = options.serviceName;
      Collection.prototype.initialize.apply(this, arguments);
      this.query.set('period', 'week', {silent: true, utc: false});
      delete this.query.attributes.period;
    },

    numberOfJourneyStarts: function (response) {
      var startedEvents = filterByEventCategory(response.data, START_STAGE_MATCHER);
      return _.reduce(startedEvents, function (mem, d) { return mem + d.uniqueEvents; }, 0);
    },

    numberOfJourneyCompletions: function (response) {
      var completionEvents = filterByEventCategory(response.data, DONE_STAGE_MATCHER);
      return _.reduce(completionEvents, function (mem, d) { return mem + d.uniqueEvents; }, 0);
    },

    completionRate: function (response) {
      return (this.numberOfJourneyCompletions(response) / this.numberOfJourneyStarts(response) * 100);
    },

    applicationsSeries: function () {
      var data = this.pluck('data')[0];
      var applicationEvents = filterByEventCategory(data, DONE_STAGE_MATCHER);

      var latestEventTimestamp = dateFunctions.latest(data, function (d) { return moment(d._timestamp); });
      var weekDates = dateFunctions.weeksFrom(latestEventTimestamp, 9);

      var values = _.map(weekDates, function (timestamp) {
        var existingEvent = getEventForTimestamp(applicationEvents, timestamp);
        return {
          _start_at: timestamp.clone().add(1, 'hours'),
          _end_at: timestamp.clone().add(1, 'hours').add(1, 'weeks'),
          uniqueEvents: _.isUndefined(existingEvent) ? 0 : existingEvent.uniqueEvents
        };
      });

      return {
        id: "done",
        title: "Done",
        values: values
      };
    },

    completionSeries: function () {
      var data = this.pluck('data')[0];
      var startedApplicationEvents = filterByEventCategory(data, START_STAGE_MATCHER);
      var completedApplicationEvents = filterByEventCategory(data, DONE_STAGE_MATCHER);

      var latestEventTimestamp = dateFunctions.latest(data, function (d) { return moment(d._timestamp); });
      var weekDates = dateFunctions.weeksFrom(latestEventTimestamp, 9);

      var values = _.map(weekDates, function (timestamp) {
        var existingStartEvent = getEventForTimestamp(startedApplicationEvents, timestamp);
        var existingCompletionEvent = getEventForTimestamp(completedApplicationEvents, timestamp);
        return {
          _start_at: timestamp.clone().add(1, 'hours'),
          _end_at: timestamp.clone().add(1, 'hours').add(1, 'weeks'),
          completion: findCompletion(existingStartEvent, existingCompletionEvent)
        };
      });

      return {
        id: "completion",
        title: "Completion rate",
        totalCompletion: this.completionRate({ data: data }),
        values: values
      };
    },

    parse: function (response) {
      var dataByEvent = {};
      _.each(response.data, function (d) {
        d['_timestamp'] = moment(d['_timestamp']);
        var stage = d.eventCategory.split(':')[1];
        if (!dataByEvent[stage]) {
          dataByEvent[stage] = [];
        }
        dataByEvent[stage].push(d);
      });

      var start = this.query.get('start_at');
      var end = this.query.get('end_at');
      
      var parseSeries = function (stageId, stageTitle) {
        var series = dataByEvent[stageId];

        var date = moment(start);
        var values = [];
        for (; +date < +end; date.add(1, 'weeks')) {
          var entry = _.find(series, function (d) {
            return +d['_timestamp'] === +date;
          });

          values.push(_.extend({
            uniqueEvents: 0,
            // FIXME: Adding one hour to start and end to work around timezone 
            // issues. Revert once Backdrop handles timezones correctly.
            _start_at: moment(date).add(1, 'hours'),
            _end_at: moment(date).add(1, 'weeks').add(1, 'hours')
          }, entry));
        }
        return {
          id: stageId,
          title: stageTitle,
          values: values
        };
      };

      var data = [
        parseSeries('start', 'Start'),
        parseSeries('done', 'Done')
      ];

      var completionValues = _.map(data[1].values, function (entry, index) {
        var completion = entry.uniqueEvents / data[0].values[index].uniqueEvents || 0;
        return _.extend({}, entry, {
          completion: completion
        });
      });

      data.push({
        id: 'completion',
        title: 'Completion rate',
        totalCompletion: this.completionRate(response),
        values: completionValues
      });
      return data;
    }
  });

  return VolumetricsCollection;
});
