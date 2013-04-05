/**
 * Provides jQuery to limelight modules while not interfering with global
 * jQuery version provided by static project.
 */
define(['vendor/jquery'], function () {
  return jQuery.noConflict(true);
});
