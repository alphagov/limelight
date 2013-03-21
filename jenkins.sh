#!/bin/bash
set -e
export RAILS_ENV=test

bundle install --path "${HOME}/bundles/${JOB_NAME}"
bundle exec rake test:all --trace
