class EmailFormatValidator < ActiveModel::EachValidator
  def validate_each(record, attribute, value)
    return if EmailFormat.valid?(value, options[:strict])
    record.errors[attribute] << (options[:message] || 'is invalid')
  end
end
