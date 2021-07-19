require 'spec_helper'

describe EmailFormatValidator do
  let(:fake_model) { FakeModel.new }
  let(:fake_model_strict) { FakeModelStrict.new }

  describe 'valid emails' do
    context 'with strict email requirements' do
      let(:valid_emails) { %w(valid@email.com another.valid@email.email.net) }

      it 'should be happy' do
        valid_emails.each do |email|
          fake_model_strict.email = email
          expect(fake_model_strict.valid?).to be_truthy
        end
      end
    end

    context 'with non strict requirements' do
      let(:valid_emails) do
        %w(valid@email.com
           another.valid@email.email.net
           valid@a
           a@vaild
           a@a)
      end

      it 'should be happy' do
        valid_emails.each do |email|
          fake_model.email = email
          expect(fake_model.valid?).to be_truthy
        end
      end
    end
  end

  describe 'invalid emails' do
    context 'with strict requirements' do
      let(:invalid_emails) do
        %w(invalid_email@
           another_invalid_email@@email.email
           invalid
           bad@email@here
           @bad_email
           another@bad,email)
      end

      it 'should not be happy' do
        invalid_emails.each do |email|
          fake_model_strict.email = email
          expect(fake_model_strict.valid?).to be_falsey
        end
      end
    end

    context 'with non strict requirements' do
      let(:invalid_emails) do
        %w(invalid_email@
           another_invalid_email@@email.email
           invalid
           bad@email@here
           @bad_email)
      end

      it 'should not be happy' do
        invalid_emails.each do |email|
          fake_model.email = email
          expect(fake_model.valid?).to be_falsey
        end
      end
    end
  end

  context 'with allow_blank: true' do
    let(:fake_model_strict)   { FakeModelWithBlankEmail.new }
    let(:blank_emails) { ['', nil, ' '] }

    it 'should allow blank emails' do
      blank_emails.each do |blank_email|
        fake_model_strict.email = blank_email
        expect(fake_model_strict.valid?).to be_truthy
      end
    end
  end
end
