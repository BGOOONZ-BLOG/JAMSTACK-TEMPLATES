if Rails.env == 'test'

  module Minitest
    module Reporters
      # Turn-like reporter that reads like a spec.
      #
      # Based upon TwP's turn (MIT License) and paydro's monkey-patch.
      #
      # @see https://github.com/TwP/turn turn
      # @see https://gist.github.com/356945 paydro's monkey-patch
      class SpecReporter2 < BaseReporter
        include ANSI::Code
        include RelativePosition

        def start
          super
          puts
          puts('Started with run options %s' % options[:args])
          puts
        end

        def report
          super
          puts('Finished in %.5fs' % total_time)
          print('%d tests, %d assertions, ' % [count, assertions])
          color = failures.zero? && errors.zero? ? :green : :red
          print(send(color) { '%d failures, %d errors, ' } % [failures, errors])
          print(yellow { '%d skips' } % skips)
          puts
        end

        def record(test)
          super
          test.name.gsub!(/^(test_\d{4}_)|(test_: )/, '')
          print pad_test(test.name)
          print_colored_status(test)
          print(" (%.2fs)" % test.time) unless test.time.nil?
          puts
          if !test.skipped? && test.failure
            print_info(test.failure)
            puts
          end
        end

        protected

        def before_suite(suite)
          puts print(bold{suite})
        end

        def after_suite(suite)
          puts
        end
      end
    end
  end

end
