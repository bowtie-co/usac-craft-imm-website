<?php
namespace Craft;
require_once '../craft/plugins/usacapi/vendor/autoload.php';
require_once '../craft/plugins/usacapi/TwitterAPIExchange.php';

use TwitterAPIExchange;

class UsacApi_TwitterController extends BaseController {
  protected $allowAnonymous = true;

  /**
   * @var array Basic response template
   */
  private $arrResponse = [
      'success' => false,
      'errors' => []
  ];

    public function actionGetTweets() {
      $segments = craft()->request->segments;
      $hashtag = end($segments);

      $settings = array(
        'oauth_access_token' => "18855629-IxhFJRK4VOczRkkZyKKrtJdmvOALrRevBt6ryYjYI",
        'oauth_access_token_secret' => "x3jVxs7o7pGE8PDOJl4gKc7dwaEIa5uBv110Xlwv7oc1N",
        'consumer_key' => "7xEFdlzuOJ0bmkC0e27FidDKh",
        'consumer_secret' => "fvev9Tg5osVy3NArQd02qkuAS0VAoc58RXeUg2M1w93qM4i6SC"
      );
      //https://api.twitter.com/1.1/search/tweets.json

      $url = 'https://api.twitter.com/1.1/search/tweets.json';
      $getfield = '?result_type=recent&q=%23'.$hashtag.'&count=50';
      $requestMethod = 'GET';

      $twitter = new TwitterAPIExchange($settings);
      $tweets = $twitter->setGetfield($getfield)
          ->buildOauth($url, $requestMethod)
          ->performRequest();

      $rnot = [];
      $tweets = json_decode($tweets);
      foreach($tweets->statuses as $tweet) {
        $rnot[] = array(
          "date" => $tweet->created_at,
          "text" => $tweet->text,
          "username" => $tweet->user->screen_name,
          "user_url" => $tweet->user->url,
          "user_profile_img" => $tweet->user->profile_image_url_https
        );
      }

      $this->arrResponse["tweets"] = $rnot;
      $this->respond();
    }

    private function respond() {
        echo $this->returnJson($this->arrResponse);
    }
}
