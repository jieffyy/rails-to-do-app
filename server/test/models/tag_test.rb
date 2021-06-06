# frozen_string_literal: true

require 'test_helper'

class TagTest < ActiveSupport::TestCase
  setup do
    @user = users(:user1)
  end

  test 'valid_tag with name and user' do
    @tag = Tag.new(name: 'First Time!')
    @tag.user = @user
    assert @tag.valid?
  end

  test 'invalid tag with empty name' do
    @tag = Tag.new(name: '')
    @tag.user = @user
    assert @tag.invalid?
  end

  test 'invalid tag with nil name' do
    @tag = Tag.new(name: nil)
    @tag.user = @user
    assert @tag.invalid?
  end

  test 'invalid tag without user' do
    @tag = Tag.new(name: 'Hello World!')
    assert @tag.invalid?
  end
end
