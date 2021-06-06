# frozen_string_literal: true

require 'test_helper'

class TagsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @tag = tags(:user_1_tag_one)
    @token = login('User1', 'OhNoItsPassword')
  end

  test 'should get index' do
    get tags_url,
        headers: {
          "Authorization": @token
        },
        as: :json
    assert_response :success
  end

  test 'should create tag' do
    assert_difference('Tag.count') do
      post tags_url,
           headers: {
             "Authorization": @token
           },
           params: {
             tag: { name: @tag.name, user_id: @tag.user_id }
           },
           as: :json
    end

    assert_response 201
  end

  test 'should show tag' do
    get tag_url(@tag),
        headers: {
          "Authorization": @token
        },
        as: :json
    assert_response :success
  end

  test 'should update tag' do
    patch tag_url(@tag),
          headers: {
            "Authorization": @token
          },
          params: { tag: { name: @tag.name, user_id: @tag.user_id } },
          as: :json
    assert_response 200
  end

  test 'should destroy tag' do
    assert_difference('Tag.count', -1) do
      delete tag_url(@tag),
             headers: {
               "Authorization": @token
             },
             as: :json
    end

    assert_response 204
  end
end
