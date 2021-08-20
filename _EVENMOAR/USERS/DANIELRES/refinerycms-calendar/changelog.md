## 2.0.2 [21 June 2012]
* Fix bug; add vendor path to gemspec for assets to be packaged up

## 2.0.1 [20 June 2012]
* Assets added to fix missing datepicker
* Remove public venues controller, views, routes - this is not officially supported but DIY is possible
* Remove the /connect prefix from the routes - it was client specific, sorry about that

## 2.0.0 [23 April 2012]
* New calendar gem released from scratch
* Supports Refinery 2.0.x

## 1.2 [UNRELEASED]

## 1.1.1 [UNRELEASED]
* Controller & view template refactoring [joemsak](https://github.com/joemsak)

## 1.1 [07 July 2011]
* No more unique titles [joemsak](https://github.com/joemsak)
* Cached slugs for performance boost [joemsak](https://github.com/joemsak)
* Easy multi-day or single-day detection for date formatting [mdoel](https://github.com/mdoel)
* iCal (ics) export [joemsak](https://github.com/joemsak)
* Google map of venue address [joemsak](https://github.com/joemsak)

## 1.0.4 [02 June 2011]
* Archive listing should be reversed


## 1.0 [13 March 2011]

* Venue Details
* Ticket Pricing & Link
* Feature-ability
* Image attachment
* Ticket price requires a number
* Datetime select defaults noon to 1pm
* Scopes: featured, not_featured, upcoming & current
* Friendly ID based on titles
* Archiving
* Admin screen separates events by their status (TODO: pagination somehow)
* Reasonable validations
* Practical instance methods to check against scopes
* Next & previous navigation on individual event pages.
* has_many :categories, :through => :categorizations, :source => :event_category
* RSS feed of current, upcoming & featured events
* RSS in sidebar && autodiscovery
* Basic layout and styling to get started immediately [blake0102](http://github.com/blake0102)
* Easily hook onto a few semantic CSS classes built into the markup [blake0102](http://github.com/blake0102)
* Basic Facebook & Twitter sharing interface
