require(['./config'], function (requireConfig) {
  requireConfig.baseUrl = GOVUK.config.baseUrl || '/limelight';
  require.config(requireConfig);

  require(['bootstrap']);
})

