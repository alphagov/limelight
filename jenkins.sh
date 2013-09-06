#!/bin/bash
set -e
export RAILS_ENV=test
export CAPYBARA_WAIT_TIME=20

bundle install --path "${HOME}/bundles/${JOB_NAME}"
bundle exec rake test:all --trace
