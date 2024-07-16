# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [0.3.4] -
### Updated
- Rebrand

## [0.3.3] -
### Updated
- Update links

## [0.3.2]
### Changed
- Changed License to MIT

## [0.3.0] -
> The version is bumped to 0.3.0 to match frozen-filters gem semver.
### Added
- (DEV) Add support for `enabled:false` in a test case.
- Add `extract_path` and `extract_qs` filters.
- Add `array_head`, `array_tail` and `array_to_taglist` filters.
- (DEV) Add travis support.

### Fixed
- (DEV) Fix the mocha test result when the test fails.
- Fix `extract_dirname` when it's only `/index.html`.

## [0.1.1] -
### Fixed
- Fix the usage on README and change the namesace to filters.

## [0.1.0] -
### Added
- Add filters: remove_ext, remove_qs, extract_basename, extract_dirname, extract_protocol.
