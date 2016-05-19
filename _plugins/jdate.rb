#!/bin/env ruby
# encoding: utf-8

require "jalalidate"

module Jekyll
  module JDate

    def jdate(date, options={})
      jalali = JalaliDate.new(date)
      return jalali.strftime(options)
    end
  end
end

Liquid::Template.register_filter(Jekyll::JDate)
