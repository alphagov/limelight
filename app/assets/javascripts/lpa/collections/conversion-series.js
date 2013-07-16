define([
    'extensions/collections/conversioncollection'
], function(ConversionCollection) {
    var ConversionSeries = ConversionCollection.extend({

        serviceName: 'lasting-power-of-attorney',
        apiName: 'journey',

        queryId: 'lpa-conversion',

        steps: [
            'stageprompt.lpa:page:step1',
            'stageprompt.lpa:page:step2',
            'stageprompt.lpa:page:step3',
            'stageprompt.lpa:page:step4',
            'stageprompt.lpa:page:step5',
            'stageprompt.lpa:page:step6',
            'stageprompt.lpa:page:step7',
            'stageprompt.lpa:page:step8',
            'stageprompt.lpa:page:step9',
            'stageprompt.lpa:page:step10'

        ],

        stepTitles: {
            'stageprompt.lpa:page:step1'  : 'Step 1',
            'stageprompt.lpa:page:step2'  : 'Step 2',
            'stageprompt.lpa:page:step3'  : 'Step 3',
            'stageprompt.lpa:page:step4'  : 'Step 4',
            'stageprompt.lpa:page:step5'  : 'Step 5',
            'stageprompt.lpa:page:step6'  : 'Step 6',
            'stageprompt.lpa:page:step7'  : 'Step 7',
            'stageprompt.lpa:page:step8'  : 'Step 8',
            'stageprompt.lpa:page:step9'  : 'Step 9',
            'stageprompt.lpa:page:step10' : 'Step 10'
        }


    });

    return ConversionSeries;
});